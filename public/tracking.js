// Aone Deep Cleaning — GTM click tracking (shared, every page).
// Pushes the Custom Events that GTM expects:
//   tel: link click      -> { event: 'phone_call_click' }
//   WhatsApp link click  -> { event: 'whatsapp_click' }
// Loaded via <script src="/tracking.js" defer> on every entry shell
// (see scripts/gen-entries.mjs). No PII is pushed. Navigation is never
// blocked or delayed. Delegation + closest() covers floating/sticky bars,
// footer links, and any React-rendered or dynamically added buttons.
// A short dedup window prevents double-firing when a React onClick handler
// pushes the same event for the same click.
(function () {
  window.dataLayer = window.dataLayer || [];
  var lastPush = { name: '', time: 0 };

  function pushOnce(name) {
    // 250ms: same-click duplicates (capture listener + React onClick for the
    // same physical click) land within milliseconds of each other. A wider
    // window would swallow genuine rapid re-taps on different buttons.
    var now = Date.now();
    if (lastPush.name === name && now - lastPush.time < 250) return;
    lastPush = { name: name, time: now };
    window.dataLayer.push({ event: name });
  }

  function isWhatsAppHref(href) {
    return (
      href.indexOf('wa.me') !== -1 ||
      href.indexOf('api.whatsapp.com') !== -1 ||
      href.indexOf('whatsapp.com/send') !== -1
    );
  }

  // Exposed so React onClick handlers could use it; delegation below is
  // the primary path. Keeping both safe via the dedup window above.
  window.__aonePush = pushOnce;

  document.addEventListener(
    'click',
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) {
        pushOnce('phone_call_click');
      } else if (isWhatsAppHref(href)) {
        pushOnce('whatsapp_click');
      }
    },
    true
  );
})();
