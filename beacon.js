/**
 * click-guard first-party beacon (v5) — LOGS ONLY. Nothing is blocked.
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
 * Consent hook (optional): when a consent banner is added later, set
 *   window.__cgvRequireConsent = true   (before this script runs)
 * and set   window.__cgvConsent = true    (only after the visitor agrees).
 * With no banner on the site, nothing changes.
 *
 * Privacy model (unchanged): no cookies, no localStorage; one sessionStorage
 * entry ("cgv") scoped to this tab; only gclid presence (never its value) and
 * the two ValueTrack params kw / cmp are read; all other URL params ignored.
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

  var KEY = "cgv";                 /* sessionStorage key, tab-scoped only */
  var TTL = 6 * 60 * 60 * 1000;    /* follow the visitor for 6 hours       */

  // Automation guard: agent-driven browsers ("webdriver") are never logged.
  try { if (navigator.webdriver === true) return; } catch (e) { /* never break the page */ }

  // Consent hook: a site with a banner sets __cgvRequireConsent = true and
  // flips __cgvConsent to true only after the visitor agrees.
  try {
    if (window.__cgvRequireConsent === true && window.__cgvConsent !== true) return;
  } catch (e) { /* never break the page */ }

  function send(path, obj) {
    try {
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
  function writeState(id, n) {
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ id: id, exp: Date.now() + TTL, n: n || 1 }));
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

  // Landing (ad or organic): new visit id. Any other page in this tab: only
  // keep following the visitor when this tab already has a visit (else stop).
  var id = "";
  var depth = 1;
  var isLanding = false;
  if (hasGclid) {
    id = newId();
    writeState(id, 1);
    isLanding = true;
  } else {
    var st = readState();
    if (st) {
      id = st.id;
      depth = (typeof st.n === "number" && st.n >= 1 ? st.n : 1) + 1;
      writeState(id, depth);
      // Depth ping: tells the worker how many pages this tab has now seen.
      // The worker keeps the highest/last value within the 6h window.
      send("/c", { id: id, k: "depth", n: Math.min(depth, 50) });
    } else {
      // Organic: no ad click, but a fresh tab session — a new visit starts.
      id = newId();
      writeState(id, 1);
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

  // Reads ONLY the two ValueTrack params the ads' final URL suffix appends:
  // kw={keyword} and cmp={campaignid}. Everything else in the query string
  // (including the gclid value) is never read.
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

  // ---- Visit start (/v) — landing page only. Pathname only; gclid value is
  // NEVER read or sent; the rest of the query string never leaves the browser.
  // g:1 marks an ad click; o:1 marks an organic/direct landing. ----
  if (isLanding) {
    var payload = {
      id: id,
      p: location.pathname.slice(0, 200),
      sw: screen.width || 0,
      sh: screen.height || 0,
      lang: (navigator.language || "").slice(0, 35),
      tz: getTimezone(),
      kw: readParam("kw"),
      ca: parseInt(readParam("cmp"), 10) || 0,
    };
    if (hasGclid) payload.g = 1;
    else payload.o = 1;
    send("/v", payload);
  }

  // ---- Conversions (/c): call, WhatsApp, form — sent the moment they happen,
  // on any page of this tab, and attributed to the tab's visit (ad or organic). ----
  var convSent = {};
  function conv(k) {
    if (convSent[k]) return;
    convSent[k] = 1;
    send("/c", { id: id, k: k });
  }
  var acted = 0;
  document.addEventListener(
    "click",
    function (ev) {
      try {
        var el = ev.target;
        while (el && el !== document.body) {
          if (el.href) {
            var href = String(el.href);
            if (href.indexOf("tel:") === 0) {
              acted = 1;
              conv("call");
              break;
            }
            if (href.indexOf("https://wa.me/") === 0 || href.indexOf("https://api.whatsapp.com/") === 0) {
              acted = 1;
              conv("wa");
              break;
            }
          }
          el = el.parentNode;
        }
      } catch (e) {}
    },
    true
  );
  document.addEventListener(
    "submit",
    function () { try { conv("form"); } catch (e) {} },
    true
  );

  // Follower pages (no new visit): conversions + depth only — no dwell/scroll bookkeeping.
  if (!isLanding) return;

  // ---- Max scroll (0-100) ----
  var maxScroll = 0;
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

  // ---- Visit end (/e): once, on pagehide or tab hidden ----
  var start = Date.now();
  var sent = false;
  function end() {
    if (sent) return;
    sent = true;
    try { onScroll(); } catch (e) {}
    send("/e", {
      id: id,
      d: Date.now() - start,
      s: maxScroll,
      a: acted,
    });
  }
  window.addEventListener("pagehide", end);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") end();
  });
})();
