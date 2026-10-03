#!/usr/bin/env bash
# sync-gh-pages.sh — build main and deploy the fresh dist/ to the gh-pages branch.
#
# Rule: main and gh-pages MUST stay in sync. gh-pages is a snapshot of the latest
# main build, not a separate working branch. Never commit source to gh-pages,
# never commit built artefacts to main. This script enforces that contract.
#
# Usage:  ./scripts/sync-gh-pages.sh
# Effect: runs `gen` -> `build` -> clones the remote gh-pages fresh into a scratch
#         dir -> copies dist/ over -> commits and force-pushes to the real remote.
#         Always run from the repo root on the main branch.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRATCH="/tmp/opencode/ghp"
REMOTE="https://github.com/sachindeepcleaning-coder/Aone-deep-cleaning.git"

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

# 5. Clone the REMOTE gh-pages branch fresh into a scratch dir.
echo "==> cloning remote gh-pages into $SCRATCH"
rm -rf "$SCRATCH"
git clone -b gh-pages --single-branch "$REMOTE" "$SCRATCH" >/dev/null

# 6. Wipe and replace with fresh dist/ (preserve .git — the old
# `rm -rf ./* ./.??*` glob matched ./.git and broke the scratch clone).
cd "$SCRATCH"
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
touch .nojekyll
cp -r "$REPO_ROOT/dist/." .

# 7. Restore deploy-only files that vite does NOT emit.
git checkout origin/gh-pages -- .nojekyll

# 8. Commit + force-push to the real remote.
git add -A
git config user.name "${GIT_USER_NAME:-vegeta}"
git config user.email "${GIT_USER_EMAIL:-vegeta@localhost}"
if git diff --cached --quiet; then
  echo "==> no changes to deploy (build identical to current gh-pages). skipping push."
  exit 0
fi
git commit -m "Deploy fresh build: $(git -C "$REPO_ROOT" log -1 --pretty=%s origin/main)"

echo "==> pushing to origin/gh-pages"
git push --force origin gh-pages

echo
echo "==> DONE. New gh-pages HEAD:"
git log -1 --pretty="%h %ci  %s" origin/gh-pages
echo
echo "Verify live: curl -sI https://balajicleaningservice.shop/ | grep -i last-modified"
