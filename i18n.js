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
        'nav.svc.tak': { el: 'Τακτοποίηση αυθαιρέτων', en: 'Legalising unauthorised works' },
        'nav.svc.htk': { el: 'Ταυτότητα κτιρίου & βεβαίωση', en: 'Building e-Identity & certificate' },
        'nav.svc.oik': { el: 'Οικοδομική άδεια', en: 'Building permits' },
        'hero.tag': { el: 'Αθήνα · Αττική', en: 'Athens · Attica' },
        'hero.photoAlt': { el: 'Βάιος Λιάπης, πολιτικός μηχανικός', en: 'Vaios Liapis, civil engineer' },
        'hero.svcAria': { el: 'Κύριες υπηρεσίες', en: 'Main services' },
        'meta.pea.title': { el: 'Ενεργειακό Πιστοποιητικό (ΠΕΑ) στην Αττική | Β. Λιάπης', en: 'Energy Performance Certificate (EPC) in Attica | V. Liapis' },
        'meta.pea.desc': { el: 'ΠΕΑ για πώληση, ενοικίαση, νέα κτίρια και «Εξοικονομώ» στην Αττική: αυτοψία, υπολογισμός με το λογισμικό ΤΕΕ-ΚΕΝΑΚ και καταχώριση στο buildingcert.gr.', en: 'Energy Performance Certificates for sale, rental, new buildings and energy-upgrade grants in Attica: site visit, calculation with the TEE-KENAK software and registration on buildingcert.gr.' },
        'nav.svc.pea': { el: 'Ενεργειακό πιστοποιητικό (ΠΕΑ)', en: 'Energy certificate (EPC)' },
        'pg.pea.h1': { el: 'Ενεργειακό Πιστοποιητικό (ΠΕΑ)', en: 'Energy Performance Certificate (EPC)' },
        'pg.pea.lead': { el: 'Για πώληση ή ενοικίαση, για νέο κτίριο και για το «Εξοικονομώ». Επίσκεψη, υπολογισμός και καταχώριση, με τον αριθμό πρωτοκόλλου που ζητούν ο συμβολαιογράφος και η δήλωση μίσθωσης.', en: 'For a sale or a rental, for a new building and for energy-upgrade grants. Site visit, calculation and registration, with the protocol number the notary and the rental declaration ask for.' },
        'pg.pea.now.t': { el: 'Πότε χρειάζεται ΠΕΑ', en: 'When you need an EPC' },
        'pg.pea.now.p1': { el: 'Κατά τον ν.4122/2013 (άρθρο 12), ΠΕΑ χρειάζεται <strong>στην πώληση</strong> και <strong>στη μίσθωση σε νέο ενοικιαστή</strong>, καθώς και μετά την κατασκευή νέου κτιρίου ή μια ριζική ανακαίνιση. Ισχύει και για διαμερίσματα κάτω από 50 τ.μ.', en: 'Under Law 4122/2013 (Article 12), an EPC is required <strong>when selling</strong> and <strong>when renting to a new tenant</strong>, as well as after a new building is completed or a major renovation. It also applies to flats under 50 m².' },
        'pg.pea.now.p2': { el: 'Ο αριθμός πρωτοκόλλου του ΠΕΑ αναγράφεται στο συμβόλαιο αγοραπωλησίας και στη δήλωση μίσθωσης. Όταν το ακίνητο διαφημίζεται για πώληση ή ενοικίαση, η ενεργειακή κατηγορία πρέπει να φαίνεται στην αγγελία.', en: 'The EPC protocol number goes into the sale contract and the rental declaration. When the property is advertised for sale or rent, the energy class must appear in the listing.' },
        'pg.pea.now.p3': { el: 'Δεν χρειάζεται για αποθήκες, χώρους στάθμευσης, βιομηχανικά κτίρια και μεμονωμένα κτίρια κάτω από 50 τ.μ. Για ακίνητο που πουλιέται χρειάζεται επίσης η <a href="../ilektroniki-taftotita-ktiriou/">Ηλεκτρονική Ταυτότητα</a>, την οποία μπορούμε να ετοιμάσουμε μαζί.', en: 'It is not required for storage rooms, parking spaces, industrial buildings and standalone buildings under 50 m². A property being sold also needs the <a href="../ilektroniki-taftotita-ktiriou/">Building e-Identity</a>, which we can prepare at the same time.' },
        'pg.pea.step1': { el: 'Επίσκεψη στο ακίνητο: διαστάσεις, κουφώματα, μόνωση, θέρμανση, ψύξη και ζεστό νερό.', en: 'Site visit: dimensions, windows, insulation, heating, cooling and hot water.' },
        'pg.pea.step2': { el: 'Σκαρίφημα των χώρων, αν δεν υπάρχουν σχέδια.', en: 'A sketch of the spaces, if no drawings exist.' },
        'pg.pea.step3': { el: 'Υπολογισμός με το λογισμικό ΤΕΕ-ΚΕΝΑΚ και κατάταξη σε ενεργειακή κατηγορία.', en: 'Calculation with the TEE-KENAK software and classification into an energy class.' },
        'pg.pea.step4': { el: 'Καταχώριση στο buildingcert.gr και παράδοση του ΠΕΑ με αριθμό πρωτοκόλλου και αριθμό ασφαλείας.', en: 'Registration on buildingcert.gr and delivery of the EPC with its protocol and security numbers.' },
        'pg.pea.step5': { el: 'Αν θέλετε καλύτερη κατηγορία, σας λέμε ποιες παρεμβάσεις αξίζουν για το κόστος τους.', en: 'If you want a better class, we tell you which improvements are worth their cost.' },
        'pg.pea.need1': { el: 'Τα στοιχεία του ιδιοκτήτη και τη διεύθυνση του ακινήτου', en: 'The owner’s details and the property address' },
        'pg.pea.need2': { el: 'Την οικοδομική άδεια και τα σχέδια, αν υπάρχουν', en: 'The building permit and drawings, if available' },
        'pg.pea.need3': { el: 'Πρόσβαση σε όλους τους χώρους, στον λέβητα και στις κλιματιστικές μονάδες', en: 'Access to every room, the boiler and the air-conditioning units' },
        'pg.pea.need4': { el: 'Σε πολυκατοικία με κεντρική θέρμανση, τα στοιχεία του λέβητα από τον διαχειριστή', en: 'In a block with central heating, the boiler details from the building manager' },
        'pg.pea.needNote': { el: 'Αν δεν υπάρχουν σχέδια, σχεδιάζουμε εμείς σκαρίφημα στην επίσκεψη.', en: 'If there are no drawings, we draw a sketch during the visit.' },
        'pg.pea.q1': { el: 'Πόσο ισχύει το ΠΕΑ;', en: 'How long is an EPC valid?' },
        'pg.pea.a1': { el: 'Η ημερομηνία λήξης γράφεται στο ίδιο το πιστοποιητικό, στο πεδίο «Ισχύς έως». Αν αλλάξουν ουσιαστικά στοιχεία του ακινήτου, όπως κουφώματα ή σύστημα θέρμανσης, αξίζει να εκδοθεί νέο.', en: 'The expiry date is printed on the certificate itself, in the “Valid until” field. If key features change, such as windows or the heating system, it is worth issuing a new one.' },
        'pg.pea.q2': { el: 'Χρειάζεται ΠΕΑ για γκαρσονιέρα κάτω από 50 τ.μ.;', en: 'Do I need an EPC for a studio under 50 m²?' },
        'pg.pea.a2': { el: 'Ναι. Από 1/1/2016 το ΠΕΑ είναι υποχρεωτικό και για κτιριακές μονάδες κάτω από 50 τ.μ. (άρθρο 12 §7 ν.4122/2013). Εξαιρούνται μόνο τα μεμονωμένα κτίρια κάτω από 50 τ.μ.', en: 'Yes. Since 1/1/2016 an EPC is mandatory for building units under 50 m² as well (Article 12 §7, Law 4122/2013). Only standalone buildings under 50 m² are exempt.' },
        'pg.pea.q3': { el: 'Το διατηρητέο εξαιρείται;', en: 'Is a listed building exempt?' },
        'pg.pea.a3': { el: 'Όχι από το πιστοποιητικό. Τα διατηρητέα απαλλάσσονται από τις ελάχιστες απαιτήσεις ενεργειακής απόδοσης, αλλά για πώληση ή μίσθωση χρειάζονται ΠΕΑ.', en: 'Not from the certificate. Listed buildings are exempt from the minimum energy requirements, but a sale or rental still needs an EPC.' },
        'pg.pea.q4': { el: 'Τι είναι το Α΄ και το Β΄ ΠΕΑ στο «Εξοικονομώ»;', en: 'What are the first and second EPC in the “Exoikonomo” programme?' },
        'pg.pea.a4': { el: 'Το Α΄ ΠΕΑ καταγράφει την κατάσταση πριν από τις παρεμβάσεις και το Β΄ επιβεβαιώνει τη βελτίωση μετά. Προθεσμίες και ποσοστά αλλάζουν σε κάθε κύκλο του προγράμματος, γι’ αυτό τα ελέγχουμε στον οδηγό του τρέχοντος κύκλου.', en: 'The first EPC records the state before the works and the second confirms the improvement afterwards. Deadlines and subsidy rates change with every round, so we check them in the current programme guide.' },
        'pg.pea.q5': { el: 'Τι γίνεται αν πουλήσω ή νοικιάσω χωρίς ΠΕΑ;', en: 'What happens if I sell or rent without an EPC?' },
        'pg.pea.a5': { el: 'Ο νόμος προβλέπει πρόστιμο από 1.000 έως 10.000 ευρώ για όποιον όφειλε να εκδώσει ΠΕΑ (άρθρο 20 ν.4122/2013). Επιπλέον, ο αριθμός του ΠΕΑ πρέπει να αναγράφεται στο συμβόλαιο και στη δήλωση μίσθωσης.', en: 'The law provides for a fine of €1,000 to €10,000 on whoever was required to obtain the EPC (Article 20, Law 4122/2013). The EPC number must also appear in the contract and the rental declaration.' },
        'meta.home.title': { el: 'Βάιος Λιάπης · Πολιτικός Μηχανικός Αθήνα | Αυθαίρετα, ΗΤΚ', en: 'Vaios Liapis · Civil Engineer in Athens | Unauthorised works, Building e-Identity' },
        'meta.home.desc': { el: 'Πολιτικός μηχανικός ΑΠΘ στην Αττική: τακτοποίηση αυθαιρέτων, ηλεκτρονική ταυτότητα κτιρίου, βεβαιώσεις για μεταβιβάσεις και οικοδομικές άδειες.', en: 'Civil engineer (AUTh) in Attica: legalising unauthorised works, Building e-Identity, engineer’s certificates for property transfers and building permits.' },
        'meta.tak.title': { el: 'Τακτοποίηση Αυθαιρέτων στην Αττική · ν.4495/2017 | Β. Λιάπης', en: 'Legalising Unauthorised Works in Attica · Law 4495/2017 | V. Liapis' },
        'meta.tak.desc': { el: 'Τακτοποίηση αυθαιρέτων κατηγοριών 1-4 κατά τον ν.4495/2017, με υπαγωγή έως 31/3/2028. Αυτοψία, πρόστιμο από την αρχή και φάκελος μέχρι την περαίωση.', en: 'Legalising category 1-4 unauthorised works under Law 4495/2017, with applications open until 31/3/2028. Site survey, the fine known upfront, and the file taken through to completion.' },
        'meta.htk.title': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου & Βεβαίωση Μηχανικού | Λιάπης', en: 'Building e-Identity & Engineer’s Certificate | Liapis' },
        'meta.htk.desc': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου (άρθρα 52-56 ν.4495/2017) και βεβαίωση μηχανικού για μεταβίβαση (άρθρο 83) στην Αττική: αυτοψία, έλεγχος και πιστοποιητικό.', en: 'Building e-Identity (articles 52-56, Law 4495/2017) and the engineer’s certificate for property transfers (article 83) in Attica: survey, checks and certificate.' },
        'meta.oik.title': { el: 'Οικοδομική Άδεια & Έγκριση Εργασιών Μικρής Κλίμακας | Λιάπης', en: 'Building Permit & Minor-Works Approval | Liapis' },
        'meta.oik.desc': { el: 'Άδειες δόμησης και εγκρίσεις εργασιών μικρής κλίμακας μέσω e-Άδειες στην Αττική: έλεγχος αρτιότητας, μελέτες, υποβολή, παρακολούθηση ως την έκδοση και επίβλεψη.', en: 'Building permits and minor-works approvals through e-Adeies in Attica: plot checks, studies, submission, follow-up until issue, and site supervision.' },
        'img.logo': { el: 'Λογότυπο Β. Λιάπη', en: 'V. Liapis logo' },
        'pg.crumbAria': { el: 'Διαδρομή', en: 'Breadcrumb' },
        'social.phone': { el: 'Τηλέφωνο', en: 'Phone' },

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
            el: 'Εμπειρία &amp; <em>Εξειδίκευση</em>',
            en: 'Experience &amp; <em>Expertise</em>',
        },
        'about.lead': {
            el: 'Διπλωματούχος Πολιτικός Μηχανικός του Αριστοτέλειου Πανεπιστημίου Θεσσαλονίκης, με <span class="years-exp"></span>+ χρόνια εμπειρία στην αντιμετώπιση πολεοδομικών, κτηματολογικών και κατασκευαστικών θεμάτων για ιδιώτες και επαγγελματίες σε όλη την Αττική.',
            en: 'Licensed Civil Engineer from the Aristotle University of Thessaloniki, with <span class="years-exp"></span>+ years of experience in urban planning, cadastral, and construction matters for individuals and professionals throughout Attica.',
        },
        'about.dim': { el: 'Αθήνα — Αττική', en: 'Athens — Attica' },
        'about.eyebrow': { el: 'Ο μηχανικός', en: 'The engineer' },
        'about.drawCap': { el: 'Τομή · Φέρων οργανισμός από οπλισμένο σκυρόδεμα', en: 'Section · Reinforced-concrete structural frame' },
        'news.eyebrow': { el: 'Νέα του κλάδου', en: 'Industry news' },
        'news.heading': { el: 'Τι <em>αλλάζει</em> στη νομοθεσία', en: 'What is <em>changing</em> in the law' },

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
        'contact.area':   { el: 'Αθήνα & Όλη η Αττική', en: 'Athens & all of Attica' },
        'meas.elev':      { el: 'ΥΨ',                     en: 'ALT' },
        'meas.auth':      { el: 'ΑΠΘ',                    en: 'AUTH' },
        'meas.hero':      { el: 'ΠΡΟΣΟΨΗ &mdash; 24.000 m',        en: 'FAÇADE &mdash; 24.000 m' },
        'meas.services':  { el: '12 ΥΠΗΡΕΣΙΕΣ &mdash; 480.00 m²',  en: '12 SERVICES &mdash; 480.00 m²' },
        'meas.projects':  { el: '6 ΕΡΓΑ &mdash; 1250.00 m²',       en: '6 PROJECTS &mdash; 1250.00 m²' },

        /* ΣΕΛΙΔΕΣ ΥΠΗΡΕΣΙΩΝ (anavathmisi #9) */
        'pg.crumb.home': { el: 'Αρχική', en: 'Home' },
        'pg.crumb.services': { el: 'Υπηρεσίες', en: 'Services' },
        'pg.call': { el: 'Κλήση · 694 867 5267', en: 'Call · +30 694 867 5267' },
        'pg.msg': { el: 'Στείλτε μήνυμα', en: 'Send a message' },
        'pg.steps': { el: 'Πώς δουλεύουμε', en: 'How we work' },
        'pg.need': { el: 'Τι χρειάζεται από εσάς', en: 'What we need from you' },
        'pg.faq': { el: 'Συχνές ερωτήσεις', en: 'Frequently asked questions' },
        'pg.cta': { el: 'Πείτε μας για το ακίνητό σας — η πρώτη ενημέρωση είναι δωρεάν.', en: 'Tell us about your property — the first consultation is free.' },
        'pg.related': { el: 'Σχετικές υπηρεσίες', en: 'Related services' },
        'pg.more': { el: 'Περισσότερα', en: 'More' },
        'pg.need.missing': { el: 'Αν κάτι λείπει, το αναζητούμε εμείς στην πολεοδομία.', en: 'If something is missing, we request it from the planning office.' },
        'pg.tak.h1': { el: 'Τακτοποίηση αυθαιρέτων', en: 'Legalising unauthorised works' },
        'pg.tak.lead': { el: 'Κλειστός ημιυπαίθριος, πατάρι, υπέρβαση δόμησης ή αλλαγή χρήσης. Πριν ξεκινήσει οτιδήποτε, μαθαίνετε αν τακτοποιείται και πόσο θα κοστίσει.', en: 'An enclosed semi-open space, a mezzanine, extra floor area or a change of use. Before anything starts, you learn whether it can be legalised and what it will cost.' },
        'pg.tak.now.t': { el: 'Τι ισχύει σήμερα', en: 'Where things stand today' },
        'pg.tak.now.p2': { el: 'Η τακτοποίηση αφορά αυθαιρεσίες που είχαν ολοκληρωθεί έως τον Ιούλιο του 2011. Οι μεγάλες παραβάσεις της κατηγορίας 5 εξετάζονται ξεχωριστά, μετά τις αποφάσεις του Συμβουλίου της Επικρατείας.', en: 'Legalisation covers works completed by July 2011. Major violations in category 5 are examined separately, following the rulings of the Council of State.' },
        'pg.tak.now.p1_h': { el: 'Με τον ν.4495/2017, όπως ισχύει, αυθαίρετα των κατηγοριών 1 έως 4 μπορούν να υπαχθούν σε τακτοποίηση με πρόστιμο έως τις <strong>31 Μαρτίου 2028</strong>. Την παράταση έδωσε ο ν.5270/2026 (άρθρο 43).', en: 'Under Law 4495/2017, as in force, unauthorised works in categories 1 to 4 can be legalised against a fine until <strong>31 March 2028</strong>. The extension was granted by Law 5270/2026 (Article 43).' },
        'pg.tak.now.p3_h': { el: 'Μετά την τακτοποίηση ακολουθεί συνήθως η <a href="../ilektroniki-taftotita-ktiriou/">Ηλεκτρονική Ταυτότητα του ακινήτου</a>, την οποία συντάσσουμε στην ίδια υπόθεση.', en: 'Legalisation is usually followed by the <a href="../ilektroniki-taftotita-ktiriou/">Building e-Identity</a>, which we prepare as part of the same case.' },
        'pg.tak.step1': { el: 'Αυτοψία και αποτύπωση του ακινήτου.', en: 'On-site inspection and survey of the property.' },
        'pg.tak.step2': { el: 'Σύγκριση με την οικοδομική άδεια και τα εγκεκριμένα σχέδια.', en: 'Comparison with the building permit and the approved plans.' },
        'pg.tak.step3': { el: 'Κατάταξη κάθε αυθαιρεσίας σε κατηγορία και υπολογισμός του προστίμου, πριν αποφασίσετε.', en: 'Each violation is classified and the fine is calculated, before you decide.' },
        'pg.tak.step4': { el: 'Σύνταξη του φακέλου και υποβολή της δήλωσης στο σύστημα του ΤΕΕ.', en: 'The file is prepared and the declaration is filed on the Technical Chamber system.' },
        'pg.tak.step5': { el: 'Παρακολούθηση ως την περαίωση.', en: 'Follow-up until the case is closed.' },
        'pg.tak.need1': { el: 'Τον τίτλο ιδιοκτησίας (συμβόλαιο)', en: 'The title deed' },
        'pg.tak.need2': { el: 'Την οικοδομική άδεια και τα σχέδιά της, αν τα έχετε', en: 'The building permit and its plans, if you have them' },
        'pg.tak.need3': { el: 'Προηγούμενες δηλώσεις αυθαιρέτων, αν έχουν γίνει', en: 'Any earlier declarations of unauthorised works' },
        'pg.tak.need4': { el: 'Τον ΚΑΕΚ ή το απόσπασμα του Κτηματολογίου', en: 'The Land Registry number (KAEK) or extract' },
        'pg.tak.q1': { el: 'Μέχρι πότε μπορώ να τακτοποιήσω αυθαίρετο;', en: 'How long do I have to legalise unauthorised works?' },
        'pg.tak.a1': { el: 'Για τις κατηγορίες 1 έως 4 η προθεσμία υπαγωγής είναι σήμερα η 31η Μαρτίου 2028 (ν.5270/2026, άρθρο 43). Οι προθεσμίες έχουν αλλάξει πολλές φορές, γι’ αυτό τις επιβεβαιώνουμε σε κάθε υπόθεση.', en: 'For categories 1 to 4 the deadline is currently 31 March 2028 (Law 5270/2026, Article 43). Deadlines have changed many times, so we confirm them for every case.' },
        'pg.tak.q2': { el: 'Πόσο θα πληρώσω πρόστιμο;', en: 'How much will the fine be?' },
        'pg.tak.a2': { el: 'Εξαρτάται από την κατηγορία, το εμβαδόν, την τιμή ζώνης και τη χρήση. Γι’ αυτό το υπολογίζουμε στην αρχή, μετά την αυτοψία, και όχι στο τέλος.', en: 'It depends on the category, the area, the zone value and the use. That is why we calculate it at the start, after the inspection, and not at the end.' },
        'pg.tak.q3': { el: 'Μπορώ να πουλήσω ακίνητο που έχει αυθαίρετο;', en: 'Can I sell a property with unauthorised works?' },
        'pg.tak.a3': { el: 'Για τη μεταβίβαση ο συμβολαιογράφος ζητά βεβαίωση μηχανικού (άρθρο 83 ν.4495/2017) ότι δεν υπάρχουν αυθαιρεσίες ή ότι έχουν τακτοποιηθεί. Αν υπάρχει αυθαιρεσία, τακτοποιείται πρώτα και μετά υπογράφεται το συμβόλαιο.', en: 'For the transfer the notary requires an engineer’s certificate (Article 83, Law 4495/2017) that there are no unauthorised works, or that they have been legalised. If there are, they are legalised first and the contract is signed afterwards.' },
        'pg.tak.q4': { el: 'Τακτοποιείται κάτι που χτίστηκε μετά το 2011;', en: 'Can something built after 2011 be legalised?' },
        'pg.tak.a4': { el: 'Όχι με τον ν.4495/2017. Για νεότερες κατασκευές μπορεί να εξεταστεί έκδοση άδειας, αν η κατασκευή συμφωνεί με τους σημερινούς όρους δόμησης· αλλιώς η λύση είναι η αποκατάσταση.', en: 'Not under Law 4495/2017. For newer works a permit may be possible if the construction meets today’s building terms; otherwise the answer is to restore the original state.' },
        'pg.htk.h1': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου και βεβαίωση μηχανικού', en: 'Building e-Identity and engineer’s certificate' },
        'pg.htk.lead': { el: 'Πριν από αγοραπωλησία, γονική παροχή ή δωρεά, ο συμβολαιογράφος ζητά στοιχεία από μηχανικό. Σας λέμε τι χρειάζεται η δική σας περίπτωση και το ετοιμάζουμε.', en: 'Before a sale, a parental gift or a donation, the notary needs documents from an engineer. We tell you what your case requires and prepare it.' },
        'pg.htk.now.t': { el: 'Τι είναι η Ηλεκτρονική Ταυτότητα', en: 'What the Building e-Identity is' },
        'pg.htk.now.p2': { el: 'Ζητείται σε μεταβιβάσεις, σε οικοδομικές άδειες για ανακαίνιση ή προσθήκη, σε προγράμματα όπως το «Εξοικονομώ», σε άδειες λειτουργίας και σε δάνεια. Για διαμέρισμα συντάσσεται ταυτότητα της διηρημένης ιδιοκτησίας.', en: 'It is required for property transfers, for permits for renovation or extensions, for programmes such as «Exoikonomo», for operating licences and for loans. For a flat, an e-Identity of the individual unit is prepared.' },
        'pg.htk.now.p1_h': { el: 'Είναι ο ηλεκτρονικός φάκελος του ακινήτου στην πλατφόρμα του ΤΕΕ (άρθρα 52-56 ν.4495/2017). Περιέχει, όπου υπάρχουν, την οικοδομική άδεια με τα σχέδιά της, τις <a href="../taktopoiisi-afthaireton/">τακτοποιήσεις αυθαιρέτων</a>, το Πιστοποιητικό Ενεργειακής Απόδοσης, κατόψεις της πραγματικής κατάστασης και το πιστοποιητικό πληρότητας.', en: 'It is the property’s electronic file on the Technical Chamber platform (Articles 52-56, Law 4495/2017). Where they exist, it holds the building permit and its plans, <a href="../taktopoiisi-afthaireton/">legalised works</a>, the Energy Performance Certificate, floor plans of the actual state and the completeness certificate.' },
        'pg.htk.now.p3_h': { el: 'Ξεχωριστά, το άρθρο 83 του ν.4495/2017 ζητά για κάθε δικαιοπραξία σε ακίνητο <strong>βεβαίωση μηχανικού</strong> ότι δεν υπάρχουν αυθαιρεσίες ή ότι όσες υπάρχουν έχουν τακτοποιηθεί.', en: 'Separately, Article 83 of Law 4495/2017 requires, for every legal transaction on a property, an <strong>engineer’s certificate</strong> that there are no unauthorised works, or that any have been legalised.' },
        'pg.htk.step1': { el: 'Συγκεντρώνουμε άδεια, σχέδια και τακτοποιήσεις — από την πολεοδομία, αν δεν τα έχετε.', en: 'We gather the permit, plans and legalisations — from the planning office if you do not have them.' },
        'pg.htk.step2': { el: 'Αυτοψία και αποτύπωση.', en: 'On-site inspection and survey.' },
        'pg.htk.step3': { el: 'Σύγκριση με τα εγκεκριμένα σχέδια. Αν βρεθεί διαφορά, σας λέμε πριν το συμβόλαιο πώς διορθώνεται.', en: 'Comparison with the approved plans. If there is a difference, we tell you how to fix it before the contract.' },
        'pg.htk.step4': { el: 'Καταχώριση στην πλατφόρμα του ΤΕΕ, πιστοποιητικό πληρότητας και βεβαίωση.', en: 'Entry on the Technical Chamber platform, completeness certificate and engineer’s certificate.' },
        'pg.htk.need1': { el: 'Τον τίτλο ιδιοκτησίας', en: 'The title deed' },
        'pg.htk.need2': { el: 'Τον ΚΑΕΚ του ακινήτου', en: 'The property’s Land Registry number (KAEK)' },
        'pg.htk.need3': { el: 'Την οικοδομική άδεια, αν υπάρχει', en: 'The building permit, if there is one' },
        'pg.htk.need4': { el: 'Το ΠΕΑ και προηγούμενες δηλώσεις αυθαιρέτων, αν υπάρχουν', en: 'The Energy Performance Certificate and any earlier declarations of unauthorised works' },
        'pg.htk.q1': { el: 'Χρειάζομαι ταυτότητα κτιρίου ή μόνο βεβαίωση μηχανικού;', en: 'Do I need a Building e-Identity or just an engineer’s certificate?' },
        'pg.htk.a1': { el: 'Αυτό κρίνεται από το ακίνητο και την πράξη. Το ξεκαθαρίζουμε από τα στοιχεία του ακινήτου, πριν ξεκινήσει η δουλειά.', en: 'It depends on the property and the transaction. We clarify it from the property’s documents before any work starts.' },
        'pg.htk.q2': { el: 'Τι γίνεται αν βρεθεί αυθαιρεσία;', en: 'What happens if unauthorised works are found?' },
        'pg.htk.a2': { el: 'Αν η διαφορά τακτοποιείται, γίνεται πρώτα η τακτοποίηση και μετά η βεβαίωση. Γι’ αυτό ο έλεγχος καλό είναι να γίνεται πριν κλειστεί ημερομηνία συμβολαίου.', en: 'If the difference can be legalised, it is legalised first and the certificate follows. That is why the check is best done before a contract date is fixed.' },
        'pg.htk.q3': { el: 'Γίνεται ταυτότητα και για διαμέρισμα;', en: 'Is there an e-Identity for a flat too?' },
        'pg.htk.a3': { el: 'Ναι. Για αυτοτελή διηρημένη ιδιοκτησία συντάσσεται ξεχωριστή ταυτότητα, με τα στοιχεία του διαμερίσματος και της άδειας της πολυκατοικίας.', en: 'Yes. An individual unit gets its own e-Identity, with the details of the flat and of the building’s permit.' },
        'pg.oik.h1': { el: 'Οικοδομική άδεια και έγκριση εργασιών', en: 'Building permits and minor-works approvals' },
        'pg.oik.lead': { el: 'Για νέα κατασκευή, προσθήκη ή ορισμένες εργασίες σε υπάρχον κτίριο χρειάζεται άδεια ή έγκριση. Ξεκινάμε από το αν επιτρέπεται και τι ακριβώς χρειάζεται.', en: 'A new building, an extension or certain works on an existing building need a permit or an approval. We start with whether it is allowed and what exactly it takes.' },
        'pg.oik.now.t': { el: 'Άδεια δόμησης ή έγκριση εργασιών;', en: 'Building permit or minor-works approval?' },
        'pg.oik.now.p2': { el: 'Και τα δύο εκδίδονται μόνο ηλεκτρονικά, στο σύστημα e-Άδειες, από μηχανικό. Υπάρχουν και εργασίες που δεν χρειάζονται τίποτα από τα δύο· σας λέμε από την αρχή σε ποια περίπτωση είστε.', en: 'Both are issued only online, on the e-Adeies system, by an engineer. Some works need neither; we tell you from the start which case you are in.' },
        'pg.oik.now.p1_h': { el: 'Νέα οικοδομή και προσθήκη θέλουν <strong>άδεια δόμησης</strong>. Μικρότερες εργασίες, όπως σε αρκετές περιπτώσεις περιφράξεις ή αλλαγές στις όψεις, γίνονται με <strong>Έγκριση Εργασιών Δόμησης Μικρής Κλίμακας</strong> (άρθρο 29 ν.4495/2017).', en: 'A new building or an extension needs a <strong>building permit</strong>. Smaller works — in many cases fences or changes to the façades — are done with a <strong>minor-works approval</strong> (Article 29, Law 4495/2017).' },
        'pg.oik.now.p3_h': { el: 'Για υπάρχον κτίριο, πριν από την άδεια χρειάζεται συνήθως η <a href="../ilektroniki-taftotita-ktiriou/">Ηλεκτρονική Ταυτότητα</a>.', en: 'For an existing building, the <a href="../ilektroniki-taftotita-ktiriou/">Building e-Identity</a> is usually needed before the permit.' },
        'pg.oik.step1': { el: 'Έλεγχος αρτιότητας, όρων δόμησης και επιτρεπόμενων χρήσεων.', en: 'Check of plot eligibility, building terms and permitted uses.' },
        'pg.oik.step2': { el: 'Τοπογραφικό και οι μελέτες που απαιτεί η εργασία.', en: 'Topographic plan and the studies the work requires.' },
        'pg.oik.step3': { el: 'Υποβολή στο e-Άδειες και απαντήσεις στην πολεοδομία μέχρι την έκδοση.', en: 'Filing on e-Adeies and replies to the planning office until the permit is issued.' },
        'pg.oik.step4': { el: 'Επίβλεψη της κατασκευής, αν μας την αναθέσετε.', en: 'Supervision of the construction, if you entrust it to us.' },
        'pg.oik.need1': { el: 'Τον τίτλο ιδιοκτησίας', en: 'The title deed' },
        'pg.oik.need2': { el: 'Τον ΚΑΕΚ ή το απόσπασμα του Κτηματολογίου', en: 'The Land Registry number (KAEK) or extract' },
        'pg.oik.need3': { el: 'Για υπάρχον κτίριο: τις προηγούμενες άδειες και δηλώσεις', en: 'For an existing building: earlier permits and declarations' },
        'pg.oik.need4': { el: 'Μια περιγραφή ή σκίτσο αυτού που θέλετε να γίνει', en: 'A description or sketch of what you want built' },
        'pg.oik.q1': { el: 'Μπορώ να ξεκινήσω εργασίες πριν βγει η άδεια;', en: 'Can I start work before the permit is issued?' },
        'pg.oik.a1': { el: 'Όχι. Εργασίες χωρίς την άδεια ή την έγκριση που απαιτείται είναι αυθαίρετες, και ό,τι χτίστηκε μετά το 2011 δεν τακτοποιείται με πρόστιμο.', en: 'No. Work without the permit or approval it requires counts as unauthorised, and anything built after 2011 cannot be legalised against a fine.' },
        'pg.oik.q2': { el: 'Θέλει άδεια η ανακαίνιση ενός διαμερίσματος;', en: 'Does renovating a flat need a permit?' },
        'pg.oik.a2': { el: 'Ανάλογα με τις εργασίες. Εσωτερικές εργασίες χωρίς επέμβαση στον φέροντα οργανισμό ή στις όψεις συνήθως δεν θέλουν· αλλαγή χρήσης, όψεων ή φέροντα θέλει. Το ξεκαθαρίζουμε με μία επίσκεψη.', en: 'It depends on the works. Interior work that does not touch the structure or the façades usually does not; changes of use, façades or structure do. One visit settles it.' },
        'pg.oik.q3': { el: 'Χρειάζεται επιβλέπων μηχανικός;', en: 'Is a supervising engineer needed?' },
        'pg.oik.a3': { el: 'Ναι, η άδεια προβλέπει επιβλέποντα. Αν μας αναθέσετε και την επίβλεψη, όποιος έκανε τη μελέτη ελέγχει και την κατασκευή.', en: 'Yes, the permit requires one. If you also give us the supervision, whoever did the study also checks the construction.' },

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

    /* Κείμενο (όχι HTML): οι οντότητες γράφονται ως χαρακτήρες, αλλιώς βγαίνει «&amp;» στην οθόνη */
    function decodeEnt(s) {
        return String(s).replace(/&amp;/g, '&').replace(/&mdash;/g, '\u2014').replace(/&ndash;/g, '\u2013')
            .replace(/&nbsp;/g, '\u00a0').replace(/&middot;/g, '\u00b7').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    }

    /* ─── APPLY TRANSLATIONS ─────────────────────────────────────────────── */
    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);

        /* text content */
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] && t[key][lang] !== undefined) {
                el.textContent = decodeEnt(t[key][lang]);
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

        /* alt και aria-label */
        [['data-i18n-alt', 'alt'], ['data-i18n-aria', 'aria-label'], ['data-i18n-title', 'title'], ['data-i18n-content', 'content']].forEach(function (pair) {
            document.querySelectorAll('[' + pair[0] + ']').forEach(function (el) {
                var key = el.getAttribute(pair[0]);
                if (t[key] && t[key][lang] !== undefined) el.setAttribute(pair[1], t[key][lang]);
            });
        });

        /* update <html lang> attribute */
        document.documentElement.lang = lang;

        /* update toggle button states */
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        /* re-fill dynamic years after innerHTML replacement */
        fillYearsExp();

        document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
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
