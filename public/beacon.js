/**
 * click-guard first-party beacon (v13) — LOGS ONLY. Nothing is blocked.
 *
 * Same behaviour as the GTM Custom HTML beacon, but served as a same-origin
 * file from the <head> of every page, so it:
 *   - attaches its click listeners at ~0 ms (no GTM race: very fast call /
 *     WhatsApp / form clicks are captured too),
 *   - is not blocked by Brave Shields / uBlock the way GTM's domain is.
 *
 * Since v5 it also starts a visit when a visitor lands WITHOUT an ad click
 * (organic/direct/search), so the dashboard can show both categories. Bot
 * user agents are filtered server-side for those.
 *
 * Since v6 it also reports WHERE the visitor came from — only the referring
 * site's domain (e.g. "google.com"), never the full referring URL, and never
 * for same-site navigation. Empty means direct/bookmark/app.
 *
 * Since v7 it follows the whole walk: every page path of the tab (in order,
 * query strings stripped, capped at 50), the exit page, form fields being
 * filled (form-start), and email / maps / Instagram link clicks. It also reads
 * utm_source tags (campaign data) and — for booked-lead matching with Google
 * Ads offline conversions — the gclid click token on ad landings.
 *
 * Since v9 it also records:
 *   - full campaign attribution: utm_medium/campaign/term/content plus
 *     adgroupid / creative / matchtype / network / placement,
 *   - per-page engagement: visible time + max scroll for every page in the walk,
 *   - which CTA/button was clicked and the host of outbound links,
 *   - how many distinct form fields were focused (abandonment depth; never values),
 *   - SPA route changes (pushState / replaceState / popstate),
 *   - hidden cg_gclid / cg_utm_* / cg_landing_page / cg_page inputs added to a
 *     form at submit time so the lead platform can match the enquiry to the ad click.
 *
 * Since v10 it also reports its own version on every request so the dashboard
 * can warn when a site serves a stale beacon.
 *
 * Since v11 conversions are sent twice (sendBeacon + one delayed fetch retry
 * while the page stays visible) so a lost beacon can no longer lose a lead;
 * hot leads (converted or form-started tabs) ping every 45s to stay alive
 * server-side; bfcache restores resume the same visit instead of going quiet.
 *
 * Since v12 it tells the server when the SITE refused the form: a submit
 * whose validation fails moves the focus back to the invalid field, and that
 * focusin means no lead was created on the site. The worker then undoes the
 * conversion (no email, no CRM lead) and the visitor's corrected re-submit
 * is still recorded.
 *
 * Since v13 the SITE can say so directly: a site whose own form code knows
 * the submit never became a lead (its gateway call failed, Firestore
 * rejected it) calls window.cgFormRejected() and click-guard undoes the
 * conversion. The focus-jump heuristic above stays the fallback for sites
 * that never call the hook.
 *
 * Consent hook (optional): when a consent banner is added later, set
 *   window.__cgvRequireConsent = true   (before this script runs)
 * and set   window.__cgvConsent = true    (only after the visitor agrees).
 * With no banner on the site, nothing changes.
 *
 * Privacy model: no cookies, no localStorage; one sessionStorage
 * entry ("cgv") scoped to this tab; only marketing tags, page paths,
 * on-page labels and timings are sent — never form field values,
 * never full referring URLs, never outbound URLs (host only).
 *
 * Install: upload this file to each site's web root as /beacon.js and add to
 * every page's <head>:
 *   <script src="/beacon.js" defer></script>
 * See SETUP.md Step 7 for the per-site instructions and how to switch off the
 * GTM tag (never run both — that would double-count).
 */
