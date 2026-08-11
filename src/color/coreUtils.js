/**
 * @module coreUtils
 * @description Core utility functions for LXRN framework.
 * Provides logging, error handling, validation, and general utility functions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import {
    LOG_LEVEL_DEBUG,
    LOG_LEVEL_INFO,
    LOG_LEVEL_WARN,
    LOG_LEVEL_ERROR,
    LOG_LEVEL_NONE,
    DEFAULT_LOG_LEVEL,
    FRAMEWORK_NAME,
    FRAMEWORK_VERSION,
    DEFAULT_TIMEOUT,
    DEFAULT_MAX_RETRIES,
    DEFAULT_MAX_LISTENERS,
    DEFAULT_CACHE_SIZE,
    DEFAULT_TTL,
    MILLISECONDS_PER_SECOND,
    SECONDS_PER_MINUTE,
    MINUTES_PER_HOUR,
    HOURS_PER_DAY,
    KILOBYTE,
    MEGABYTE,
    GIGABYTE,
    TERABYTE
} from './constants.js';

// ===== LOGGING =====
const LOG_LEVELS = {
    DEBUG: LOG_LEVEL_DEBUG,
    INFO: LOG_LEVEL_INFO,
    WARN: LOG_LEVEL_WARN,
    ERROR: LOG_LEVEL_ERROR,
    NONE: LOG_LEVEL_NONE
};

let _logLevel = LOG_LEVELS[DEFAULT_LOG_LEVEL.toUpperCase()] || LOG_LEVELS.INFO;
let _logPrefix = FRAMEWORK_NAME;

/**
 * Sets the global log level.
 * @param {string|number} level - The log level to set.
 */
export function setLogLevel(level) {
    if (typeof level === 'string') {
        const upper = level.toUpperCase();
        if (LOG_LEVELS[upper] !== undefined) {
            _logLevel = LOG_LEVELS[upper];
            return;
        }
        throw new Error(`LXRN.coreUtils.setLogLevel: Unknown log level: ${level}`);
    }
    if (typeof level === 'number') {
        const values = Object.values(LOG_LEVELS);
        if (values.includes(level)) {
            _logLevel = level;
            return;
        }
        throw new Error(`LXRN.coreUtils.setLogLevel: Invalid log level number: ${level}`);
    }
    throw new TypeError('LXRN.coreUtils.setLogLevel: level must be a string or number');
}

/**
 * Gets the current log level.
 * @returns {number} The current log level.
 */
export function getLogLevel() {
    return _logLevel;
}

/**
 * Sets the global log prefix.
 * @param {string} prefix - The prefix to use for all logs.
 */
export function setLogPrefix(prefix) {
    if (typeof prefix !== 'string') {
        throw new TypeError('LXRN.coreUtils.setLogPrefix: prefix must be a string');
    }
    _logPrefix = prefix;
}

/**
 * Gets the current log prefix.
 * @returns {string} The current log prefix.
 */
export function getLogPrefix() {
    return _logPrefix;
}

/**
 * Internal log function.
 * @param {string} level - The log level name.
 * @param {number} levelValue - The log level value.
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to log.
 */
function _log(level, levelValue, message, data) {
    if (levelValue >= _logLevel) {
        const timestamp = new Date().toISOString();
        const prefix = `[${_logPrefix}] [${timestamp}] [${level}]`;
        if (data !== undefined) {
            console.log(prefix, message, data);
        } else {
            console.log(prefix, message);
        }
    }
}

/**
 * Log a debug message.
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to log.
 */
export function debug(message, data) {
    _log('DEBUG', LOG_LEVEL_DEBUG, message, data);
}

/**
 * Log an info message.
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to log.
 */
export function info(message, data) {
    _log('INFO', LOG_LEVEL_INFO, message, data);
}

/**
 * Log a warning message.
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to log.
 */
export function warn(message, data) {
    _log('WARN', LOG_LEVEL_WARN, message, data);
}

/**
 * Log an error message.
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to log.
 */
export function error(message, data) {
    _log('ERROR', LOG_LEVEL_ERROR, message, data);
}

// ===== VALIDATION =====

