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
        'nav.svc.htk': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου', en: 'Building e-Identity' },
        'nav.svc.oik': { el: 'Οικοδομική άδεια', en: 'Building permits' },
        'hero.tag': { el: 'Αθήνα · Αττική', en: 'Athens · Attica' },
        'hero.photoAlt': { el: 'Βάιος Λιάπης, πολιτικός μηχανικός', en: 'Vaios Liapis, civil engineer' },
        'hero.svcAria': { el: 'Κύριες υπηρεσίες', en: 'Main services' },
        'meta.hub.title': { el: 'Υπηρεσίες Πολιτικού Μηχανικού σε Αθήνα, Αττική, Λάρισα | Λιάπης', en: 'Civil Engineering Services in Athens, Attica and Larissa | V. Liapis' },
        'meta.hub.desc': { el: 'Όλες οι υπηρεσίες: τακτοποίηση αυθαιρέτων, Ηλεκτρονική Ταυτότητα, οικοδομικές άδειες, ΠΕΑ, τοπογραφικά, Κτηματολόγιο, άδειες λειτουργίας, ανακαινίσεις και επίβλεψη, σε Αθήνα, Αττική και Λάρισα.', en: 'All services: legalising unauthorised works, Building e-Identity, building permits, energy certificates, surveys, Land Registry, business premises, renovation and supervision, in Athens, Attica and Larissa.' },
        'pg.hub.h1': { el: 'Όλες οι υπηρεσίες', en: 'All services' },
        'pg.hub.h1a': { el: 'Υπηρεσίες πολιτικού μηχανικού', en: 'Civil engineering services' },
        'pg.hub.lead': { el: 'Ένας μηχανικός για όλη την υπόθεση του ακινήτου σας, από τον πρώτο έλεγχο ως το συμβόλαιο ή την παράδοση του έργου. Διαλέξτε την υπηρεσία για να δείτε πώς δουλεύουμε και τι χρειάζεται.', en: 'One engineer for your whole property case, from the first check to the contract or the finished works. Choose a service to see how we work and what is needed.' },
        'nav.svc.all': { el: 'Όλες οι υπηρεσίες →', en: 'All services →' },
        'meta.epiv.title': { el: 'Επίβλεψη Οικοδομής και Κατασκευών Αθήνα & Αττική | Β. Λιάπης', en: 'Construction Supervision in Athens & Attica | V. Liapis' },
        'meta.epiv.desc': { el: 'Επιβλέπων μηχανικός για νέες οικοδομές, προσθήκες και ανακαινίσεις στην Αθήνα και την Αττική: έλεγχος σε κάθε κρίσιμη φάση, από την εκσκαφή ως την παραλαβή.', en: 'Supervising engineer for new buildings, extensions and renovations in Athens and Attica: checks at every critical stage, from excavation to handover.' },
        'nav.svc.epiv': { el: 'Επίβλεψη κατασκευών', en: 'Construction supervision' },
        'pg.epiv.h1': { el: 'Επίβλεψη κατασκευών', en: 'Construction supervision' },
        'pg.epiv.h1a': { el: 'Επίβλεψη κατασκευών στην Αθήνα και την Αττική', en: 'Construction supervision in Athens and Attica' },
        'pg.epiv.lead': { el: 'Η οικοδομική άδεια προβλέπει επιβλέποντα μηχανικό. Είμαστε στο εργοτάξιο στις φάσεις που δεν διορθώνονται μετά: θεμελίωση, οπλισμοί, σκυροδέτηση.', en: 'A building permit requires a supervising engineer. We are on site at the stages that cannot be fixed later: foundations, reinforcement, concrete pours.' },
        'pg.epiv.now.t': { el: 'Τι κάνει ο επιβλέπων', en: 'What the supervising engineer does' },
        'pg.epiv.now.p1': { el: 'Ο επιβλέπων ελέγχει ότι η κατασκευή γίνεται <strong>σύμφωνα με την άδεια και τις μελέτες</strong>. Σε φέρουσα κατασκευή από οπλισμένο σκυρόδεμα, ο έλεγχος του οπλισμού πριν από κάθε σκυροδέτηση είναι το πιο κρίσιμο σημείο.', en: 'The supervising engineer checks that construction follows <strong>the permit and the studies</strong>. In a reinforced-concrete frame, checking the reinforcement before each pour is the most critical point.' },
        'pg.epiv.now.p2': { el: 'Για τον ιδιοκτήτη, ο επιβλέπων είναι και ο τεχνικός του σύμβουλος απέναντι στον εργολάβο: ελέγχει ποιότητα υλικών, επιμετρήσεις και λογαριασμούς πριν πληρωθούν.', en: 'For the owner, the supervisor is also their technical adviser towards the contractor: checking material quality, measurements and bills before they are paid.' },
        'pg.epiv.now.p3': { el: 'Αν η άδεια έχει ήδη εκδοθεί με άλλον επιβλέποντα, η αλλαγή γίνεται μέσω του e-Άδειες. Για τις εργασίες που δεν θέλουν άδεια, δείτε τις <a href="../anakainiseis-monoseis/">ανακαινίσεις</a>.', en: 'If the permit was issued with another supervisor, the change is made through e-Adeies. For works that need no permit, see <a href="../anakainiseis-monoseis/">renovations</a>.' },
        'pg.epiv.step1': { el: 'Μελέτη της άδειας και των σχεδίων πριν την έναρξη.', en: 'Review of the permit and drawings before work starts.' },
        'pg.epiv.step2': { el: 'Χαράξεις και εκσκαφή.', en: 'Setting-out and excavation.' },
        'pg.epiv.step3': { el: 'Έλεγχος οπλισμού και καλουπιών πριν από κάθε σκυροδέτηση.', en: 'Checking reinforcement and formwork before every concrete pour.' },
        'pg.epiv.step4': { el: 'Επισκέψεις στις φάσεις τοιχοποιίας, μονώσεων, δικτύων και τελειωμάτων.', en: 'Visits at the masonry, insulation, services and finishing stages.' },
        'pg.epiv.step5': { el: 'Παραλαβή των εργασιών και έλεγχος λογαριασμών του εργολάβου.', en: 'Acceptance of the works and review of the contractor’s bills.' },
        'pg.epiv.need1': { el: 'Την οικοδομική άδεια ή την έγκριση εργασιών', en: 'The building permit or works approval' },
        'pg.epiv.need2': { el: 'Τις μελέτες (αρχιτεκτονική, στατική, Η/Μ)', en: 'The studies (architectural, structural, M&E)' },
        'pg.epiv.need3': { el: 'Το συμφωνητικό με τον εργολάβο, αν έχει υπογραφεί', en: 'The contract with the builder, if signed' },
        'pg.epiv.need4': { el: 'Το χρονοδιάγραμμα των εργασιών', en: 'The works schedule' },
        'pg.epiv.needNote': { el: 'Αν οι μελέτες είναι δικές μας, όποιος μελέτησε επιβλέπει και την κατασκευή.', en: 'If we prepared the studies, whoever designed it also supervises the build.' },
        'pg.epiv.q1': { el: 'Μπορεί ο εργολάβος να είναι και επιβλέπων;', en: 'Can the builder also be the supervisor?' },
        'pg.epiv.a1': { el: 'Ο επιβλέπων ελέγχει την κατασκευή για λογαριασμό του ιδιοκτήτη. Όταν τον ορίζει ο ίδιος ο εργολάβος, χάνεται η ανεξαρτησία του ελέγχου· γι’ αυτό προτείνουμε ανεξάρτητο μηχανικό.', en: 'The supervisor checks construction on the owner’s behalf. When the builder appoints them, that independence is lost, which is why we recommend an independent engineer.' },
        'pg.epiv.q2': { el: 'Πόσο συχνά έρχεστε στο εργοτάξιο;', en: 'How often do you visit the site?' },
        'pg.epiv.a2': { el: 'Σε κάθε κρίσιμη φάση, και οπωσδήποτε πριν από κάθε σκυροδέτηση. Ο αριθμός των επισκέψεων συμφωνείται από την αρχή, ανάλογα με το έργο.', en: 'At every critical stage, and always before each concrete pour. The number of visits is agreed at the start, depending on the project.' },
        'pg.epiv.q3': { el: 'Αναλαμβάνετε επίβλεψη σε ανακαίνιση χωρίς άδεια;', en: 'Do you supervise renovations that need no permit?' },
        'pg.epiv.a3': { el: 'Ναι. Και όταν αρκεί ηλεκτρονική ενημέρωση, η επίβλεψη προστατεύει από κακοτεχνίες και διαφορές με τα συνεργεία.', en: 'Yes. Even when a simple notification is enough, supervision protects you from poor workmanship and disputes with crews.' },
        'meta.anak.title': { el: 'Ανακαίνιση και Μονώσεις με Μηχανικό στην Αθήνα | Β. Λιάπης', en: 'Home Renovation and Insulation with an Engineer in Athens | V. Liapis' },
        'meta.anak.desc': { el: 'Ανακαίνιση διαμερίσματος, μπάνιου και κουζίνας, θερμομόνωση και στεγάνωση στην Αθήνα και την Αττική, με την ενημέρωση ή έγκριση που απαιτεί ο νόμος και επίβλεψη των συνεργείων.', en: 'Flat, bathroom and kitchen renovation, insulation and waterproofing in Athens and Attica, with the notification or approval the law requires and supervision of the crews.' },
        'nav.svc.anak': { el: 'Ανακαινίσεις και μονώσεις', en: 'Renovation and insulation' },
        'pg.anak.h1': { el: 'Ανακαινίσεις, επισκευές και μονώσεις', en: 'Renovation, repairs and insulation' },
        'pg.anak.h1a': { el: 'Ανακαινίσεις, επισκευές και μονώσεις στην Αθήνα', en: 'Renovation, repairs and insulation in Athens' },
        'pg.anak.lead': { el: 'Μπάνιο, κουζίνα, δάπεδα, κουφώματα, θερμομόνωση ή στεγάνωση δώματος. Ξεκαθαρίζουμε από την αρχή τι απαιτεί ο νόμος, και επιβλέπουμε τα συνεργεία ως την παράδοση.', en: 'A bathroom, a kitchen, floors, windows, insulation or roof waterproofing. We clarify from the start what the law requires, and supervise the crews until handover.' },
        'pg.anak.now.t': { el: 'Θέλει άδεια η ανακαίνιση;', en: 'Does a renovation need a permit?' },
        'pg.anak.now.p1': { el: 'Οι περισσότερες ανακαινίσεις <strong>δεν θέλουν οικοδομική άδεια</strong>. Για εργασίες όπως βαφές, αλλαγή κουφωμάτων, δαπέδων, μπάνιου ή κουζίνας και εσωτερικές διαρρυθμίσεις που δεν αγγίζουν τον φέροντα οργανισμό, ο μηχανικός υποβάλλει ηλεκτρονική ενημέρωση στο e-Άδειες πριν ξεκινήσουν οι εργασίες (άρθρο 30 ν.4495/2017).', en: 'Most renovations <strong>do not need a building permit</strong>. For works such as painting, new windows, floors, bathroom or kitchen, and interior changes that do not touch the load-bearing structure, the engineer files an online notification on e-Adeies before work starts (Article 30, Law 4495/2017).' },
        'pg.anak.now.p2': { el: 'Όταν οι εργασίες αγγίζουν όψεις, φέροντα οργανισμό ή χρήση, χρειάζεται έγκριση εργασιών μικρής κλίμακας ή <a href="../oikodomiki-adeia/">οικοδομική άδεια</a>.', en: 'When the works affect the facades, the structure or the use, a minor-works approval or a <a href="../oikodomiki-adeia/">building permit</a> is needed.' },
        'pg.anak.now.p3': { el: 'Αν ο στόχος είναι λιγότερη κατανάλωση, το <a href="../energeiako-pistopoiitiko-pea/">ΠΕΑ</a> δείχνει ποιες παρεμβάσεις αξίζουν πριν ξοδέψετε.', en: 'If the goal is lower energy use, the <a href="../energeiako-pistopoiitiko-pea/">energy certificate</a> shows which improvements are worth it before you spend.' },
        'pg.anak.step1': { el: 'Αυτοψία και καταγραφή του τι θέλετε να γίνει.', en: 'Site visit and a record of what you want done.' },
        'pg.anak.step2': { el: 'Έλεγχος νομιμότητας του ακινήτου και του τι απαιτεί ο νόμος για τις εργασίες.', en: 'Legality check of the property and of what the law requires for the works.' },
        'pg.anak.step3': { el: 'Ενημέρωση ή έγκριση στο e-Άδειες, πριν από την έναρξη.', en: 'Notification or approval on e-Adeies, before work starts.' },
        'pg.anak.step4': { el: 'Προδιαγραφές και σύγκριση προσφορών από συνεργεία.', en: 'Specifications and comparison of contractor quotes.' },
        'pg.anak.step5': { el: 'Επίβλεψη στις κρίσιμες φάσεις και παραλαβή των εργασιών.', en: 'Supervision at the critical stages and acceptance of the works.' },
        'pg.anak.need1': { el: 'Τον τίτλο ιδιοκτησίας', en: 'The title deed' },
        'pg.anak.need2': { el: 'Την οικοδομική άδεια και τα σχέδια, αν υπάρχουν', en: 'The building permit and drawings, if available' },
        'pg.anak.need3': { el: 'Σε πολυκατοικία, τον κανονισμό και, όπου χρειάζεται, τη σύμφωνη γνώμη των συνιδιοκτητών', en: 'In a block of flats, the building rules and, where needed, the co-owners’ consent' },
        'pg.anak.need4': { el: 'Μια περιγραφή, φωτογραφίες ή σκίτσο των εργασιών', en: 'A description, photos or sketch of the works' },
        'pg.anak.needNote': { el: 'Αν δεν υπάρχουν σχέδια, κάνουμε εμείς την αποτύπωση.', en: 'If there are no drawings, we do the survey ourselves.' },
        'pg.anak.q1': { el: 'Μπορώ να ξεκινήσω ανακαίνιση χωρίς μηχανικό;', en: 'Can I start a renovation without an engineer?' },
        'pg.anak.a1': { el: 'Για εργασίες που καλύπτονται από το άρθρο 30, η ηλεκτρονική ενημέρωση υποβάλλεται από μηχανικό πριν αρχίσουν οι εργασίες. Χωρίς αυτήν, οι εργασίες μπορεί να θεωρηθούν αυθαίρετες και να φανούν σε μια μελλοντική πώληση.', en: 'For works covered by Article 30, the online notification is filed by an engineer before work starts. Without it, the works may be treated as unauthorised and surface at a future sale.' },
        'pg.anak.q2': { el: 'Θέλει άδεια η θερμοπρόσοψη;', en: 'Does external wall insulation need a permit?' },
        'pg.anak.a2': { el: 'Εξαρτάται από την έκταση και το κτίριο. Σε πολλές περιπτώσεις αρκεί ενημέρωση ή έγκριση εργασιών μικρής κλίμακας· σε πολυκατοικία χρειάζεται και απόφαση των συνιδιοκτητών. Το ξεκαθαρίζουμε στην αυτοψία.', en: 'It depends on the extent and the building. In many cases a notification or minor-works approval is enough; in a block of flats the co-owners must also agree. We clarify it at the site visit.' },
        'pg.anak.q3': { el: 'Αναλαμβάνετε και την κατασκευή;', en: 'Do you also do the building work?' },
        'pg.anak.a3': { el: 'Αναλαμβάνουμε τον σχεδιασμό, τις προδιαγραφές και την επίβλεψη, και συνεργαζόμαστε με συνεργεία που γνωρίζουμε. Εσείς έχετε έναν μηχανικό να ρωτάτε για όλα.', en: 'We handle design, specifications and supervision, and work with crews we know. You have one engineer to ask about everything.' },
        'meta.adl.title': { el: 'Άδεια Λειτουργίας Καταστήματος Αθήνα: Τεχνικός Φάκελος | Λιάπης', en: 'Opening a Shop or Café in Athens: The Technical File | Liapis' },
        'meta.adl.desc': { el: 'Τεχνικός φάκελος για γνωστοποίηση λειτουργίας καταστήματος στην Αθήνα και την Αττική: έλεγχος χρήσης και νομιμότητας του χώρου, κατόψεις, βεβαίωση μηχανικού και πυροπροστασία.', en: 'The technical file for notifying a shop or café in Athens and Attica: checking permitted use and legality of the space, floor plans, engineer’s certificate and fire safety.' },
        'nav.svc.adl': { el: 'Άδειες λειτουργίας', en: 'Business premises' },
        'pg.adl.h1': { el: 'Άδειες λειτουργίας καταστημάτων', en: 'Opening shops and cafés' },
        'pg.adl.h1a': { el: 'Άδειες λειτουργίας καταστημάτων στην Αθήνα', en: 'Opening shops and cafés in Athens' },
        'pg.adl.lead': { el: 'Καφέ, εστιατόριο, κατάστημα ή γραφείο. Πριν υπογράψετε μίσθωση, ελέγχουμε αν ο χώρος επιτρέπει τη χρήση που θέλετε, και μετά ετοιμάζουμε τον τεχνικό φάκελο.', en: 'A café, a restaurant, a shop or an office. Before you sign a lease, we check whether the space allows the use you want, and then prepare the technical file.' },
        'pg.adl.now.t': { el: 'Γνωστοποίηση, όχι άδεια', en: 'Notification, not a licence' },
        'pg.adl.now.p1': { el: 'Για τα περισσότερα καταστήματα υγειονομικού ενδιαφέροντος δεν εκδίδεται πια άδεια: η έναρξη λειτουργίας <strong>γνωστοποιείται ηλεκτρονικά</strong> στην πλατφόρμα Open Business (ν.4442/2016). Ο έλεγχος γίνεται μετά, και τότε ό,τι λείπει ή είναι λάθος κοστίζει.', en: 'Most food and drink premises no longer get a licence: opening is <strong>notified online</strong> on the Open Business platform (Law 4442/2016). Inspections come afterwards, and that is when anything missing or wrong becomes costly.' },
        'pg.adl.now.p2': { el: 'Ο μηχανικός βεβαιώνει ότι πληρούνται οι κτιριολογικές προϋποθέσεις του χώρου. Όπου υπάρχει μουσική, χρειάζεται και τεχνική έκθεση ηχομόνωσης, και σε κάθε περίπτωση τα μέτρα πυροπροστασίας που προβλέπονται για τη χρήση.', en: 'The engineer certifies that the space meets the building requirements. Where there is music, a sound-insulation report is also needed, and in every case the fire-safety measures required for the use.' },
        'pg.adl.now.p3': { el: 'Ο χώρος πρέπει επίσης να είναι νόμιμος. Αν υπάρχουν αυθαιρεσίες, η <a href="../taktopoiisi-afthaireton/">τακτοποίηση</a> προηγείται.', en: 'The space must also be legal. If there are unauthorised works, <a href="../taktopoiisi-afthaireton/">legalisation</a> comes first.' },
        'pg.adl.step1': { el: 'Έλεγχος χρήσης γης: επιτρέπεται η δραστηριότητα στο σημείο;', en: 'Land-use check: is the activity allowed at this address?' },
        'pg.adl.step2': { el: 'Έλεγχος νομιμότητας του χώρου με την οικοδομική άδεια και τα σχέδια.', en: 'Legality check of the space against the building permit and drawings.' },
        'pg.adl.step3': { el: 'Αποτύπωση και κατόψεις με τη διάταξη που ζητά η χρήση.', en: 'Survey and floor plans with the layout the use requires.' },
        'pg.adl.step4': { el: 'Βεβαίωση μηχανικού, μέτρα πυροπροστασίας και, αν χρειάζεται, έκθεση ηχομόνωσης.', en: 'Engineer’s certificate, fire-safety measures and, if needed, a sound-insulation report.' },
        'pg.adl.step5': { el: 'Παράδοση του τεχνικού φακέλου για τη γνωστοποίηση.', en: 'Delivery of the technical file for the notification.' },
        'pg.adl.need1': { el: 'Τη διεύθυνση και το είδος της δραστηριότητας', en: 'The address and the type of business' },
        'pg.adl.need2': { el: 'Το μισθωτήριο ή τον τίτλο του χώρου', en: 'The lease or title of the premises' },
        'pg.adl.need3': { el: 'Την οικοδομική άδεια και τα σχέδια του κτιρίου, αν τα έχετε', en: 'The building permit and drawings, if you have them' },
        'pg.adl.need4': { el: 'Αν θα υπάρχει μουσική, κουζίνα ή τραπεζοκαθίσματα έξω', en: 'Whether there will be music, a kitchen or outdoor seating' },
        'pg.adl.needNote': { el: 'Ό,τι λείπει από την πολεοδομία το αναζητούμε εμείς.', en: 'We request anything missing from the planning office ourselves.' },
        'pg.adl.q1': { el: 'Πρέπει να ελέγξω τον χώρο πριν υπογράψω μίσθωση;', en: 'Should I check the space before signing a lease?' },
        'pg.adl.a1': { el: 'Ναι, και είναι το πιο φθηνό βήμα όλης της διαδικασίας. Αν η χρήση δεν επιτρέπεται ή ο χώρος έχει αυθαιρεσίες που δεν τακτοποιούνται, είναι καλύτερο να το ξέρετε πριν δεσμευτείτε.', en: 'Yes, and it is the cheapest step of the whole process. If the use is not allowed or the space has works that cannot be legalised, it is better to know before you commit.' },
        'pg.adl.q2': { el: 'Ποιος υποβάλλει τη γνωστοποίηση;', en: 'Who files the notification?' },
        'pg.adl.a2': { el: 'Ο επιχειρηματίας, στην πλατφόρμα Open Business. Εμείς ετοιμάζουμε τα τεχνικά στοιχεία που επισυνάπτονται.', en: 'The business owner, on the Open Business platform. We prepare the technical documents that go with it.' },
        'pg.adl.q3': { el: 'Χρειάζεται μελέτη πυροπροστασίας;', en: 'Is a fire-safety study needed?' },
        'pg.adl.a3': { el: 'Εξαρτάται από τη χρήση και το μέγεθος του χώρου. Σε μικρά καταστήματα αρκούν συνήθως τα προβλεπόμενα μέτρα· σε μεγαλύτερα χρειάζεται μελέτη. Το ξεκαθαρίζουμε στον αρχικό έλεγχο.', en: 'It depends on the use and the size of the space. Small shops usually need only the prescribed measures; larger ones need a study. We clarify it at the initial check.' },
        'meta.ktim.title': { el: 'Κτηματολόγιο Αθήνα: Διόρθωση Εμβαδού και Ορίων | Β. Λιάπης', en: 'Land Registry in Athens: Correcting Area and Boundaries | V. Liapis' },
        'meta.ktim.desc': { el: 'Έλεγχος εγγραφών στο Κτηματολόγιο και τοπογραφικό μεταβολών για διόρθωση εμβαδού και ορίων· η αίτηση υποβάλλεται μέσω συνεργαζόμενου συμβολαιογράφου, στην Αθήνα και την Αττική.', en: 'Checking Land Registry entries and preparing the survey for area and boundary corrections; the application is filed through a partner notary, across Athens and Attica.' },
        'nav.svc.ktim': { el: 'Κτηματολόγιο', en: 'Land Registry' },
        'pg.ktim.h1': { el: 'Κτηματολόγιο: έλεγχος και διορθώσεις', en: 'Land Registry: checks and corrections' },
        'pg.ktim.h1a': { el: 'Κτηματολόγιο: έλεγχος και διορθώσεις στην Αθήνα', en: 'Land Registry checks and corrections in Athens' },
        'pg.ktim.lead': { el: 'Λάθος εμβαδόν, μετατοπισμένα όρια ή ακίνητο που φαίνεται «αγνώστου ιδιοκτήτη». Ελέγχουμε τι γράφει το Κτηματολόγιο, τι ισχύει στην πραγματικότητα και ποιος είναι ο δρόμος για τη διόρθωση.', en: 'A wrong area, shifted boundaries or a property shown as “unknown owner”. We check what the Land Registry says, what is true on the ground and which route leads to the correction.' },
        'pg.ktim.now.t': { el: 'Τι μπορεί να διορθωθεί', en: 'What can be corrected' },
        'pg.ktim.now.p1': { el: 'Τα <strong>γεωμετρικά στοιχεία</strong>, όπως εμβαδόν και όρια, διορθώνονται με αίτηση στο Κτηματολόγιο, με τοπογραφικό διάγραμμα μεταβολών και τη σύμφωνη γνώμη των ομόρων που θίγονται (άρθρο 19 §2 ν.2664/1998). Την αίτηση δεν την υποβάλλει ο μηχανικός· την υποβάλλει ο συνεργαζόμενος συμβολαιογράφος μας, με το τοπογραφικό που ετοιμάζουμε εμείς.', en: '<strong>Geometric details</strong> such as area and boundaries are corrected by application to the Land Registry, with a survey of the change and the consent of any affected neighbours (Article 19(2), Law 2664/1998). The engineer does not file the application: our partner notary does, with the survey we prepare.' },
        'pg.ktim.now.p2': { el: 'Όταν η διαφορά αφορά την ίδια την κυριότητα, για παράδειγμα λάθος δικαιούχος ή ένδειξη «αγνώστου ιδιοκτήτη», ο δρόμος είναι νομικός και η υπόθεση προχωρά μαζί με δικηγόρο. Η προθεσμία για τη διόρθωση ανακριβών πρώτων εγγραφών έχει παραταθεί πολλές φορές, γι’ αυτό την ελέγχουμε σε κάθε υπόθεση.', en: 'When the issue is ownership itself, for example the wrong owner or an “unknown owner” entry, the route is legal and the case proceeds with a lawyer. The deadline for correcting inaccurate first entries has been extended many times, so we check it for every case.' },
        'pg.ktim.now.p3': { el: 'Και στις δύο περιπτώσεις η βάση είναι μια σωστή μέτρηση· γι’ αυτό ξεκινάμε από το <a href="../topografika-diagrammata/">τοπογραφικό</a>.', en: 'Either way, the starting point is an accurate measurement, which is why we begin with the <a href="../topografika-diagrammata/">topographic survey</a>.' },
        'pg.ktim.step1': { el: 'Έλεγχος του αποσπάσματος και του διαγράμματος του Κτηματολογίου, σε σύγκριση με τους τίτλους.', en: 'We check the Land Registry extract and plan against your deeds.' },
        'pg.ktim.step2': { el: 'Μέτρηση στο πεδίο, για να φανεί πού βρίσκεται η απόκλιση.', en: 'On-site measurement to show where the difference lies.' },
        'pg.ktim.step3': { el: 'Σας λέμε αν η διόρθωση γίνεται με αίτηση ή χρειάζεται δικαστικό δρόμο.', en: 'We tell you whether it can be corrected by application or needs a court.' },
        'pg.ktim.step4': { el: 'Τοπογραφικό μεταβολών και συγκατάθεση ομόρων· ο συνεργαζόμενος συμβολαιογράφος υποβάλλει την αίτηση.', en: 'Survey of the change and neighbours’ consent; our partner notary files the application.' },
        'pg.ktim.step5': { el: 'Παρακολούθηση μέχρι να ενημερωθεί η εγγραφή.', en: 'Follow-up until the entry is updated.' },
        'pg.ktim.need1': { el: 'Τους τίτλους ιδιοκτησίας και τα τοπογραφικά που τους συνοδεύουν', en: 'The title deeds and the surveys attached to them' },
        'pg.ktim.need2': { el: 'Τον ΚΑΕΚ του ακινήτου', en: 'The property’s Land Registry number (KAEK)' },
        'pg.ktim.need3': { el: 'Στοιχεία επικοινωνίας με τους όμορους, αν τους γνωρίζετε', en: 'Contact details of the neighbours, if you know them' },
        'pg.ktim.need4': { el: 'Όποια αλληλογραφία υπάρχει με το Κτηματολόγιο', en: 'Any correspondence with the Land Registry' },
        'pg.ktim.needNote': { el: 'Αποσπάσματα και διαγράμματα που λείπουν τα ζητάμε εμείς από το Κτηματολόγιο.', en: 'We request any missing extracts and plans from the Land Registry ourselves.' },
        'pg.ktim.q1': { el: 'Το Κτηματολόγιο γράφει μικρότερο εμβαδόν από το συμβόλαιό μου. Χάνω μέτρα;', en: 'The Land Registry shows a smaller area than my deed. Am I losing land?' },
        'pg.ktim.a1': { el: 'Όχι απαραίτητα. Συχνά η διαφορά οφείλεται στη χάραξη των ορίων κατά την κτηματογράφηση. Μετράμε και σας λέμε αν η διόρθωση στηρίζεται· αν ναι, ετοιμάζουμε το τοπογραφικό και η αίτηση υποβάλλεται μέσω του συνεργαζόμενου συμβολαιογράφου.', en: 'Not necessarily. The difference often comes from how boundaries were drawn during the survey. We measure and tell you whether a correction is supported; if so, we prepare the survey and the application is filed through our partner notary.' },
        'pg.ktim.q2': { el: 'Χρειάζεται η υπογραφή του γείτονα;', en: 'Do I need my neighbour’s signature?' },
        'pg.ktim.a2': { el: 'Για διόρθωση ορίων που θίγει όμορο ακίνητο, ναι: ο όμορος συνυπογράφει την αίτηση ή δίνει δήλωση συναίνεσης. Αν αρνείται, η διόρθωση δεν γίνεται με απλή αίτηση.', en: 'For a boundary correction that affects a neighbouring property, yes: the neighbour co-signs the application or gives a declaration of consent. If they refuse, it cannot be done by simple application.' },
        'pg.ktim.q3': { el: 'Ποιος υποβάλλει την αίτηση διόρθωσης;', en: 'Who files the correction application?' },
        'pg.ktim.a3': { el: 'Ο συνεργαζόμενος συμβολαιογράφος μας, οπότε δεν χρειάζεται να βρείτε εσείς κάποιον. Εμείς ετοιμάζουμε το τεχνικό μέρος και συντονίζουμε τη διαδικασία. Όταν αμφισβητείται η ίδια η κυριότητα, η υπόθεση προχωρά και με δικηγόρο.', en: 'Our partner notary, so you do not need to find one yourself. We prepare the technical part and coordinate the process. When ownership itself is disputed, a lawyer is also involved.' },
        'meta.topo.title': { el: 'Τοπογραφικό Διάγραμμα ΕΓΣΑ ’87 Αθήνα & Αττική | Β. Λιάπης', en: 'Topographic Survey in EGSA ’87, Athens & Attica | V. Liapis' },
        'meta.topo.desc': { el: 'Τοπογραφικά διαγράμματα εξαρτημένα στο ΕΓΣΑ ’87 για οικοδομική άδεια, Κτηματολόγιο και αλλαγή ορίων, με μέτρηση στο πεδίο, στην Αθήνα και την Αττική.', en: 'Topographic surveys tied to EGSA ’87 for building permits, the Land Registry and boundary changes, measured on site, across Athens and Attica.' },
        'nav.svc.topo': { el: 'Τοπογραφικά διαγράμματα', en: 'Topographic surveys' },
        'pg.topo.h1': { el: 'Τοπογραφικά διαγράμματα', en: 'Topographic surveys' },
        'pg.topo.h1a': { el: 'Τοπογραφικά διαγράμματα στην Αθήνα και την Αττική', en: 'Topographic surveys in Athens and Attica' },
        'pg.topo.lead': { el: 'Μέτρηση στο πεδίο και διάγραμμα εξαρτημένο στο ΕΓΣΑ ’87, σύμφωνα με τις προδιαγραφές της υπηρεσίας που το ζητά: πολεοδομία, Κτηματολόγιο ή συμβολαιογράφος.', en: 'On-site measurement and a plan tied to EGSA ’87, drawn to the specifications of whoever asks for it: the planning office, the Land Registry or the notary.' },
        'pg.topo.now.t': { el: 'Πότε χρειάζεται τοπογραφικό', en: 'When you need a topographic survey' },
        'pg.topo.now.p1': { el: 'Χρειάζεται για <strong>οικοδομική άδεια</strong> και έγκριση εργασιών, για <strong>διόρθωση εμβαδού ή ορίων στο Κτηματολόγιο</strong>, για κατάτμηση ή συνένωση και για τον έλεγχο αρτιότητας ενός οικοπέδου.', en: 'It is needed for a <strong>building permit</strong> or works approval, for <strong>correcting an area or boundary in the Land Registry</strong>, for splitting or merging plots, and for checking whether a plot is buildable.' },
        'pg.topo.now.p2': { el: 'Στα συμβόλαια άλλαξε κάτι: από τις 7/4/2026 (ν.5293/2026, άρθρο 16) δεν επισυνάπτεται τοπογραφικό σε μεταβιβάσεις ακινήτων σε περιοχές με Κτηματολόγιο σε λειτουργία, όπως η Αττική, εφόσον δεν αλλάζουν τα όρια του ακινήτου.', en: 'For contracts something changed: since 7/4/2026 (Law 5293/2026, Article 16) no topographic plan is attached to property transfers in areas with an operating Land Registry, such as Attica, as long as the boundaries stay the same.' },
        'pg.topo.now.p3': { el: 'Αν όμως τα όρια στο Κτηματολόγιο δεν συμφωνούν με την πραγματικότητα, το τοπογραφικό είναι αυτό που στηρίζει τη <a href="../ktimatologio/">διόρθωση</a>.', en: 'If the boundaries in the Land Registry do not match reality, the survey is what supports the <a href="../ktimatologio/">correction</a>.' },
        'pg.topo.step1': { el: 'Συλλογή τίτλων, παλαιότερων διαγραμμάτων και του αποσπάσματος του Κτηματολογίου.', en: 'We gather the deeds, older plans and the Land Registry extract.' },
        'pg.topo.step2': { el: 'Μέτρηση στο πεδίο με GPS και γεωδαιτικό σταθμό.', en: 'On-site measurement with GPS and a total station.' },
        'pg.topo.step3': { el: 'Σύγκριση με τα όρια του Κτηματολογίου και των τίτλων· σας λέμε αν υπάρχει απόκλιση.', en: 'Comparison with the Land Registry and deed boundaries; we tell you if they differ.' },
        'pg.topo.step4': { el: 'Σχεδίαση στο ΕΓΣΑ ’87, με τις προδιαγραφές της χρήσης για την οποία το χρειάζεστε.', en: 'Drawing in EGSA ’87, to the specifications of the purpose you need it for.' },
        'pg.topo.step5': { el: 'Παράδοση σε χαρτί και σε ψηφιακή μορφή.', en: 'Delivery on paper and in digital form.' },
        'pg.topo.need1': { el: 'Τον τίτλο ιδιοκτησίας και, αν υπάρχει, το παλαιότερο τοπογραφικό', en: 'The title deed and, if there is one, the older survey' },
        'pg.topo.need2': { el: 'Τον ΚΑΕΚ ή το απόσπασμα του Κτηματολογίου', en: 'The Land Registry number (KAEK) or extract' },
        'pg.topo.need3': { el: 'Πρόσβαση στο ακίνητο και, αν γίνεται, στοιχεία επικοινωνίας με τους όμορους', en: 'Access to the property and, if possible, contact with the neighbours' },
        'pg.topo.need4': { el: 'Σε τι θα χρησιμοποιηθεί το διάγραμμα (άδεια, Κτηματολόγιο, κατάτμηση)', en: 'What the plan is for (permit, Land Registry, subdivision)' },
        'pg.topo.needNote': { el: 'Τα παλαιότερα διαγράμματα βοηθούν, αλλά δεν είναι απαραίτητα· η μέτρηση γίνεται από την αρχή.', en: 'Older plans help but are not required; the measurement is done from scratch.' },
        'pg.topo.q1': { el: 'Χρειάζεται τοπογραφικό για να πουλήσω διαμέρισμα στην Αθήνα;', en: 'Do I need a survey to sell a flat in Athens?' },
        'pg.topo.a1': { el: 'Συνήθως όχι. Από τις 7/4/2026 δεν επισυνάπτεται τοπογραφικό σε μεταβιβάσεις σε περιοχές με Κτηματολόγιο σε λειτουργία, αν τα όρια δεν αλλάζουν. Χρειάζονται όμως η Ηλεκτρονική Ταυτότητα και το ΠΕΑ.', en: 'Usually not. Since 7/4/2026 no survey is attached to transfers in areas with an operating Land Registry, if the boundaries do not change. You do need the Building e-Identity and the energy certificate.' },
        'pg.topo.q2': { el: 'Τι είναι το ΕΓΣΑ ’87;', en: 'What is EGSA ’87?' },
        'pg.topo.a2': { el: 'Είναι το εθνικό σύστημα συντεταγμένων. Όταν το διάγραμμα είναι εξαρτημένο σε αυτό, κάθε κορυφή του οικοπέδου έχει συντεταγμένες που συγκρίνονται απευθείας με το Κτηματολόγιο.', en: 'It is the Greek national coordinate system. When a plan is tied to it, every corner of the plot has coordinates that can be compared directly with the Land Registry.' },
        'pg.topo.q3': { el: 'Το εμβαδόν στο Κτηματολόγιο διαφέρει από το συμβόλαιο. Τι κάνω;', en: 'The area in the Land Registry differs from my deed. What do I do?' },
        'pg.topo.a3': { el: 'Πρώτα μετράμε για να δούμε ποιο είναι το σωστό. Αν λάθος είναι η εγγραφή του Κτηματολογίου, η διόρθωση γίνεται με αίτηση και τοπογραφικό μεταβολών (άρθρο 19 §2 ν.2664/1998), με τη σύμφωνη γνώμη των ομόρων όπου θίγονται.', en: 'First we measure to see which is right. If the Land Registry entry is wrong, it is corrected by application with a survey of the change (Article 19 §2, Law 2664/1998), with the consent of affected neighbours.' },
        'meta.pea.title': { el: 'Ενεργειακό Πιστοποιητικό (ΠΕΑ) Αθήνα & Αττική | Β. Λιάπης', en: 'Energy Performance Certificate (EPC) in Athens & Attica | V. Liapis' },
        'meta.pea.desc': { el: 'ΠΕΑ για πώληση, ενοικίαση, νέα κτίρια και «Εξοικονομώ» στην Αθήνα και την Αττική: αυτοψία, υπολογισμός με το λογισμικό ΤΕΕ-ΚΕΝΑΚ και καταχώριση στο buildingcert.gr.', en: 'Energy Performance Certificates for sale, rental, new buildings and energy-upgrade grants in Athens and Attica: site visit, calculation with the TEE-KENAK software and registration on buildingcert.gr.' },
        'nav.svc.pea': { el: 'Ενεργειακό πιστοποιητικό (ΠΕΑ)', en: 'Energy certificate (EPC)' },
        'pg.pea.h1': { el: 'Ενεργειακό Πιστοποιητικό (ΠΕΑ)', en: 'Energy Performance Certificate (EPC)' },
        'pg.pea.h1a': { el: 'Ενεργειακό Πιστοποιητικό (ΠΕΑ) στην Αθήνα', en: 'Energy Performance Certificate (EPC) in Athens' },
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
        'meta.home.title': { el: 'Βάιος Λιάπης · Πολιτικός Μηχανικός Αθήνα & Λάρισα', en: 'Vaios Liapis · Civil Engineer in Athens & Larissa' },
        'meta.home.desc': { el: 'Πολιτικός μηχανικός ΑΠΘ με γραφείο στην Αθήνα, για την Αττική και τη Λάρισα: τακτοποίηση αυθαιρέτων, ηλεκτρονική ταυτότητα κτιρίου, οικοδομικές άδειες και ΠΕΑ.', en: 'Civil engineer (AUTh) based in Athens, serving Attica and Larissa: legalising unauthorised works, Building e-Identity, building permits and energy certificates.' },
        'meta.tak.title': { el: 'Τακτοποίηση Αυθαιρέτων Αθήνα & Αττική · ν.4495/2017 | Λιάπης', en: 'Legalising Unauthorised Works in Athens & Attica · Law 4495/2017 | Liapis' },
        'meta.tak.desc': { el: 'Τακτοποίηση αυθαιρέτων στην Αθήνα και την Αττική κατά τον ν.4495/2017 (κατηγορίες 1-4, υπαγωγή έως 31/3/2028). Αυτοψία, πρόστιμο από την αρχή, φάκελος ως την περαίωση.', en: 'Legalising unauthorised works in Athens and Attica under Law 4495/2017 (categories 1-4, applications open until 31/3/2028). Site survey, the fine known upfront, the file taken through to completion.' },
        'meta.htk.title': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου Αθήνα · Βεβαίωση Μηχανικού | Λιάπης', en: 'Building e-Identity in Athens · Engineer’s Certificate | Liapis' },
        'meta.htk.desc': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου και πιστοποιητικό πληρότητας για μεταβίβαση στην Αθήνα και την Αττική: η «βεβαίωση μηχανικού» που ζητά σήμερα ο συμβολαιογράφος. Αυτοψία, έλεγχος, έκδοση.', en: 'Building e-Identity and certificate of completeness for property transfers in Athens and Attica: the “engineer’s certificate” notaries ask for today. Site visit, checks, issue.' },
        'meta.oik.title': { el: 'Οικοδομική Άδεια & Έγκριση Εργασιών στην Αθήνα | Λιάπης', en: 'Building Permit & Minor-Works Approval in Athens | Liapis' },
        'meta.oik.desc': { el: 'Άδειες δόμησης και εγκρίσεις εργασιών μικρής κλίμακας μέσω e-Άδειες στην Αθήνα και την Αττική: έλεγχος αρτιότητας, μελέτες, υποβολή, παρακολούθηση ως την έκδοση και επίβλεψη.', en: 'Building permits and minor-works approvals through e-Adeies in Athens and Attica: plot checks, studies, submission, follow-up until issue, and site supervision.' },
        'img.logo': { el: 'Λογότυπο Β. Λιάπη', en: 'V. Liapis logo' },
        'pg.crumbAria': { el: 'Διαδρομή', en: 'Breadcrumb' },
        'social.phone': { el: 'Τηλέφωνο', en: 'Phone' },

        /* HERO */
        'hero.name1':   { el: 'ΒΑΪΟΣ',                   en: 'VAIOS' },
        'hero.name2':   { el: 'ΛΙΑΠΗΣ',                  en: 'LIAPIS' },
        'hero.eyebrow': { el: 'Πολιτικός Μηχανικός ΑΠΘ', en: 'Civil Engineer — AUTH' },
        'hero.cta':     { el: 'Επικοινωνία',              en: 'Get in Touch' },
        'hero.value':   { el: 'Τακτοποίηση αυθαιρέτων, Ηλεκτρονική Ταυτότητα Κτιρίου και οικοδομικές άδειες στην Αθήνα, σε όλη την Αττική και στη Λάρισα.', en: 'Legalising unauthorised works, Building e-Identity and building permits in Athens, across Attica and in Larissa.' },
        'hero.call':    { el: 'Κλήση · 694 867 5267', en: 'Call · +30 694 867 5267' },
        'hero.h1role': { el: ' — Πολιτικός Μηχανικός στην Αθήνα και τη Λάρισα', en: ' — Civil Engineer in Athens and Larissa' },
        'areas.h': { el: 'Πού εξυπηρετούμε', en: 'Where we work' },
        'areas.ath.t': { el: 'Αθήνα και Αττική', en: 'Athens and Attica' },
        'areas.ath.p': { el: 'Γραφείο στη Δελβίνου 31, στην Αθήνα. Αυτοψίες σε όλη την Αττική: κέντρο, Πειραιάς, βόρεια, νότια, ανατολικά και δυτικά προάστια.', en: 'Office at 31 Delvinou St, Athens. Site visits across Attica: the centre, Piraeus and the northern, southern, eastern and western suburbs.' },
        'areas.lar.t': { el: 'Λάρισα', en: 'Larissa' },
        'areas.lar.p': { el: 'Με καταγωγή από τη Λάρισα και συνεργάτη στην πόλη, αναλαμβάνουμε και εκεί Ηλεκτρονική Ταυτότητα, τακτοποίηση αυθαιρέτων και άδειες.', en: 'With roots in Larissa and a partner in the city, we also take on Building e-Identity, legalisation of unauthorised works and permits there.' },
        'areas.lar.more': { el: 'Πώς δουλεύουμε στη Λάρισα', en: 'How we work in Larissa' },

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
        'news.heading': { el: 'Τι <em>αλλάζει</em> στη νομοθεσία', en: 'News <em>feed</em>' },

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

        's1.title': { el: 'Κτηματολόγιο: Διορθώσεις', en: 'Land Registry Corrections' },
        's1.text': { el: 'Ελέγχουμε τι γράφει το Κτηματολόγιο για το ακίνητό σας σε σχέση με τους τίτλους. Αν χρειαστεί διόρθωση εμβαδού ή ορίων, ετοιμάζουμε το τοπογραφικό που τη στηρίζει και η αίτηση υποβάλλεται μέσω του συνεργαζόμενου συμβολαιογράφου μας.', en: 'We check what the Land Registry says about your property against your deeds. If an area or boundary needs correcting, we prepare the survey that supports it and the application is filed through our partner notary.' },

        's2.title': { el: 'Πολεοδομικές Άδειες', en: 'Building Permits' },
        's2.text':  { el: 'Οικοδομικές άδειες και εγκρίσεις εργασιών μικρής κλίμακας εκδίδονται πλέον μόνο ηλεκτρονικά, μέσω μηχανικού. Ο φάκελος ξεκινά από τον έλεγχο αρτιότητας και όρων δόμησης· από εκεί και πέρα συντάσσουμε τις μελέτες και τον παρακολουθούμε μέχρι την έκδοση.', en: 'Building permits and minor-works approvals are now issued only online, through an engineer. Every file starts with a check of plot eligibility and building terms; from there we prepare the studies and follow the file until the permit is issued.' },

        's3.title': { el: 'Μεταφορά Αυθαιρέτων στον ν.4495/2017', en: 'Transfer of Declarations to Law 4495/2017' },
        's3.text':  { el: 'Αυθαίρετα που είχαν δηλωθεί με παλαιότερους νόμους (ν.3843/2010, ν.4014/2011, ν.4178/2013) συχνά πρέπει να περάσουν στον ν.4495/2017 για να ολοκληρωθεί η δήλωση ή για να γίνει μεταβίβαση. Πριν τη μεταφορά ελέγχουμε τι είχε δηλωθεί τότε και τι έχει αλλάξει στο μεταξύ.', en: 'Unauthorised works declared under earlier laws (3843/2010, 4014/2011, 4178/2013) often have to be moved to Law 4495/2017 before the declaration can be completed or the property sold. Before the transfer we check what was declared back then and what has changed since.' },

        's4.title': { el: 'Βεβαιώσεις Μηχανικού για Μεταβίβαση', en: 'Engineer’s Certificate for Property Transfers' },
        's4.text': { el: 'Για αγοραπωλησία, γονική παροχή ή δωρεά χρειάζεται η Ηλεκτρονική Ταυτότητα του ακινήτου με το πιστοποιητικό πληρότητας, που ισχύει δύο μήνες. Μετά την αυτοψία και τη σύγκριση με την άδεια, αν βρεθεί αυθαιρεσία σας λέμε πριν το συμβόλαιο πώς διορθώνεται.', en: 'For a sale, a parental transfer or a gift, the notary needs the property’s Building e-Identity with its certificate of completeness, valid for two months. After the site visit and the comparison with the permit, if anything is unauthorised we tell you before the contract how to fix it.' },

        's5.title': { el: 'Επίβλεψη Κατασκευών & Έργων', en: 'Construction Supervision' },
        's5.text':  { el: 'Η οικοδομική άδεια προβλέπει επιβλέποντα μηχανικό. Είμαστε στο εργοτάξιο στις κρίσιμες φάσεις, από την εκσκαφή ως τον έλεγχο του οπλισμού πριν τη σκυροδέτηση.', en: 'A building permit requires a supervising engineer. We are on site at the critical stages, from excavation to checking the reinforcement before the concrete is poured.' },

        's6.title': { el: 'Τακτοποίηση Αυθαιρέτων', en: 'Legalising Unauthorised Works' },
        's6.text':  { el: 'Υπέρβαση δόμησης, κλειστός ημιυπαίθριος, πατάρι ή αλλαγή χρήσης: καταγράφουμε τι υπάρχει και σας λέμε από την αρχή τι τακτοποιείται και με ποιο πρόστιμο, αλλά και τι δεν τακτοποιείται. Ο φάκελος προχωρά κατά τον ν.4495/2017, όπως ισχύει, μέχρι την περαίωση.', en: 'Extra floor area, an enclosed semi-open space, a mezzanine or a change of use: we record what is there and tell you from the start what can be legalised and at what fine, and also what cannot. The file then proceeds under Law 4495/2017, as in force, until it is closed.' },

        's7.title': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου', en: 'Building e-Identity' },
        's7.text': { el: 'Η Ηλεκτρονική Ταυτότητα Κτιρίου (άρθρα 52-56 ν.4495/2017) συγκεντρώνει άδειες, σχέδια, τακτοποιήσεις και την πραγματική κατάσταση του ακινήτου. Μετά την αυτοψία τη συμπληρώνουμε στην πλατφόρμα του ΤΕΕ και εκδίδουμε το πιστοποιητικό πληρότητας που ζητά ο συμβολαιογράφος σε πώληση, γονική παροχή ή δωρεά, τη λεγόμενη «βεβαίωση μηχανικού».', en: 'The Building e-Identity (Articles 52-56, Law 4495/2017) brings together permits, drawings, legalisations and the actual state of the property. After the site visit we complete it on the TEE platform and issue the certificate of completeness the notary asks for in a sale, parental transfer or gift, the so-called “engineer’s certificate”.' },

        's8.title': { el: 'Υπηρεσία Μιας Στάσης', en: 'One-Stop Service' },
        's8.text':  { el: 'Μια υπόθεση ακινήτου συχνά χρειάζεται μηχανικό, τοπογράφο, δικηγόρο και συμβολαιογράφο. Συντονίζουμε εμείς τους συνεργάτες και εσείς έχετε έναν άνθρωπο να ρωτάτε.', en: 'A property case often needs an engineer, a surveyor, a lawyer and a notary. We coordinate the partners, and you have one person to ask.' },

        's9.title': { el: 'Ανακαινίσεις, Επισκευές & Μονώσεις', en: 'Renovation, Repairs & Insulation' },
        's9.text':  { el: 'Από ανακαίνιση κουζίνας και μπάνιου μέχρι θερμομόνωση κελύφους και επισκευή ρωγμών. Όπου απαιτείται έγκριση εργασιών μικρής κλίμακας την εκδίδουμε εμείς, και επιβλέπουμε τα συνεργεία μέχρι την παράδοση.', en: 'From a new kitchen or bathroom to external insulation and crack repair. Where a minor-works approval is needed we obtain it, and we supervise the crews until handover.' },

        's10.title': { el: 'Ενεργειακά Πιστοποιητικά', en: 'Energy Performance Certificates' },
        's10.text':  { el: 'Ενεργειακή επιθεώρηση και Πιστοποιητικό Ενεργειακής Απόδοσης για πώληση, μίσθωση ή πρόγραμμα ενεργειακής αναβάθμισης, σε κατοικίες και επαγγελματικούς χώρους. Αν η κατάταξη βγει χαμηλή, σας δείχνουμε ποιες παρεμβάσεις την ανεβάζουν με λογικό κόστος.', en: 'Energy inspection and Energy Performance Certificate for a sale, a lease or an energy-upgrade programme, for homes and business premises. If the rating comes out low, we show you which improvements raise it at a reasonable cost.' },

        's11.title': { el: 'Άδειες Λειτουργίας', en: 'Operating Licences' },
        's11.text':  { el: 'Για καταστήματα, καφέ, γραφεία και αποθήκες ετοιμάζουμε τα τεχνικά στοιχεία της αδειοδότησης: κατόψεις, βεβαιώσεις μηχανικού και, όπου χρειάζεται, μελέτη πυροπροστασίας. Πρώτα ελέγχουμε αν ο χώρος επιτρέπει τη χρήση που θέλετε, πριν υπογράψετε μίσθωση.', en: 'For shops, cafés, offices and warehouses we prepare the technical part of the licence: floor plans, engineer’s certificates and, where needed, a fire-safety study. First we check whether the space allows the use you want, before you sign a lease.' },

        's12.title': { el: 'Τοπογραφικά Διαγράμματα', en: 'Topographic Surveys' },
        's12.text':  { el: 'Τοπογραφικό διάγραμμα εξαρτημένο στο ΕΓΣΑ ’87, για άδεια, Κτηματολόγιο ή αλλαγή ορίων, με μέτρηση στο πεδίο και τις προδιαγραφές της υπηρεσίας που το ζητά.', en: 'Topographic plans tied to the Greek reference system EGSA ’87, for permits, the Land Registry or boundary changes, measured on site and drawn to the specifications of the authority that asks for them.' },

        /* PROJECTS */
        'projects.eyebrow': { el: 'Από τη δουλειά μας', en: 'From our work' },
        'projects.heading': { el: 'Δείγματα <em>Έργων</em>', en: 'Sample <em>Projects</em>' },
        'projects.lead': { el: 'Μερικά από τα έργα που έχουμε αναλάβει. Πατήστε σε ένα έργο για να δείτε όλες τις φωτογραφίες.', en: 'A few of the projects we have carried out. Tap a project to see all its photos.' },
        'pj1.cat': { el: 'Ανακαίνιση', en: 'Renovation' },
        'pj1.title': { el: 'Κατοικία, Μύκονος', en: 'House, Mykonos' },
        'pj1.desc': { el: 'Ανακαίνιση κατοικίας: εσωτερικοί χώροι και όψεις', en: 'House renovation: interiors and façades' },
        'pj2.cat': { el: 'Ανακαίνιση', en: 'Renovation' },
        'pj2.title': { el: 'Διαμέρισμα 1ου ορόφου, Πετράλωνα', en: 'First-floor apartment, Petralona' },
        'pj2.desc': { el: 'Ανακαίνιση διαμερίσματος: κουζίνα, λουτρό, υπνοδωμάτια', en: 'Apartment renovation: kitchen, bathroom, bedrooms' },
        'pj3.cat': { el: 'Ανακαίνιση', en: 'Renovation' },
        'pj3.title': { el: 'Διαμέρισμα, Πετράλωνα', en: 'Apartment, Petralona' },
        'pj3.desc': { el: 'Ανακαίνιση διαμερίσματος: κουζίνα, λουτρό, δάπεδα, βεράντα', en: 'Apartment renovation: kitchen, bathroom, floors, terrace' },
        'pj.photos': { el: 'φωτογραφίες', en: 'photos' },
        'gal.close': { el: 'Κλείσιμο', en: 'Close' },
        'gal.prev': { el: 'Προηγούμενη φωτογραφία', en: 'Previous photo' },
        'gal.next': { el: 'Επόμενη φωτογραφία', en: 'Next photo' },






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
        'form.opt.3':          { el: 'Οικοδομική άδεια ή έγκριση εργασιών', en: 'Building permit or minor-works approval' },
        'form.opt.5':          { el: 'Άλλο',                           en: 'Other' },
        'form.label.message':  { el: 'Μήνυμα',                en: 'Message' },
        'form.ph.message':     { el: 'Περιγράψτε σύντομα το αίτημά σας...', en: 'Briefly describe your request...' },
        'form.submit':         { el: 'Αποστολή Μηνύματος',    en: 'Send Message' },

        /* ΠΡΟΣΒΑΣΙΜΟΤΗΤΑ & ΟΡΓΑΝΑ ΜΕΤΡΗΣΗΣ */
        'skip':           { el: 'Μετάβαση στο περιεχόμενο', en: 'Skip to content' },
        'nav.name':       { el: 'Β. ΛΙΑΠΗΣ',              en: 'V. LIAPIS' },
        'person.name':    { el: 'Βάιος Λιάπης',           en: 'Vaios Liapis' },
        'contact.area':   { el: 'Αθήνα & Όλη η Αττική', en: 'Athens & all of Attica' },
        'contact.addr': { el: 'Δελβίνου 31, 113 63 Αθήνα', en: 'Delvinou 31, 113 63 Athens' },
        'map.dir': { el: 'Οδηγίες στους Χάρτες Google', en: 'Directions in Google Maps' },
        'map.title': { el: 'Χάρτης: γραφείο Β. Λιάπη, Δελβίνου 31, Αθήνα', en: 'Map: V. Liapis office, Delvinou 31, Athens' },
        'stat.years': { el: 'χρόνια εμπειρίας', en: 'years of experience' },
        'stat.htk': { el: 'Ηλεκτρονικές Ταυτότητες Κτιρίου', en: 'Building e-Identities' },
        'stat.tak': { el: 'περαιωμένες τακτοποιήσεις αυθαιρέτων', en: 'completed legalisations' },
        'meas.elev':      { el: 'ΥΨ',                     en: 'ALT' },
        'meas.auth':      { el: 'ΑΠΘ',                    en: 'AUTH' },
        'meas.hero':      { el: 'ΠΡΟΣΟΨΗ &mdash; 24.000 m',        en: 'FAÇADE &mdash; 24.000 m' },
        'meas.services': { el: '10 ΥΠΗΡΕΣΙΕΣ &mdash; 400.00 m²', en: '10 SERVICES &mdash; 400.00 m²' },
        'one.eyebrow': { el: 'Από την αρχή ως το τέλος', en: 'From start to finish' },
        'one.heading': { el: 'Αναλαμβάνουμε <em>όλη</em> τη διαδρομή', en: 'We handle <em>the whole</em> journey' },
        'one.lead': { el: 'Δεν χρειάζεται να τρέχετε εσείς από υπηρεσία σε υπηρεσία. Από την πρώτη αυτοψία ως την τελική έγκριση, την υπόθεσή σας τη χειρίζεται ένας άνθρωπος, που συντονίζει και τοπογράφο, δικηγόρο ή συμβολαιογράφο όπου χρειάζονται.', en: 'You do not have to run from office to office. From the first site visit to the final approval, one person handles your case and coordinates the surveyor, lawyer or notary where they are needed.' },
        'one.s1': { el: 'Αυτοψία και καταγραφή', en: 'Site visit and survey' },
        'one.s2': { el: 'Μελέτη και φάκελος', en: 'Study and file' },
        'one.s3': { el: 'Υποβολή στις υπηρεσίες', en: 'Submission to the authorities' },
        'one.s4': { el: 'Έγκριση και παράδοση', en: 'Approval and handover' },
        'one.note': { el: 'Σας ενημερώνουμε σε κάθε βήμα, χωρίς να χρειάζεται να ρωτάτε.', en: 'We keep you updated at every step, without you having to ask.' },
        'meas.projects': { el: '3 ΔΕΙΓΜΑΤΑ ΕΡΓΩΝ', en: '3 SAMPLE PROJECTS' },

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
        'pg.tak.h1a': { el: 'Τακτοποίηση αυθαιρέτων στην Αθήνα και την Αττική', en: 'Legalising unauthorised works in Athens and Attica' },
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
        'pg.tak.a3': { el: 'Για τη μεταβίβαση χρειάζεται η Ηλεκτρονική Ταυτότητα με πιστοποιητικό πληρότητας, όπου ο μηχανικός καταγράφει αν υπάρχουν αυθαιρεσίες. Αν υπάρχουν, τακτοποιούνται πρώτα και μετά υπογράφεται το συμβόλαιο.', en: 'A transfer needs the Building e-Identity with its certificate of completeness, in which the engineer records any unauthorised works. If there are any, they are legalised first and the contract is signed afterwards.' },
        'pg.tak.q4': { el: 'Τακτοποιείται κάτι που χτίστηκε μετά το 2011;', en: 'Can something built after 2011 be legalised?' },
        'pg.tak.a4': { el: 'Όχι με τον ν.4495/2017. Για νεότερες κατασκευές μπορεί να εξεταστεί έκδοση άδειας, αν η κατασκευή συμφωνεί με τους σημερινούς όρους δόμησης· αλλιώς η λύση είναι η αποκατάσταση.', en: 'Not under Law 4495/2017. For newer works a permit may be possible if the construction meets today’s building terms; otherwise the answer is to restore the original state.' },
        'pg.htk.h1': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου και βεβαίωση μηχανικού', en: 'Building e-Identity and engineer’s certificate' },
        'pg.htk.h1a': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου και βεβαίωση μηχανικού στην Αθήνα', en: 'Building e-Identity and engineer’s certificate in Athens' },
        'pg.htk.lead': { el: 'Πριν από αγοραπωλησία, γονική παροχή ή δωρεά, ο συμβολαιογράφος ζητά στοιχεία από μηχανικό. Σας λέμε τι χρειάζεται η δική σας περίπτωση και το ετοιμάζουμε.', en: 'Before a sale, a parental gift or a donation, the notary needs documents from an engineer. We tell you what your case requires and prepare it.' },
        'pg.htk.now.t': { el: 'Τι είναι η Ηλεκτρονική Ταυτότητα', en: 'What the Building e-Identity is' },
        'pg.htk.now.p2': { el: 'Ζητείται σε μεταβιβάσεις, σε οικοδομικές άδειες για ανακαίνιση ή προσθήκη, σε προγράμματα όπως το «Εξοικονομώ», σε άδειες λειτουργίας και σε δάνεια. Για διαμέρισμα συντάσσεται ταυτότητα της διηρημένης ιδιοκτησίας.', en: 'It is required for property transfers, for permits for renovation or extensions, for programmes such as «Exoikonomo», for operating licences and for loans. For a flat, an e-Identity of the individual unit is prepared.' },
        'pg.htk.now.p1_h': { el: 'Είναι ο ηλεκτρονικός φάκελος του ακινήτου στην πλατφόρμα του ΤΕΕ (άρθρα 52-56 ν.4495/2017). Περιέχει, όπου υπάρχουν, την οικοδομική άδεια με τα σχέδιά της, τις <a href="../taktopoiisi-afthaireton/">τακτοποιήσεις αυθαιρέτων</a>, το Πιστοποιητικό Ενεργειακής Απόδοσης, κατόψεις της πραγματικής κατάστασης και το πιστοποιητικό πληρότητας.', en: 'It is the property’s electronic file on the Technical Chamber platform (Articles 52-56, Law 4495/2017). Where they exist, it holds the building permit and its plans, <a href="../taktopoiisi-afthaireton/">legalised works</a>, the Energy Performance Certificate, floor plans of the actual state and the completeness certificate.' },
        'pg.htk.now.p3_h': { el: 'Μέχρι το 2021 η μεταβίβαση γινόταν με τη <strong>βεβαίωση μηχανικού</strong> του άρθρου 83 ν.4495/2017. Από 1/2/2021 τη θέση της πήρε η Ηλεκτρονική Ταυτότητα με το <strong>πιστοποιητικό πληρότητας</strong>, που ισχύει δύο μήνες από την αυτοψία. Όταν λοιπόν σας ζητούν «βεβαίωση μηχανικού για το συμβόλαιο», αυτό χρειάζεστε.', en: 'Until 2021 transfers relied on the <strong>engineer’s certificate</strong> of Article 83, Law 4495/2017. Since 1/2/2021 its place has been taken by the Building e-Identity with its <strong>certificate of completeness</strong>, valid for two months from the site visit. So when you are asked for “an engineer’s certificate for the contract”, this is what you need.' },
        'pg.htk.step1': { el: 'Συγκεντρώνουμε άδεια, σχέδια και τακτοποιήσεις — από την πολεοδομία, αν δεν τα έχετε.', en: 'We gather the permit, plans and legalisations — from the planning office if you do not have them.' },
        'pg.htk.step2': { el: 'Αυτοψία και αποτύπωση.', en: 'On-site inspection and survey.' },
        'pg.htk.step3': { el: 'Σύγκριση με τα εγκεκριμένα σχέδια. Αν βρεθεί διαφορά, σας λέμε πριν το συμβόλαιο πώς διορθώνεται.', en: 'Comparison with the approved plans. If there is a difference, we tell you how to fix it before the contract.' },
        'pg.htk.step4': { el: 'Καταχώριση στην πλατφόρμα του ΤΕΕ, πιστοποιητικό πληρότητας και βεβαίωση.', en: 'Entry on the Technical Chamber platform, completeness certificate and engineer’s certificate.' },
        'pg.htk.need1': { el: 'Τον τίτλο ιδιοκτησίας', en: 'The title deed' },
        'pg.htk.need2': { el: 'Τον ΚΑΕΚ του ακινήτου', en: 'The property’s Land Registry number (KAEK)' },
        'pg.htk.need3': { el: 'Την οικοδομική άδεια, αν υπάρχει', en: 'The building permit, if there is one' },
        'pg.htk.need4': { el: 'Το ΠΕΑ και προηγούμενες δηλώσεις αυθαιρέτων, αν υπάρχουν', en: 'The Energy Performance Certificate and any earlier declarations of unauthorised works' },
        'pg.htk.q1': { el: 'Ο συμβολαιογράφος ζητά βεβαίωση μηχανικού. Είναι το ίδιο με την ταυτότητα κτιρίου;', en: 'The notary asks for an engineer’s certificate. Is that the same as the Building e-Identity?' },
        'pg.htk.a1': { el: 'Στην πράξη ναι. Από το 2021 η μεταβίβαση γίνεται με την Ηλεκτρονική Ταυτότητα και το πιστοποιητικό πληρότητας, που αντικατέστησε την παλιά βεβαίωση του άρθρου 83. Το πιστοποιητικό ισχύει δύο μήνες από την αυτοψία.', en: 'In practice, yes. Since 2021 transfers are made with the Building e-Identity and its certificate of completeness, which replaced the old Article 83 certificate. The certificate is valid for two months from the site visit.' },
        'pg.htk.q2': { el: 'Τι γίνεται αν βρεθεί αυθαιρεσία;', en: 'What happens if unauthorised works are found?' },
        'pg.htk.a2': { el: 'Αν η διαφορά τακτοποιείται, γίνεται πρώτα η τακτοποίηση και μετά εκδίδεται το πιστοποιητικό πληρότητας. Γι’ αυτό ο έλεγχος καλό είναι να γίνεται πριν κλειστεί ημερομηνία συμβολαίου.', en: 'If the difference can be legalised, it is legalised first and the certificate of completeness is issued afterwards. That is why the check is best done before a contract date is fixed.' },
        'pg.htk.q3': { el: 'Γίνεται ταυτότητα και για διαμέρισμα;', en: 'Is there an e-Identity for a flat too?' },
        'pg.htk.a3': { el: 'Ναι. Για αυτοτελή διηρημένη ιδιοκτησία συντάσσεται ξεχωριστή ταυτότητα, με τα στοιχεία του διαμερίσματος και της άδειας της πολυκατοικίας.', en: 'Yes. An individual unit gets its own e-Identity, with the details of the flat and of the building’s permit.' },
        'pg.oik.h1': { el: 'Οικοδομική άδεια και έγκριση εργασιών', en: 'Building permits and minor-works approvals' },
        'pg.oik.h1a': { el: 'Οικοδομική άδεια και έγκριση εργασιών στην Αθήνα', en: 'Building permits and minor-works approvals in Athens' },
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

        /* ΛΑΡΙΣΑ (anavathmisi-seo #5-6) */
        'hub.lar.text': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου και τακτοποίηση αυθαιρέτων για ακίνητα στη Λάρισα, με αυτοψία στο ακίνητο και τα υπόλοιπα από απόσταση.', en: 'Building e-Identity and legalisation of unauthorised works for properties in Larissa, with a site visit at the property and everything else done remotely.' },
        'meta.lar.title': { el: 'Πολιτικός Μηχανικός για τη Λάρισα · ΗΤΚ, Αυθαίρετα | Β. Λιάπης', en: 'Civil Engineer for Larissa · Building e-Identity, Legalisation | V. Liapis' },
        'meta.lar.desc': { el: 'Πολιτικός μηχανικός με καταγωγή από τη Λάρισα και συνεργάτη στην πόλη: Ηλεκτρονική Ταυτότητα Κτιρίου, τακτοποίηση αυθαιρέτων και άδειες, με αυτοψία στο ακίνητο.', en: 'Civil engineer with roots in Larissa and a partner in the city: Building e-Identity, legalisation of unauthorised works and permits, with a site visit at the property.' },
        'pg.lar.name': { el: 'Πολιτικός μηχανικός για τη Λάρισα', en: 'Civil engineer for Larissa' },
        'pg.lar.lead': { el: 'Το γραφείο μας είναι στην Αθήνα, όμως ο Βάιος Λιάπης κατάγεται από τη Λάρισα και συνεργάζεται με συνάδελφο στην πόλη. Τα ακίνητα της Λάρισας τα δουλεύουμε όπως και της Αττικής: αυτοψία, καθαρή εικόνα για το τι ισχύει, φάκελος ως το τέλος.', en: 'Our office is in Athens, but Vaios Liapis comes from Larissa and works with a colleague in the city. We handle properties in Larissa the same way we do in Attica: a site visit, a clear picture of where things stand, and the file seen through to the end.' },
        'pg.lar.s1.t': { el: 'Πώς οργανώνουμε μια υπόθεση στη Λάρισα', en: 'How we organise a case in Larissa' },
        'pg.lar.s1.p1': { el: 'Το μεγαλύτερο μέρος της δουλειάς δεν απαιτεί φυσική παρουσία. Η αναζήτηση της άδειας και των σχεδίων, ο έλεγχος των τίτλων και του Κτηματολογίου, οι υπολογισμοί και οι υποβολές στις πλατφόρμες του ΤΕΕ και του e-Άδειες γίνονται ηλεκτρονικά. Στο ακίνητο χρειάζεται η αυτοψία και η αποτύπωση.', en: 'Most of the work does not need anyone on site. Tracing the permit and drawings, checking title deeds and the Land Registry, the calculations and the filings on the TEE and e-Adeies platforms are all done online. What needs the property itself is the site visit and the measured survey.' },
        'pg.lar.s2.t': { el: 'Τα βήματα', en: 'The steps' },
        'pg.lar.s2.i1': { el: 'Πρώτη ενημέρωση στο τηλέφωνο ή με email. Μας στέλνετε τίτλο, ΚΑΕΚ και όσα σχέδια έχετε.', en: 'A first conversation by phone or email. You send us the title deed, the Land Registry number (KAEK) and whatever drawings you have.' },
        'pg.lar.s2.i2': { el: 'Αν δεν έχετε τον φάκελο της άδειας, τον ζητάμε εμείς από την αρμόδια Υπηρεσία Δόμησης.', en: 'If you don’t have the permit file, we request it from the competent building authority.' },
        'pg.lar.s2.i3': { el: 'Αυτοψία και αποτύπωση στο ακίνητο, σε ημερομηνία που κλείνουμε μαζί.', en: 'Site visit and survey at the property, on a date we agree together.' },
        'pg.lar.s2.i4': { el: 'Σύγκριση με τα εγκεκριμένα σχέδια, ενημέρωση για ό,τι βρέθηκε και ολοκλήρωση του φακέλου.', en: 'Comparison with the approved drawings, a briefing on what we found, and completion of the file.' },
        'pg.lar.s3.t': { el: 'Τι ελέγχουμε με ιδιαίτερη προσοχή', en: 'What we look at especially closely' },
        'pg.lar.s3.i1': { el: 'Παλιές μονοκατοικίες και διώροφα με προσθήκες που δεν φαίνονται στην άδεια', en: 'Older houses and two-storey homes with additions that are not on the permit' },
        'pg.lar.s3.i2': { el: 'Αποθήκες και βοηθητικά κτίσματα σε οικόπεδα και αγροτεμάχια εκτός σχεδίου', en: 'Storerooms and outbuildings on plots and farmland outside the town plan' },
        'pg.lar.s3.i3': { el: 'Κτίρια που επισκευάστηκαν μετά τους σεισμούς του Μαρτίου 2021, για το αν οι εργασίες καλύπτονται από την έγκριση που χρειαζόταν', en: 'Buildings repaired after the March 2021 earthquakes, to check whether the works are covered by the approval they needed' },
        'pg.lar.s3.i4': { el: 'Ακίνητα από κληρονομιά, όπου συχνά λείπουν σχέδια και οι εγγραφές στο Κτηματολόγιο θέλουν έλεγχο', en: 'Inherited property, where drawings are often missing and the Land Registry entries need checking' },
        'pg.lar.s4.t': { el: 'Υπηρεσίες στη Λάρισα', en: 'Services in Larissa' },
        'pg.lar.s4.p1': { el: 'Οι δύο πιο συχνές αφορμές είναι η μεταβίβαση και τα αυθαίρετα. Για τις υπόλοιπες εργασίες, όπως άδειες, ΠΕΑ ή τοπογραφικά, μιλάμε πρώτα για το ακίνητο και σας λέμε αν και πώς τις αναλαμβάνουμε.', en: 'The two most common reasons people call are a property transfer and unauthorised works. For other jobs, such as permits, energy certificates or surveys, we first talk about the property and tell you whether and how we can take it on.' },
        'pg.lar.q1': { el: 'Χρειάζεται να έρθω στην Αθήνα;', en: 'Do I need to come to Athens?' },
        'pg.lar.a1': { el: 'Όχι. Τα έγγραφα τα ανταλλάσσουμε ηλεκτρονικά και η αυτοψία γίνεται στο ακίνητο, στη Λάρισα. Ό,τι θέλει την υπογραφή σας γίνεται ψηφιακά ή με ταχυδρομείο.', en: 'No. Documents are exchanged online and the site visit takes place at the property in Larissa. Anything that needs your signature is signed digitally or by post.' },
        'pg.lar.q2': { el: 'Πόσο γρήγορα γίνεται η αυτοψία;', en: 'How soon can the site visit happen?' },
        'pg.lar.a2': { el: 'Την προγραμματίζουμε με βάση τη δική σας προθεσμία, για παράδειγμα την ημερομηνία του συμβολαίου. Αν βιάζεστε, πείτε το μας από την πρώτη κουβέντα.', en: 'We schedule it around your deadline, for example the date of the contract. If you are in a hurry, tell us in our first conversation.' },
        'pg.lar.q3': { el: 'Η αμοιβή διαφέρει από την Αθήνα;', en: 'Is the fee different from Athens?' },
        'pg.lar.a3': { el: 'Εξαρτάται από το ακίνητο και την εργασία. Πριν ξεκινήσουμε παίρνετε γραπτή προσφορά, όπου φαίνεται ξεχωριστά και το κόστος της μετακίνησης.', en: 'It depends on the property and the job. Before we start you get a written quote, with the travel cost shown separately.' },
        'meta.htkl.title': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου Λάρισα · Μεταβίβαση | Β. Λιάπης', en: 'Building e-Identity in Larissa · Property Transfer | V. Liapis' },
        'meta.htkl.desc': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου και πιστοποιητικό πληρότητας για πώληση, γονική παροχή ή δωρεά ακινήτου στη Λάρισα. Αυτοψία, έλεγχος με τα σχέδια, έκδοση πριν το συμβόλαιο.', en: 'Building e-Identity and certificate of completeness for selling, gifting or transferring property in Larissa. Site visit, check against the drawings, issued before the contract.' },
        'pg.htkl.name': { el: 'Ηλεκτρονική Ταυτότητα Κτιρίου στη Λάρισα', en: 'Building e-Identity in Larissa' },
        'pg.htkl.lead': { el: 'Πουλάτε, μεταβιβάζετε ή κληρονομήσατε ακίνητο στη Λάρισα; Για το συμβόλαιο θα χρειαστείτε Ηλεκτρονική Ταυτότητα με πιστοποιητικό πληρότητας. Την ετοιμάζουμε με αυτοψία στο ακίνητο, και ο έλεγχος γίνεται πριν κλειστεί ημερομηνία.', en: 'Selling, transferring or inheriting a property in Larissa? The notary will need a Building e-Identity with a certificate of completeness. We prepare it with a visit to the property, and the check happens before a contract date is set.' },
        'pg.htkl.s1.t': { el: 'Τι ζητά ο συμβολαιογράφος', en: 'What the notary asks for' },
        'pg.htkl.s1.p1': { el: 'Από την 1η Φεβρουαρίου 2021 η μεταβίβαση ακινήτου γίνεται με την Ηλεκτρονική Ταυτότητα Κτιρίου ή Διηρημένης Ιδιοκτησίας και το πιστοποιητικό πληρότητας, που εκδίδεται στην πλατφόρμα του ΤΕΕ (άρθρα 52-56 ν.4495/2017). Το πιστοποιητικό ισχύει δύο μήνες από την αυτοψία, οπότε τον χρόνο τον μετράμε ανάποδα από την ημερομηνία του συμβολαίου.', en: 'Since 1 February 2021 a property transfer requires the Building (or Unit) e-Identity and the certificate of completeness issued on the Technical Chamber (TEE) platform (articles 52-56, Law 4495/2017). The certificate is valid for two months from the site visit, so we plan backwards from the contract date.' },
        'pg.htkl.s2.t': { el: 'Πώς δουλεύουμε', en: 'How we work' },
        'pg.htkl.s2.i1': { el: 'Μας στέλνετε ηλεκτρονικά τίτλο, ΚΑΕΚ και ό,τι σχέδια ή δηλώσεις υπάρχουν.', en: 'You send us the title deed, the KAEK and any drawings or earlier declarations online.' },
        'pg.htkl.s2.i2': { el: 'Αν λείπει η άδεια, την αναζητούμε στην αρμόδια Υπηρεσία Δόμησης.', en: 'If the permit is missing, we trace it at the competent building authority.' },
        'pg.htkl.s2.i3': { el: 'Αυτοψία και αποτύπωση στο ακίνητο.', en: 'Site visit and survey at the property.' },
        'pg.htkl.s2.i4': { el: 'Σύγκριση με τα εγκεκριμένα σχέδια. Αν βρεθεί διαφορά, μαθαίνετε πριν προχωρήσουμε αν τακτοποιείται και τι θα κοστίσει.', en: 'Comparison with the approved drawings. If something differs, you learn before we go further whether it can be legalised and what it will cost.' },
        'pg.htkl.s2.i5': { el: 'Καταχώριση στην πλατφόρμα του ΤΕΕ και έκδοση του πιστοποιητικού πληρότητας.', en: 'Entry on the TEE platform and issue of the certificate of completeness.' },
        'pg.htkl.s3.t': { el: 'Τι βρίσκουμε συχνά σε παλιά ακίνητα', en: 'What we often find in older properties' },
        'pg.htkl.s3.i1': { el: 'Κλειστούς ημιυπαίθριους και εσωτερικές αλλαγές που δεν φαίνονται στην άδεια', en: 'Enclosed balconies and internal changes that are not on the permit' },
        'pg.htkl.s3.i2': { el: 'Προσθήκες σε μονοκατοικίες και αποθήκες στην αυλή ή στο χωράφι, συχνά από προηγούμενους ιδιοκτήτες', en: 'Extensions to houses and storerooms in the yard or on the field, often built by previous owners' },
        'pg.htkl.s3.i3': { el: 'Διαφορές εμβαδού ανάμεσα σε τίτλο, άδεια και Κτηματολόγιο', en: 'Area differences between the title deed, the permit and the Land Registry' },
        'pg.htkl.s4.p_h': { el: 'Καμία από αυτές δεν ακυρώνει από μόνη της τη μεταβίβαση. Αν η αυθαιρεσία τακτοποιείται, γίνεται πρώτα η <a href="../taktopoiisi-afthaireton-larisa/">τακτοποίηση αυθαιρέτων στη Λάρισα</a> και μετά εκδίδεται το πιστοποιητικό.', en: 'None of these stops a transfer on its own. If the unauthorised work can be legalised, the <a href="../taktopoiisi-afthaireton-larisa/">legalisation in Larissa</a> comes first and the certificate is issued afterwards.' },
        'pg.htkl.q1': { el: 'Χρειάζεται ταυτότητα για γονική παροχή ή δωρεά;', en: 'Is an e-Identity needed for a parental gift or donation?' },
        'pg.htkl.a1': { el: 'Ναι, και στις δύο. Σε άλλες πράξεις, όπως η αποδοχή κληρονομιάς, οι κανόνες διαφέρουν. Σας ενημερώνουμε για τη δική σας περίπτωση.', en: 'Yes, for both. Other acts, such as accepting an inheritance, follow different rules; we’ll tell you what applies to your case.' },
        'pg.htkl.q2': { el: 'Μένω στην Αθήνα και το ακίνητο είναι στη Λάρισα. Πρέπει να ταξιδέψω;', en: 'I live in Athens and the property is in Larissa. Do I have to travel?' },
        'pg.htkl.a2': { el: 'Όχι. Αρκεί να είναι κάποιος στο ακίνητο την ημέρα της αυτοψίας· τα υπόλοιπα γίνονται από απόσταση.', en: 'No. Someone just needs to be at the property on the day of the visit; everything else is done remotely.' },
        'pg.htkl.q3': { el: 'Πόσο ισχύει το πιστοποιητικό πληρότητας;', en: 'How long is the certificate of completeness valid?' },
        'pg.htkl.a3': { el: 'Δύο μήνες από την αυτοψία. Αν το συμβόλαιο αναβληθεί πέρα από αυτό, χρειάζεται νέα αυτοψία και νέο πιστοποιητικό.', en: 'Two months from the site visit. If the contract is postponed beyond that, a new visit and a new certificate are needed.' },
        'meta.takl.title': { el: 'Τακτοποίηση Αυθαιρέτων Λάρισα · ν.4495/2017 | Β. Λιάπης', en: 'Legalising Unauthorised Works in Larissa · Law 4495/2017 | V. Liapis' },
        'meta.takl.desc': { el: 'Τακτοποίηση αυθαιρέτων στη Λάρισα κατά τον ν.4495/2017: αυτοψία, κατάταξη, πρόστιμο πριν αποφασίσετε και φάκελος ως την περαίωση. Κατηγορίες 1-4 έως 31/3/2028.', en: 'Legalising unauthorised works in Larissa under Law 4495/2017: site visit, classification, the fine before you decide, and the file through to completion. Categories 1-4 until 31/3/2028.' },
        'pg.takl.name': { el: 'Τακτοποίηση αυθαιρέτων στη Λάρισα', en: 'Legalising unauthorised works in Larissa' },
        'pg.takl.lead': { el: 'Ετοιμάζετε πώληση ή γονική παροχή, ή θέλετε απλώς να ξέρετε πού στέκεται το ακίνητό σας στη Λάρισα; Ξεκινάμε με αυτοψία και υπολογισμό του προστίμου, πριν δεσμευτείτε σε οτιδήποτε.', en: 'Preparing a sale or a parental gift, or simply want to know where your property in Larissa stands? We start with a site visit and a calculation of the fine, before you commit to anything.' },
        'pg.takl.s1.t': { el: 'Τι μπορεί να τακτοποιηθεί', en: 'What can be legalised' },
        'pg.takl.s1.p1': { el: 'Ο ν.4495/2017 επιτρέπει να εξαιρεθούν από την κατεδάφιση αυθαίρετες κατασκευές και χρήσεις που έγιναν έως τις 28/7/2011, με πρόστιμο που εξαρτάται από την κατηγορία της παράβασης, το εμβαδόν και την τιμή ζώνης. Για τις κατηγορίες 1-4 η υπαγωγή είναι ανοιχτή έως τις 31/3/2028.', en: 'Law 4495/2017 lets unauthorised construction and changes of use made up to 28/7/2011 be exempted from demolition, against a fine that depends on the category of the breach, the area and the official zone value. For categories 1-4, applications are open until 31/3/2028.' },
        'pg.takl.s2.t': { el: 'Τι συναντάμε πιο συχνά', en: 'What we come across most' },
        'pg.takl.s2.i1': { el: 'Ημιυπαίθριους που έκλεισαν και έγιναν δωμάτια ή κουζίνα', en: 'Semi-open balconies enclosed to become rooms or kitchens' },
        'pg.takl.s2.i2': { el: 'Υπερβάσεις δόμησης σε μονοκατοικίες και προσθήκες ορόφου', en: 'Excess floor area in houses and added storeys' },
        'pg.takl.s2.i3': { el: 'Αποθήκες, στέγαστρα και βοηθητικά κτίσματα σε οικόπεδα και αγροτεμάχια', en: 'Storerooms, canopies and outbuildings on plots and farmland' },
        'pg.takl.s2.i4': { el: 'Αλλαγές χρήσης, όπως αποθήκη ή υπόγειο που έγινε κατοικία', en: 'Changes of use, such as a storeroom or basement turned into living space' },
        'pg.takl.s3.p_h': { el: 'Για κάθε περίπτωση βρίσκουμε σε ποια κατηγορία ανήκει, πόσο βγαίνει το πρόστιμο και αν σας συμφέρει η τακτοποίηση ή η επαναφορά στην αρχική κατάσταση.', en: 'For each case we work out its category, the fine, and whether legalising it or restoring the original state makes more sense for you.' },
        'pg.takl.s4.t': { el: 'Πώς δουλεύουμε', en: 'How we work' },
        'pg.takl.s4.i1': { el: 'Συλλογή τίτλων, άδειας και σχεδίων, από την Υπηρεσία Δόμησης αν χρειαστεί.', en: 'Collecting title deeds, permit and drawings, from the building authority if needed.' },
        'pg.takl.s4.i2': { el: 'Αυτοψία, αποτύπωση και σύγκριση με την άδεια.', en: 'Site visit, survey and comparison with the permit.' },
        'pg.takl.s4.i3': { el: 'Κατάταξη και υπολογισμός του προστίμου. Τα παίρνετε γραπτώς πριν την υπαγωγή.', en: 'Classification and calculation of the fine, given to you in writing before filing.' },
        'pg.takl.s4.i4': { el: 'Υπαγωγή στο σύστημα του ΤΕΕ, παρακολούθηση των δόσεων και περαίωση.', en: 'Filing on the TEE system, follow-up of the instalments and completion.' },
        'pg.takl.q1': { el: 'Τι γίνεται με αυθαίρετα μετά τις 28/7/2011;', en: 'What about unauthorised works after 28/7/2011?' },
        'pg.takl.a1': { el: 'Δεν τακτοποιούνται με τον ν.4495/2017. Σε αυτή την περίπτωση εξετάζουμε αν μπορούν να νομιμοποιηθούν με άδεια ή αν πρέπει να αποκατασταθεί η αρχική κατάσταση.', en: 'They cannot be legalised under Law 4495/2017. In that case we look at whether they can be covered by a permit or whether the original state has to be restored.' },
        'pg.takl.q2': { el: 'Έχω δήλωση από παλαιότερο νόμο. Ισχύει ακόμα;', en: 'I have a declaration under an older law. Is it still valid?' },
        'pg.takl.a2': { el: 'Οι δηλώσεις των ν.3843/2010, ν.4014/2011 και ν.4178/2013 μεταφέρονται στον ν.4495/2017 και συχνά θέλουν συμπλήρωση. Τις ελέγχουμε και σας λέμε τι λείπει.', en: 'Declarations under Laws 3843/2010, 4014/2011 and 4178/2013 are carried over to Law 4495/2017 and often need completing. We check yours and tell you what is missing.' },
        'pg.takl.q3': { el: 'Τακτοποιείται κτίσμα σε αγροτεμάχιο εκτός σχεδίου;', en: 'Can a building on farmland outside the town plan be legalised?' },
        'pg.takl.a3': { el: 'Συχνά ναι, αλλά οι όροι δεν είναι ίδιοι με τα κτίρια εντός σχεδίου. Πρώτα ελέγχουμε την αρτιότητα και τη θέση του γηπέδου, και μετά σας δίνουμε εκτίμηση.', en: 'Often yes, but the terms differ from buildings inside the town plan. We first check the plot’s eligibility and location, then give you an estimate.' },
        'pg.crumb.lar': { el: 'Λάρισα', en: 'Larissa' },
        'nav.svc.lar': { el: 'Λάρισα', en: 'Larissa' },

        /* ΟΡΑΤΟΤΗΤΑ AI (ai #Α1 #Α2 #Α4) */
        'pg.bio.name': { el: 'Βάιος Λιάπης, πολιτικός μηχανικός', en: 'Vaios Liapis, civil engineer' },
        'pg.bio.lead': { el: 'Διπλωματούχος πολιτικός μηχανικός του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης, με μεταπτυχιακό από το Πανεπιστήμιο Θεσσαλίας. Από το 2016 δουλεύει σε ό,τι χρειάζεται ένα ακίνητο για να είναι νόμιμο και να μεταβιβάζεται, με γραφείο στην Αθήνα και υποθέσεις σε όλη την Αττική και στη Λάρισα.', en: 'Civil engineer with a diploma from the Aristotle University of Thessaloniki and a master’s degree from the University of Thessaly. Since 2016 he has worked on what a property needs to be legal and transferable, from an office in Athens, with cases across Attica and in Larissa.' },
        'pg.bio.f1.k': { el: 'Ιδιότητα', en: 'Profession' },
        'pg.bio.f1.v': { el: 'Πολιτικός μηχανικός, δίπλωμα ΑΠΘ', en: 'Civil engineer, diploma from AUTh' },
        'pg.bio.f2.k': { el: 'Μεταπτυχιακό', en: 'Postgraduate' },
        'pg.bio.f2.v': { el: 'MSc, Πανεπιστήμιο Θεσσαλίας', en: 'MSc, University of Thessaly' },
        'pg.bio.f3.k': { el: 'Στο επάγγελμα', en: 'In practice' },
        'pg.bio.f3.v': { el: 'Από το 2016', en: 'Since 2016' },
        'pg.bio.f4.k': { el: 'Γραφείο', en: 'Office' },
        'pg.bio.f4.v': { el: 'Δελβίνου 31, 113 63 Αθήνα', en: '31 Delvinou St, 113 63 Athens' },
        'pg.bio.f5.k': { el: 'Περιοχές', en: 'Areas' },
        'pg.bio.f5.v': { el: 'Αθήνα, Αττική, Λάρισα', en: 'Athens, Attica, Larissa' },
        'pg.bio.tel': { el: 'Τηλέφωνο', en: 'Phone' },
        'pg.bio.s1': { el: 'Με μια ματιά', en: 'At a glance' },
        'pg.bio.s2': { el: 'Τι αναλαμβάνει', en: 'What he takes on' },
        'pg.bio.s2p': { el: 'Τα περισσότερα αιτήματα αφορούν την Ηλεκτρονική Ταυτότητα Κτιρίου για μεταβιβάσεις και την τακτοποίηση αυθαιρέτων. Ως σήμερα μετρά πάνω από 300 ταυτότητες κτιρίων και πάνω από 100 περαιωμένες τακτοποιήσεις.', en: 'Most requests concern the Building e-Identity for property transfers and the legalisation of unauthorised works. To date he has completed more than 300 building e-Identities and more than 100 legalisations.' },
        'pg.bio.s3': { el: 'Πώς δουλεύει', en: 'How he works' },
        'pg.bio.s3p': { el: 'Κάθε υπόθεση ξεκινά με αυτοψία. Πριν από οποιαδήποτε δέσμευση, ο ιδιοκτήτης ξέρει τι βρέθηκε, τι χρειάζεται, πόσο κοστίζει και πόσο θα κρατήσει. Για διορθώσεις στο Κτηματολόγιο συνεργάζεται με συμβολαιογράφο και, όταν το ζήτημα είναι νομικό, με δικηγόρο.', en: 'Every case starts with a site visit. Before committing to anything, the owner knows what was found, what is needed, what it costs and how long it will take. For Land Registry corrections he works with a notary and, when the issue is legal, with a lawyer.' },
        'meta.bio.title': { el: 'Βάιος Λιάπης · Πολιτικός Μηχανικός ΑΠΘ, Αθήνα & Λάρισα', en: 'Vaios Liapis · Civil Engineer (AUTh), Athens & Larissa' },
        'meta.bio.desc': { el: 'Ο Βάιος Λιάπης είναι πολιτικός μηχανικός ΑΠΘ με γραφείο στην Αθήνα, από το 2016: Ηλεκτρονική Ταυτότητα Κτιρίου, τακτοποίηση αυθαιρέτων, άδειες, σε Αττική και Λάρισα.', en: 'Vaios Liapis is a civil engineer (AUTh) based in Athens since 2016: Building e-Identity, legalisation of unauthorised works and permits, in Attica and Larissa.' },
        'pg.nea.name': { el: 'Νέα και αλλαγές στη νομοθεσία', en: 'News and changes in the law' },
        'pg.nea.lead': { el: 'Αλλαγές σε νόμους, προθεσμίες και πλατφόρμες που αφορούν ακίνητα, άδειες και αυθαίρετα, με την πηγή τους.', en: 'Changes in laws, deadlines and platforms affecting property, permits and unauthorised works, with their source.' },
        'nea.1.c': { el: 'Οικοδομικές άδειες', en: 'Building permits' },
        'nea.1.t': { el: 'Έως 30/6/2027 οι αιτήσεις με τις μεταβατικές διατάξεις', en: 'Transitional-rule applications extended to 30/6/2027' },
        'nea.1.s': { el: 'Ο ν.5317/2026 μετέθεσε από 30/6/2026 σε 30/6/2027 την προθεσμία για άδειες και προεγκρίσεις σε ακίνητα που πληρούσαν τις προϋποθέσεις πριν από τις 9/12/2020.', en: 'Law 5317/2026 moved the deadline from 30/6/2026 to 30/6/2027 for permits and pre-approvals on properties that met the requirements before 9/12/2020.' },
        'nea.2.c': { el: 'Αυθαίρετα', en: 'Unauthorised works' },
        'nea.2.t': { el: 'Κατεδαφίσεις: προτεραιότητα στα πρωτόκολλα ως 30/6/2027', en: 'Demolitions: priority for orders issued by 30/6/2027' },
        'nea.2.s': { el: 'Οι οριστικές εκθέσεις αυτοψίας και τα πρωτόκολλα κατεδάφισης που έχουν εκδοθεί μέχρι τις 30/6/2027 εκτελούνται κατά προτεραιότητα. Όποιος έχει αυθαίρετο που τακτοποιείται, καλό είναι να μην περιμένει.', en: 'Final inspection reports and demolition orders issued by 30/6/2027 are executed first. If your unauthorised work can be legalised, it is better not to wait.' },
        'nea.3.c': { el: 'e-Άδειες', en: 'e-Adeies' },
        'nea.3.t': { el: 'Επανέκδοση οικοδομικής άδειας μέσα από το e-Άδειες', en: 'Building-permit reissue now available on e-Adeies' },
        'nea.3.s': { el: 'Το σύστημα δέχεται πλέον την πράξη «Επανέκδοση Ο.Α.» του άρθρου 68 ν.5197/2025, για άδειες που ακυρώθηκαν ή εκκρεμεί η ακύρωσή τους, εφόσον οι εργασίες είχαν ξεκινήσει ως τις 11/12/2024.', en: 'The platform now accepts the permit-reissue act of article 68, law 5197/2025, for permits annulled or under challenge, provided works had started by 11/12/2024.' },
        'nea.4.c': { el: 'Αυθαίρετα', en: 'Unauthorised works' },
        'nea.4.t': { el: 'Τακτοποίηση αυθαιρέτων κατηγοριών 1-4 έως 31/3/2028', en: 'Legalising category 1-4 works until 31/3/2028' },
        'nea.4.s': { el: 'Το άρθρο 43 του ν.5270/2026 παρατείνει την υπαγωγή στον ν.4495/2017 για τις κατηγορίες 1 έως 4. Το πρόστιμο υπολογίζεται στην αρχή, μετά την αυτοψία.', en: 'Article 43 of law 5270/2026 extends applications under law 4495/2017 for categories 1 to 4. The fine is calculated at the start, after the site survey.' },
        'nea.5.c': { el: 'Ταυτότητα κτιρίου', en: 'Building e-Identity' },
        'nea.5.t': { el: 'Ηλεκτρονική Ταυτότητα: παράταση έως 1/2/2028 για κτίρια ειδικής χρήσης', en: 'Building e-Identity: special-use buildings extended to 1/2/2028' },
        'nea.5.s': { el: 'Ο ίδιος νόμος δίνει προθεσμία ως την 1η Φεβρουαρίου 2028 για ορισμένες κατηγορίες κτιρίων ειδικής χρήσης, καθώς και για ακίνητα του Δημοσίου και των δήμων.', en: 'The same law sets 1 February 2028 as the deadline for certain categories of special-use buildings and for state and municipal property.' },
        'nea.6.c': { el: 'ΝΟΚ', en: 'Building code' },
        'nea.6.t': { el: 'Άδειες με κίνητρα ΝΟΚ: επανέκδοση το αργότερο ως 31/12/2026', en: 'Permits with building-code bonuses: reissue by 31/12/2026' },
        'nea.6.s': { el: 'Για τις άδειες που θίγονται από τις αποφάσεις του ΣτΕ για τα κίνητρα του ΝΟΚ, η επανέκδοση μέσω e-Άδειες γίνεται το αργότερο ως τις 31/12/2026.', en: 'For permits affected by the Council of State rulings on building-code bonuses, reissue through e-Adeies must happen by 31/12/2026 at the latest.' },
        'nea.src': { el: 'Πηγή:', en: 'Source:' },
        'meta.nea.title': { el: 'Νέα για Αυθαίρετα, Άδειες και Ταυτότητα Κτιρίου | Β. Λιάπης', en: 'News on Unauthorised Works, Permits and Building e-Identity | V. Liapis' },
        'meta.nea.desc': { el: 'Τι άλλαξε σε τακτοποίηση αυθαιρέτων, οικοδομικές άδειες, e-Άδειες και Ηλεκτρονική Ταυτότητα Κτιρίου: προθεσμίες και νόμοι του 2026, με την πηγή τους.', en: 'What changed in the legalisation of unauthorised works, building permits, e-Adeies and the Building e-Identity: 2026 deadlines and laws, with sources.' },
        'pg.answer': { el: 'Με λίγα λόγια', en: 'In short' },
        'pg.updated': { el: 'Ενημερώθηκε: 23/9/2026', en: 'Updated: 23/9/2026' },
        'nav.news': { el: 'Νέα', en: 'News' },
        'nav.bio': { el: 'Βάιος Λιάπης', en: 'Vaios Liapis' },
        'about.more': { el: 'Περισσότερα για τον Βάιο Λιάπη', en: 'More about Vaios Liapis' },
        'pg.tak.answer': { el: 'Αυθαιρεσίες που είχαν ολοκληρωθεί έως τον Ιούλιο του 2011 και ανήκουν στις κατηγορίες 1-4 τακτοποιούνται με πρόστιμο κατά τον ν.4495/2017, με υπαγωγή έως τις 31 Μαρτίου 2028. Ξεκινάμε με αυτοψία και μαθαίνετε το πρόστιμο πριν αποφασίσετε.', en: 'Unauthorised works completed by July 2011 and falling into categories 1-4 can be legalised against a fine under Law 4495/2017, with applications open until 31 March 2028. We start with a site visit and you know the fine before you decide.' },
        'pg.htk.answer': { el: 'Από 1/2/2021 κάθε μεταβίβαση ακινήτου γίνεται με Ηλεκτρονική Ταυτότητα Κτιρίου και πιστοποιητικό πληρότητας, που ισχύει δύο μήνες από την αυτοψία. Αυτό εννοεί σήμερα ο συμβολαιογράφος όταν ζητά «βεβαίωση μηχανικού».', en: 'Since 1/2/2021 every property transfer requires a Building e-Identity and a certificate of completeness, valid for two months from the site visit. That is what the notary means today by an “engineer’s certificate”.' },
        'pg.oik.answer': { el: 'Νέα οικοδομή και προσθήκη θέλουν άδεια δόμησης· μικρότερες εργασίες γίνονται με Έγκριση Εργασιών Μικρής Κλίμακας (άρθρο 29 ν.4495/2017). Και οι δύο εκδίδονται μόνο ηλεκτρονικά στο e-Άδειες, από μηχανικό.', en: 'New buildings and extensions need a building permit; smaller works need a Minor-Works Approval (article 29, Law 4495/2017). Both are issued only online on e-Adeies, by an engineer.' },
        'pg.pea.answer': { el: 'ΠΕΑ χρειάζεται σε πώληση, σε μίσθωση σε νέο ενοικιαστή, σε νέο κτίριο και μετά από ριζική ανακαίνιση, και για διαμερίσματα κάτω από 50 τ.μ. (άρθρο 12 ν.4122/2013). Ο αριθμός του γράφεται στο συμβόλαιο και στη δήλωση μίσθωσης.', en: 'An EPC is needed for a sale, a lease to a new tenant, a new building and after a major renovation, including flats under 50 m² (article 12, Law 4122/2013). Its number goes on the contract and the lease declaration.' },
        'pg.topo.answer': { el: 'Τοπογραφικό χρειάζεται για οικοδομική άδεια, διόρθωση στο Κτηματολόγιο, κατάτμηση ή συνένωση και έλεγχο αρτιότητας. Από 7/4/2026 δεν επισυνάπτεται σε μεταβιβάσεις σε περιοχές με Κτηματολόγιο σε λειτουργία, όπως η Αττική, αν δεν αλλάζουν τα όρια (ν.5293/2026).', en: 'A topographic survey is needed for a building permit, a Land Registry correction, subdivision or merger, and to check whether a plot is buildable. Since 7/4/2026 it is no longer attached to transfers in areas with an operating Land Registry, such as Attica, if the boundaries do not change (Law 5293/2026).' },
        'pg.ktim.answer': { el: 'Εμβαδόν και όρια διορθώνονται με αίτηση στο Κτηματολόγιο, με τοπογραφικό μεταβολών και σύμφωνη γνώμη των ομόρων (άρθρο 19 §2 ν.2664/1998). Το τοπογραφικό το ετοιμάζουμε εμείς και την αίτηση την υποβάλλει ο συνεργαζόμενος συμβολαιογράφος.', en: 'Area and boundaries are corrected by an application to the Land Registry, with a survey of changes and the consent of affected neighbours (article 19 §2, Law 2664/1998). We prepare the survey and our partner notary files the application.' },
        'pg.adl.answer': { el: 'Για τα περισσότερα καταστήματα υγειονομικού ενδιαφέροντος δεν εκδίδεται πια άδεια: η λειτουργία γνωστοποιείται ηλεκτρονικά (ν.4442/2016) και ο έλεγχος γίνεται μετά. Ο μηχανικός βεβαιώνει ότι ο χώρος είναι νόμιμος και πληροί τις προϋποθέσεις της χρήσης.', en: 'Most food-service businesses no longer get a licence: opening is notified online (Law 4442/2016) and inspections come afterwards. The engineer certifies that the premises are legal and meet the requirements for the use.' },
        'pg.anak.answer': { el: 'Οι περισσότερες ανακαινίσεις δεν θέλουν οικοδομική άδεια· για εσωτερικές εργασίες που δεν αγγίζουν τον φέροντα οργανισμό αρκεί ηλεκτρονική ενημέρωση στο e-Άδειες πριν ξεκινήσουν (άρθρο 30 ν.4495/2017). Αν αγγίζουν όψεις, φέροντα οργανισμό ή χρήση, χρειάζεται έγκριση ή άδεια.', en: 'Most renovations need no building permit; for interior works that do not touch the structure, an online notification on e-Adeies before work starts is enough (article 30, Law 4495/2017). If the works affect façades, structure or use, an approval or permit is needed.' },
        'pg.epiv.answer': { el: 'Ο επιβλέπων μηχανικός ελέγχει ότι η κατασκευή γίνεται σύμφωνα με την άδεια και τις μελέτες, με κρισιμότερο σημείο τον οπλισμό πριν από κάθε σκυροδέτηση. Για τον ιδιοκτήτη ελέγχει και υλικά, επιμετρήσεις και λογαριασμούς του εργολάβου πριν πληρωθούν.', en: 'The supervising engineer checks that construction follows the permit and the studies, the most critical point being the reinforcement before every concrete pour. For the owner, he also checks materials, measurements and the contractor’s bills before they are paid.' },

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
    const EXP_START_YEAR = 2016;
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
