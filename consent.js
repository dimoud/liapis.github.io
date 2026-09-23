/* consent.js — GDPR Cookie Consent for vaiosliapis.gr
 * - Fires gtag consent signals (analytics_storage, ad_storage)
 * - Stores choice in localStorage (no cookie needed)
 * - Supports Greek / English via html[lang]
 * - GA4 script is loaded only after consent is granted
 * -------------------------------------------------------- */

(function () {
    var STORAGE_KEY = 'liapis_consent';
    var GA_ID       = 'G-C707V9N08V';      /* Google Analytics 4 — ροή δεδομένων vaiosliapis.gr */

    /* Χωρίς αναγνωριστικό μέτρησης δεν υπάρχει τίποτα να συναινέσει κανείς: καμία μπάρα. */
    if (!GA_ID) return;

    /* ── helpers ── */
    function lang() {
        return (document.documentElement.lang || 'en').substring(0, 2);
    }

    var copy = {
        el: {
            title:  'Χρησιμοποιούμε cookies',
            body:   'Με τη συγκατάθεσή σας, το Google Analytics μετρά ανώνυμα πώς χρησιμοποιείται ο ιστότοπος. Χωρίς αυτήν δεν φορτώνεται τίποτα.',
            accept: 'Αποδοχή',
            reject: 'Απόρριψη',
        },
        en: {
            title:  'We use cookies',
            body:   'With your consent, Google Analytics measures anonymously how the site is used. Without it, nothing is loaded.',
            accept: 'Accept',
            reject: 'Decline',
        },
    };

    /* ── inject styles ── */
    var css = [
        '#cc-banner{',
        '  position:fixed;bottom:0;left:0;right:0;z-index:99999;',
        '  background:#0e0d0b;color:#f5f0e8;border-top:1px solid rgba(201,168,108,.35);',
        '  font-family:inherit,sans-serif;font-size:14px;line-height:1.5;',
        '  padding:18px 24px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;',
        '  box-shadow:0 -2px 16px rgba(0,0,0,.35);',
        '}',
        '#cc-banner.cc-hidden{display:none}',
        '#cc-text{flex:1;min-width:200px}',
        '#cc-text strong{display:block;font-size:15px;margin-bottom:4px;color:#c9a86c}',
        '#cc-btns{display:flex;gap:10px;flex-shrink:0}',
        '#cc-accept,#cc-reject{',
        '  padding:12px 20px;min-height:44px;border:none;border-radius:4px;',
        '  font-size:14px;font-weight:600;cursor:pointer;transition:opacity .2s;',
        '}',
        '#cc-accept{background:#c9a86c;color:#0e0d0b}',
        '#cc-reject{background:transparent;color:#f5f0e8;border:1px solid rgba(245,240,232,.3)}',
        '#cc-accept:hover,#cc-reject:hover{opacity:.8}',
        '@media(max-width:768px){',
        '  #cc-banner{padding:14px 16px;gap:12px;font-size:13px}',
        '  #cc-text strong{font-size:14px}',
        '}',
        '@media(max-width:480px){',
        '  #cc-banner{flex-direction:column;align-items:flex-start}',
        '  #cc-btns{width:100%}',
        '  #cc-accept,#cc-reject{flex:1;text-align:center}',
        '}',
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── build banner DOM ── */
    var t = copy[lang()] || copy.en;

    var banner = document.createElement('div');
    banner.id = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.title);
    banner.innerHTML =
        '<div id="cc-text">' +
            '<strong>' + t.title + '</strong>' +
            t.body +
        '</div>' +
        '<div id="cc-btns">' +
            '<button id="cc-reject">' + t.reject + '</button>' +
            '<button id="cc-accept">' + t.accept + '</button>' +
        '</div>';

    /* ── gtag consent helpers ── */
    function gtagDeny() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                analytics_storage: 'denied',
                ad_storage:        'denied',
            });
        }
    }

    function gtagGrant() {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage:        'granted',
            });
        }
        /* load GA4 script now if not already present */
        if (GA_ID && !document.getElementById('ga4-script')) {
            var s = document.createElement('script');
            s.id    = 'ga4-script';
            s.async = true;
            s.src   = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
            document.head.appendChild(s);
            s.onload = function () {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', GA_ID, { anonymize_ip: true });
                fireQueuedEvents();
            };
        }
    }

    /* ── queued events ── */
    var _queue = [];

    function fireQueuedEvents() {
        if (typeof gtag !== 'function') return;
        _queue.forEach(function (ev) { gtag('event', ev.name, ev.params); });
        _queue = [];
    }

    /* Public helper — call from anywhere to safely send GA4 events.
     * Events are queued until consent is granted, then fired. */
    window.ccEvent = function (eventName, params) {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'granted' && typeof gtag === 'function') {
            gtag('event', eventName, params || {});
        } else if (stored !== 'denied') {
            _queue.push({ name: eventName, params: params || {} });
        }
    };

    /* ── συμβάντα ιστότοπου: κλήση και email ── */
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
        if (!a) return;
        var tel = a.getAttribute('href').indexOf('tel:') === 0;
        window.ccEvent(tel ? 'click_call' : 'click_email', { link_location: location.pathname });
    });

    /* ── dismiss ── */
    function dismiss(choice) {
        localStorage.setItem(STORAGE_KEY, choice);
        banner.classList.add('cc-hidden');
        document.body.style.paddingBottom = '';
        if (choice === 'granted') {
            gtagGrant();
        } else {
            gtagDeny();
        }
    }

    /* ── check existing choice ── */
    var stored = localStorage.getItem(STORAGE_KEY);

    if (stored === 'granted') {
        gtagGrant();
        return;
    }

    if (stored === 'denied') {
        gtagDeny();
        return;
    }

    /* ── first visit: show banner ── */
    document.body.appendChild(banner);

    /* Η μπάρα είναι position:fixed — χωρίς αυτό σκεπάζει το υποσέλιδο στο κινητό. */
    function padForBanner() {
        if (!banner.classList.contains('cc-hidden')) {
            document.body.style.paddingBottom = banner.offsetHeight + 'px';
        }
    }
    padForBanner();
    window.addEventListener('resize', padForBanner);

    /* Αλλαγή γλώσσας όσο η μπάρα είναι ανοιχτή: ξαναγράφεται στη νέα γλώσσα. */
    document.addEventListener('langchange', function () {
        var n = copy[lang()] || copy.en;
        banner.setAttribute('aria-label', n.title);
        var txt = document.getElementById('cc-text');
        if (txt) txt.innerHTML = '<strong>' + n.title + '</strong>' + n.body;
        var ac = document.getElementById('cc-accept'), rj = document.getElementById('cc-reject');
        if (ac) ac.textContent = n.accept;
        if (rj) rj.textContent = n.reject;
        padForBanner();
    });

    document.getElementById('cc-accept').addEventListener('click', function () {
        dismiss('granted');
    });
    document.getElementById('cc-reject').addEventListener('click', function () {
        dismiss('denied');
    });

})();