/**
 * Checks if a value is a valid number.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid number.
 */
export function isValidNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

/**
 * Checks if a value is a valid integer.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid integer.
 */
export function isValidInteger(value) {
    return typeof value === 'number' && Number.isInteger(value);
}

/**
 * Checks if a value is a valid string.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid string.
 */
export function isValidString(value) {
    return typeof value === 'string';
}

/**
 * Checks if a value is a valid object.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid object.
 */
export function isValidObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Checks if a value is a valid array.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid array.
 */
export function isValidArray(value) {
    return Array.isArray(value);
}

/**
 * Checks if a value is a valid function.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid function.
 */
export function isValidFunction(value) {
    return typeof value === 'function';
}

/**
 * Checks if a value is a valid boolean.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a valid boolean.
 */
export function isValidBoolean(value) {
    return typeof value === 'boolean';
}

/**
 * Checks if a value is undefined or null.
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is undefined or null.
 */
export function isNil(value) {
    return value === undefined || value === null;
}

/**
 * Checks if a string is empty or whitespace.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is empty or whitespace.
 */
export function isEmptyString(str) {
    return typeof str !== 'string' || str.trim().length === 0;
}

/**
 * Checks if an array is empty.
 * @param {Array} arr - The array to check.
 * @returns {boolean} True if the array is empty.
 */
export function isEmptyArray(arr) {
    return !Array.isArray(arr) || arr.length === 0;
}

/**
 * Checks if an object is empty (no own properties).
 * @param {Object} obj - The object to check.
 * @returns {boolean} True if the object is empty.
 */
export function isEmptyObject(obj) {
    if (!isValidObject(obj)) return true;
    return Object.keys(obj).length === 0;
}

// ===== ERROR HANDLING =====

/**
 * Creates a formatted error with prefix.
 * @param {string} module - The module name.
 * @param {string} method - The method name.
 * @param {string} message - The error message.
 * @returns {Error} The formatted error.
 */
export function createError(module, method, message) {
    return new Error(`LXRN.${module}.${method}: ${message}`);
}

/**
 * Creates a formatted type error with prefix.
 * @param {string} module - The module name.
 * @param {string} method - The method name.
 * @param {string} param - The parameter name.
 * @param {string} expected - The expected type.
 * @returns {TypeError} The formatted type error.
 */
export function createTypeError(module, method, param, expected) {
    return new TypeError(`LXRN.${module}.${method}: ${param} must be ${expected}`);
}

/**
 * Creates a formatted range error with prefix.
 * @param {string} module - The module name.
 * @param {string} method - The method name.
 * @param {string} param - The parameter name.
 * @param {string} range - The allowed range.
 * @returns {RangeError} The formatted range error.
 */
export function createRangeError(module, method, param, range) {
    return new RangeError(`LXRN.${module}.${method}: ${param} must be ${range}`);
}

/**
 * Safely executes a function with error handling.
 * @param {Function} fn - The function to execute.
 * @param {Function} errorHandler - The error handler function.
 * @param {*} [defaultValue] - The default value to return on error.
 * @returns {*} The result of the function or the default value.
 */
export function safeExecute(fn, errorHandler, defaultValue) {
    try {
        return fn();
    } catch (err) {
        if (typeof errorHandler === 'function') {
            errorHandler(err);
        } else {
            error('Error in safeExecute:', err);
        }
        return defaultValue;
    }
}

// ===== UTILITY =====

/**
 * Generates a unique ID.
 * @param {string} [prefix=''] - The prefix to use.
 * @returns {string} The unique ID.
 */
