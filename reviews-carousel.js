/* reviews-carousel.js — οι αξιολογήσεις στο ίδιο καρουζέλ με τα «Νέα» (newsDrift).
   Διπλασιάζει την τροχιά (το αντίγραφο aria-hidden/inert) και σταματά στο πέρασμα του κέρσορα. */
(function () {
    'use strict';
    function init() {
        var band = document.getElementById('revBand'), track = document.getElementById('revTrack');
        if (!band || !track) return;
        Array.prototype.slice.call(track.children).forEach(function (c) {
            var k = c.cloneNode(true);
            k.setAttribute('aria-hidden', 'true');
            k.setAttribute('inert', '');
            track.appendChild(k);
        });
        function play(on) { track.style.animationPlayState = on ? '' : 'paused'; }
        band.addEventListener('mouseenter', function () { play(false); });
        band.addEventListener('mouseleave', function () { play(true); });
        /* Μετά την αλλαγή γλώσσας χωρίς επαναφόρτωση, τα αντίγραφα παίρνουν το νέο κείμενο */
        document.addEventListener('langchange', function () {
            var n = track.children.length / 2;
            for (var i = 0; i < n; i++) track.children[n + i].innerHTML = track.children[i].innerHTML;
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
