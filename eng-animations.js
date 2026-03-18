/**
 * eng-animations.js
 * Civil-engineering themed scroll animations — modular & reusable.
 *
 * Features:
 *   1. Scroll Elevation Meter  — fixed vertical rule on the right showing scroll progress
 *   2. Dimension Lines         — architectural annotation lines that draw on scroll entry
 *   3. Engineering Crosshair   — floats in the hero, appears on load
 *
 * Usage:
 *   Include this script at the bottom of any page that has the matching HTML/CSS.
 *   All selectors are configurable via the EngAnimations.config object.
 *
 * Required HTML hooks:
 *   #scrollElev   — elevation meter wrapper
 *   #elevFill     — fill bar inside the meter
 *   #elevDot      — glowing dot indicator
 *   #crosshairWrap — hero crosshair element
 *   [data-dim]    — dimension-line rows
 */

(function () {
    'use strict';

    /* ─── CONFIG ─────────────────────────────────────────────────────────── */
    const config = {
        elevMeterId:        'scrollElev',
        elevFillId:         'elevFill',
        elevDotId:          'elevDot',
        crosshairId:        'crosshairWrap',
        dimAttr:            'data-dim',
        dimReadyClass:      'ready',
        elevShowClass:      'show',
        crosshairLoadClass: 'loaded',
        elevShowThreshold:  120,   // px scrolled before meter appears
        dimIntersectionPct: 0.25,  // how far in view before dim-line draws
    };

    /* ─── 1. SCROLL ELEVATION METER ──────────────────────────────────────── */
    const elevMeter = document.getElementById(config.elevMeterId);
    const elevFill  = document.getElementById(config.elevFillId);
    const elevDot   = document.getElementById(config.elevDotId);

    function updateElevation() {
        if (!elevMeter) return;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct   = total > 0 ? (window.scrollY / total) * 100 : 0;

        if (window.scrollY > config.elevShowThreshold) {
            elevMeter.classList.add(config.elevShowClass);
        } else {
            elevMeter.classList.remove(config.elevShowClass);
        }

        if (elevFill) elevFill.style.height = pct + '%';
        if (elevDot)  elevDot.style.bottom  = pct + '%';
    }

    window.addEventListener('scroll', updateElevation, { passive: true });
    updateElevation();

    /* ─── 2. DIMENSION LINES ─────────────────────────────────────────────── */
    const dimRows = document.querySelectorAll('[' + config.dimAttr + ']');

    if (dimRows.length && 'IntersectionObserver' in window) {
        const dimObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(config.dimReadyClass);
                    dimObserver.unobserve(entry.target);
                }
            });
        }, { threshold: config.dimIntersectionPct });

        dimRows.forEach(function (row) { dimObserver.observe(row); });
    } else {
        /* Fallback: show immediately if IntersectionObserver unavailable */
        dimRows.forEach(function (row) {
            row.classList.add(config.dimReadyClass);
        });
    }

    /* ─── 3. HERO CROSSHAIR ──────────────────────────────────────────────── */
    const crosshair = document.getElementById(config.crosshairId);
    if (crosshair) {
        /* Slight delay so the hero image settles before crosshair fades in */
        setTimeout(function () {
            crosshair.classList.add(config.crosshairLoadClass);
        }, 600);
    }

    /* ─── PUBLIC API ─────────────────────────────────────────────────────── */
    window.EngAnimations = {
        config: config,
        refresh: updateElevation,
    };

})();
