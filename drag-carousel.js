/**
 * drag-carousel.js — ατέρμονη λωρίδα που κυλά μόνη της και σέρνεται με το χέρι
 * ════════════════════════════════════════════════════════════════════════════
 * Προέλευση: moudiotis.github.io/eng-animations.js (καρουζέλ άρθρων και
 * κριτικών — δύο πανομοιότυπα αντίγραφα του ίδιου κώδικα). Εδώ γενικευμένο
 * σε μία συνάρτηση που δέχεται οποιοδήποτε ζεύγος «ζώνη + τροχιά».
 *
 * Η ΙΔΕΑ ΠΟΥ ΤΟ ΞΕΧΩΡΙΖΕΙ
 *   Χρησιμοποιεί `scrollLeft`, ΟΧΙ `transform`. Έτσι το σύρσιμο, η αδράνεια
 *   της αφής, η κύλιση με ροδάκι και οι βελτιστοποιήσεις του περιηγητή
 *   δουλεύουν δωρεάν — και ο ατέρμονος βρόχος γίνεται με μία αφαίρεση.
 *
 * ΠΡΟΫΠΟΘΕΣΗ
 *   Η τροχιά πρέπει να περιέχει το περιεχόμενο **δύο φορές**. Ο βρόχος
 *   στηρίζεται σε αυτό: μόλις κυλήσεις ένα πλήρες αντίγραφο, γυρνάς πίσω
 *   κατά `scrollWidth / 2` και κανείς δεν το βλέπει.
 *
 *   <div class="band" id="myBand">
 *     <div class="track" id="myTrack">
 *       … τα στοιχεία …  … ΤΑ ΙΔΙΑ στοιχεία ξανά …
 *     </div>
 *   </div>
 *
 * ΧΡΗΣΗ
 *   DragCarousel.create('myBand', 'myTrack');
 *   DragCarousel.create(bandEl, trackEl, { speed: 30, dragFactor: 1.6 });
 *                                          ↑ px ανά δευτερόλεπτο
 *   → { pause(), play(), destroy() }
 * ════════════════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    function el(x) { return typeof x === 'string' ? document.getElementById(x) : x; }

    function create(bandRef, trackRef, o) {
        o = o || {};
        var band  = el(bandRef);
        var track = el(trackRef);
        if (!band || !track) return null;

        /* px ανά ΔΕΥΤΕΡΟΛΕΠΤΟ, όχι ανά καρέ. Το πρωτότυπο μετρούσε σε καρέ
           (0.5 px/καρέ), οπότε σε οθόνη 120 Hz έτρεχε διπλάσια. */
        var SPEED       = o.speed !== undefined ? o.speed : 30;     /* px/s */
        var DRAG_FACTOR = o.dragFactor || 1.6;                      /* πόσο «τραβάει» το σύρσιμο */
        var RESUME_MS   = o.resumeMs || 800;                        /* παύση μετά το άγγιγμα */

        var reduced = window.matchMedia &&
                      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* Αναλαμβάνουμε εμείς την κύλιση — σβήνουμε ό,τι έκανε το CSS */
        band.style.overflowX  = 'scroll';
        band.style.cursor     = 'grab';
        track.style.animation = 'none';
        track.style.transform = 'none';

        var isDown = false, dragged = false, paused = false, visible = true, held = false;
        var startX = 0, startScroll = 0, raf = null, lastTs = 0, acc = 0;

        /** Ο ατέρμονος βρόχος, και προς τις δύο κατευθύνσεις. */
        function wrap() {
            var half = track.scrollWidth / 2;
            if (!half) return;
            if (band.scrollLeft >= half) band.scrollLeft -= half;
            if (band.scrollLeft < 0)     band.scrollLeft += half;
        }

        function tick(ts) {
            if (!lastTs) lastTs = ts;
            var dt = (ts - lastTs) / 1000;
            lastTs = ts;
            /* Μετά από παύση ή αλλαγή καρτέλας το dt μπορεί να είναι τεράστιο */
            if (dt > 0.1) dt = 0.1;
            if (!held && !paused && !isDown && visible && !document.hidden) {
                acc += SPEED * dt;
                var whole = Math.floor(acc);
                if (whole) {
                    acc -= whole;
                    band.scrollLeft += whole;
                    wrap();
                }
            }
            raf = requestAnimationFrame(tick);
        }

        /* ── ποντίκι ── */
        function onDown(e) {
            isDown = true; dragged = false;
            band.style.cursor = 'grabbing';
            startX      = e.pageX - band.offsetLeft;
            startScroll = band.scrollLeft;
            e.preventDefault();
        }
        function onMove(e) {
            if (!isDown) return;
            dragged = true;
            e.preventDefault();
            var x = e.pageX - band.offsetLeft;
            band.scrollLeft = startScroll - (x - startX) * DRAG_FACTOR;
            wrap();
        }
        function onUp() { isDown = false; band.style.cursor = 'grab'; }

        band.addEventListener('mousedown',  onDown);
        band.addEventListener('mousemove',  onMove);
        band.addEventListener('mouseup',    onUp);
        band.addEventListener('mouseleave', function () { onUp(); paused = false; });
        band.addEventListener('mouseenter', function () { paused = true; });

        /* Το κλικ σε σύνδεσμο δεν πρέπει να πυροδοτείται μετά από σύρσιμο */
        band.addEventListener('click', function (e) {
            if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; }
        }, true);

        /* ── αφή ── */
        var tStartX = 0, tStartScroll = 0, resumeTimer = null;
        band.addEventListener('touchstart', function (e) {
            tStartX      = e.touches[0].pageX;
            tStartScroll = band.scrollLeft;
            paused = true;
            clearTimeout(resumeTimer);
        }, { passive: true });
        band.addEventListener('touchmove', function (e) {
            band.scrollLeft = tStartScroll + (tStartX - e.touches[0].pageX);
            wrap();
        }, { passive: true });
        band.addEventListener('touchend', function () {
            resumeTimer = setTimeout(function () { paused = false; }, RESUME_MS);
        }, { passive: true });

        /* ── παύση εκτός κάδρου ── */
        var io = null;
        if ('IntersectionObserver' in window) {
            io = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) { visible = en.isIntersecting; });
            }, { threshold: 0 });
            io.observe(band);
        }

        /* ── εκκίνηση ── */
        /* Μικρή καθυστέρηση: το scrollWidth δεν είναι σωστό πριν στρωθεί η διάταξη */
        setTimeout(function () {
            band.scrollLeft = 0;
            if (!reduced) raf = requestAnimationFrame(tick);
        }, 80);

        return {
            hold:   function (v) { held = !!v; },
            pause:  function () { paused = true; },
            play:   function () { paused = false; },
            destroy: function () {
                if (raf) cancelAnimationFrame(raf);
                if (io)  io.disconnect();
                band.removeEventListener('mousedown', onDown);
                band.removeEventListener('mousemove', onMove);
                band.removeEventListener('mouseup',   onUp);
            }
        };
    }

    window.DragCarousel = { create: create };
})();
