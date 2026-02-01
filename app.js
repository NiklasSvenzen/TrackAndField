/**
 * LGIF Mångkamp Score Tracker App
 * Supports multiple age groups and genders with correct event programs
 * Based on Swedish Athletics Federation (Friidrottsförbundet) rules
 */

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
let currentGender = 'F';
let currentAge = '14-15';
let eventInputs = {};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupCategorySelectors();
    setupModeToggle();
    renderEvents();
    setupActions();
    loadSavedResults();
});

function setupCategorySelectors() {
    const genderSelect = document.getElementById('genderSelect');
    const ageSelect = document.getElementById('ageSelect');

    // Set initial scoring gender
    setScoringGender(currentGender);

    genderSelect.addEventListener('change', () => {
        currentGender = genderSelect.value;
        setScoringGender(currentGender);
        renderEvents();
    });

    ageSelect.addEventListener('change', () => {
        currentAge = ageSelect.value;
        renderEvents();
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
        }
    });

    outdoorBtn.addEventListener('click', () => {
        if (currentMode !== 'outdoor') {
            currentMode = 'outdoor';
            outdoorBtn.classList.add('active');
            indoorBtn.classList.remove('active');
            renderEvents();
        }
    });
}

function getConfigKey() {
    return `${currentGender}-${currentAge}-${currentMode}`;
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

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <span class="event-name">${event.name}</span>
        <div class="event-input-row">
            ${createInputHTML(event)}
        </div>
        <span class="event-points" id="points-${event.id}">0 p</span>
    `;

    setTimeout(() => setupInputListeners(event), 0);
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
                document.getElementById(`points-${event.id}`).textContent = `${points} p`;
                updateTotal();
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
                document.getElementById(`points-${event.id}`).textContent = `${points} p`;
                updateTotal();
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

    const name = prompt('Namn på tävlande:');
    if (name === null) return; // Cancelled

    saveResult(name.trim() || 'Okänd');
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

    const genderLabel = currentGender === 'F' ? 'F' : 'P';
    const eventType = getEventTypeName();
    const categoryLabel = `${genderLabel}${currentAge} ${eventType}`;

    const result = {
        id: Date.now(),
        name: athleteName,
        date: new Date().toLocaleDateString('sv-SE'),
        time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
        category: categoryLabel,
        mode: currentMode,
        gender: currentGender,
        age: currentAge,
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
        container.innerHTML = '<div class="no-results">Inga sparade resultat</div>';
        return;
    }

    container.innerHTML = saved.map(result => `
        <div class="result-item">
            <div class="result-header">
                <span class="result-date">${result.name || 'Okänd'} - ${result.category || ''} ${result.mode === 'indoor' ? '(Inom)' : '(Utom)'}</span>
                <span class="result-total">${result.total} p</span>
            </div>
            <div class="result-details">${result.date} ${result.time} | ${result.details.join(' | ')}</div>
            <div class="result-actions">
                <button class="result-btn load-btn" onclick="loadResult(${result.id})">Ladda</button>
                <button class="result-btn delete-btn" onclick="deleteResult(${result.id})">Ta bort</button>
            </div>
        </div>
    `).join('');
}

function loadResult(id) {
    const saved = JSON.parse(localStorage.getItem('lgif-results') || '[]');
    const result = saved.find(r => r.id === id);
    if (!result) return;

    // Switch category if needed
    if (result.gender && result.gender !== currentGender) {
        document.getElementById('genderSelect').value = result.gender;
        currentGender = result.gender;
        setScoringGender(currentGender);
    }
    if (result.age && result.age !== currentAge) {
        document.getElementById('ageSelect').value = result.age;
        currentAge = result.age;
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