(function () {
  "use strict";

  /* ============ EASY VARIABLE: change this if the Worker URL changes ============ */
  var WORKER_URL = "https://visit-log.sachindeepcleaning.workers.dev";
  var BEACON_VERSION = 13;

  var KEY = "cgv";                 /* sessionStorage key, tab-scoped only */
  var TTL = 6 * 60 * 60 * 1000;    /* follow the visitor for 6 hours       */
  var HEARTBEAT_MS = 45 * 1000;    /* liveness ping interval for hot leads */

  // Automation guard: agent-driven browsers ("webdriver") are never logged.
  try { if (navigator.webdriver === true) return; } catch (e) { /* never break the page */ }

  // Consent hook: a site with a banner sets __cgvRequireConsent = true and
  // flips __cgvConsent to true only after the visitor agrees.
  try {
    if (window.__cgvRequireConsent === true && window.__cgvConsent !== true) return;
  } catch (e) { /* never break the page */ }

  function send(path, obj) {
    try {
      obj.bv = BEACON_VERSION;
      var ok = navigator.sendBeacon(
        WORKER_URL + path,
        new Blob([JSON.stringify(obj)], { type: "text/plain" })
      );
      if (!ok) {
        // Fallback if sendBeacon refuses (queue full): fetch with keepalive.
        fetch(WORKER_URL + path, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "text/plain" },
          keepalive: true,
          mode: "cors",
          credentials: "omit",
        }).catch(function () {});
      }
    } catch (e) { /* never break the page */ }
  }

  // Reliable conversion delivery: sendBeacon has no ack, so conversions
  // (call/wa/form/mail) get one delayed fetch retry while the page is still
  // visible. Non-conversion pings stay fire-and-forget to protect quotas.
  function sendConversion(obj) {
    send("/c", obj);
    try {
      setTimeout(function () {
        try {
          if (document.visibilityState !== "visible") return;
          // v12: the site refused this submit — the retry must not resurrect
          // the conversion that the rejection is undoing.
          if (obj.k === "form" && formRejected) return;
          obj.bv = BEACON_VERSION;
          fetch(WORKER_URL + "/c", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "Content-Type": "text/plain" },
            keepalive: true,
            mode: "cors",
            credentials: "omit",
          }).catch(function () {});
        } catch (e) {}
      }, 1500);
    } catch (e) {}
  }

  function readState() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (!raw) return null;
      var st = JSON.parse(raw);
      if (!st || typeof st.id !== "string" || !st.id) return null;
      if (typeof st.exp !== "number" || st.exp < Date.now()) {
        sessionStorage.removeItem(KEY);
        return null;
      }
      return st;
    } catch (e) { return null; }
  }
  function writeState(id, n, extra) {
    try {
      var cur = {};
      try { cur = JSON.parse(sessionStorage.getItem(KEY) || "{}") || {}; } catch (e) {}
      var st = { id: id, exp: Date.now() + TTL, n: n || 1 };
      var k;
      for (k in cur) {
        if (k !== "id" && k !== "exp" && k !== "n") st[k] = cur[k];
      }
      if (extra) {
        for (k in extra) {
          if (extra[k] !== "" && extra[k] !== null && extra[k] !== undefined) st[k] = extra[k];
        }
      }
      sessionStorage.setItem(KEY, JSON.stringify(st));
    } catch (e) {}
  }

  var hasGclid = false;
  try { hasGclid = /[?&]gclid=/.test(window.location.search); } catch (e) {}

  function newId() {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback (very old browsers): still random enough for a session key.
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        var v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }

  // Reads ONLY known marketing parameters. Everything else in the query string
  // (including the gclid value except the documented token) is never read.
  function readParam(name) {
    try {
      var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
      if (!m) return "";
      try {
        return decodeURIComponent(m[1].replace(/\+/g, " ")).slice(0, 120);
      } catch (e) {
        return "";
      }
    } catch (e) {
      return "";
    }
  }

  function attrNow() {
    return {
      us: readParam("utm_source").slice(0, 60),
      um: readParam("utm_medium").slice(0, 60),
      uc: readParam("utm_campaign").slice(0, 120),
      ut: readParam("utm_term").slice(0, 120),
      un: readParam("utm_content").slice(0, 120),
      ag: readParam("adgroupid").slice(0, 40),
      cr: readParam("creative").slice(0, 40),
      mt: readParam("matchtype").slice(0, 20),
      nw: readParam("network").slice(0, 20),
      pl: readParam("placement").slice(0, 120)
    };
  }

  // Reads the referring site's HOST only (e.g. "google.com"). The full
  // referring URL — including any query string — never leaves the browser.
  // Same-site navigation is treated as no referrer.
  function refHost() {
    var raw = "";
    try {
      raw = document.referrer || "";
    } catch (e) {
      return "";
    }
    if (!raw) return "";
    try {
      var u = new URL(raw);
      var host = (u.hostname || "").toLowerCase().slice(0, 80);
      if (!host || host === (location.hostname || "").toLowerCase()) return "";
      return host;
    } catch (e) {
      return "";
    }
  }

  var gclid = hasGclid ? readParam("gclid").slice(0, 64) : "";
  var landingPath = location.pathname.slice(0, 200);
  var attr = attrNow();

  // Landing (ad or organic): new visit id. Any other page in this tab: only
  // keep following the visitor when this tab already has a visit (else stop).
  var id = "";
  var depth = 1;
  var isLanding = false;
  var state = null;
  if (hasGclid) {
    id = newId();
    writeState(id, 1, {
      gl: gclid, us: attr.us, um: attr.um, uc: attr.uc, ut: attr.ut,
      un: attr.un, ag: attr.ag, cr: attr.cr, mt: attr.mt, nw: attr.nw,
      pl: attr.pl, lp: landingPath
    });
    isLanding = true;
  } else {
    state = readState();
    if (state) {
      id = state.id;
      depth = (typeof state.n === "number" && state.n >= 1 ? state.n : 1) + 1;
      writeState(id, depth);
      // Depth ping: tells the worker how many pages this tab has now seen,
      // plus this page's path (query string stripped) so the dashboard can
      // show the walk in order. The worker keeps the highest/last value
      // within the 6h window.
      send("/c", { id: id, k: "depth", n: Math.min(depth, 50), p: landingPath });
    } else {
      // Organic: no ad click, but a fresh tab session — a new visit starts.
      id = newId();
      writeState(id, 1, {
        us: attr.us, um: attr.um, uc: attr.uc, ut: attr.ut,
        un: attr.un, ag: attr.ag, cr: attr.cr, mt: attr.mt, nw: attr.nw,
        pl: attr.pl, lp: landingPath
      });
      isLanding = true;
    }
  }

  // Timezone in its own try/catch, so a failure here can never stop /v
  // from being sent (it just records "" for tz).
  function getTimezone() {
    try {
      return (Intl.DateTimeFormat().resolvedOptions().timeZone || "").slice(0, 100);
    } catch (e) {
      return "";
    }
  }

  // ---- Visit start (/v) — landing page only. Pathname only. Marketing tags
  // are campaign data; no form values, PII or full URLs leave the browser. ----
  if (isLanding) {
    var payload = {
      id: id,
      p: landingPath,
      sw: screen.width || 0,
      sh: screen.height || 0,
      lang: (navigator.language || "").slice(0, 35),
      tz: getTimezone(),
      kw: readParam("kw"),
      ca: parseInt(readParam("cmp"), 10) || 0,
      r: refHost(),
      us: attr.us,
      um: attr.um,
      uc: attr.uc,
      ut: attr.ut,
      un: attr.un,
      ag: attr.ag,
      cr: attr.cr,
      mt: attr.mt,
      nw: attr.nw,
      pl: attr.pl,
      gl: gclid,
    };
    if (hasGclid) payload.g = 1;
    else payload.o = 1;
    send("/v", payload);
  }

  // ---- Page view state (every page): visible time, max scroll, form depth. ----
  var pageStart = Date.now();
  var maxScroll = 0;
  var fieldKeys = {};
  var fieldCount = 0;
  var fstartSent = false;
  var pageSent = false;
  var ctaSent = {};

  function onScroll() {
    try {
      var h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      var vh = window.innerHeight || document.documentElement.clientHeight || 0;
      var top = window.pageYOffset || document.documentElement.scrollTop || 0;
      var pct = h > vh ? Math.round(((top + vh) / h) * 100) : 100;
      if (pct > maxScroll) maxScroll = Math.min(100, Math.max(0, pct));
    } catch (e) {}
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function trackField(t) {
    try {
      var tag = t && t.tagName ? String(t.tagName).toUpperCase() : "";
      if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") return;
      var ty = String(t.type || "").toLowerCase();
      if (ty === "button" || ty === "submit" || ty === "checkbox" || ty === "radio" || ty === "file") return;
      var key = (t.name || t.id || t.getAttribute("autocomplete") || "") + "|" + tag + "|" + ty;
      if (!fieldKeys[key]) {
        fieldKeys[key] = 1;
        fieldCount = Math.min(20, Object.keys(fieldKeys).length);
      }
    } catch (e) {}
  }

  // ---- Conversions (/c): call, WhatsApp, form, mail — sent the moment they
  // happen, on any page of this tab, attributed to the tab's visit. ----
  var convSent = {};
  var hotLead = false;
  // v12 — rejected submit detection. A site validates the form on the submit
  // event; when it refuses the input it moves the focus back to the invalid
  // field. A focusin that lands inside the form just submitted therefore
  // means the submit was REJECTED: the site created no lead, so click-guard
  // must undo the conversion it recorded (the worker does that on "formrej").
  var lastSubmitForm = null;
  var lastSubmitAt = 0;
  var formRejected = false;
  function conv(k) {
    if (convSent[k]) return;
    convSent[k] = 1;
    hotLead = true;
    if (k === "form") formRejected = false;
    sendConversion({ id: id, k: k, ff: fieldCount });
  }

  // Hot-lead heartbeat: once the tab converted or started a form, ping every
  // 45s so the worker knows the visitor is still there (prevents the dead-
  // browser sweep from emailing while they read). Stops on pagehide.

  var acted = 0;
  // Which CTA/button was clicked (site-owned label) and the outbound host.
  function ctaFor(el) {
    var node = el && el.closest ? el.closest("[data-cg-label],a,button") : null;
    if (!node) return null;
    var label = node.getAttribute("data-cg-label");
    if (!label) label = String(node.textContent || "").replace(/\s+/g, " ").trim();
    if (!label) label = node.getAttribute("aria-label") || node.id || "";
    label = String(label).slice(0, 80);
    if (!label) return null;
    var host = "";
    try {
      var href = node.href ? String(node.href) : "";
      if (href) {
        var u = new URL(href);
        if ((u.protocol === "http:" || u.protocol === "https:") &&
            u.hostname && u.hostname !== location.hostname) {
          host = u.hostname.slice(0, 80);
        }
      }
    } catch (e) {}
    return { l: label, h: host };
  }

  document.addEventListener(
    "click",
    function (ev) {
      try {
        var el = ev.target;
        var c = ctaFor(el);
        if (c) {
          var ck = c.l + "|" + c.h;
          if (!ctaSent[ck]) {
            ctaSent[ck] = 1;
            send("/c", { id: id, k: "cta", l: c.l, h: c.h, p: location.pathname.slice(0, 200) });
          }
        }
        while (el && el !== document.body) {
          if (el.href) {
            var href = String(el.href).toLowerCase();
            if (href.indexOf("tel:") === 0) {
              acted = 1;
              conv("call");
              break;
            }
            if (
              href.indexOf("wa.me/") !== -1 ||
              href.indexOf("api.whatsapp.com/") !== -1 ||
              href.indexOf("web.whatsapp.com/") !== -1 ||
              href.indexOf("whatsapp://") === 0
            ) {
              acted = 1;
              conv("wa");
              break;
            }
            if (href.indexOf("mailto:") === 0) {
              conv("mail");
              break;
            }
            if (
              href.indexOf("maps.google.") !== -1 ||
              (href.indexOf("google.") !== -1 && href.indexOf("/maps") !== -1) ||
              href.indexOf("maps.app.goo.gl") !== -1 ||
              href.indexOf("goo.gl/maps") !== -1 ||
              href.indexOf("apple.com/maps") !== -1 ||
              href.indexOf("bing.com/maps") !== -1 ||
              href.indexOf("openstreetmap.org") !== -1
            ) {
              conv("map");
              break;
            }
            if (href.indexOf("instagram.com/") !== -1 || href.indexOf("instagr.am/") !== -1) {
              conv("ig");
              break;
            }
          }
          el = el.parentNode;
        }
      } catch (e) {}
    },
    true
  );

  // Add attribution hidden fields to a form at submit time (capture phase runs
  // before the site's handlers read FormData). Values are marketing tags and
  // page paths only; the visitor's name/phone/message are never touched.
  function injectFormAttribution(form) {
    try {
      if (!form || !form.appendChild) return;
      var st = readState() || {};
      var vals = {
        cg_gclid: st.gl || gclid,
        cg_utm_source: st.us || attr.us,
        cg_utm_medium: st.um || attr.um,
        cg_utm_campaign: st.uc || attr.uc,
        cg_utm_term: st.ut || attr.ut,
        cg_utm_content: st.un || attr.un,
        cg_landing_page: st.lp || landingPath,
        cg_page: location.pathname.slice(0, 200)
      };
      for (var name in vals) {
        var v = vals[name];
        if (!v) continue;
        try {
          if (form.querySelector('input[name="' + name + '"]')) continue;
        } catch (e) {}
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = String(v).slice(0, 200);
        input.setAttribute("data-cg-added", "1");
        form.appendChild(input);
      }
    } catch (e) {}
  }

  document.addEventListener(
    "submit",
    function (ev) {
      try {
        injectFormAttribution(ev.target);
        // v12: remember the form so the focusin handler can tell a rejected
        // submit from a good one.
        try {
          lastSubmitForm =
            ev.target && ev.target.tagName === "FORM" ? ev.target : null;
          lastSubmitAt = Date.now();
        } catch (e) {}
        conv("form");
      } catch (e) {}
    },
    true
  );

  // Form-start: the moment a visitor types into a form field (before any
  // submit) — shows abandonment (started but never submitted). Once per page.
  document.addEventListener(
    "focusin",
    function (ev) {
      try {
        trackField(ev.target);
        // v12 — the site refused the submit: it moved the focus back into
        // the form it just rejected, so NO lead exists. Tell the worker to
        // undo the conversion, and re-arm the form latch so the visitor's
        // corrected re-submit is still recorded.
        if (lastSubmitForm && Date.now() - lastSubmitAt <= 2000) {
          var rejected = false;
          try {
            rejected = !!(
              ev.target &&
              lastSubmitForm.contains &&
              lastSubmitForm.contains(ev.target)
            );
          } catch (e) {}
          if (rejected) {
            lastSubmitForm = null;
            convSent.form = 0;
            formRejected = true;
            send("/c", { id: id, k: "formrej" });
          }
        }
        if (fstartSent) return;
        var t = ev.target;
        var tag = t && t.tagName ? String(t.tagName).toUpperCase() : "";
        if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") return;
        var ty = String(t.type || "").toLowerCase();
        if (ty === "button" || ty === "submit" || ty === "checkbox" || ty === "radio" || ty === "file") return;
        fstartSent = true;
        hotLead = true;
        send("/c", { id: id, k: "fstart", ff: fieldCount });
      } catch (e) {}
    },
    true
  );

  // v13 — the SITE itself says the submit never became a lead. The focusin
  // heuristic above only catches a VALIDATION refusal (the site moves the
  // focus back into the form it just rejected). A site whose own request to
  // the lead gateway / Firestore comes back with an error learns about it
  // seconds later, long after the focus jump, so such a site calls
  // window.cgFormRejected() and click-guard undoes the conversion the same
  // way. This is the DIRECT channel; the focus jump stays the fallback for
  // every site that never calls the hook.
  // Safe by construction: with no pending submit, before any form
  // conversion, or twice for the same refusal, it does nothing at all.
  function reportFormRejected() {
    try {
      // A submit is pending (the site just sent one) AND a form conversion
      // was recorded for it — only then is there something to undo.
      if (!lastSubmitForm) return;
      if (!convSent.form) return;
      // Exactly like the focusin path above, so the two never report the
      // same refusal twice (the worker clears the conversion, and a late
      // second report could wipe a good, later conversion).
      lastSubmitForm = null;  // the focusin heuristic must not report it too
      convSent.form = 0;      // re-arm: the corrected re-submit is recorded
      formRejected = true;    // the delayed retry must not resurrect it
      send("/c", { id: id, k: "formrej" });
    } catch (e) { /* never break the site */ }
  }
  try {
    // The site-facing hook. Both names are the same function: the site code
    // may prefer the plain one, the __cgv_ prefix matches the other
    // click-guard globals.
    window.cgFormRejected = reportFormRejected;
    window.__cgvFormRejected = reportFormRejected;
  } catch (e) {}

  // ---- Page end: engagement for every page (walk + per-page time/scroll). ----
  function endPage() {
    if (pageSent) return;
    pageSent = true;
    try { onScroll(); } catch (e) {}
    send("/c", {
      id: id,
      k: "page",
      p: location.pathname.slice(0, 200),
      d: Date.now() - pageStart,
      s: maxScroll,
      ff: fieldCount
    });
  }

  // ---- Visit end (/e): landing page only, once. ----
  var ended = false;
  function endVisit() {
    if (ended || !isLanding) return;
    ended = true;
    try { onScroll(); } catch (e) {}
    send("/e", {
      id: id,
      d: Date.now() - pageStart,
      s: maxScroll,
      a: acted,
      p: location.pathname.slice(0, 200),
      ff: fieldCount
    });
  }

  function onHide() {
    endPage();
    endVisit();
    try { hotLead = false; } catch (e) {}
  }
  window.addEventListener("pagehide", onHide);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") onHide();
  });

  // Heartbeat loop: fires only for hot leads (converted or form-started).
  // Cheap (one tiny ping per 45s) and keeps the visit alive server-side.
  try {
    setInterval(function () {
      try {
        if (!hotLead) return;
        if (!id) return;
        if (document.visibilityState !== "visible") return;
        send("/c", { id: id, k: "ping" });
      } catch (e) {}
    }, HEARTBEAT_MS);
  } catch (e) {}

  // bfcache restore (back/forward): the page was frozen, not closed — endPage
  // already fired, so reset per-view timers and continue the same visit.
  window.addEventListener("pageshow", function (ev) {
    try {
      if (ev && ev.persisted) {
        pageStart = Date.now();
        maxScroll = 0;
        pageSent = false;
        fieldKeys = {};
        fieldCount = 0;
        fstartSent = false;
        ctaSent = {};
      }
    } catch (e) {}
  });

  // ---- SPA route changes: count the new view, send its depth/page ping, and
  // reset per-view timers. Works with pushState, replaceState and back/forward. ----
  function routeChange() {
    try {
      if (!id) return;
      endPage();
      pageStart = Date.now();
      maxScroll = 0;
      pageSent = false;
      fieldKeys = {};
      fieldCount = 0;
      fstartSent = false;
      ctaSent = {};
      depth = Math.min(50, (depth || 1) + 1);
      writeState(id, depth);
      send("/c", { id: id, k: "depth", n: depth, p: location.pathname.slice(0, 200), ff: 0 });
    } catch (e) {}
  }
  try {
    var pushState = history.pushState;
    var replaceState = history.replaceState;
    history.pushState = function () {
      var r = pushState.apply(this, arguments);
      setTimeout(routeChange, 0);
      return r;
    };
    history.replaceState = function () {
      var r = replaceState.apply(this, arguments);
      setTimeout(routeChange, 0);
      return r;
    };
  } catch (e) {}
  window.addEventListener("popstate", routeChange);
})();
