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
    // Indoor events - 60m hurdles (76.2cm height for F15)
    // Adjusted to match Swedish youth tables
    '60mH': { a: 21.0572, b: 17.0, c: 1.81, type: 'track' },

    // Outdoor events - 80m hurdles
    '80mH': { a: 9.23076, b: 26.7, c: 1.835, type: 'track' },

    // Common events
    // 600m: Swedish youth supplementary table (official coefficients)
    '600m': { a: 0.264892, b: 176.6, c: 1.85, type: 'track' },
    // High jump: input in meters, converted to cm for formula
    'highJump': { a: 1.84523, b: 75.0, c: 1.348, type: 'field', unit: 'cm' },
    // Long jump: input in meters, converted to cm for formula
    'longJump': { a: 0.188807, b: 210, c: 1.41, type: 'field', unit: 'cm' },
    // Shot put: input in meters
    'shotPut': { a: 56.0211, b: 1.50, c: 1.05, type: 'field', unit: 'm' },
    // Javelin: input in meters
    'javelin': { a: 15.9803, b: 3.80, c: 1.04, type: 'field', unit: 'm' }
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
        // Convert to cm if formula expects cm (high jump, long jump)
        let perf = performance;
        if (coef.unit === 'cm') {
            perf = performance * 100; // meters to centimeters
        }
        const diff = perf - coef.b;
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
