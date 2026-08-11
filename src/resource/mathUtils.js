/**
 * @module mathUtils
 * @description Core mathematical utilities for LXRN framework.
 * Provides all fundamental mathematical operations, constants, and utility functions.
 * This module serves as the single source of truth for all mathematical computations.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export const PI = Math.PI;
export const TWO_PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;
export const EPSILON = 1e-10;
export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;

export function max(...args) {
  return Math.max(...args);
}

export function min(...args) {
  return Math.min(...args);
}

export function abs(x) {
  return Math.abs(x);
}

export function sqrt(x) {
  return Math.sqrt(x);
}

export function pow(base, exponent) {
  return Math.pow(base, exponent);
}

export function exp(x) {
  return Math.exp(x);
}

export function log(x) {
  return Math.log(x);
}

export function log2(x) {
  return Math.log2(x);
}

export function log10(x) {
  return Math.log10(x);
}

export function cbrt(x) {
  return Math.cbrt(x);
}

export function sign(x) {
  return Math.sign(x);
}

export function sin(x) {
  return Math.sin(x);
}

export function cos(x) {
  return Math.cos(x);
}

export function tan(x) {
  return Math.tan(x);
}

export function asin(x) {
  return Math.asin(x);
}

export function acos(x) {
  return Math.acos(x);
}

export function atan(x) {
  return Math.atan(x);
}

export function atan2(y, x) {
  return Math.atan2(y, x);
}

export function floor(x) {
  return Math.floor(x);
}

export function ceil(x) {
  return Math.ceil(x);
}

export function round(x) {
  return Math.round(x);
}

export function trunc(x) {
  return Math.trunc(x);
}

export function random() {
  return Math.random();
}

export function randInt(min, max) {
  if (min > max) {
    throw new Error('LXRN.mathUtils.randInt: min cannot be greater than max');
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('LXRN.mathUtils.randInt: min and max must be integers');
  }
  return min + Math.floor(random() * (max - min + 1));
}

export function randFloat(min, max) {
  if (min > max) {
    throw new Error('LXRN.mathUtils.randFloat: min cannot be greater than max');
  }
  return min + random() * (max - min);
}

export function randFloatSpread(range) {
  return range * (0.5 - random());
}

export function clamp(value, min, max) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('LXRN.mathUtils.clamp: All arguments must be numbers');
  }
  if (min > max) {
    throw new Error('LXRN.mathUtils.clamp: min cannot be greater than max');
  }
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  if (typeof a !== 'number' || typeof b !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.mathUtils.lerp: All arguments must be numbers');
  }
  return (1 - t) * a + t * b;
}

export function equals(a, b, epsilon = EPSILON) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.mathUtils.equals: a and b must be numbers');
  }
  return Math.abs(a - b) < epsilon;
}

export function isZero(value, epsilon = EPSILON) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.mathUtils.isZero: value must be a number');
  }
  return Math.abs(value) < epsilon;
}

export function degToRad(degrees) {
  if (typeof degrees !== 'number') {
    throw new TypeError('LXRN.mathUtils.degToRad: degrees must be a number');
  }
  return degrees * DEG2RAD;
}

export function radToDeg(radians) {
  if (typeof radians !== 'number') {
    throw new TypeError('LXRN.mathUtils.radToDeg: radians must be a number');
  }
  return radians * RAD2DEG;
}

export function mapLinear(x, a1, a2, b1, b2) {
  if (typeof x !== 'number' || typeof a1 !== 'number' || typeof a2 !== 'number' || 
      typeof b1 !== 'number' || typeof b2 !== 'number') {
    throw new TypeError('LXRN.mathUtils.mapLinear: All arguments must be numbers');
  }
  if (a1 === a2) {
    throw new Error('LXRN.mathUtils.mapLinear: a1 and a2 cannot be equal');
  }
  return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
}

export function inverseLerp(x, y, value) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof value !== 'number') {
    throw new TypeError('LXRN.mathUtils.inverseLerp: All arguments must be numbers');
  }
  if (x !== y) return (value - x) / (y - x);
  return 0;
}

export function smoothstep(edge0, edge1, x) {
  if (typeof edge0 !== 'number' || typeof edge1 !== 'number' || typeof x !== 'number') {
    throw new TypeError('LXRN.mathUtils.smoothstep: All arguments must be numbers');
  }
  if (edge0 === edge1) {
    throw new Error('LXRN.mathUtils.smoothstep: edge0 and edge1 cannot be equal');
  }
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function smootherstep(edge0, edge1, x) {
  if (typeof edge0 !== 'number' || typeof edge1 !== 'number' || typeof x !== 'number') {
    throw new TypeError('LXRN.mathUtils.smootherstep: All arguments must be numbers');
  }
  if (edge0 === edge1) {
    throw new Error('LXRN.mathUtils.smootherstep: edge0 and edge1 cannot be equal');
  }
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function damp(x, y, lambda, dt) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof lambda !== 'number' || typeof dt !== 'number') {
    throw new TypeError('LXRN.mathUtils.damp: All arguments must be numbers');
  }
  return lerp(x, y, 1 - Math.exp(-lambda * dt));
}

export function pingpong(x, length = 1) {
  if (typeof x !== 'number' || typeof length !== 'number') {
    throw new TypeError('LXRN.mathUtils.pingpong: All arguments must be numbers');
  }
  if (length <= 0) {
    throw new Error('LXRN.mathUtils.pingpong: length must be greater than 0');
  }
  return length - Math.abs(((x % (length * 2)) + (length * 2)) % (length * 2) - length);
}

export function generateUUID() {
  const lut = [
    '00','01','02','03','04','05','06','07','08','09','0a','0b','0c','0d','0e','0f',
    '10','11','12','13','14','15','16','17','18','19','1a','1b','1c','1d','1e','1f',
    '20','21','22','23','24','25','26','27','28','29','2a','2b','2c','2d','2e','2f',
    '30','31','32','33','34','35','36','37','38','39','3a','3b','3c','3d','3e','3f',
    '40','41','42','43','44','45','46','47','48','49','4a','4b','4c','4d','4e','4f',
    '50','51','52','53','54','55','56','57','58','59','5a','5b','5c','5d','5e','5f',
    '60','61','62','63','64','65','66','67','68','69','6a','6b','6c','6d','6e','6f',
    '70','71','72','73','74','75','76','77','78','79','7a','7b','7c','7d','7e','7f',
    '80','81','82','83','84','85','86','87','88','89','8a','8b','8c','8d','8e','8f',
    '90','91','92','93','94','95','96','97','98','99','9a','9b','9c','9d','9e','9f',
    'a0','a1','a2','a3','a4','a5','a6','a7','a8','a9','aa','ab','ac','ad','ae','af',
    'b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','ba','bb','bc','bd','be','bf',
    'c0','c1','c2','c3','c4','c5','c6','c7','c8','c9','ca','cb','cc','cd','ce','cf',
    'd0','d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df',
    'e0','e1','e2','e3','e4','e5','e6','e7','e8','e9','ea','eb','ec','ed','ee','ef',
    'f0','f1','f2','f3','f4','f5','f6','f7','f8','f9','fa','fb','fc','fd','fe','ff'
  ];
  const d0 = Math.random() * 0xffffffff | 0;
  const d1 = Math.random() * 0xffffffff | 0;
  const d2 = Math.random() * 0xffffffff | 0;
  const d3 = Math.random() * 0xffffffff | 0;
  return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
         lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
         lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
         lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
}

let _seed = 1234567;

export function setSeed(seed) {
  if (typeof seed !== 'number' || !isFinite(seed)) {
    throw new TypeError('LXRN.mathUtils.setSeed: Seed must be a finite number');
  }
  _seed = seed;
}

export function getSeed() {
  return _seed;
}

export function seededRandom(s) {
  if (s !== undefined) {
    if (typeof s !== 'number' || !isFinite(s)) {
      throw new TypeError('LXRN.mathUtils.seededRandom: Seed must be a finite number');
    }
    _seed = s;
  }
  let t = _seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

export function normalize(value, array) {
  if (!array || typeof array.constructor === 'undefined') {
    throw new TypeError('LXRN.mathUtils.normalize: Invalid array provided');
  }
  switch (array.constructor) {
    case Float32Array: return value;
    case Uint32Array: return Math.round(value * 4294967295.0);
    case Uint16Array: return Math.round(value * 65535.0);
    case Uint8Array: return Math.round(value * 255.0);
    case Int32Array: return Math.round(value * 2147483647.0);
    case Int16Array: return Math.round(value * 32767.0);
    case Int8Array: return Math.round(value * 127.0);
    default: throw new Error('LXRN.mathUtils.normalize: Invalid component type.');
  }
}

export function denormalize(value, array) {
  if (!array || typeof array.constructor === 'undefined') {
    throw new TypeError('LXRN.mathUtils.denormalize: Invalid array provided');
  }
  switch (array.constructor) {
    case Float32Array: return value;
    case Uint32Array: return value / 4294967295.0;
    case Uint16Array: return value / 65535.0;
    case Uint8Array: return value / 255.0;
    case Int32Array: return Math.max(value / 2147483647.0, -1.0);
    case Int16Array: return Math.max(value / 32767.0, -1.0);
    case Int8Array: return Math.max(value / 127.0, -1.0);
    default: throw new Error('LXRN.mathUtils.denormalize: Invalid component type.');
  }
}

export function isPowerOfTwo(value) {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    return false;
  }
  return (value & (value - 1)) === 0;
}

export function ceilPowerOfTwo(value) {
  if (typeof value !== 'number' || value <= 0) {
    throw new Error('LXRN.mathUtils.ceilPowerOfTwo: value must be a positive number');
  }
  return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

export function floorPowerOfTwo(value) {
  if (typeof value !== 'number' || value <= 0) {
    throw new Error('LXRN.mathUtils.floorPowerOfTwo: value must be a positive number');
  }
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}

export function euclideanModulo(n, m) {
  return ((n % m) + m) % m;
}

export function setQuaternionFromProperEuler(q, a, b, c, order) {
  const cos = Math.cos;
  const sin = Math.sin;

  const c2 = cos(b / 2);
  const s2 = sin(b / 2);

  const c13 = cos((a + c) / 2);
  const s13 = sin((a + c) / 2);

  const c1_3 = cos((a - c) / 2);
  const s1_3 = sin((a - c) / 2);

  const c3_1 = cos((c - a) / 2);
  const s3_1 = sin((c - a) / 2);

  let x, y, z, w;

  switch (order) {
    case 'XYX':
      x = c2 * s13;
      y = s2 * c1_3;
      z = s2 * s1_3;
      w = c2 * c13;
      break;
    case 'YZY':
      x = s2 * s1_3;
      y = c2 * s13;
      z = s2 * c1_3;
      w = c2 * c13;
      break;
    case 'ZXZ':
      x = s2 * c1_3;
      y = s2 * s1_3;
      z = c2 * s13;
      w = c2 * c13;
      break;
    case 'XZX':
      x = c2 * s13;
      y = s2 * s3_1;
      z = s2 * c3_1;
      w = c2 * c13;
      break;
    case 'YXY':
      x = s2 * c3_1;
      y = c2 * s13;
      z = s2 * s3_1;
      w = c2 * c13;
      break;
    case 'ZYZ':
      x = s2 * s3_1;
      y = s2 * c3_1;
      z = c2 * s13;
      w = c2 * c13;
      break;
    default:
      console.warn('LXRN.mathUtils.setQuaternionFromProperEuler: Unknown order: ' + order);
      return;
  }

  if (typeof q.set === 'function') {
    q.set(x, y, z, w);
  } else {
    q._x = x;
    q._y = y;
    q._z = z;
    q._w = w;
  }
}

export const mathUtils = {
  PI,
  TWO_PI,
  HALF_PI,
  EPSILON,
  DEG2RAD,
  RAD2DEG,
  max,
  min,
  abs,
  sqrt,
  pow,
  exp,
  log,
  log2,
  log10,
  cbrt,
  sign,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  atan2,
  floor,
  ceil,
  round,
  trunc,
  random,
  randInt,
  randFloat,
  randFloatSpread,
  clamp,
  lerp,
  equals,
  isZero,
  degToRad,
  radToDeg,
  mapLinear,
  inverseLerp,
  smoothstep,
  smootherstep,
  damp,
  pingpong,
  generateUUID,
  setSeed,
  getSeed,
  seededRandom,
  normalize,
  denormalize,
  isPowerOfTwo,
  ceilPowerOfTwo,
  floorPowerOfTwo,
  euclideanModulo,
  setQuaternionFromProperEuler
};
