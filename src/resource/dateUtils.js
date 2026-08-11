/**
 * @module dateUtils
 * @description Date and time utilities for LXRN framework.
 * Provides comprehensive date operations including formatting, parsing,
 * difference calculation, addition/subtraction, date boundaries,
 * comparison, and various date-related utility functions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function format(date, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.format: Invalid date');
  }
  const map = {
    'YYYY': d.getFullYear(),
    'YY': String(d.getFullYear()).slice(-2),
    'MM': String(d.getMonth() + 1).padStart(2, '0'),
    'M': String(d.getMonth() + 1),
    'DD': String(d.getDate()).padStart(2, '0'),
    'D': String(d.getDate()),
    'HH': String(d.getHours()).padStart(2, '0'),
    'H': String(d.getHours()),
    'hh': String(d.getHours() % 12 || 12).padStart(2, '0'),
    'h': String(d.getHours() % 12 || 12),
    'mm': String(d.getMinutes()).padStart(2, '0'),
    'm': String(d.getMinutes()),
    'ss': String(d.getSeconds()).padStart(2, '0'),
    's': String(d.getSeconds()),
    'SSS': String(d.getMilliseconds()).padStart(3, '0'),
    'A': d.getHours() < 12 ? 'AM' : 'PM',
    'a': d.getHours() < 12 ? 'am' : 'pm',
    'ddd': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
    'dddd': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()],
    'MMM': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()],
    'MMMM': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()],
    'Q': Math.floor((d.getMonth() + 3) / 3),
    'W': String(getWeekNumber(d)).padStart(2, '0'),
    'wo': getWeekNumber(d)
  };
  
  return formatStr.replace(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a|ddd|dddd|MMM|MMMM|Q|W|wo/g, match => {
    return map[match] !== undefined ? String(map[match]) : match;
  });
}

function getWeekNumber(date) {
  const d = new Date(date);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - startOfYear) / 86400000);
  return Math.ceil((days + 1) / 7);
}

export function parse(dateStr, formatStr = 'YYYY-MM-DD') {
  if (typeof dateStr !== 'string') {
    throw new TypeError('LXRN.dateUtils.parse: dateStr must be a string');
  }
  const parts = {};
  const formatParts = formatStr.match(/YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s/g) || [];
  const dateParts = dateStr.match(/\d+/g) || [];
  
  if (formatParts.length !== dateParts.length) {
    throw new Error('LXRN.dateUtils.parse: Format and date string do not match');
  }
  
  formatParts.forEach((part, index) => {
    parts[part] = parseInt(dateParts[index]);
  });
  
  const year = parts.YYYY || parts.YY ? (2000 + parts.YY) : 1970;
  const month = (parts.MM || parts.M || 1) - 1;
  const day = parts.DD || parts.D || 1;
  const hour = parts.HH || parts.H || parts.hh || parts.h || 0;
  const minute = parts.mm || parts.m || 0;
  const second = parts.ss || parts.s || 0;
  
  return new Date(year, month, day, hour, minute, second);
}

export function difference(date1, date2, unit = 'ms') {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new TypeError('LXRN.dateUtils.difference: Invalid date');
  }
  const diff = d1 - d2;
  
  const conversions = {
    'ms': 1,
    's': 1000,
    'm': 60000,
    'h': 3600000,
    'd': 86400000,
    'w': 604800000,
    'M': 2592000000,
    'y': 31536000000
  };
  
  if (!conversions[unit]) {
    throw new Error('LXRN.dateUtils.difference: Invalid unit. Must be ms, s, m, h, d, w, M, or y');
  }
  
  return diff / conversions[unit];
}

export function add(date, amount, unit = 'd') {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.add: Invalid date');
  }
  if (typeof amount !== 'number') {
    throw new TypeError('LXRN.dateUtils.add: amount must be a number');
  }
  
  const conversions = {
    'ms': 1,
    's': 1000,
    'm': 60000,
    'h': 3600000,
    'd': 86400000,
    'w': 604800000,
    'M': 2592000000,
    'y': 31536000000
  };
  
  if (!conversions[unit]) {
    throw new Error('LXRN.dateUtils.add: Invalid unit. Must be ms, s, m, h, d, w, M, or y');
  }
  
  d.setTime(d.getTime() + amount * conversions[unit]);
  return d;
}

export function subtract(date, amount, unit = 'd') {
  return add(date, -amount, unit);
}

export function startOf(date, unit = 'day') {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.startOf: Invalid date');
  }
  switch (unit) {
    case 'year':
      d.setMonth(0, 1);
      d.setHours(0, 0, 0, 0);
      break;
    case 'month':
      d.setDate(1);
      d.setHours(0, 0, 0, 0);
      break;
    case 'week':
      d.setDate(d.getDate() - d.getDay());
      d.setHours(0, 0, 0, 0);
      break;
    case 'day':
      d.setHours(0, 0, 0, 0);
      break;
    case 'hour':
      d.setMinutes(0, 0, 0);
      break;
    case 'minute':
      d.setSeconds(0, 0);
      break;
    case 'second':
      d.setMilliseconds(0);
      break;
    default:
      throw new Error('LXRN.dateUtils.startOf: Invalid unit. Must be year, month, week, day, hour, minute, or second');
  }
  return d;
}

export function endOf(date, unit = 'day') {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.endOf: Invalid date');
  }
  switch (unit) {
    case 'year':
      d.setMonth(11, 31);
      d.setHours(23, 59, 59, 999);
      break;
    case 'month':
      d.setMonth(d.getMonth() + 1, 0);
      d.setHours(23, 59, 59, 999);
      break;
    case 'week':
      d.setDate(d.getDate() + (6 - d.getDay()));
      d.setHours(23, 59, 59, 999);
      break;
    case 'day':
      d.setHours(23, 59, 59, 999);
      break;
    case 'hour':
      d.setMinutes(59, 59, 999);
      break;
    case 'minute':
      d.setSeconds(59, 999);
      break;
    case 'second':
      d.setMilliseconds(999);
      break;
    default:
      throw new Error('LXRN.dateUtils.endOf: Invalid unit. Must be year, month, week, day, hour, minute, or second');
  }
  return d;
}

export function isToday(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.isToday: Invalid date');
  }
  const today = new Date();
  return d.getFullYear() === today.getFullYear() &&
         d.getMonth() === today.getMonth() &&
         d.getDate() === today.getDate();
}

export function isYesterday(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.isYesterday: Invalid date');
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.getFullYear() === yesterday.getFullYear() &&
         d.getMonth() === yesterday.getMonth() &&
         d.getDate() === yesterday.getDate();
}

export function isTomorrow(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.isTomorrow: Invalid date');
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return d.getFullYear() === tomorrow.getFullYear() &&
         d.getMonth() === tomorrow.getMonth() &&
         d.getDate() === tomorrow.getDate();
}

export function isWeekend(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.isWeekend: Invalid date');
  }
  return d.getDay() === 0 || d.getDay() === 6;
}

export function isWeekday(date) {
  return !isWeekend(date);
}

export function getDaysInMonth(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.getDaysInMonth: Invalid date');
  }
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

export function getDaysInYear(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.getDaysInYear: Invalid date');
  }
  const year = d.getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

export function isLeapYear(date) {
  return getDaysInYear(date) === 366;
}

export function getWeekNumber(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.getWeekNumber: Invalid date');
  }
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - startOfYear) / 86400000);
  return Math.ceil((days + 1) / 7);
}

export function getAge(birthDate, asOf = new Date()) {
  const birth = new Date(birthDate);
  const now = new Date(asOf);
  if (isNaN(birth.getTime()) || isNaN(now.getTime())) {
    throw new TypeError('LXRN.dateUtils.getAge: Invalid date');
  }
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function timeAgo(date, locale = 'en') {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new TypeError('LXRN.dateUtils.timeAgo: Invalid date');
  }
  const diff = difference(new Date(), d, 's');
  const units = {
    en: {
      second: ['second', 'seconds'],
      minute: ['minute', 'minutes'],
      hour: ['hour', 'hours'],
      day: ['day', 'days'],
      week: ['week', 'weeks'],
      month: ['month', 'months'],
      year: ['year', 'years']
    }
  };
  
  const unit = units[locale] || units.en;
  let value = Math.abs(diff);
  let key = 'second';
  
  if (value < 60) {
    key = 'second';
  } else if (value < 3600) {
    value = Math.floor(value / 60);
    key = 'minute';
  } else if (value < 86400) {
    value = Math.floor(value / 3600);
    key = 'hour';
  } else if (value < 604800) {
    value = Math.floor(value / 86400);
    key = 'day';
  } else if (value < 2592000) {
    value = Math.floor(value / 604800);
    key = 'week';
  } else if (value < 31536000) {
    value = Math.floor(value / 2592000);
    key = 'month';
  } else {
    value = Math.floor(value / 31536000);
    key = 'year';
  }
  
  const suffix = diff < 0 ? 'ago' : 'from now';
  const unitWord = value === 1 ? unit[key][0] : unit[key][1];
  return `${value} ${unitWord} ${suffix}`;
}

export function isBefore(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new TypeError('LXRN.dateUtils.isBefore: Invalid date');
  }
  return d1 < d2;
}

export function isAfter(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new TypeError('LXRN.dateUtils.isAfter: Invalid date');
  }
  return d1 > d2;
}

export function isBetween(date, start, end) {
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(d.getTime()) || isNaN(s.getTime()) || isNaN(e.getTime())) {
    throw new TypeError('LXRN.dateUtils.isBetween: Invalid date');
  }
  return d >= s && d <= e;
}

export function minDate(...dates) {
  return new Date(Math.min(...dates.map(d => new Date(d))));
}

export function maxDate(...dates) {
  return new Date(Math.max(...dates.map(d => new Date(d))));
}

export const dateUtils = {
  format,
  parse,
  difference,
  add,
  subtract,
  startOf,
  endOf,
  isToday,
  isYesterday,
  isTomorrow,
  isWeekend,
  isWeekday,
  getDaysInMonth,
  getDaysInYear,
  isLeapYear,
  getWeekNumber,
  getAge,
  timeAgo,
  isBefore,
  isAfter,
  isBetween,
  minDate,
  maxDate
};
