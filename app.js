/**
 * LGIF Mångkamp Score Tracker App
 * Supports multiple age groups and genders with correct event programs
 * Based on Swedish Athletics Federation (Friidrottsförbundet) rules
 */

// Localization
let currentLang = localStorage.getItem('lgif-lang') || 'sv';

const LANGUAGES = ['sv', 'en', 'de', 'fr'];

const translations = {
    sv: {
        girls: 'Flickor',
        boys: 'Pojkar',
        indoor: 'Inomhus',
        outdoor: 'Utomhus',
        totalPoints: 'Totalpoäng',
        clear: 'Rensa',
        save: 'Spara',
        savedResults: 'Sparade resultat',
        noResults: 'Inga sparade resultat',
        load: 'Ladda',
        delete: 'Ta bort',
        namePrompt: 'Namn på tävlande:',
        unknown: 'Okänd',
        indoorShort: '(Inom)',
        outdoorShort: '(Utom)',
        points: 'poäng',
        aboutTitle: 'LGIF Mångkamp Poängräknare',
        version: 'Version',
        developer: 'Utvecklare',
        feedback: 'Feedback',
        copyright: 'Alla rättigheter förbehållna',
        infoTitle: 'Poängberäkning',
        infoLink: 'IAAF Scoring Tables (PDF)',
        aboutTooltip: 'Om appen',
        infoTooltip: 'Hur beräknas dessa värden?',
        langTooltip: 'Byt språk',
        // Event names
        '60m': '60m',
        '100m': '100m',
        '200m': '200m',
        '400m': '400m',
        '600m': '600m',
        '800m': '800m',
        '1000m': '1000m',
        '1500m': '1500m',
        '60mH': '60m häck',
        '80mH': '80m häck',
        '100mH': '100m häck',
        '110mH': '110m häck',
        'highJump': 'Höjd',
        'longJump': 'Längd',
        'poleVault': 'Stav',
        'shotPut': 'Kula',
        'discus': 'Diskus',
        'javelin': 'Spjut',
        // Toast/formula text
        'time': 'tid',
        'formula': 'Formel',
        // Categories
        'F-12-13': 'F12-13',
        'F-14-15': 'F14-15',
        'F-16-17': 'F16-17',
        'F-senior': 'K (Kvinnor)',
        'P-12-13': 'P12-13',
        'P-14-15': 'P14-15',
        'P-16-17': 'P16-17',
        'P-senior': 'M (Män)'
    },
    en: {
        girls: 'Girls',
        boys: 'Boys',
        indoor: 'Indoor',
        outdoor: 'Outdoor',
        totalPoints: 'Total Points',
        clear: 'Clear',
        save: 'Save',
        savedResults: 'Saved Results',
        noResults: 'No saved results',
        load: 'Load',
        delete: 'Delete',
        namePrompt: 'Athlete name:',
        unknown: 'Unknown',
        indoorShort: '(Indoor)',
        outdoorShort: '(Outdoor)',
        points: 'points',
        aboutTitle: 'LGIF Combined Events Calculator',
        version: 'Version',
        developer: 'Developer',
        feedback: 'Feedback',
        copyright: 'All rights reserved',
        infoTitle: 'Score Calculation',
        infoLink: 'IAAF Scoring Tables (PDF)',
        aboutTooltip: 'About the app',
        infoTooltip: 'How are the scores calculated?',
        langTooltip: 'Change language',
        // Event names
        '60m': '60m',
        '100m': '100m',
        '200m': '200m',
        '400m': '400m',
        '600m': '600m',
        '800m': '800m',
        '1000m': '1000m',
        '1500m': '1500m',
        '60mH': '60m hurdles',
        '80mH': '80m hurdles',
        '100mH': '100m hurdles',
        '110mH': '110m hurdles',
        'highJump': 'High Jump',
        'longJump': 'Long Jump',
        'poleVault': 'Pole Vault',
        'shotPut': 'Shot Put',
        'discus': 'Discus',
        'javelin': 'Javelin',
        // Toast/formula text
        'time': 'time',
        'formula': 'Formula',
        // Categories
        'F-12-13': 'G12-13 (Girls)',
        'F-14-15': 'G14-15 (Girls)',
        'F-16-17': 'G16-17 (Girls)',
        'F-senior': 'W (Women)',
        'P-12-13': 'B12-13 (Boys)',
        'P-14-15': 'B14-15 (Boys)',
        'P-16-17': 'B16-17 (Boys)',
        'P-senior': 'M (Men)'
    },
    de: {
        girls: 'Mädchen',
        boys: 'Jungen',
        indoor: 'Halle',
        outdoor: 'Freiluft',
        totalPoints: 'Gesamtpunkte',
        clear: 'Löschen',
        save: 'Speichern',
        savedResults: 'Gespeicherte Ergebnisse',
        noResults: 'Keine gespeicherten Ergebnisse',
        load: 'Laden',
        delete: 'Löschen',
        namePrompt: 'Name des Athleten:',
        unknown: 'Unbekannt',
        indoorShort: '(Halle)',
        outdoorShort: '(Freiluft)',
        points: 'Punkte',
        aboutTitle: 'LGIF Mehrkampf Punkterechner',
        version: 'Version',
        developer: 'Entwickler',
        feedback: 'Feedback',
        copyright: 'Alle Rechte vorbehalten',
        infoTitle: 'Punkteberechnung',
        infoLink: 'IAAF Scoring Tables (PDF)',
        aboutTooltip: 'Über die App',
        infoTooltip: 'Wie werden die Punkte berechnet?',
        langTooltip: 'Sprache ändern',
        // Event names
        '60m': '60m',
        '100m': '100m',
        '200m': '200m',
        '400m': '400m',
        '600m': '600m',
        '800m': '800m',
        '1000m': '1000m',
        '1500m': '1500m',
        '60mH': '60m Hürden',
        '80mH': '80m Hürden',
        '100mH': '100m Hürden',
        '110mH': '110m Hürden',
        'highJump': 'Hochsprung',
        'longJump': 'Weitsprung',
        'poleVault': 'Stabhochsprung',
        'shotPut': 'Kugelstoßen',
        'discus': 'Diskuswurf',
        'javelin': 'Speerwurf',
        // Toast/formula text
        'time': 'Zeit',
        'formula': 'Formel',
        // Categories
        'F-12-13': 'M12-13 (Mädchen)',
        'F-14-15': 'M14-15 (Mädchen)',
        'F-16-17': 'M16-17 (Mädchen)',
        'F-senior': 'F (Frauen)',
        'P-12-13': 'J12-13 (Jungen)',
        'P-14-15': 'J14-15 (Jungen)',
        'P-16-17': 'J16-17 (Jungen)',
        'P-senior': 'M (Männer)'
    },
    fr: {
        girls: 'Filles',
        boys: 'Garçons',
        indoor: 'Salle',
        outdoor: 'Plein air',
        totalPoints: 'Points totaux',
        clear: 'Effacer',
        save: 'Enregistrer',
        savedResults: 'Résultats enregistrés',
        noResults: 'Aucun résultat enregistré',
        load: 'Charger',
        delete: 'Supprimer',
        namePrompt: "Nom de l'athlète:",
        unknown: 'Inconnu',
        indoorShort: '(Salle)',
        outdoorShort: '(Ext.)',
        points: 'points',
        aboutTitle: 'LGIF Calculateur Épreuves Combinées',
        version: 'Version',
        developer: 'Développeur',
        feedback: 'Commentaires',
        copyright: 'Tous droits réservés',
        infoTitle: 'Calcul des points',
        infoLink: 'IAAF Scoring Tables (PDF)',
        aboutTooltip: "À propos de l'application",
        infoTooltip: 'Comment les points sont-ils calculés?',
        langTooltip: 'Changer de langue',
        // Event names
        '60m': '60m',
        '100m': '100m',
        '200m': '200m',
        '400m': '400m',
        '600m': '600m',
        '800m': '800m',
        '1000m': '1000m',
        '1500m': '1500m',
        '60mH': '60m haies',
        '80mH': '80m haies',
        '100mH': '100m haies',
        '110mH': '110m haies',
        'highJump': 'Saut en hauteur',
        'longJump': 'Saut en longueur',
        'poleVault': 'Saut à la perche',
        'shotPut': 'Lancer du poids',
        'discus': 'Lancer du disque',
        'javelin': 'Lancer du javelot',
        // Toast/formula text
        'time': 'temps',
        'formula': 'Formule',
        // Categories
        'F-12-13': 'F12-13 (Filles)',
        'F-14-15': 'F14-15 (Filles)',
        'F-16-17': 'F16-17 (Filles)',
        'F-senior': 'F (Femmes)',
        'P-12-13': 'G12-13 (Garçons)',
        'P-14-15': 'G14-15 (Garçons)',
        'P-16-17': 'G16-17 (Garçons)',
        'P-senior': 'H (Hommes)'
    }
};