export function generateId(prefix = '') {
    if (typeof prefix !== 'string') {
        throw new TypeError('LXRN.coreUtils.generateId: prefix must be a string');
    }
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}_${id}` : id;
}

/**
 * Deep clones an object.
 * @param {*} obj - The object to clone.
 * @returns {*} The cloned object.
 */
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    const cloned = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

/**
 * Deep merges two objects.
 * @param {Object} target - The target object.
 * @param {Object} source - The source object.
 * @returns {Object} The merged object.
 */
export function deepMerge(target, source) {
    if (!isValidObject(target) || !isValidObject(source)) {
        throw new TypeError('LXRN.coreUtils.deepMerge: Both arguments must be objects');
    }
    const result = { ...target };
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const value = source[key];
            if (isValidObject(value) && isValidObject(target[key])) {
                result[key] = deepMerge(target[key], value);
            } else if (isValidArray(value) && isValidArray(target[key])) {
                result[key] = [...target[key], ...value];
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

/**
 * Throttles a function to execute at most once per specified interval.
 * @param {Function} fn - The function to throttle.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The throttled function.
 */
export function throttle(fn, delay) {
    if (typeof fn !== 'function') {
        throw new TypeError('LXRN.coreUtils.throttle: fn must be a function');
    }
    if (typeof delay !== 'number' || delay <= 0) {
        throw new Error('LXRN.coreUtils.throttle: delay must be a positive number');
    }
    let lastCall = 0;
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;

    return function(...args) {
        const now = Date.now();
        const remaining = delay - (now - lastCall);

        lastArgs = args;
        lastThis = this;

        if (remaining <= 0) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastCall = now;
            fn.apply(lastThis, lastArgs);
        } else if (!timeoutId) {
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                timeoutId = null;
                fn.apply(lastThis, lastArgs);
            }, remaining);
        }
    };
}

/**
 * Debounces a function to execute after a specified delay.
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export function debounce(fn, delay) {
    if (typeof fn !== 'function') {
        throw new TypeError('LXRN.coreUtils.debounce: fn must be a function');
    }
    if (typeof delay !== 'number' || delay <= 0) {
        throw new Error('LXRN.coreUtils.debounce: delay must be a positive number');
    }
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;

    return function(...args) {
        lastArgs = args;
        lastThis = this;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = null;
            fn.apply(lastThis, lastArgs);
        }, delay);
    };
}

/**
 * Formats a number to a specific decimal place.
 * @param {number} value - The number to format.
 * @param {number} decimals - The number of decimals.
 * @returns {string} The formatted number.
 */
export function formatNumber(value, decimals = 2) {
    if (typeof value !== 'number') {
        throw new TypeError('LXRN.coreUtils.formatNumber: value must be a number');
    }
    if (typeof decimals !== 'number' || decimals < 0 || !Number.isInteger(decimals)) {
        throw new Error('LXRN.coreUtils.formatNumber: decimals must be a non-negative integer');
    }
    return value.toFixed(decimals);
}

/**
 * Formats a file size in bytes to a human-readable string.
 * @param {number} bytes - The size in bytes.
 * @param {number} [decimals=2] - The number of decimals.
 * @returns {string} The formatted file size.
 */
export function formatFileSize(bytes, decimals = 2) {
    if (typeof bytes !== 'number' || bytes < 0) {
        throw new Error('LXRN.coreUtils.formatFileSize: bytes must be a non-negative number');
    }
    if (bytes === 0) return '0 Bytes';
    const k = KILOBYTE;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Formats a duration in milliseconds to a human-readable string.
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted duration.
 */
export function formatDuration(ms) {
    if (typeof ms !== 'number' || ms < 0) {
        throw new Error('LXRN.coreUtils.formatDuration: ms must be a non-negative number');
    }
    if (ms < MILLISECONDS_PER_SECOND) return ms + 'ms';
    const seconds = Math.floor(ms / MILLISECONDS_PER_SECOND);
    if (seconds < SECONDS_PER_MINUTE) return seconds + 's';
    const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
    const remainingSeconds = seconds % SECONDS_PER_MINUTE;
    if (minutes < MINUTES_PER_HOUR) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / MINUTES_PER_HOUR);
    const remainingMinutes = minutes % MINUTES_PER_HOUR;
    if (hours < HOURS_PER_DAY) return `${hours}h ${remainingMinutes}m`;
    const days = Math.floor(hours / HOURS_PER_DAY);
    const remainingHours = hours % HOURS_PER_DAY;
    return `${days}d ${remainingHours}h`;
}

/**
 * Converts a string to title case.
 * @param {string} str - The string to convert.
 * @returns {string} The title-cased string.
 */
export function toTitleCase(str) {
    if (typeof str !== 'string') {
        throw new TypeError('LXRN.coreUtils.toTitleCase: str must be a string');
    }
    return str.toLowerCase().replace(/(^|\s)\w/g, match => match.toUpperCase());
}

/**
 * Converts a string to sentence case.
 * @param {string} str - The string to convert.
 * @returns {string} The sentence-cased string.
 */
export function toSentenceCase(str) {
    if (typeof str !== 'string') {
        throw new TypeError('LXRN.coreUtils.toSentenceCase: str must be a string');
    }
    return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

/**
 * Truncates a string to a specified length.
 * @param {string} str - The string to truncate.
 * @param {number} length - The maximum length.
 * @param {string} [suffix='...'] - The suffix to add.
 * @returns {string} The truncated string.
 */
export function truncateString(str, length, suffix = '...') {
    if (typeof str !== 'string') {
        throw new TypeError('LXRN.coreUtils.truncateString: str must be a string');
    }
    if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
        throw new Error('LXRN.coreUtils.truncateString: length must be a non-negative integer');
    }
    if (typeof suffix !== 'string') {
        throw new TypeError('LXRN.coreUtils.truncateString: suffix must be a string');
    }
    if (str.length <= length) return str;
    return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Escapes HTML entities in a string.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
export function escapeHtml(str) {
    if (typeof str !== 'string') {
        throw new TypeError('LXRN.coreUtils.escapeHtml: str must be a string');
    }
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    return str.replace(/[&<>"'`=\/]/g, char => entityMap[char]);
}

