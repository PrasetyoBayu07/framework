/**
 * @module coreUtils
 * @description Core utilities for LXRN framework.
 * Provides wrapper functions for all JavaScript built-in objects including hidden/global ones.
 * This module serves as the single source of truth for all non-mathematical operations.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export const INFINITY = Infinity;
export const NEGATIVE_INFINITY = -Infinity;
export const NAN = NaN;
export const UNDEFINED = undefined;
export const NULL = null;
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
export const NUMBER_EPSILON = Number.EPSILON;

export function now() {
  return performance.now();
}

export function isArray(value) {
  return Array.isArray(value);
}

export function from(iterable) {
  return Array.from(iterable);
}

export function of(...items) {
  return Array.of(...items);
}

export function keys(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('LXRN.coreUtils.keys: obj must be an object');
  }
  return Object.keys(obj);
}

export function values(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('LXRN.coreUtils.values: obj must be an object');
  }
  return Object.values(obj);
}

export function entries(obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('LXRN.coreUtils.entries: obj must be an object');
  }
  return Object.entries(obj);
}

export function assign(target, ...sources) {
  if (!target || typeof target !== 'object') {
    throw new TypeError('LXRN.coreUtils.assign: target must be an object');
  }
  return Object.assign(target, ...sources);
}

export function toLower(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.toLower: str must be a string');
  }
  return str.toLowerCase();
}

export function toUpper(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.toUpper: str must be a string');
  }
  return str.toUpperCase();
}

export function split(str, separator) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.split: str must be a string');
  }
  return str.split(separator);
}

export function replace(str, pattern, replacement) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.replace: str must be a string');
  }
  return str.replace(pattern, replacement);
}

export function isFinite(value) {
  return Number.isFinite(value);
}

export function isNaN(value) {
  return Number.isNaN(value);
}

export function isUndefined(value) {
  return value === undefined;
}

export function isNull(value) {
  return value === null;
}

export function parseInt(str, radix = 10) {
  if (typeof str !== 'string' && typeof str !== 'number') {
    throw new TypeError('LXRN.coreUtils.parseInt: str must be a string or number');
  }
  if (typeof radix !== 'number' || radix < 2 || radix > 36) {
    throw new RangeError('LXRN.coreUtils.parseInt: radix must be between 2 and 36');
  }
  return Number.parseInt(str, radix);
}

export function parseFloat(str) {
  if (typeof str !== 'string' && typeof str !== 'number') {
    throw new TypeError('LXRN.coreUtils.parseFloat: str must be a string or number');
  }
  return Number.parseFloat(str);
}

export function stringify(value, replacer = null, space = null) {
  try {
    return JSON.stringify(value, replacer, space);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('cyclic')) {
      throw new Error('LXRN.coreUtils.stringify: Cannot stringify object with circular reference');
    }
    throw error;
  }
}

export function parse(str, reviver = null) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.parse: str must be a string');
  }
  return JSON.parse(str, reviver);
}

export function log(...args) {
  console.log(...args);
}

export function warn(...args) {
  console.warn(...args);
}

export function error(...args) {
  console.error(...args);
}

export function createError(message) {
  return new Error(message);
}

export function createTypeError(message) {
  return new TypeError(message);
}

export function resolve(value) {
  return Promise.resolve(value);
}

export function reject(reason) {
  return Promise.reject(reason);
}

export function all(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('LXRN.coreUtils.all: promises must be an array');
  }
  return Promise.all(promises);
}

export function float32(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.coreUtils.float32: size must be a non-negative integer');
  }
  return new Float32Array(size);
}

export function uint8(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.coreUtils.uint8: size must be a non-negative integer');
  }
  return new Uint8Array(size);
}

export function int16(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.coreUtils.int16: size must be a non-negative integer');
  }
  return new Int16Array(size);
}

export function uint16(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.coreUtils.uint16: size must be a non-negative integer');
  }
  return new Uint16Array(size);
}

export function uint32(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.coreUtils.uint32: size must be a non-negative integer');
  }
  return new Uint32Array(size);
}

export function float64(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.coreUtils.float64: size must be a non-negative integer');
  }
  return new Float64Array(size);
}

export function createMap(iterable = null) {
  return new Map(iterable);
}

export function createSet(iterable = null) {
  return new Set(iterable);
}

export function createWeakMap() {
  return new WeakMap();
}

export function createWeakSet() {
  return new WeakSet();
}

export function date(...args) {
  return new Date(...args);
}

export function dateNow() {
  return Date.now();
}

export function encodeURI(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.encodeURI: str must be a string');
  }
  return globalThis.encodeURI(str);
}

export function decodeURI(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.decodeURI: str must be a string');
  }
  return globalThis.decodeURI(str);
}

export function encodeURIComponent(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.encodeURIComponent: str must be a string');
  }
  return globalThis.encodeURIComponent(str);
}

export function decodeURIComponent(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.decodeURIComponent: str must be a string');
  }
  return globalThis.decodeURIComponent(str);
}

export function btoa(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.btoa: str must be a string');
  }
  return globalThis.btoa(str);
}

export function atob(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.coreUtils.atob: str must be a string');
  }
  return globalThis.atob(str);
}

export function setTimeout(callback, delay, ...args) {
  return globalThis.setTimeout(callback, delay, ...args);
}

export function clearTimeout(id) {
  return globalThis.clearTimeout(id);
}

export function setInterval(callback, delay, ...args) {
  return globalThis.setInterval(callback, delay, ...args);
}

export function clearInterval(id) {
  return globalThis.clearInterval(id);
}

export function requestAnimationFrame(callback) {
  return globalThis.requestAnimationFrame(callback);
}

export function cancelAnimationFrame(id) {
  return globalThis.cancelAnimationFrame(id);
}

export function getGlobal() {
  return globalThis;
}

export function isWindow() {
  return typeof window !== 'undefined' && window === globalThis;
}

export function isSelf() {
  return typeof self !== 'undefined' && self === globalThis;
}

export function isNode() {
  return typeof process !== 'undefined' && 
         typeof process.versions !== 'undefined' && 
         typeof process.versions.node !== 'undefined' &&
         !isWindow() && !isSelf();
}

export function createElement(tag) {
  if (typeof document === 'undefined') {
    throw new Error('LXRN.coreUtils.createElement: document is not available');
  }
  if (typeof tag !== 'string' || tag.trim() === '') {
    throw new TypeError('LXRN.coreUtils.createElement: tag must be a non-empty string');
  }
  return document.createElement(tag);
}

export function getElementById(id) {
  if (typeof document !== 'undefined') {
    return document.getElementById(id);
  }
  return null;
}

export function getCanvasContext(canvas, contextType = 'webgl') {
  if (!canvas || typeof canvas.getContext !== 'function') {
    throw new TypeError('LXRN.coreUtils.getCanvasContext: canvas must be a valid canvas element');
  }
  const context = canvas.getContext(contextType);
  if (!context) {
    throw new Error(`LXRN.coreUtils.getCanvasContext: ${contextType} context is not supported`);
  }
  return context;
}

export function getUserAgent() {
  if (typeof navigator !== 'undefined') {
    return navigator.userAgent;
  }
  return '';
}

export function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

export function createURL(url, base = null) {
  try {
    return new URL(url, base);
  } catch (error) {
    throw new Error(`LXRN.coreUtils.createURL: Invalid URL - ${error.message}`);
  }
}

export function createObjectURL(blob) {
  return URL.createObjectURL(blob);
}

export function revokeObjectURL(url) {
  URL.revokeObjectURL(url);
}

export const coreUtils = {
  INFINITY,
  NEGATIVE_INFINITY,
  NAN,
  UNDEFINED,
  NULL,
  MAX_SAFE_INTEGER,
  NUMBER_EPSILON,
  now,
  isArray,
  from,
  of,
  keys,
  values,
  entries,
  assign,
  toLower,
  toUpper,
  split,
  replace,
  isFinite,
  isNaN,
  isUndefined,
  isNull,
  parseInt,
  parseFloat,
  stringify,
  parse,
  log,
  warn,
  error,
  createError,
  createTypeError,
  resolve,
  reject,
  all,
  float32,
  uint8,
  int16,
  uint16,
  uint32,
  float64,
  createMap,
  createSet,
  createWeakMap,
  createWeakSet,
  date,
  dateNow,
  encodeURI,
  decodeURI,
  encodeURIComponent,
  decodeURIComponent,
  btoa,
  atob,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  requestAnimationFrame,
  cancelAnimationFrame,
  getGlobal,
  isWindow,
  isSelf,
  isNode,
  createElement,
  getElementById,
  getCanvasContext,
  getUserAgent,
  isWebGLSupported,
  createURL,
  createObjectURL,
  revokeObjectURL
};
