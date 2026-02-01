/**
 * F15 Pentathlon Score Tracker App
 */

// Event configurations
const INDOOR_EVENTS = [
    { id: '60mH', name: '60m häck', inputType: 'time', placeholder: '9.50' },
    { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.46' },
    { id: 'shotPut', name: 'Kula (3kg)', inputType: 'distance', placeholder: '8.50' },
    { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '4.50' },
    { id: '600m', name: '600m', inputType: 'time', placeholder: '1:50' }
];

const OUTDOOR_EVENTS = [
    { id: '80mH', name: '80m häck', inputType: 'time', placeholder: '12.50' },
    { id: 'highJump', name: 'Höjd', inputType: 'height', placeholder: '1.46' },
    { id: 'javelin', name: 'Spjut', inputType: 'distance', placeholder: '25.00' },
    { id: 'longJump', name: 'Längd', inputType: 'distance', placeholder: '4.50' },
    { id: '600m', name: '600m', inputType: 'time', placeholder: '1:50' }
];

let currentMode = 'indoor';
let eventInputs = {};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupModeToggle();
    renderEvents(INDOOR_EVENTS);
    setupActions();
    loadSavedResults();
});

function setupModeToggle() {
    const indoorBtn = document.getElementById('indoorBtn');
    const outdoorBtn = document.getElementById('outdoorBtn');

    indoorBtn.addEventListener('click', () => {
        if (currentMode !== 'indoor') {
            currentMode = 'indoor';
            indoorBtn.classList.add('active');
            outdoorBtn.classList.remove('active');
            renderEvents(INDOOR_EVENTS);
        }
    });

    outdoorBtn.addEventListener('click', () => {
        if (currentMode !== 'outdoor') {
            currentMode = 'outdoor';
            outdoorBtn.classList.add('active');
            indoorBtn.classList.remove('active');
            renderEvents(OUTDOOR_EVENTS);
        }
    });
}

function renderEvents(events) {
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

    // Setup input listeners after adding to DOM
    setTimeout(() => setupInputListeners(event), 0);

    return card;
}

function createInputHTML(event) {
    if (event.inputType === 'time' && event.id === '600m') {
        // 600m needs minutes and seconds
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
        // Hurdles - just seconds
        return `
            <div class="input-group">
                <input type="text" id="input-${event.id}" class="event-input"
                       placeholder="${event.placeholder}" inputmode="decimal">
                <span class="event-unit">s</span>
            </div>
        `;
    } else {
        // Distance/height
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
    if (event.id === '600m') {
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
    const events = currentMode === 'indoor' ? INDOOR_EVENTS : OUTDOOR_EVENTS;
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
    document.getElementById('saveBtn').addEventListener('click', saveResult);
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

    const events = currentMode === 'indoor' ? INDOOR_EVENTS : OUTDOOR_EVENTS;
    events.forEach(event => {
        document.getElementById(`points-${event.id}`).textContent = '0 p';
    });

    updateTotal();
}

function getEventValues() {
    const events = currentMode === 'indoor' ? INDOOR_EVENTS : OUTDOOR_EVENTS;
    const values = {};

    events.forEach(event => {
        if (event.id === '600m') {
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

function saveResult() {
    const total = parseInt(document.getElementById('total-points').textContent) || 0;
    if (total === 0) {
        return;
    }

    const events = currentMode === 'indoor' ? INDOOR_EVENTS : OUTDOOR_EVENTS;
    const eventDetails = [];

    events.forEach(event => {
        const pointsEl = document.getElementById(`points-${event.id}`);
        const points = parseInt(pointsEl?.textContent) || 0;

        let value = '';
        if (event.id === '600m') {
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

    const result = {
        id: Date.now(),
        date: new Date().toLocaleDateString('sv-SE'),
        time: new Date().toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }),
        mode: currentMode,
        total: total,
        details: eventDetails,
        values: getEventValues()
    };

    const saved = JSON.parse(localStorage.getItem('f15-results') || '[]');
    saved.unshift(result);
    localStorage.setItem('f15-results', JSON.stringify(saved));

    loadSavedResults();
}

function loadSavedResults() {
    const saved = JSON.parse(localStorage.getItem('f15-results') || '[]');
    const container = document.getElementById('results-list');
    const section = document.getElementById('saved-results');

    // Setup collapse toggle on first load
    if (!section.dataset.initialized) {
        section.dataset.initialized = 'true';
        section.classList.add('collapsed'); // Start collapsed
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
                <span class="result-date">${result.date} ${result.time} (${result.mode === 'indoor' ? 'Inomhus' : 'Utomhus'})</span>
                <span class="result-total">${result.total} p</span>
            </div>
            <div class="result-details">${result.details.join(' | ')}</div>
            <div class="result-actions">
                <button class="result-btn load-btn" onclick="loadResult(${result.id})">Ladda</button>
                <button class="result-btn delete-btn" onclick="deleteResult(${result.id})">Ta bort</button>
            </div>
        </div>
    `).join('');
}

function loadResult(id) {
    const saved = JSON.parse(localStorage.getItem('f15-results') || '[]');
    const result = saved.find(r => r.id === id);
    if (!result) return;

    // Switch mode if needed
    if (result.mode !== currentMode) {
        if (result.mode === 'indoor') {
            document.getElementById('indoorBtn').click();
        } else {
            document.getElementById('outdoorBtn').click();
        }
    }

    // Wait for mode switch to complete
    setTimeout(() => {
        const events = result.mode === 'indoor' ? INDOOR_EVENTS : OUTDOOR_EVENTS;

        events.forEach(event => {
            const value = result.values[event.id];
            if (!value) return;

            if (event.id === '600m') {
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
    const saved = JSON.parse(localStorage.getItem('f15-results') || '[]');
    const filtered = saved.filter(r => r.id !== id);
    localStorage.setItem('f15-results', JSON.stringify(filtered));
    loadSavedResults();
}
