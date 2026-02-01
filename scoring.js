/**
 * F15 Pentathlon Scoring Calculator
 * Based on World Athletics Combined Events Scoring Tables
 *
 * Track events: Points = A × (B - Performance)^C
 * Field events: Points = A × (Performance - B)^C
 *
 * Performance units:
 * - Running: seconds
 * - Jumps: meters
 * - Throws: meters
 */

const SCORING_COEFFICIENTS = {
    // Indoor events
    '60mH': { a: 20.5173, b: 15.5, c: 1.92, type: 'track' },

    // Outdoor events
    '80mH': { a: 7.399, b: 24, c: 1.835, type: 'track' },

    // Common events
    '600m': { a: 0.11193, b: 254, c: 1.88, type: 'track' },
    'highJump': { a: 0.8465, b: 0.75, c: 1.42, type: 'field' },
    'longJump': { a: 0.14354, b: 2.2, c: 1.4, type: 'field' },
    'shotPut': { a: 51.39, b: 1.5, c: 1.05, type: 'field' },
    'javelin': { a: 10.14, b: 7, c: 1.08, type: 'field' }
};

/**
 * Calculate points for a given event and performance
 * @param {string} event - Event identifier
 * @param {number} performance - Performance value (seconds for track, meters for field)
 * @returns {number} Points (truncated to integer, not rounded)
 */
function calculatePoints(event, performance) {
    const coef = SCORING_COEFFICIENTS[event];
    if (!coef || performance === null || performance === undefined || isNaN(performance)) {
        return 0;
    }

    let points;

    if (coef.type === 'track') {
        // Track events: lower is better
        const diff = coef.b - performance;
        if (diff <= 0) return 0;
        points = coef.a * Math.pow(diff, coef.c);
    } else {
        // Field events: higher is better
        const diff = performance - coef.b;
        if (diff <= 0) return 0;
        points = coef.a * Math.pow(diff, coef.c);
    }

    // Truncate to integer (don't round)
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
 * @param {boolean} isCentimeters - If true, treat whole numbers as cm
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