/**
 * Unescapes HTML entities in a string.
 * @param {string} str - The string to unescape.
 * @returns {string} The unescaped string.
 */
export function unescapeHtml(str) {
    if (typeof str !== 'string') {
        throw new TypeError('LXRN.coreUtils.unescapeHtml: str must be a string');
    }
    const entityMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': '/',
        '&#x60;': '`',
        '&#x3D;': '='
    };
    return str.replace(/&(?:amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/g, entity => entityMap[entity]);
}

/**
 * Parses a URL and returns its components.
 * @param {string} url - The URL to parse.
 * @returns {Object} The parsed URL components.
 */
export function parseUrl(url) {
    if (typeof url !== 'string') {
        throw new TypeError('LXRN.coreUtils.parseUrl: url must be a string');
    }
    try {
        const parsed = new URL(url);
        return {
            protocol: parsed.protocol.replace(':', ''),
            host: parsed.hostname,
            port: parsed.port || (parsed.protocol === 'https:' ? '443' : '80'),
            path: parsed.pathname,
            query: Object.fromEntries(parsed.searchParams),
            hash: parsed.hash.replace('#', ''),
            origin: parsed.origin,
            href: parsed.href
        };
    } catch (err) {
        throw new Error(`LXRN.coreUtils.parseUrl: Invalid URL: ${url}`);
    }
}

/**
 * Sleeps for a specified duration.
 * @param {number} ms - The duration in milliseconds.
 * @returns {Promise} A promise that resolves after the duration.
 */
export function sleep(ms) {
    if (typeof ms !== 'number' || ms < 0) {
        throw new Error('LXRN.coreUtils.sleep: ms must be a non-negative number');
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== EXPORTS =====

export const coreUtils = {
    // Logging
    setLogLevel,
    getLogLevel,
    setLogPrefix,
    getLogPrefix,
    debug,
    info,
    warn,
    error,

    // Validation
    isValidNumber,
    isValidInteger,
    isValidString,
    isValidObject,
    isValidArray,
    isValidFunction,
    isValidBoolean,
    isNil,
    isEmptyString,
    isEmptyArray,
    isEmptyObject,

    // Error Handling
    createError,
    createTypeError,
    createRangeError,
    safeExecute,

    // Utility
    generateId,
    deepClone,
    deepMerge,
    throttle,
    debounce,
    formatNumber,
    formatFileSize,
    formatDuration,
    toTitleCase,
    toSentenceCase,
    truncateString,
    escapeHtml,
    unescapeHtml,
    parseUrl,
    sleep
};

export default coreUtils;
