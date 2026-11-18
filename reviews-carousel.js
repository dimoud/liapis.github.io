/* reviews-carousel.js — λωρίδα αξιολογήσεων (drag-carousel), 20 px/s, με κουμπί παύσης */
(function () {
    'use strict';
    function init() {
        var band = document.getElementById('revBand'), track = document.getElementById('revTrack');
        var btn = document.getElementById('revToggle');
        if (!band || !track || !window.DragCarousel) return;
        /* Ο βρόχος θέλει το περιεχόμενο δύο φορές· το αντίγραφο δεν διαβάζεται ούτε εστιάζεται */
        Array.prototype.slice.call(track.children).forEach(function (c) {
            var k = c.cloneNode(true);
            k.setAttribute('aria-hidden', 'true');
            k.setAttribute('inert', '');
            k.querySelectorAll('[data-i18n],[data-i18n-aria]').forEach(function (e) {
                /* το i18n.js ενημερώνει και τα αντίγραφα· κρατάμε τα κλειδιά */
            });
            track.appendChild(k);
        });
        var c = window.DragCarousel.create(band, track, { speed: 20, dragFactor: 1.4 });
        if (!c) return;
        var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!btn) return;
        if (reduced) { btn.hidden = true; return; }
        function label() {
            var en = (document.documentElement.lang || 'el').slice(0, 2) === 'en';
            var held = btn.getAttribute('aria-pressed') === 'true';
            btn.textContent = held ? (en ? 'Play' : 'Συνέχεια') : (en ? 'Pause' : 'Παύση');
        }
        btn.addEventListener('click', function () {
            var held = btn.getAttribute('aria-pressed') !== 'true';
            btn.setAttribute('aria-pressed', held ? 'true' : 'false');
            c.hold(held);
            label();
        });
        document.addEventListener('langchange', label);
        label();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
