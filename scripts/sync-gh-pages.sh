#!/usr/bin/env bash
# sync-gh-pages.sh — build main and deploy the fresh dist/ to the gh-pages branch.
#
# Rule: main and gh-pages MUST stay in sync. gh-pages is a snapshot of the latest
# main build, not a separate working branch. Never commit source to gh-pages,
# never commit built artefacts to main. This script enforces that contract.
#
# Usage:  ./scripts/sync-gh-pages.sh
# Effect: runs `gen` -> `build` -> chains a single deploy commit onto the current
#         gh-pages tip (no clone) and pushes it. Git dedupes unchanged files, so
#         only what changed is uploaded (~MBs), not the 170 MB site.
#         Always run from the repo root on the main branch.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "$REPO_ROOT"

# 1. Refuse to deploy from anything other than main.
current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [ "$current_branch" != "main" ]; then
  echo "ERROR: must be on 'main' to deploy (currently on '$current_branch')." >&2
  echo "       Switch with: git checkout main && git pull origin main" >&2
  exit 1
fi

# 2. Make sure the working tree is clean (no uncommitted changes).
if ! git diff --quiet HEAD 2>/dev/null; then
  echo "ERROR: working tree has uncommitted changes. Commit or stash first." >&2
  exit 1
fi

# 3. Make sure local main is up to date with origin/main.
git fetch origin main --prune >/dev/null
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
  echo "WARN: local main is behind origin/main. Run: git pull origin main" >&2
  read -r -p "Continue anyway? [y/N] " ans
  [[ "$ans" =~ ^[Yy]$ ]] || exit 1
fi

# 4. Build.
echo "==> npm run gen"
npm run gen
echo "==> npm run build"
npm run build

# 5. Fetch the CURRENT gh-pages ref (commits+trees only — no blobs). We only
#    need its tip hash to chain our deploy commit onto it; downloading the
#    ~170 MB of deployed videos/blobs is pure waste on every deploy.
echo "==> fetching gh-pages ref (blob:none)"
git fetch origin gh-pages --filter=blob:none >/dev/null

# 6. Assemble the new gh-pages tree WITHOUT a clone. The fresh dist/ is copied
#    into a scratch worktree, hashed into THIS repo's object store, and turned
#    into a commit whose parent is the current gh-pages tip.
#
#    Because the parent commit already contains the unchanged video/image
#    blobs, `git push` uploads ONLY the files that actually changed (~MBs),
#    not the 170 MB site. The previous approach cloned the branch fresh on
#    every deploy — after 26 snapshot commits that clone (and its bandwidth)
#    grew until deploys stalled entirely.
echo "==> assembling deploy commit"
SCRATCH_WORK="/tmp/opencode/ghp-work"
rm -rf "$SCRATCH_WORK" /tmp/opencode/ghp-index
mkdir -p "$SCRATCH_WORK"
cp -r "$REPO_ROOT/dist/." "$SCRATCH_WORK/"
touch "$SCRATCH_WORK/.nojekyll"

export GIT_DIR="$REPO_ROOT/.git"
export GIT_WORK_TREE="$SCRATCH_WORK"
export GIT_INDEX_FILE=/tmp/opencode/ghp-index
git read-tree --empty
git add -A
DEPLOY_TREE="$(git write-tree)"
DEPLOY_PARENT="$(git rev-parse refs/remotes/origin/gh-pages)"
DEPLOY_MSG="Deploy fresh build: $(git log -1 --pretty=%s origin/main)"
DEPLOY_COMMIT="$(git commit-tree "$DEPLOY_TREE" -p "$DEPLOY_PARENT" -m "$DEPLOY_MSG")"
unset GIT_DIR GIT_WORK_TREE GIT_INDEX_FILE
rm -rf "$SCRATCH_WORK" /tmp/opencode/ghp-index

# 7. Push the single new commit. Force is NOT needed (we're fast-forwarding
#    from the current gh-pages tip), but keep it for the edge case where the
#    remote moved between fetch and push — a force makes the deploy idempotent.
echo "==> pushing to origin/gh-pages"
git push --force origin "$DEPLOY_COMMIT:refs/heads/gh-pages"

echo
echo "==> DONE. New gh-pages HEAD:"
git rev-parse refs/remotes/origin/gh-pages
git ls-remote origin gh-pages
echo
echo "Verify live: curl -sI https://aonedeepcleaning.shop/ | grep -i last-modified"
