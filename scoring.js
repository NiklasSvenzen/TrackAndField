/**
 * LGIF Mångkamp Scoring Calculator
 * Based on Official IAAF/World Athletics Combined Events Scoring Tables
 * With Swedish youth supplementary tables for 600m
 *
 * Track events: Points = A × (B - Performance)^C
 * Jumps: Points = A × (M - B)^C  [M in centimeters]
 * Throws: Points = A × (D - B)^C  [D in meters]
 *
 * Note: Points are rounded DOWN to whole number (e.g., 123.999 → 123)
 */

// Men's coefficients (from IAAF tables)
const MEN_COEFFICIENTS = {
    // Track events
    '60m': { a: 58.0150, b: 11.50, c: 1.81, type: 'track' },
    '100m': { a: 25.4347, b: 18.00, c: 1.81, type: 'track' },
    '200m': { a: 5.8425, b: 38.00, c: 1.81, type: 'track' },
    '400m': { a: 1.53775, b: 82.00, c: 1.81, type: 'track' },
    '1000m': { a: 0.08713, b: 305.50, c: 1.85, type: 'track' },
    '1500m': { a: 0.03768, b: 480.00, c: 1.85, type: 'track' },

    // Hurdles
    '60mH': { a: 20.5173, b: 15.50, c: 1.92, type: 'track' },
    '80mH': { a: 20.5173, b: 15.50, c: 1.92, type: 'track' }, // Use 60mH as approximation
    '110mH': { a: 5.74352, b: 28.50, c: 1.92, type: 'track' },

    // Jumps (measurement in cm)
    'highJump': { a: 0.8465, b: 75.00, c: 1.42, type: 'jump' },
    'longJump': { a: 0.14354, b: 220.00, c: 1.40, type: 'jump' },
    'poleVault': { a: 0.2797, b: 100.00, c: 1.35, type: 'jump' },

    // Throws (distance in m)
    'shotPut': { a: 51.39, b: 1.50, c: 1.05, type: 'throw' },
    'discus': { a: 12.91, b: 4.00, c: 1.10, type: 'throw' },
    'javelin': { a: 10.14, b: 7.00, c: 1.08, type: 'throw' },

    // Swedish youth supplementary
    '600m': { a: 0.264892, b: 176.6, c: 1.85, type: 'track' }
};

// Women's coefficients (from IAAF tables)
const WOMEN_COEFFICIENTS = {
    // Track events
    '100m': { a: 17.8570, b: 21.00, c: 1.81, type: 'track' },
    '200m': { a: 4.99087, b: 42.50, c: 1.81, type: 'track' },
    '400m': { a: 1.34285, b: 91.70, c: 1.81, type: 'track' },
    '800m': { a: 0.11193, b: 254.00, c: 1.88, type: 'track' },
    '1500m': { a: 0.02883, b: 535.00, c: 1.88, type: 'track' },

    // Hurdles
    '60mH': { a: 20.0479, b: 17.00, c: 1.835, type: 'track' },
    '80mH': { a: 9.23076, b: 26.70, c: 1.835, type: 'track' }, // Same as 100mH for youth
    '100mH': { a: 9.23076, b: 26.70, c: 1.835, type: 'track' },

    // Jumps (measurement in cm)
    'highJump': { a: 1.84523, b: 75.00, c: 1.348, type: 'jump' },
    'longJump': { a: 0.188807, b: 210.00, c: 1.41, type: 'jump' },
    'poleVault': { a: 0.44125, b: 100.00, c: 1.35, type: 'jump' },

    // Throws (distance in m)
    'shotPut': { a: 56.0211, b: 1.50, c: 1.05, type: 'throw' },
    'discus': { a: 12.3311, b: 3.00, c: 1.10, type: 'throw' },
    'javelin': { a: 15.9803, b: 3.80, c: 1.04, type: 'throw' },

    // Swedish youth supplementary
    '600m': { a: 0.264892, b: 176.6, c: 1.85, type: 'track' },
    '1000m': { a: 0.08713, b: 305.50, c: 1.85, type: 'track' } // Use men's 1000m
};

// Current gender for scoring (set by app.js)
let currentScoringGender = 'F';

/**
 * Set the current gender for scoring calculations
 * @param {string} gender - 'F' for women/girls, 'P' for men/boys
 */
function setScoringGender(gender) {
    currentScoringGender = gender;
}

/**
 * Get coefficients based on current gender
 */
function getCoefficients() {
    return currentScoringGender === 'P' ? MEN_COEFFICIENTS : WOMEN_COEFFICIENTS;
}

/**
 * Calculate points for a given event and performance
 * @param {string} event - Event identifier
 * @param {number} performance - Performance value (seconds for track, meters for field)
 * @returns {number} Points (truncated to integer, not rounded)
 */
function calculatePoints(event, performance) {
    const coefficients = getCoefficients();
    const coef = coefficients[event];

    if (!coef || performance === null || performance === undefined || isNaN(performance)) {
        return 0;
    }

    let points;

    if (coef.type === 'track') {
        // Track events: lower is better
        // P = a * (b - T)^c
        const diff = coef.b - performance;
        if (diff <= 0) return 0;
        points = coef.a * Math.pow(diff, coef.c);
    } else if (coef.type === 'jump') {
        // Jump events: measurement in cm, higher is better
        // P = a * (M - b)^c where M is in centimeters
        const measurementCm = performance * 100; // Convert meters to cm
        const diff = measurementCm - coef.b;
        if (diff <= 0) return 0;
        points = coef.a * Math.pow(diff, coef.c);
    } else if (coef.type === 'throw') {
        // Throw events: distance in meters, higher is better
        // P = a * (D - b)^c where D is in meters
        const diff = performance - coef.b;
        if (diff <= 0) return 0;
        points = coef.a * Math.pow(diff, coef.c);
    }

    // Round DOWN to whole number (truncate)
    return Math.max(0, Math.floor(points));
}

/**
 * Convert time input (mm:ss.xx or ss.xx) to seconds
 * @param {string} timeStr - Time string
 * @returns {number|null} Time in seconds or null if invalid
 */
function parseTime(timeStr) {
    if (!timeStr || timeStr.trim() === '') return null;

    const str = timeStr.trim().replace(',', '.');

    // Format: mm:ss.xx or m:ss.xx
    if (str.includes(':')) {
        const parts = str.split(':');
        if (parts.length !== 2) return null;
        const minutes = parseFloat(parts[0]);
        const seconds = parseFloat(parts[1]);
        if (isNaN(minutes) || isNaN(seconds)) return null;
        return minutes * 60 + seconds;
    }

    // Format: ss.xx
    const seconds = parseFloat(str);
    return isNaN(seconds) ? null : seconds;
}

/**
 * Convert distance input to meters
 * @param {string} distStr - Distance string (can be in cm or m)
 * @param {boolean} isCentimeters - If true, treat whole numbers >= 100 as cm
 * @returns {number|null} Distance in meters or null if invalid
 */
function parseDistance(distStr, isCentimeters = false) {
    if (!distStr || distStr.trim() === '') return null;

    const str = distStr.trim().replace(',', '.');
    const value = parseFloat(str);

    if (isNaN(value)) return null;

    // For high jump: values >= 100 are likely in cm
    if (isCentimeters && value >= 100) {
        return value / 100;
    }

    return value;
}