function t(key) {
    return translations[currentLang][key] || key;
}

function updateUILanguage() {
    // Update category dropdown
    const categorySelect = document.getElementById('categorySelect');
    CATEGORIES.forEach((cat, i) => {
        categorySelect.options[i].text = t(cat);
    });

    // Update mode buttons
    document.getElementById('indoorBtn').textContent = t('indoor');
    document.getElementById('outdoorBtn').textContent = t('outdoor');

    // Update total section
    document.querySelector('.total-label').textContent = t('totalPoints');

    // Update action buttons
    document.getElementById('clearBtn').textContent = t('clear');
    document.getElementById('saveBtn').textContent = t('save');

    // Update saved results header
    document.querySelector('.saved-results h2').childNodes[0].textContent = t('savedResults');

    // Update tooltips
    document.getElementById('aboutBtn').title = t('aboutTooltip');
    document.getElementById('infoBtn').title = t('infoTooltip');
    document.getElementById('langBtn').title = t('langTooltip');

    // Update modals
    document.querySelector('#aboutModal h3').textContent = t('aboutTitle');
    document.querySelector('#infoModal h3').textContent = t('infoTitle');
    document.querySelector('.modal-link a').textContent = t('infoLink');

    // Update about info
    const aboutInfo = document.querySelector('.about-info');
    const ps = aboutInfo.querySelectorAll('p');
    ps[0].innerHTML = `<strong>${t('version')}:</strong> 1.0.0`;
    ps[1].innerHTML = `<strong>${t('developer')}:</strong> Eksporre Productions`;
    ps[2].innerHTML = `<strong>${t('feedback')}:</strong> <a href="mailto:niklas.svenzen@gmail.com">niklas.svenzen@gmail.com</a>`;
    ps[3].innerHTML = `&copy; 2026 Eksporre Productions. ${t('copyright')}.`;

    // Update language button with flag
    const langBtn = document.getElementById('langBtn');
    langBtn.textContent = '';
    langBtn.classList.remove('flag-sv', 'flag-en', 'flag-de', 'flag-fr');
    langBtn.classList.add(`flag-${currentLang}`);

    // Update event names and point tooltips in cards
    const events = getCurrentEvents();
    events.forEach(event => {
        const card = document.querySelector(`[data-event-id="${event.id}"]`);
        if (card) {
            const nameEl = card.querySelector('.event-name');
            if (nameEl) {
                nameEl.textContent = getEventDisplayName(event);
            }
        }

        // Update point tooltip with current language
        const pointsEl = document.getElementById(`points-${event.id}`);
        if (pointsEl) {
            const points = parseInt(pointsEl.textContent) || 0;
            let performance = null;

            if (event.inputType === 'time600') {
                const minInput = document.getElementById(`input-${event.id}-min`);
                const secInput = document.getElementById(`input-${event.id}-sec`);
                if (minInput && secInput) {
                    const minutes = parseInt(minInput.value) || 0;
                    const seconds = parseFloat(secInput.value.replace(',', '.')) || 0;
                    performance = minutes * 60 + seconds;
                    if (performance === 0) performance = null;
                }
            } else {
                const input = document.getElementById(`input-${event.id}`);
                if (input && input.value) {
                    if (event.inputType === 'time') {
                        performance = parseTime(input.value);
                    } else if (event.inputType === 'height') {
                        performance = parseDistance(input.value, true);
                    } else {
                        performance = parseDistance(input.value, false);
                    }
                }
            }

            pointsEl.title = getCalculationTooltip(event.id, performance, points);
        }
    });

    // Reload saved results to update text
    loadSavedResults();
}

