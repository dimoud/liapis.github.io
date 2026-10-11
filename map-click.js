/**
 * map-click.js — χάρτης Google μόνο όταν τον ζητήσει ο επισκέπτης
 * Προέλευση: nakou, 10/2026. Καθολικό: window.MapClick = { mount(el) }
 *
 *   <div class="map-click" data-map-src="https://maps.google.com/maps?q=…&output=embed"
 *        data-map-title="Τοποθεσία γραφείου">
 *     <button type="button" class="map-click-btn">Εμφάνιση χάρτη</button>
 *   </div>
 *
 * Μέχρι το πάτημα: καμία κλήση στη Google, κανένα cookie τρίτων, μηδέν βάρος.
 */
(function () {
    'use strict';
    if (window.__PRERENDER) return;
    function mount(box) {
        if (!box || box.__mc) return; box.__mc = true;
        var btn = box.querySelector('button') || box;
        btn.addEventListener('click', function () {
            var f = document.createElement('iframe');
            f.src = box.getAttribute('data-map-src');
            f.title = box.getAttribute('data-map-title') || 'Χάρτης';
            f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
            f.setAttribute('allowfullscreen', '');
            f.style.cssText = 'width:100%;height:100%;border:0;display:block';
            box.innerHTML = ''; box.appendChild(f);
            try { f.focus(); } catch (e) { /* — */ }
        });
    }
    function boot() { Array.prototype.forEach.call(document.querySelectorAll('[data-map-src]'), mount); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    window.MapClick = { mount: mount };
})();
