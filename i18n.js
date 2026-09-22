/**
 * i18n.js — Greek / English translation toggle
 * Modular & reusable. Drop into any page that uses data-i18n attributes.
 *
 * Attributes recognised:
 *   data-i18n="key"             → replaces element.textContent
 *   data-i18n-html="key"        → replaces element.innerHTML
 *   data-i18n-placeholder="key" → replaces element.placeholder
 *
 * Public API:
 *   window.I18n.setLang('el' | 'en')
 *   window.I18n.getLang()
 *   window.setLang(lang)          ← shorthand for onclick="setLang('el')"
 */

(function () {
    'use strict';

    /* ─── TRANSLATIONS ───────────────────────────────────────────────────── */
    const t = {

        /* NAV */
        'nav.title':    { el: 'Πολιτικός Μηχανικός',   en: 'Civil Engineer' },
        'nav.about':    { el: 'Σχετικά',                en: 'About' },
        'nav.services': { el: 'Υπηρεσίες',              en: 'Services' },
        'nav.projects': { el: 'Έργα',                   en: 'Projects' },
        'nav.contact':  { el: 'Επικοινωνία',            en: 'Contact' },

        /* HERO */
        'hero.name1':   { el: 'ΒΑΪΟΣ',                   en: 'VAIOS' },
        'hero.name2':   { el: 'ΛΙΑΠΗΣ',                  en: 'LIAPIS' },
        'hero.eyebrow': { el: 'Πολιτικός Μηχανικός ΑΠΘ', en: 'Civil Engineer — AUTH' },
        'hero.cta':     { el: 'Επικοινωνία',              en: 'Get in Touch' },
        'hero.value':   { el: 'Τακτοποίηση αυθαιρέτων, Ηλεκτρονική Ταυτότητα Κτιρίου και οικοδομικές άδειες σε όλη την Αττική.', en: 'Legalising unauthorised works, Building e-Identity and building permits across Attica.' },
        'hero.call':    { el: 'Κλήση · 694 867 5267', en: 'Call · +30 694 867 5267' },

        /* MARQUEE */
        'marquee.m1': { el: 'Άμεση Αυτοψία',                    en: 'Immediate Site Inspection' },
        'marquee.m2': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου',   en: 'Building e-Identity' },
        'marquee.m3': { el: 'Νομιμοποίηση Αυθαιρέτων',         en: 'Unauthorized Structure Legalization' },
        'marquee.m4': { el: 'Ενεργειακά Πιστοποιητικά ΠΕΑ',    en: 'Energy Performance Certificates' },
        'marquee.m5': { el: 'Οικοδομικές Άδειες',               en: 'Building Permits' },
        'marquee.m6': { el: 'Διπλωματούχος Μηχανικός ΑΠΘ',     en: 'Graduate Engineer AUTH' },

        /* ABOUT */
        'about.heading': {
            el: '<em>Εμπειρία &amp; <em>Εξειδίκευση</em>',
            en: 'Experience &amp; <em>Expertise</em>',
        },
        'about.lead': {
            el: 'Διπλωματούχος Πολιτικός Μηχανικός του Αριστοτέλειου Πανεπιστημίου Θεσσαλονίκης, με <span class="years-exp"></span>+ χρόνια εμπειρία στην αντιμετώπιση πολεοδομικών, κτηματολογικών και κατασκευαστικών θεμάτων για ιδιώτες και επαγγελματίες σε όλη την Αττική.',
            en: 'Licensed Civil Engineer from the Aristotle University of Thessaloniki, with <span class="years-exp"></span>+ years of experience in urban planning, cadastral, and construction matters for individuals and professionals throughout Attica.',
        },
        'about.dim': { el: 'Αθήνα — Αττική', en: 'Athens — Attica' },

        /* FEATURES */
        'feature.timeline.label':     { el: 'Χρονοδιάγραμμα', en: 'Timeline' },
        'feature.timeline.text':      { el: 'Γρήγορη ανταπόκριση & τήρηση προθεσμιών', en: 'Fast response & strict deadline compliance' },
        'feature.transparency.label': { el: 'Διαφάνεια',       en: 'Transparency' },
        'feature.transparency.text':  { el: 'Σαφής ενημέρωση σε κάθε στάδιο',          en: 'Clear updates at every stage' },
        'feature.direct.label':       { el: 'Άμεση',           en: 'Direct' },
        'feature.direct.text':        { el: 'Εξυπηρέτηση σε ολόκληρη την Αττική',      en: 'Service across all of Attica' },

        /* SERVICES */
        'services.eyebrow': { el: 'Τι προσφέρουμε',  en: 'What we offer' },
        'services.heading': {
            el: 'Οι <em>Υπηρεσίες</em> μας',
            en: 'Our <em>Services</em>',
        },
        'service.more': { el: 'Μάθε Περισσότερα', en: 'Learn More' },

        's1.title': { el: 'Δήλωση στο Κτηματολόγιο', en: 'Land Registry Declaration' },
        's1.text':  { el: 'Συγκεντρώνουμε τίτλους και σχέδια και ελέγχουμε εμβαδά και όρια πριν υποβληθεί η δήλωση. Αν χρειαστεί διόρθωση εμβαδού ή ορίων, ετοιμάζουμε το τοπογραφικό που τη στηρίζει.', en: 'We gather deeds and plans and check areas and boundaries before the declaration is filed. If an area or boundary needs correcting, we prepare the topographic plan that supports it.' },

        's2.title': { el: 'Πολεοδομικές Άδειες', en: 'Building Permits' },
        's2.text':  { el: 'Οικοδομικές άδειες και εγκρίσεις εργασιών μικρής κλίμακας εκδίδονται πλέον μόνο ηλεκτρονικά, μέσω μηχανικού. Ο φάκελος ξεκινά από τον έλεγχο αρτιότητας και όρων δόμησης· από εκεί και πέρα συντάσσουμε τις μελέτες και τον παρακολουθούμε μέχρι την έκδοση.', en: 'Building permits and minor-works approvals are now issued only online, through an engineer. Every file starts with a check of plot eligibility and building terms; from there we prepare the studies and follow the file until the permit is issued.' },

        's3.title': { el: 'Μεταφορά Αυθαιρέτων στον ν.4495/2017', en: 'Transfer of Declarations to Law 4495/2017' },
        's3.text':  { el: 'Αυθαίρετα που είχαν δηλωθεί με παλαιότερους νόμους (ν.3843/2010, ν.4014/2011, ν.4178/2013) συχνά πρέπει να περάσουν στον ν.4495/2017 για να ολοκληρωθεί η δήλωση ή για να γίνει μεταβίβαση. Πριν τη μεταφορά ελέγχουμε τι είχε δηλωθεί τότε και τι έχει αλλάξει στο μεταξύ.', en: 'Unauthorised works declared under earlier laws (3843/2010, 4014/2011, 4178/2013) often have to be moved to Law 4495/2017 before the declaration can be completed or the property sold. Before the transfer we check what was declared back then and what has changed since.' },

        's4.title': { el: 'Βεβαιώσεις Μηχανικού για Μεταβίβαση', en: 'Engineer’s Certificate for Property Transfers' },
        's4.text':  { el: 'Για αγοραπωλησία, γονική παροχή, δωρεά ή σύσταση οριζόντιας ιδιοκτησίας ο συμβολαιογράφος ζητά βεβαίωση μηχανικού (άρθρο 83 ν.4495/2017). Μετά την αυτοψία και τη σύγκριση με την άδεια, αν βρεθεί αυθαιρεσία σας λέμε πριν το συμβόλαιο πώς διορθώνεται.', en: 'For a sale, parental gift, donation or horizontal-property deed, the notary requires an engineer’s certificate (Article 83, Law 4495/2017). After an on-site inspection and a comparison with the permit, if anything unauthorised turns up we tell you how to fix it before the contract.' },

        's5.title': { el: 'Επίβλεψη Κατασκευών & Έργων', en: 'Construction Supervision' },
        's5.text':  { el: 'Η οικοδομική άδεια προβλέπει επιβλέποντα μηχανικό. Είμαστε στο εργοτάξιο στις κρίσιμες φάσεις, από την εκσκαφή ως τον έλεγχο του οπλισμού πριν τη σκυροδέτηση.', en: 'A building permit requires a supervising engineer. We are on site at the critical stages, from excavation to checking the reinforcement before the concrete is poured.' },

        's6.title': { el: 'Τακτοποίηση Αυθαιρέτων', en: 'Legalising Unauthorised Works' },
        's6.text':  { el: 'Υπέρβαση δόμησης, κλειστός ημιυπαίθριος, πατάρι ή αλλαγή χρήσης: καταγράφουμε τι υπάρχει και σας λέμε από την αρχή τι τακτοποιείται και με ποιο πρόστιμο, αλλά και τι δεν τακτοποιείται. Ο φάκελος προχωρά κατά τον ν.4495/2017, όπως ισχύει, μέχρι την περαίωση.', en: 'Extra floor area, an enclosed semi-open space, a mezzanine or a change of use: we record what is there and tell you from the start what can be legalised and at what fine, and also what cannot. The file then proceeds under Law 4495/2017, as in force, until it is closed.' },

        's7.title': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου', en: 'Building e-Identity' },
        's7.text':  { el: 'Η Ηλεκτρονική Ταυτότητα Κτιρίου (άρθρα 52-56 ν.4495/2017) συγκεντρώνει άδειες, σχέδια, τακτοποιήσεις και την πραγματική κατάσταση του ακινήτου. Μετά την αποτύπωση, τη συμπληρώνουμε στην πλατφόρμα του ΤΕΕ και εκδίδουμε το πιστοποιητικό πληρότητας που ζητείται στις μεταβιβάσεις.', en: 'The Building e-Identity (Articles 52-56, Law 4495/2017) brings together permits, plans, legalisations and the actual state of the property. After surveying the property we complete it on the Technical Chamber platform and issue the completeness certificate required for transfers.' },

        's8.title': { el: 'Υπηρεσία Μιας Στάσης', en: 'One-Stop Service' },
        's8.text':  { el: 'Μια υπόθεση ακινήτου συχνά χρειάζεται μηχανικό, τοπογράφο, δικηγόρο και συμβολαιογράφο. Συντονίζουμε εμείς τους συνεργάτες και εσείς έχετε έναν άνθρωπο να ρωτάτε.', en: 'A property case often needs an engineer, a surveyor, a lawyer and a notary. We coordinate the partners, and you have one person to ask.' },

        's9.title': { el: 'Ανακαινίσεις, Επισκευές & Μονώσεις', en: 'Renovation, Repairs & Insulation' },
        's9.text':  { el: 'Από ανακαίνιση κουζίνας και μπάνιου μέχρι θερμομόνωση κελύφους και επισκευή ρωγμών. Όπου απαιτείται έγκριση εργασιών μικρής κλίμακας την εκδίδουμε εμείς, και επιβλέπουμε τα συνεργεία μέχρι την παράδοση.', en: 'From a new kitchen or bathroom to external insulation and crack repair. Where a minor-works approval is needed we obtain it, and we supervise the crews until handover.' },

        's10.title': { el: 'Ενεργειακά Πιστοποιητικά', en: 'Energy Performance Certificates' },
        's10.text':  { el: 'Ενεργειακή επιθεώρηση και Πιστοποιητικό Ενεργειακής Απόδοσης για πώληση, μίσθωση ή πρόγραμμα ενεργειακής αναβάθμισης, σε κατοικίες και επαγγελματικούς χώρους. Αν η κατάταξη βγει χαμηλή, σας δείχνουμε ποιες παρεμβάσεις την ανεβάζουν με λογικό κόστος.', en: 'Energy inspection and Energy Performance Certificate for a sale, a lease or an energy-upgrade programme, for homes and business premises. If the rating comes out low, we show you which improvements raise it at a reasonable cost.' },

        's11.title': { el: 'Άδειες Λειτουργίας', en: 'Operating Licences' },
        's11.text':  { el: 'Για καταστήματα, καφέ, γραφεία και αποθήκες ετοιμάζουμε τα τεχνικά στοιχεία της αδειοδότησης: κατόψεις, βεβαιώσεις μηχανικού και, όπου χρειάζεται, μελέτη πυροπροστασίας. Πρώτα ελέγχουμε αν ο χώρος επιτρέπει τη χρήση που θέλετε, πριν υπογράψετε μίσθωση.', en: 'For shops, cafés, offices and warehouses we prepare the technical part of the licence: floor plans, engineer’s certificates and, where needed, a fire-safety study. First we check whether the space allows the use you want, before you sign a lease.' },

        's12.title': { el: 'Τοπογραφικά Διαγράμματα', en: 'Topographic Surveys' },
        's12.text':  { el: 'Τοπογραφικό διάγραμμα εξαρτημένο στο ΕΓΣΑ ’87, για άδεια, Κτηματολόγιο ή μεταβίβαση, με μέτρηση στο πεδίο και τις προδιαγραφές της υπηρεσίας που το ζητά.', en: 'Topographic plans tied to the Greek reference system EGSA ’87, for permits, the Land Registry or a sale, measured on site and drawn to the specifications of the authority that asks for them.' },

        /* PROJECTS */
        'projects.eyebrow': { el: 'Το χαρτοφυλάκιό μας',   en: 'Our Portfolio' },
        'projects.heading': {
            el: 'Επιλεγμένα <em>Έργα</em>',
            en: 'Selected <em>Projects</em>',
        },
        'p1.cat':   { el: 'Ηλεκτρονική Ταυτότητα',      en: 'Electronic Identity' },
        'p1.title': { el: 'Κατοικία Αθήνα',              en: 'Residence Athens' },
        'p1.desc':  { el: 'Πλήρης ΗΤΚ & βεβαίωση μηχανικού για μεταβίβαση', en: 'Full BEI & engineer\'s certificate for property transfer' },

        'p2.cat':   { el: 'Οικοδομική Άδεια',            en: 'Building Permit' },
        'p2.title': { el: 'Νέα Κατασκευή Πειραιάς',      en: 'New Construction Piraeus' },
        'p2.desc':  { el: 'Αρχιτεκτονική μελέτη & αδειοδότηση', en: 'Architectural study & permit approval' },

        'p3.cat':   { el: 'Τακτοποίηση Αυθαίρετου',     en: 'Unauthorized Structure Settlement' },
        'p3.title': { el: 'Μονοκατοικία Γλυφάδα',        en: 'Detached House Glyfada' },
        'p3.desc':  { el: 'Νομιμοποίηση κατά Ν.4495/2017', en: 'Legalization under Law 4495/2017' },

        'p4.cat':   { el: 'Ενεργειακό Πιστοποιητικό',   en: 'Energy Certificate' },
        'p4.title': { el: 'Εμπορικό Κτίριο Μαρούσι',    en: 'Commercial Building Maroussi' },
        'p4.desc':  { el: 'ΠΕΑ & ενεργειακή αναβάθμιση', en: 'EPC & energy upgrade' },

        'p5.cat':   { el: 'Scan to BIM',                 en: 'Scan to BIM' },
        'p5.title': { el: 'Βιομηχανικό Κτίριο Ελαιώνας', en: 'Industrial Building Eleonas' },
        'p5.desc':  { el: '3D Laser Scanning & ψηφιακή αποτύπωση', en: '3D Laser Scanning & digital survey' },

        'p6.cat':   { el: 'Ανακαίνιση',                  en: 'Renovation' },
        'p6.title': { el: 'Διαμέρισμα Κολωνάκι',         en: 'Apartment Kolonaki' },
        'p6.desc':  { el: 'Πλήρης ανακαίνιση & επίβλεψη', en: 'Full renovation & supervision' },

        /* CONTACT */
        'contact.eyebrow': { el: 'Επικοινωνία', en: 'Contact' },
        'contact.heading': {
            el: 'Μιλήστε <em>μαζί μας</em>',
            en: 'Let\'s <em>talk</em>',
        },
        'contact.lead': {
            el: 'Είμαστε εδώ για κάθε ερώτηση ή ανάγκη. Επικοινωνήστε μαζί μας σήμερα για δωρεάν αρχική ενημέρωση.',
            en: 'We\'re here for any question or need. Get in touch today for a free initial consultation.',
        },
        'contact.role': { el: 'Πολιτικός Μηχανικός ΑΠΘ', en: 'Civil Engineer AUTH' },

        /* FORM */
        'form.title':          { el: 'Στείλτε μήνυμα',        en: 'Send a Message' },
        'form.label.name':     { el: 'Ονοματεπώνυμο',         en: 'Full Name' },
        'form.ph.name':        { el: 'Το όνομά σας',           en: 'Your name' },
        'form.label.phone':    { el: 'Τηλέφωνο',              en: 'Phone' },
        'form.label.email':    { el: 'Email',                  en: 'Email' },
        'form.ph.email':       { el: 'email@example.gr',       en: 'email@example.com' },
        'form.label.subject':  { el: 'Αντικείμενο',           en: 'Subject' },
        'form.select.default': { el: 'Επιλέξτε υπηρεσία',     en: 'Select a service' },
        'form.opt.1':          { el: 'Τακτοποίηση αυθαιρέτων', en: 'Legalising unauthorised works' },
        'form.opt.2':          { el: 'Ηλεκτρονική Ταυτότητα ή βεβαίωση για μεταβίβαση', en: 'Building e-Identity or transfer certificate' },
        'form.opt.3':          { el: 'Οικοδομική άδεια ή έγκριση εργασιών', en: 'Building permit or minor-works approval' },
        'form.opt.4':          { el: 'Ενεργειακό Πιστοποιητικό (ΠΕΑ)', en: 'Energy Performance Certificate (EPC)' },
        'form.opt.5':          { el: 'Άλλο',                           en: 'Other' },
        'form.label.message':  { el: 'Μήνυμα',                en: 'Message' },
        'form.ph.message':     { el: 'Περιγράψτε σύντομα το αίτημά σας...', en: 'Briefly describe your request...' },
        'form.submit':         { el: 'Αποστολή Μηνύματος',    en: 'Send Message' },

        /* ΠΡΟΣΒΑΣΙΜΟΤΗΤΑ & ΟΡΓΑΝΑ ΜΕΤΡΗΣΗΣ */
        'skip':           { el: 'Μετάβαση στο περιεχόμενο', en: 'Skip to content' },
        'nav.name':       { el: 'Β. ΛΙΑΠΗΣ',              en: 'V. LIAPIS' },
        'person.name':    { el: 'Βάιος Λιάπης',           en: 'Vaios Liapis' },
        'contact.area':   { el: 'Αθήνα &amp; Όλη η Αττική', en: 'Athens &amp; all of Attica' },
        'meas.elev':      { el: 'ΥΨ',                     en: 'ALT' },
        'meas.auth':      { el: 'ΑΠΘ',                    en: 'AUTH' },
        'meas.hero':      { el: 'ΠΡΟΣΟΨΗ &mdash; 24.000 m',        en: 'FAÇADE &mdash; 24.000 m' },
        'meas.services':  { el: '12 ΥΠΗΡΕΣΙΕΣ &mdash; 480.00 m²',  en: '12 SERVICES &mdash; 480.00 m²' },
        'meas.projects':  { el: '6 ΕΡΓΑ &mdash; 1250.00 m²',       en: '6 PROJECTS &mdash; 1250.00 m²' },

        /* FOOTER */
        'footer.title': { el: 'Διπλωματούχος Πολιτικός Μηχανικός ΑΠΘ', en: 'Graduate Civil Engineer AUTH' },
        'footer.copy': {
            el: '&copy; 2026 Βάιος Λιάπης &mdash; Πολιτικός Μηχανικός Αθήνα',
            en: '&copy; 2026 Vaios Liapis &mdash; Civil Engineer Athens',
        },
        'footer.design': {
            el: 'Σχεδιασμός <span class="design-brand">Design Expertease</span>',
            en: 'Designed by <span class="design-brand">Design Expertease</span>',
        },
    };

    /* ─── STATE ──────────────────────────────────────────────────────────── */
    let currentLang = localStorage.getItem('lang') || 'el';

    /* ─── YEARS OF EXPERIENCE (dynamic) ─────────────────────────────────── */
    const EXP_START_YEAR = 2019;
    function fillYearsExp() {
        var years = new Date().getFullYear() - EXP_START_YEAR;
        document.querySelectorAll('.years-exp').forEach(function (el) {
            el.textContent = years;
        });
    }

    /* ─── APPLY TRANSLATIONS ─────────────────────────────────────────────── */
    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        /* text content */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] && t[key][lang] !== undefined) {
                el.textContent = t[key][lang];
            }
        });

        /* innerHTML (for keys with HTML tags) */
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (t[key] && t[key][lang] !== undefined) {
                el.innerHTML = t[key][lang];
            }
        });

        /* placeholder attribute */
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (t[key] && t[key][lang] !== undefined) {
                el.placeholder = t[key][lang];
            }
        });

        /* update <html lang> attribute */
        document.documentElement.lang = lang;

        /* update toggle button states */
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        /* re-fill dynamic years after innerHTML replacement */
        fillYearsExp();
    }

    /* ─── PUBLIC API ─────────────────────────────────────────────────────── */
    window.I18n = {
        setLang: applyLang,
        getLang: function () { return currentLang; },
        translations: t,
    };

    /* Global shorthand used by onclick="setLang('en')" buttons */
    window.setLang = applyLang;

    /* ─── INIT ───────────────────────────────────────────────────────────── */
    /* Apply on DOM ready — handles page reload with saved preference */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { applyLang(currentLang); });
    } else {
        applyLang(currentLang);
    }

})();
