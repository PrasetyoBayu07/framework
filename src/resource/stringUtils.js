/**
 * @module stringUtils
 * @description String manipulation utilities for LXRN framework.
 * Provides comprehensive string operations including case conversion,
 * trimming, padding, substring extraction, pattern matching, and
 * various text transformation functions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function camelCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.camelCase: str must be a string');
  }
  return str.replace(/[-_\s]+(.)?/g, (match, char) => {
    return char ? char.toUpperCase() : '';
  }).replace(/^./, char => char.toLowerCase());
}

export function snakeCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.snakeCase: str must be a string');
  }
  return str.replace(/([a-z])([A-Z])/g, '$1_$2')
            .replace(/[\s-]+/g, '_')
            .toLowerCase();
}

export function kebabCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.kebabCase: str must be a string');
  }
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
}

export function pascalCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.pascalCase: str must be a string');
  }
  return str.replace(/[-_\s]+(.)?/g, (match, char) => {
    return char ? char.toUpperCase() : '';
  }).replace(/^./, char => char.toUpperCase());
}

export function titleCase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.titleCase: str must be a string');
  }
  return str.replace(/\w\S*/g, word => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}

export function capitalize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.capitalize: str must be a string');
  }
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function decapitalize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.decapitalize: str must be a string');
  }
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function truncate(str, length, suffix = '...') {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.truncate: str must be a string');
  }
  if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
    throw new TypeError('LXRN.stringUtils.truncate: length must be a non-negative integer');
  }
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

export function ellipsis(str, length) {
  return truncate(str, length);
}

export function padStart(str, length, char = ' ') {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.padStart: str must be a string');
  }
  if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
    throw new TypeError('LXRN.stringUtils.padStart: length must be a non-negative integer');
  }
  return str.padStart(length, char);
}

export function padEnd(str, length, char = ' ') {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.padEnd: str must be a string');
  }
  if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
    throw new TypeError('LXRN.stringUtils.padEnd: length must be a non-negative integer');
  }
  return str.padEnd(length, char);
}

export function trim(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.trim: str must be a string');
  }
  return str.trim();
}

export function trimStart(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.trimStart: str must be a string');
  }
  return str.trimStart();
}

export function trimEnd(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.trimEnd: str must be a string');
  }
  return str.trimEnd();
}

export function reverse(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.reverse: str must be a string');
  }
  return str.split('').reverse().join('');
}

export function count(str, substring) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.count: str must be a string');
  }
  if (typeof substring !== 'string') {
    throw new TypeError('LXRN.stringUtils.count: substring must be a string');
  }
  return str.split(substring).length - 1;
}

export function isPalindrome(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isPalindrome: str must be a string');
  }
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === reverse(clean);
}

export function levenshteinDistance(str1, str2) {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new TypeError('LXRN.stringUtils.levenshteinDistance: str1 and str2 must be strings');
  }
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

export function similarity(str1, str2) {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new TypeError('LXRN.stringUtils.similarity: str1 and str2 must be strings');
  }
  const distance = levenshteinDistance(str1, str2);
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1;
  return 1 - distance / maxLength;
}

export function startsWith(str, prefix) {
  if (typeof str !== 'string' || typeof prefix !== 'string') {
    throw new TypeError('LXRN.stringUtils.startsWith: str and prefix must be strings');
  }
  return str.startsWith(prefix);
}

export function endsWith(str, suffix) {
  if (typeof str !== 'string' || typeof suffix !== 'string') {
    throw new TypeError('LXRN.stringUtils.endsWith: str and suffix must be strings');
  }
  return str.endsWith(suffix);
}

export function includes(str, substring) {
  if (typeof str !== 'string' || typeof substring !== 'string') {
    throw new TypeError('LXRN.stringUtils.includes: str and substring must be strings');
  }
  return str.includes(substring);
}

export function replaceAll(str, search, replacement) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.replaceAll: str must be a string');
  }
  return str.replace(new RegExp(search, 'g'), replacement);
}

export function toSlug(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.toSlug: str must be a string');
  }
  return str.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s-]+/g, '-');
}

export function toWords(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.toWords: str must be a string');
  }
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[-_\s]+/g, ' ')
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 0);
}

export function isEmail(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isEmail: str must be a string');
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isURL(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isURL: str must be a string');
  }
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function isPhoneNumber(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isPhoneNumber: str must be a string');
  }
  return /^\+?[\d\s-()]+$/.test(str);
}

export function isNumeric(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isNumeric: str must be a string');
  }
  return /^-?\d+(\.\d+)?$/.test(str);
}

export function isInteger(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isInteger: str must be a string');
  }
  return /^-?\d+$/.test(str);
}

export function isFloat(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.isFloat: str must be a string');
  }
  return /^-?\d+\.\d+$/.test(str);
}

export function repeat(str, count) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.repeat: str must be a string');
  }
  if (typeof count !== 'number' || count < 0 || !Number.isInteger(count)) {
    throw new TypeError('LXRN.stringUtils.repeat: count must be a non-negative integer');
  }
  return str.repeat(count);
}

export function first(str, n = 1) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.first: str must be a string');
  }
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('LXRN.stringUtils.first: n must be a non-negative integer');
  }
  return str.slice(0, n);
}

export function last(str, n = 1) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.stringUtils.last: str must be a string');
  }
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('LXRN.stringUtils.last: n must be a non-negative integer');
  }
  return str.slice(-n);
}

export const stringUtils = {
  camelCase,
  snakeCase,
  kebabCase,
  pascalCase,
  titleCase,
  capitalize,
  decapitalize,
  truncate,
  ellipsis,
  padStart,
  padEnd,
  trim,
  trimStart,
  trimEnd,
  reverse,
  count,
  isPalindrome,
  levenshteinDistance,
  similarity,
  startsWith,
  endsWith,
  includes,
  replaceAll,
  toSlug,
  toWords,
  isEmail,
  isURL,
  isPhoneNumber,
  isNumeric,
  isInteger,
  isFloat,
  repeat,
  first,
  last
};