// Event configurations by category
// Swedish youth combined events structure:
// - F/P 12-13: Femkamp (5 events)
// - F/P 14-15: Femkamp (5 events)
// - F16-17 Indoor: Femkamp (5 events), Outdoor: Sjukamp/Heptathlon (7 events)
// - P16-17 Indoor: Sjukamp (7 events), Outdoor: Tiokamp/Decathlon (10 events)

const EVENT_CONFIGS = {
    // ==================== FLICKOR (GIRLS) ====================

    // F12-13: Femkamp (5 events)
    'F-12-13-indoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '10.50' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.25' },
        { id: 'shotPut', name: 'Kula 2kg', inputType: 'distance', placeholder: '7.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '3.80' },
        { id: '600m', name: '600m', inputType: 'time600', placeholder: '2:00' }
    ],
    'F-12-13-outdoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '10.50' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.25' },
        { id: 'shotPut', name: 'Kula 2kg', inputType: 'distance', placeholder: '7.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '3.80' },
        { id: '600m', name: '600m', inputType: 'time600', placeholder: '2:00' }
    ],

    // F14-15: Femkamp (5 events)
    'F-14-15-indoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '9.50' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.46' },
        { id: 'shotPut', name: 'Kula 3kg', inputType: 'distance', placeholder: '8.50' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '4.50' },
        { id: '600m', name: '600m', inputType: 'time600', placeholder: '1:50' }
    ],
    // F14-15 Outdoor: Sexkamp (6 events)
    'F-14-15-outdoor': [
        { id: '80mH', name: '80m häck', inputType: 'time', placeholder: '12.50' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.46' },
        { id: 'shotPut', name: 'Kula 3kg', inputType: 'distance', placeholder: '8.50' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '4.50' },
        { id: 'javelin', name: 'Spjut', inputType: 'distance', placeholder: '25.00' },
        { id: '600m', name: '600m', inputType: 'time600', placeholder: '1:50' }
    ],

    // F16-17 Indoor: Femkamp (5 events)
    'F-16-17-indoor': [
        { id: '60mH', name: '60m häck 76.2', inputType: 'time', placeholder: '9.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.55' },
        { id: 'shotPut', name: 'Kula 3kg', inputType: 'distance', placeholder: '10.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.00' },
        { id: '800m', name: '800m', inputType: 'time600', placeholder: '2:20' }
    ],

    // F16-17 Outdoor: Sjukamp/Heptathlon (7 events)
    'F-16-17-outdoor': [
        { id: '100mH', name: '100m häck 76.2', inputType: 'time', placeholder: '15.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.55' },
        { id: 'shotPut', name: 'Kula 3kg', inputType: 'distance', placeholder: '10.00' },
        { id: '200m', name: '200m', inputType: 'time', placeholder: '26.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.00' },
        { id: 'javelin', name: 'Spjut 500g', inputType: 'distance', placeholder: '35.00' },
        { id: '800m', name: '800m', inputType: 'time600', placeholder: '2:20' }
    ],

    // ==================== POJKAR (BOYS) ====================

    // P12-13: Femkamp (5 events)
    'P-12-13-indoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '10.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.30' },
        { id: 'shotPut', name: 'Kula 3kg', inputType: 'distance', placeholder: '8.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '4.00' },
        { id: '600m', name: '600m', inputType: 'time600', placeholder: '1:50' }
    ],
    'P-12-13-outdoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '10.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.30' },
        { id: 'shotPut', name: 'Kula 3kg', inputType: 'distance', placeholder: '8.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '4.00' },
        { id: '600m', name: '600m', inputType: 'time600', placeholder: '1:50' }
    ],

    // P14-15: Femkamp (5 events)
    'P-14-15-indoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '9.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.55' },
        { id: 'shotPut', name: 'Kula 4kg', inputType: 'distance', placeholder: '10.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.00' },
        { id: '1000m', name: '1000m', inputType: 'time600', placeholder: '3:00' }
    ],
    // P14-15 Outdoor: Åttakamp (8 events)
    'P-14-15-outdoor': [
        { id: '80mH', name: '80m häck', inputType: 'time', placeholder: '11.50' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.55' },
        { id: 'shotPut', name: 'Kula 4kg', inputType: 'distance', placeholder: '10.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.00' },
        { id: 'discus', name: 'Diskus 1kg', inputType: 'distance', placeholder: '30.00' },
        { id: 'poleVault', name: 'Stav', inputType: 'distance', placeholder: '2.80' },
        { id: 'javelin', name: 'Spjut', inputType: 'distance', placeholder: '35.00' },
        { id: '1000m', name: '1000m', inputType: 'time600', placeholder: '3:00' }
    ],

    // P16-17 Indoor: Sjukamp/Heptathlon (7 events)
    'P-16-17-indoor': [
        { id: '60m', name: '60m', inputType: 'time', placeholder: '7.50' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.80' },
        { id: 'shotPut', name: 'Kula 5kg', inputType: 'distance', placeholder: '12.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.75' },
        { id: '60mH', name: '60m häck 91.4', inputType: 'time', placeholder: '8.50' },
        { id: 'poleVault', name: 'Stav', inputType: 'distance', placeholder: '3.50' },
        { id: '1000m', name: '1000m', inputType: 'time600', placeholder: '2:50' }
    ],

    // P16-17 Outdoor: Tiokamp/Decathlon (10 events)
    'P-16-17-outdoor': [
        { id: '100m', name: '100m', inputType: 'time', placeholder: '11.50' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.80' },
        { id: 'shotPut', name: 'Kula 5kg', inputType: 'distance', placeholder: '12.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.75' },
        { id: '400m', name: '400m', inputType: 'time', placeholder: '52.00' },
        { id: '110mH', name: '110m häck 91.4', inputType: 'time', placeholder: '15.50' },
        { id: 'discus', name: 'Diskus 1.5kg', inputType: 'distance', placeholder: '35.00' },
        { id: 'poleVault', name: 'Stav', inputType: 'distance', placeholder: '3.50' },
        { id: 'javelin', name: 'Spjut 700g', inputType: 'distance', placeholder: '45.00' },
        { id: '1500m', name: '1500m', inputType: 'time600', placeholder: '4:30' }
    ],

    // ==================== SENIOR ====================

    // Women Senior Indoor: Femkamp/Pentathlon (5 events)
    'F-senior-indoor': [
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '8.50' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.75' },
        { id: 'shotPut', name: 'Kula 4kg', inputType: 'distance', placeholder: '12.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.80' },
        { id: '800m', name: '800m', inputType: 'time600', placeholder: '2:10' }
    ],

    // Women Senior Outdoor: Sjukamp/Heptathlon (7 events)
    'F-senior-outdoor': [
        { id: '100mH', name: '100m häck', inputType: 'time', placeholder: '14.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.75' },
        { id: 'shotPut', name: 'Kula 4kg', inputType: 'distance', placeholder: '12.00' },
        { id: '200m', name: '200m', inputType: 'time', placeholder: '24.50' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '5.80' },
        { id: 'javelin', name: 'Spjut 600g', inputType: 'distance', placeholder: '40.00' },
        { id: '800m', name: '800m', inputType: 'time600', placeholder: '2:10' }
    ],

    // Men Senior Indoor: Sjukamp/Heptathlon (7 events)
    'P-senior-indoor': [
        { id: '60m', name: '60m', inputType: 'time', placeholder: '7.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '7.00' },
        { id: 'shotPut', name: 'Kula 7.26kg', inputType: 'distance', placeholder: '14.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.95' },
        { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '8.00' },
        { id: 'poleVault', name: 'Stav', inputType: 'distance', placeholder: '4.50' },
        { id: '1000m', name: '1000m', inputType: 'time600', placeholder: '2:40' }
    ],

    // Men Senior Outdoor: Tiokamp/Decathlon (10 events)
    'P-senior-outdoor': [
        { id: '100m', name: '100m', inputType: 'time', placeholder: '11.00' },
        { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '7.00' },
        { id: 'shotPut', name: 'Kula 7.26kg', inputType: 'distance', placeholder: '14.00' },
        { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.95' },
        { id: '400m', name: '400m', inputType: 'time', placeholder: '49.00' },
        { id: '110mH', name: '110m häck', inputType: 'time', placeholder: '14.50' },
        { id: 'discus', name: 'Diskus 2kg', inputType: 'distance', placeholder: '40.00' },
        { id: 'poleVault', name: 'Stav', inputType: 'distance', placeholder: '4.50' },
        { id: 'javelin', name: 'Spjut 800g', inputType: 'distance', placeholder: '55.00' },
        { id: '1500m', name: '1500m', inputType: 'time600', placeholder: '4:30' }
    ]
};

let currentMode = 'indoor';
let currentCategory = 'F-14-15';
let eventInputs = {};

const CATEGORIES = ['F-12-13', 'F-14-15', 'F-16-17', 'F-senior', 'P-12-13', 'P-14-15', 'P-16-17', 'P-senior'];

const STATE_KEY = 'lgif-current-state';

// Get gender from category
function getGenderFromCategory(category) {
    return category.startsWith('P') ? 'P' : 'F';
}

// Save current state to localStorage
function saveCurrentState() {
    const state = {
        mode: currentMode,
        category: currentCategory,
        values: getEventValues()
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

// Restore state from localStorage
function restoreState() {
    const saved = localStorage.getItem(STATE_KEY);
    if (!saved) return false;

    try {
        const state = JSON.parse(saved);
        // Support old format with gender/age
        if (state.category) {
            currentCategory = state.category;
        } else if (state.gender && state.age) {
            currentCategory = `${state.gender}-${state.age}`;
        }
        if (state.mode) currentMode = state.mode;
        return state;
    } catch (e) {
        return false;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    const savedState = restoreState();

    // Update UI to match restored state
    if (savedState) {
        document.getElementById('categorySelect').value = currentCategory;

        if (currentMode === 'outdoor') {
            document.getElementById('outdoorBtn').classList.add('active');
            document.getElementById('indoorBtn').classList.remove('active');
        }
    }

    setupCategorySelectors();
    setupModeToggle();
    setScoringGender(getGenderFromCategory(currentCategory));
    renderEvents();
    setupActions();
    loadSavedResults();
    setupModals();
    setupLanguageToggle();
    updateUILanguage();

    // Restore input values after events are rendered
    if (savedState && savedState.values) {
        restoreInputValues(savedState.values);
    }
});

function restoreInputValues(values) {
    setTimeout(() => {
        const events = getCurrentEvents();

        events.forEach(event => {
            const value = values[event.id];
            if (!value) return;

            if (event.inputType === 'time600') {
                const parts = value.split(':');
                if (parts.length === 2) {
                    const minInput = document.getElementById(`input-${event.id}-min`);
                    const secInput = document.getElementById(`input-${event.id}-sec`);
                    if (minInput) minInput.value = parts[0];
                    if (secInput) secInput.value = parts[1];
                }
            } else {
                const input = document.getElementById(`input-${event.id}`);
                if (input) input.value = value;
            }
        });

        // Trigger recalculation
        events.forEach(event => {
            const input = document.getElementById(`input-${event.id}`);
            if (input) {
                input.dispatchEvent(new Event('input'));
            } else {
                const secInput = document.getElementById(`input-${event.id}-sec`);
                if (secInput) secInput.dispatchEvent(new Event('input'));
            }
        });
    }, 50);
}

function setupCategorySelectors() {
    const categorySelect = document.getElementById('categorySelect');

    // Set initial scoring gender
    setScoringGender(getGenderFromCategory(currentCategory));

    categorySelect.addEventListener('change', () => {
        currentCategory = categorySelect.value;
        setScoringGender(getGenderFromCategory(currentCategory));
        renderEvents();
        saveCurrentState();
    });
}

function setupModeToggle() {
    const indoorBtn = document.getElementById('indoorBtn');
    const outdoorBtn = document.getElementById('outdoorBtn');

    indoorBtn.addEventListener('click', () => {
        if (currentMode !== 'indoor') {
            currentMode = 'indoor';
            indoorBtn.classList.add('active');
            outdoorBtn.classList.remove('active');
            renderEvents();
            saveCurrentState();
        }
    });

    outdoorBtn.addEventListener('click', () => {
        if (currentMode !== 'outdoor') {
            currentMode = 'outdoor';
            outdoorBtn.classList.add('active');
            indoorBtn.classList.remove('active');
            renderEvents();
            saveCurrentState();
        }
    });
}

function getConfigKey() {
    return `${currentCategory}-${currentMode}`;
}

function getCurrentEvents() {
    const key = getConfigKey();
    return EVENT_CONFIGS[key] || EVENT_CONFIGS['F-14-15-indoor'];
}

function getEventTypeName() {
    const events = getCurrentEvents();
    const count = events.length;
    if (count === 5) return 'Femkamp';
    if (count === 7) return 'Sjukamp';
    if (count === 10) return 'Tiokamp';
    return 'Mångkamp';
}

function renderEvents() {
    const events = getCurrentEvents();
    const container = document.getElementById('events-container');
    container.innerHTML = '';
    eventInputs = {};

    events.forEach(event => {
        const card = createEventCard(event);
        container.appendChild(card);
    });

    updateTotal();
}

function getEventDisplayName(event) {
    // Get base translation for event type
    const baseName = t(event.id) || event.name;

    // Add weight/height info if present in original name (e.g., "Kula 3kg" -> "Shot Put 3kg")
    const match = event.name.match(/\d+(\.\d+)?\s*(kg|cm|g|m)\b/i);
    if (match && !baseName.includes(match[0])) {
        return `${baseName} ${match[0]}`;
    }
    return baseName;
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.eventId = event.id;
    card.innerHTML = `
        <span class="event-name">${getEventDisplayName(event)}</span>
        <div class="event-input-row">
            ${createInputHTML(event)}
        </div>
        <span class="event-points" id="points-${event.id}">0 p</span>
    `;

    setTimeout(() => {
        setupInputListeners(event);
        setupPointsTap(event.id);
    }, 0);
    return card;
}

function createInputHTML(event) {
    if (event.inputType === 'time600') {
        return `
            <div class="input-group">
                <input type="number" id="input-${event.id}-min" class="event-input"
                       placeholder="1" min="0" max="9" inputmode="numeric">
                <span class="event-unit">:</span>
            </div>
            <div class="input-group">
                <input type="text" id="input-${event.id}-sec" class="event-input"
                       placeholder="50.00" inputmode="decimal">
            </div>
        `;
    } else if (event.inputType === 'time') {
        return `
            <div class="input-group">
                <input type="text" id="input-${event.id}" class="event-input"
                       placeholder="${event.placeholder}" inputmode="decimal">
                <span class="event-unit">s</span>
            </div>
        `;
    } else {
        return `
            <div class="input-group">
                <input type="text" id="input-${event.id}" class="event-input"
                       placeholder="${event.placeholder}" inputmode="decimal">
                <span class="event-unit">m</span>
            </div>
        `;
    }
}

function setupInputListeners(event) {
    if (event.inputType === 'time600') {
        const minInput = document.getElementById(`input-${event.id}-min`);
        const secInput = document.getElementById(`input-${event.id}-sec`);

        if (minInput && secInput) {
            eventInputs[event.id] = { min: minInput, sec: secInput };

            const updateFn = () => {
                const minutes = parseInt(minInput.value) || 0;
                const seconds = parseFloat(secInput.value.replace(',', '.')) || 0;
                const totalSeconds = minutes * 60 + seconds;
                const points = totalSeconds > 0 ? calculatePoints(event.id, totalSeconds) : 0;
                const pointsEl = document.getElementById(`points-${event.id}`);
                pointsEl.textContent = `${points} p`;
                pointsEl.title = getCalculationTooltip(event.id, totalSeconds, points);
                updateTotal();
                saveCurrentState();
            };

            minInput.addEventListener('input', updateFn);
            secInput.addEventListener('input', updateFn);
        }
    } else {
        const input = document.getElementById(`input-${event.id}`);
        if (input) {
            eventInputs[event.id] = input;

            input.addEventListener('input', () => {
                let value;
                if (event.inputType === 'time') {
                    value = parseTime(input.value);
                } else if (event.inputType === 'height') {
                    value = parseDistance(input.value, true);
                } else {
                    value = parseDistance(input.value, false);
                }

                const points = value ? calculatePoints(event.id, value) : 0;
                const pointsEl = document.getElementById(`points-${event.id}`);
                pointsEl.textContent = `${points} p`;
                pointsEl.title = getCalculationTooltip(event.id, value, points);
                updateTotal();
                saveCurrentState();
            });
        }
    }
}

function updateTotal() {
    const events = getCurrentEvents();
    let total = 0;

    events.forEach(event => {
        const pointsEl = document.getElementById(`points-${event.id}`);
        if (pointsEl) {
            const points = parseInt(pointsEl.textContent) || 0;
            total += points;
        }
    });

    document.getElementById('total-points').textContent = total;
}

function setupActions() {
    document.getElementById('clearBtn').addEventListener('click', clearInputs);
    document.getElementById('saveBtn').addEventListener('click', promptAndSave);
}

function clearInputs() {
    Object.values(eventInputs).forEach(input => {
        if (input.min && input.sec) {
            input.min.value = '';
            input.sec.value = '';
        } else {
            input.value = '';
        }
    });

    const events = getCurrentEvents();
    events.forEach(event => {
        const el = document.getElementById(`points-${event.id}`);
        if (el) el.textContent = '0 p';
    });

    updateTotal();
    saveCurrentState();
}

function getEventValues() {
    const events = getCurrentEvents();
    const values = {};

    events.forEach(event => {
        if (event.inputType === 'time600') {
            const minInput = eventInputs[event.id]?.min;
            const secInput = eventInputs[event.id]?.sec;
            if (minInput && secInput) {
                const min = minInput.value;
                const sec = secInput.value;
                if (min || sec) {
                    values[event.id] = `${min || 0}:${sec || '00'}`;
                }
            }
        } else {
            const input = eventInputs[event.id];
            if (input && input.value) {
                values[event.id] = input.value;
            }
        }
    });

    return values;
}

function promptAndSave() {
    const total = parseInt(document.getElementById('total-points').textContent) || 0;
    if (total === 0) return;

    const name = prompt(t('namePrompt'));
    if (name === null) return; // Cancelled

    saveResult(name.trim() || t('unknown'));
}

function saveResult(athleteName) {
    const total = parseInt(document.getElementById('total-points').textContent) || 0;
    const events = getCurrentEvents();
    const eventDetails = [];

    events.forEach(event => {
        const pointsEl = document.getElementById(`points-${event.id}`);
        const points = parseInt(pointsEl?.textContent) || 0;

        let value = '';
        if (event.inputType === 'time600') {
            const minInput = eventInputs[event.id]?.min;
            const secInput = eventInputs[event.id]?.sec;
            if (minInput?.value || secInput?.value) {
                value = `${minInput?.value || 0}:${secInput?.value || '00'}`;
            }
        } else {
            value = eventInputs[event.id]?.value || '';
        }

        if (value) {
            eventDetails.push(`${event.name}: ${value} (${points}p)`);
        }
    });

    const eventType = getEventTypeName();
    const categoryLabel = `${t(currentCategory)} ${eventType}`;

    const result = {
        id: Date.now(),
        name: athleteName,
        date: new Date().toLocaleDateString('sv-SE'),
        time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
        category: categoryLabel,
        mode: currentMode,
        savedCategory: currentCategory,
        total: total,
        details: eventDetails,
        values: getEventValues()
    };

    const saved = JSON.parse(localStorage.getItem('lgif-results') || '[]');
    saved.unshift(result);
    localStorage.setItem('lgif-results', JSON.stringify(saved));

    loadSavedResults();
    clearInputs();
}

function loadSavedResults() {
    const saved = JSON.parse(localStorage.getItem('lgif-results') || '[]');
    const container = document.getElementById('results-list');
    const section = document.getElementById('saved-results');

    if (!section.dataset.initialized) {
        section.dataset.initialized = 'true';
        section.classList.add('collapsed');
        section.querySelector('h2').addEventListener('click', () => {
            section.classList.toggle('collapsed');
        });
    }

    if (saved.length === 0) {
        container.innerHTML = `<div class="no-results">${t('noResults')}</div>`;
        return;
    }

    container.innerHTML = saved.map(result => `
        <div class="result-item">
            <div class="result-header">
                <span class="result-date">${result.name || t('unknown')} - ${result.category || ''} ${result.mode === 'indoor' ? t('indoorShort') : t('outdoorShort')}</span>
                <span class="result-total">${result.total} p</span>
            </div>
            <div class="result-details">${result.date} ${result.time} | ${result.details.join(' | ')}</div>
            <div class="result-actions">
                <button class="result-btn load-btn" onclick="loadResult(${result.id})">${t('load')}</button>
                <button class="result-btn delete-btn" onclick="deleteResult(${result.id})">${t('delete')}</button>
            </div>
        </div>
    `).join('');
}

function loadResult(id) {
    const saved = JSON.parse(localStorage.getItem('lgif-results') || '[]');
    const result = saved.find(r => r.id === id);
    if (!result) return;

    // Determine category from saved result (support old and new format)
    let targetCategory = result.savedCategory;
    if (!targetCategory && result.gender && result.age) {
        targetCategory = `${result.gender}-${result.age}`;
    }

    // Switch category if needed
    if (targetCategory && targetCategory !== currentCategory) {
        document.getElementById('categorySelect').value = targetCategory;
        currentCategory = targetCategory;
        setScoringGender(getGenderFromCategory(currentCategory));
    }

    if (result.mode !== currentMode) {
        if (result.mode === 'indoor') {
            document.getElementById('indoorBtn').click();
        } else {
            document.getElementById('outdoorBtn').click();
        }
        return; // Mode change will trigger renderEvents, so return
    }

    renderEvents();

    setTimeout(() => {
        const events = getCurrentEvents();

        events.forEach(event => {
            const value = result.values[event.id];
            if (!value) return;

            if (event.inputType === 'time600') {
                const parts = value.split(':');
                if (parts.length === 2) {
                    const minInput = document.getElementById(`input-${event.id}-min`);
                    const secInput = document.getElementById(`input-${event.id}-sec`);
                    if (minInput) minInput.value = parts[0];
                    if (secInput) secInput.value = parts[1];
                }
            } else {
                const input = document.getElementById(`input-${event.id}`);
                if (input) input.value = value;
            }
        });

        // Trigger recalculation
        events.forEach(event => {
            const input = document.getElementById(`input-${event.id}`);
            if (input) {
                input.dispatchEvent(new Event('input'));
            } else {
                const secInput = document.getElementById(`input-${event.id}-sec`);
                if (secInput) secInput.dispatchEvent(new Event('input'));
            }
        });
    }, 100);
}

function deleteResult(id) {
    const saved = JSON.parse(localStorage.getItem('lgif-results') || '[]');
    const filtered = saved.filter(r => r.id !== id);
    localStorage.setItem('lgif-results', JSON.stringify(filtered));
    loadSavedResults();
}

// Modal handling
function setupModals() {
    const infoModal = document.getElementById('infoModal');
    const aboutModal = document.getElementById('aboutModal');
    const infoBtn = document.getElementById('infoBtn');
    const aboutBtn = document.getElementById('aboutBtn');
    const infoClose = document.getElementById('infoModalClose');
    const aboutClose = document.getElementById('aboutModalClose');

    infoBtn.addEventListener('click', () => {
        updateCoefficientsDisplay();
        infoModal.classList.add('active');
    });

    aboutBtn.addEventListener('click', () => {
        aboutModal.classList.add('active');
    });

    infoClose.addEventListener('click', () => {
        infoModal.classList.remove('active');
    });

    aboutClose.addEventListener('click', () => {
        aboutModal.classList.remove('active');
    });

    // Close on backdrop click
    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) infoModal.classList.remove('active');
    });

    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) aboutModal.classList.remove('active');
    });
}

