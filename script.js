/* =========================================================
   Balaji Deep Cleaning — interactivity
   - Theme toggle (light/dark) with localStorage persistence
   - Mobile sticky call/whatsapp bar (injected on every page)
   - Mobile menu, footer year, FAQ accordion, scroll reveal
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Theme toggle ---------- */
  // The button is normally present in the HTML header; if not, inject one.
  var btn = document.getElementById('themeToggle');
  var nav = document.querySelector('.nav');
  if (!btn && nav) {
    btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.id = 'themeToggle';
    btn.type = 'button';
    nav.appendChild(btn);
  }
  if (btn) {
    function syncIcon() {
      var t = document.documentElement.getAttribute('data-theme') || 'light';
      btn.textContent = t === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    syncIcon();
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') || 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncIcon();
    });
  }

  /* ---------- Mobile sticky call / whatsapp bar ---------- */
  if (!document.getElementById('mobileBar')) {
    var bar = document.createElement('div');
    bar.className = 'mobile-bar';
    bar.id = 'mobileBar';
    bar.innerHTML =
      '<a href="tel:+919560739281" class="mb-btn mb-call" aria-label="Call Balaji Deep Cleaning">' +
        '<span class="mb-icon">📞</span><span>Call</span></a>' +
      '<a href="https://wa.me/919560739281" target="_blank" rel="noopener" class="mb-btn mb-wa" aria-label="Chat on WhatsApp">' +
        '<span class="mb-icon">💬</span><span>WhatsApp</span></a>';
    document.body.appendChild(bar);
  }

  /* ---------- Mobile menu toggle ---------- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Current year in footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      q.parentElement.classList.toggle('open');
    });
  });

  /* ---------- Scroll reveal (progressive enhancement) ---------- */
  var els = document.querySelectorAll('.card, .feature, .step, .section-head, .faq-item, .two-col > div, .service-list li');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduceMotion) {
    els.forEach(function (e) { e.classList.add('visible'); });
  } else {
    els.forEach(function (e) { e.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Formspree form handler ----------
     Sends any <form data-formspree-id="..."> to Formspree and
     redirects to /thank-you.html on success. Works on any host. */
  function getFormspreeId(form) {
    return form.getAttribute('data-formspree-id');
  }

  document.querySelectorAll('form[data-formspree-id]').forEach(function (form) {
    var id = getFormspreeId(form);
    if (!id) return;
    var endpoint = 'https://formspree.io/f/' + id;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }

      var data = new FormData(form);

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            // Relative path so the redirect works on GitHub Pages (subfolder),
            // custom domains, and any other host without hardcoding the repo name.
            window.location.href = 'thank-you.html';
            return;
          }
          return res.json().catch(function () { return {}; }).then(function (body) {
            var msg = (body && body.errors && body.errors[0] && body.errors[0].message) ||
                      'Something went wrong. Please try again or call us.';
            throw new Error(msg);
          });
        })
        .catch(function (err) {
          if (btn) {
            btn.disabled = false;
            btn.textContent = originalLabel;
          }
          var note = form.querySelector('.lead-note');
          var errEl = form.querySelector('.form-error');
          if (!errEl) {
            errEl = document.createElement('p');
            errEl.className = 'form-error';
            errEl.style.color = '#dc2626';
            errEl.style.marginTop = '12px';
            if (note) form.insertBefore(errEl, note);
            else form.appendChild(errEl);
          }
          errEl.textContent = err.message || 'Something went wrong. Please try again or call us.';
        });
    });
  });
})();
