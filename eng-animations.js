/**
 * eng-animations.js  v2
 * Civil-engineering themed animations — modular & reusable.
 *
 * Features:
 *   1. Scroll Elevation Meter   — vertical rule on the right, scroll progress as elevation
 *   2. Dimension Lines          — [data-dim] elements animate in on scroll entry
 *   3. Hero Crosshair           — floats in hero, fades in on load
 *   4. Hero Measurement Line    — full-width /———— FACADE 24.000 m ————/ in hero
 *   5. Scroll Ruler             — fixed bottom /—value—/ ruler, live scroll-driven
 *   6. Caliper Animation        — SVG caliper opens/closes with live measurement
 *   7. Section Measurement Lines — [data-sec-meas] elements animate on scroll entry
 *
 * Required HTML hooks (ids / attrs):
 *   #scrollElev, #elevFill, #elevDot
 *   #crosshairWrap
 *   #heroMeas, #heroMeasLabel
 *   #scrollRuler, #srFill, #srValue, #srTicksRow
 *   #caliperWrap, #calJawGroup, #calDimLine, #calDimTickR, #caliperVal, #caliperSvg
 *   [data-dim]     — dimension-line rows
 *   [data-sec-meas] — section measurement lines
 */

(function () {
    'use strict';

    /* ─── HELPERS ────────────────────────────────────────────────────────── */
    function $(id) { return document.getElementById(id); }
    function raf(fn) { requestAnimationFrame(fn); }

    /* ─── 1. SCROLL ELEVATION METER ──────────────────────────────────────── */
    var elevMeter = $('scrollElev');
    var elevFill  = $('elevFill');
    var elevDot   = $('elevDot');
    var _lastPct  = -1;

    function updateElevation() {
        if (!elevMeter) return;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        var pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
        if (Math.abs(pct - _lastPct) < 0.1) return;
        _lastPct = pct;

        elevMeter.classList.toggle('show', window.scrollY > 120);
        if (elevFill) elevFill.style.height = pct + '%';
        if (elevDot)  elevDot.style.bottom  = pct + '%';
    }

    /* ─── 2. DIMENSION LINES ─────────────────────────────────────────────── */
    var dimRows = document.querySelectorAll('[data-dim]');

    if (dimRows.length && 'IntersectionObserver' in window) {
        var dimObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('ready'); dimObs.unobserve(e.target); }
            });
        }, { threshold: 0.25 });
        dimRows.forEach(function (r) { dimObs.observe(r); });
    } else {
        dimRows.forEach(function (r) { r.classList.add('ready'); });
    }

    /* ─── 3. HERO CROSSHAIR ──────────────────────────────────────────────── */
    var crosshair = $('crosshairWrap');
    if (crosshair) setTimeout(function () { crosshair.classList.add('loaded'); }, 600);

    /* ─── 4. HERO MEASUREMENT LINE ───────────────────────────────────────── */
    var heroMeas = $('heroMeas');
    if (heroMeas) setTimeout(function () { heroMeas.classList.add('show'); }, 400);

    /* ─── 5. SCROLL RULER ────────────────────────────────────────────────── */
    var scrollRuler = $('scrollRuler');
    var srFill      = $('srFill');
    var srValue     = $('srValue');
    var srTicksRow  = $('srTicksRow');

    /* Build tick marks once */
    if (srTicksRow) {
        var tickCount = 20;
        for (var i = 0; i <= tickCount; i++) {
            var tick = document.createElement('div');
            tick.className = 'sr-sub' + (i % 5 === 0 ? ' maj' : '');
            srTicksRow.appendChild(tick);
        }
    }

    /* Total "height" represented: 48.000 m (12 floors × 4 m) */
    var RULER_MAX_M = 48.0;

    function updateRuler() {
        if (!scrollRuler) return;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        var pct   = total > 0 ? window.scrollY / total : 0;

        scrollRuler.classList.toggle('show', window.scrollY > 120);
        if (srFill)  srFill.style.width = (pct * 100) + '%';
        if (srValue) srValue.textContent = (pct * RULER_MAX_M).toFixed(3) + ' m';
    }

    /* ─── 6. CALIPER ANIMATION ───────────────────────────────────────────── */
    var calWrap     = $('caliperWrap');
    var calJaw      = $('calJawGroup');
    var calDimLine  = $('calDimLine');
    var calDimTickR = $('calDimTickR');
    var calVal      = $('caliperVal');
    var calSvg      = $('caliperSvg');

    /* Geometry constants (match the SVG viewBox in index.html)
       Left jaw fixed anchor x = 88
       Right jaw group base x  = 350 (path starts M350 ...)
       When group translateX = -262: right jaw tip at x=88 → gap = 0 (closed)
       When group translateX =    0: right jaw tip at x=350 → gap = 262px
       Scale: 262px / 4.235m → each metre ≈ 61.9px
       Max measurement displayed: 4.235 m (262 / 61.9) */
    var CAL_JAW_ORIGIN_X = 350;   /* right jaw body x when group is at 0 */
    var CAL_LEFT_ANCHOR  = 88;    /* left jaw tip x */
    var CAL_MAX_OFFSET   = 262;   /* px when fully open */
    var CAL_PX_PER_M     = CAL_MAX_OFFSET / 4.235;
    var CAL_MAX_M        = 4.235;

    var _calStartTime = null;
    var _calRunning   = false;
    var CAL_CYCLE_MS  = 5200;     /* full open → hold → close cycle */

    function easeInOut(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function applyCaliperOffset(offset) {
        /* offset: 0 = closed, CAL_MAX_OFFSET = fully open */
        if (!calJaw) return;
        calJaw.style.transform = 'translateX(' + (-CAL_MAX_OFFSET + offset) + 'px)';

        var jawX = CAL_JAW_ORIGIN_X - (CAL_MAX_OFFSET - offset);
        var midX  = (CAL_LEFT_ANCHOR + jawX) / 2;
        var mVal  = (offset / CAL_PX_PER_M).toFixed(3);

        if (calDimLine) {
            calDimLine.setAttribute('x1', CAL_LEFT_ANCHOR);
            calDimLine.setAttribute('x2', jawX);
        }
        if (calDimTickR) {
            calDimTickR.setAttribute('x1', jawX - 2);
            calDimTickR.setAttribute('x2', jawX + 2);
        }
        if (calVal) {
            calVal.setAttribute('x', midX);
            calVal.textContent = mVal + ' m';
        }
    }

    function stepCaliper(ts) {
        if (!_calRunning) return;
        if (!_calStartTime) _calStartTime = ts;
        var elapsed = (ts - _calStartTime) % CAL_CYCLE_MS;
        var phase   = elapsed / CAL_CYCLE_MS; /* 0 → 1 over cycle */

        var offset;
        if (phase < 0.38) {
            /* opening: 0 → max */
            offset = easeInOut(phase / 0.38) * CAL_MAX_OFFSET;
        } else if (phase < 0.62) {
            /* hold open */
            offset = CAL_MAX_OFFSET;
        } else {
            /* closing: max → 0 */
            offset = easeInOut(1 - (phase - 0.62) / 0.38) * CAL_MAX_OFFSET;
        }

        applyCaliperOffset(offset);
        raf(stepCaliper);
    }

    /* Start caliper when it enters view */
    if (calWrap && 'IntersectionObserver' in window) {
        var calObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting && !_calRunning) {
                    calWrap.classList.add('vis');
                    _calRunning = true;
                    raf(stepCaliper);
                }
            });
        }, { threshold: 0.3 });
        calObs.observe(calWrap);
    }

    /* ─── 7. SECTION MEASUREMENT LINES ──────────────────────────────────── */
    var secMeasEls = document.querySelectorAll('[data-sec-meas]');

    if (secMeasEls.length && 'IntersectionObserver' in window) {
        var secObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('ready');
                    secObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.3 });
        secMeasEls.forEach(function (el) { secObs.observe(el); });
    } else {
        secMeasEls.forEach(function (el) { el.classList.add('ready'); });
    }

    /* ─── COMBINED SCROLL HANDLER ────────────────────────────────────────── */
    function onScroll() {
        updateElevation();
        updateRuler();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* init */

    /* ─── PUBLIC API ─────────────────────────────────────────────────────── */
    window.EngAnimations = {
        refresh: onScroll,
    };

})();