function updateCoefficientsDisplay() {
    const events = getCurrentEvents();
    const coefficients = getCoefficients();
    const container = document.getElementById('coefficients-list');

    container.innerHTML = events.map(event => {
        const coef = coefficients[event.id];
        if (!coef) return '';

        let formula = '';
        if (coef.type === 'track') {
            formula = `P = ${coef.a} × (${coef.b} - ${t('time')})^${coef.c}`;
        } else if (coef.type === 'jump') {
            formula = `P = ${coef.a} × (cm - ${coef.b})^${coef.c}`;
        } else if (coef.type === 'throw') {
            formula = `P = ${coef.a} × (m - ${coef.b})^${coef.c}`;
        }

        return `
            <div class="coef-item">
                <div class="coef-name">${t(event.id) || event.name}</div>
                <div class="coef-formula">${formula}</div>
            </div>
        `;
    }).join('');
}

function getCalculationTooltip(eventId, performance, points) {
    const coefficients = getCoefficients();
    const coef = coefficients[eventId];
    if (!coef || !performance) return `${points} ${t('points')}`;

    let detail = '';
    if (coef.type === 'track') {
        detail = `${coef.a} × (${coef.b} - ${performance.toFixed(2)})^${coef.c}`;
    } else if (coef.type === 'jump') {
        const cm = performance * 100;
        detail = `${coef.a} × (${cm.toFixed(0)} - ${coef.b})^${coef.c}`;
    } else if (coef.type === 'throw') {
        detail = `${coef.a} × (${performance.toFixed(2)} - ${coef.b})^${coef.c}`;
    }

    return `${points} ${t('points')}\n${detail}`;
}

// Toast notification - positioned near element
let toastTimeout;
function showToast(message, element) {
    const toast = document.getElementById('toast');
    toast.textContent = message;

    // Position near the element
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    toast.style.top = (rect.bottom + scrollTop + 8) + 'px';
    toast.style.left = (rect.left + rect.width / 2) + 'px';
    toast.style.transform = 'translateX(-50%)';

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function setupPointsTap(eventId) {
    const pointsEl = document.getElementById(`points-${eventId}`);
    if (pointsEl) {
        pointsEl.addEventListener('click', (e) => {
            const tooltip = pointsEl.getAttribute('title');
            if (tooltip) {
                showToast(tooltip, pointsEl);
            }
        });
    }
}

function setupLanguageToggle() {
    const langBtn = document.getElementById('langBtn');
    langBtn.addEventListener('click', () => {
        const currentIndex = LANGUAGES.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % LANGUAGES.length;
        currentLang = LANGUAGES[nextIndex];
        localStorage.setItem('lgif-lang', currentLang);
        updateUILanguage();
    });
}
