/**
 * @module bootstrap
 * @description LXRN bootstrap - enhances native objects silently.
 * This file must be loaded first before any LXRN code runs.
 * Users will not know that native objects have been enhanced.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import { mathUtils } from './mathUtils.js';
import { coreUtils } from './coreUtils.js';

const _originalMath = globalThis.Math;
const _originalConsole = globalThis.console;
const _originalPerformance = globalThis.performance;
const _originalJSON = globalThis.JSON;
const _originalArray = globalThis.Array;
const _originalObject = globalThis.Object;
const _originalNumber = globalThis.Number;
const _originalPromise = globalThis.Promise;
const _originalDate = globalThis.Date;
const _originalURL = globalThis.URL;
const _originalSetTimeout = globalThis.setTimeout;
const _originalClearTimeout = globalThis.clearTimeout;
const _originalSetInterval = globalThis.setInterval;
const _originalClearInterval = globalThis.clearInterval;
const _originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const _originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
const _originalParseInt = globalThis.parseInt;
const _originalParseFloat = globalThis.parseFloat;
const _originalIsFinite = globalThis.isFinite;
const _originalIsNaN = globalThis.isNaN;
const _originalEncodeURI = globalThis.encodeURI;
const _originalDecodeURI = globalThis.decodeURI;
const _originalEncodeURIComponent = globalThis.encodeURIComponent;
const _originalDecodeURIComponent = globalThis.decodeURIComponent;
const _originalBtoa = globalThis.btoa;
const _originalAtob = globalThis.atob;
const _originalFloat32Array = globalThis.Float32Array;
const _originalUint8Array = globalThis.Uint8Array;
const _originalInt16Array = globalThis.Int16Array;
const _originalUint16Array = globalThis.Uint16Array;
const _originalUint32Array = globalThis.Uint32Array;
const _originalFloat64Array = globalThis.Float64Array;
const _originalMap = globalThis.Map;
const _originalSet = globalThis.Set;
const _originalWeakMap = globalThis.WeakMap;
const _originalWeakSet = globalThis.WeakSet;

const _hiddenMathProto = Object.create(_originalMath.__proto__ || Object.prototype);

Object.defineProperties(_hiddenMathProto, {
  TWO_PI: {
    value: mathUtils.TWO_PI,
    enumerable: false,
    configurable: false,
    writable: false
  },
  HALF_PI: {
    value: mathUtils.HALF_PI,
    enumerable: false,
    configurable: false,
    writable: false
  },
  EPSILON: {
    value: mathUtils.EPSILON,
    enumerable: false,
    configurable: false,
    writable: false
  },
  DEG2RAD: {
    value: mathUtils.DEG2RAD,
    enumerable: false,
    configurable: false,
    writable: false
  },
  RAD2DEG: {
    value: mathUtils.RAD2DEG,
    enumerable: false,
    configurable: false,
    writable: false
  },
  clamp: {
    value: mathUtils.clamp,
    enumerable: false,
    configurable: false,
    writable: false
  },
  lerp: {
    value: mathUtils.lerp,
    enumerable: false,
    configurable: false,
    writable: false
  },
  equals: {
    value: mathUtils.equals,
    enumerable: false,
    configurable: false,
    writable: false
  },
  isZero: {
    value: mathUtils.isZero,
    enumerable: false,
    configurable: false,
    writable: false
  },
  degToRad: {
    value: mathUtils.degToRad,
    enumerable: false,
    configurable: false,
    writable: false
  },
  radToDeg: {
    value: mathUtils.radToDeg,
    enumerable: false,
    configurable: false,
    writable: false
  },
  mapLinear: {
    value: mathUtils.mapLinear,
    enumerable: false,
    configurable: false,
    writable: false
  },
  inverseLerp: {
    value: mathUtils.inverseLerp,
    enumerable: false,
    configurable: false,
    writable: false
  },
  smoothstep: {
    value: mathUtils.smoothstep,
    enumerable: false,
    configurable: false,
    writable: false
  },
  smootherstep: {
    value: mathUtils.smootherstep,
    enumerable: false,
    configurable: false,
    writable: false
  },
  damp: {
    value: mathUtils.damp,
    enumerable: false,
    configurable: false,
    writable: false
  },
  pingpong: {
    value: mathUtils.pingpong,
    enumerable: false,
    configurable: false,
    writable: false
  },
  generateUUID: {
    value: mathUtils.generateUUID,
    enumerable: false,
    configurable: false,
    writable: false
  },
  seededRandom: {
    value: mathUtils.seededRandom,
    enumerable: false,
    configurable: false,
    writable: false
  },
  setSeed: {
    value: mathUtils.setSeed,
    enumerable: false,
    configurable: false,
    writable: false
  },
  getSeed: {
    value: mathUtils.getSeed,
    enumerable: false,
    configurable: false,
    writable: false
  },
  normalize: {
    value: mathUtils.normalize,
    enumerable: false,
    configurable: false,
    writable: false
  },
  denormalize: {
    value: mathUtils.denormalize,
    enumerable: false,
    configurable: false,
    writable: false
  },
  isPowerOfTwo: {
    value: mathUtils.isPowerOfTwo,
    enumerable: false,
    configurable: false,
    writable: false
  },
  ceilPowerOfTwo: {
    value: mathUtils.ceilPowerOfTwo,
    enumerable: false,
    configurable: false,
    writable: false
  },
  floorPowerOfTwo: {
    value: mathUtils.floorPowerOfTwo,
    enumerable: false,
    configurable: false,
    writable: false
  },
  randInt: {
    value: mathUtils.randInt,
    enumerable: false,
    configurable: false,
    writable: false
  },
  randFloat: {
    value: mathUtils.randFloat,
    enumerable: false,
    configurable: false,
    writable: false
  },
  randFloatSpread: {
    value: mathUtils.randFloatSpread,
    enumerable: false,
    configurable: false,
    writable: false
  }
});

Object.setPrototypeOf(_originalMath, _hiddenMathProto);

const _origConsoleLog = _originalConsole.log;
const _origConsoleWarn = _originalConsole.warn;
const _origConsoleError = _originalConsole.error;
const _origConsoleInfo = _originalConsole.info;
const _origConsoleDebug = _originalConsole.debug;

_originalConsole.log = function(...args) {
  return _origConsoleLog.apply(_originalConsole, args);
};

_originalConsole.warn = function(...args) {
  return _origConsoleWarn.apply(_originalConsole, args);
};

_originalConsole.error = function(...args) {
  return _origConsoleError.apply(_originalConsole, args);
};

_originalConsole.info = function(...args) {
  return _origConsoleInfo.apply(_originalConsole, args);
};

_originalConsole.debug = function(...args) {
  return _origConsoleDebug.apply(_originalConsole, args);
};

Object.defineProperty(_originalPerformance, 'now', {
  value: coreUtils.now,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalJSON, 'stringify', {
  value: coreUtils.stringify,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalJSON, 'parse', {
  value: coreUtils.parse,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalArray, 'isArray', {
  value: coreUtils.isArray,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalArray, 'from', {
  value: coreUtils.from,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalArray, 'of', {
  value: coreUtils.of,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalObject, 'keys', {
  value: coreUtils.keys,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalObject, 'values', {
  value: coreUtils.values,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalObject, 'entries', {
  value: coreUtils.entries,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalObject, 'assign', {
  value: coreUtils.assign,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalNumber, 'isFinite', {
  value: coreUtils.isFinite,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalNumber, 'isNaN', {
  value: coreUtils.isNaN,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalNumber, 'parseInt', {
  value: coreUtils.parseInt,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalNumber, 'parseFloat', {
  value: coreUtils.parseFloat,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalNumber, 'MAX_SAFE_INTEGER', {
  value: coreUtils.MAX_SAFE_INTEGER,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalNumber, 'EPSILON', {
  value: coreUtils.NUMBER_EPSILON,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalPromise, 'resolve', {
  value: coreUtils.resolve,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalPromise, 'reject', {
  value: coreUtils.reject,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalPromise, 'all', {
  value: coreUtils.all,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalDate, 'now', {
  value: coreUtils.dateNow,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalURL, 'createObjectURL', {
  value: coreUtils.createObjectURL,
  enumerable: false,
  configurable: false,
  writable: false
});

Object.defineProperty(_originalURL, 'revokeObjectURL', {
  value: coreUtils.revokeObjectURL,
  enumerable: false,
  configurable: false,
  writable: false
});

globalThis.setTimeout = function(callback, delay, ...args) {
  return _originalSetTimeout(callback, delay, ...args);
};

globalThis.clearTimeout = function(id) {
  return _originalClearTimeout(id);
};

globalThis.setInterval = function(callback, delay, ...args) {
  return _originalSetInterval(callback, delay, ...args);
};

globalThis.clearInterval = function(id) {
  return _originalClearInterval(id);
};

globalThis.requestAnimationFrame = function(callback) {
  return _originalRequestAnimationFrame(callback);
};

globalThis.cancelAnimationFrame = function(id) {
  return _originalCancelAnimationFrame(id);
};

globalThis.parseInt = function(str, radix) {
  return _originalParseInt(str, radix);
};

globalThis.parseFloat = function(str) {
  return _originalParseFloat(str);
};

globalThis.isFinite = function(value) {
  return _originalIsFinite(value);
};

globalThis.isNaN = function(value) {
  return _originalIsNaN(value);
};

globalThis.encodeURI = function(str) {
  return _originalEncodeURI(str);
};

globalThis.decodeURI = function(str) {
  return _originalDecodeURI(str);
};

globalThis.encodeURIComponent = function(str) {
  return _originalEncodeURIComponent(str);
};

globalThis.decodeURIComponent = function(str) {
  return _originalDecodeURIComponent(str);
};

globalThis.btoa = function(str) {
  return _originalBtoa(str);
};

globalThis.atob = function(str) {
  return _originalAtob(str);
};

globalThis.Float32Array = function(...args) {
  if (this instanceof Float32Array) {
    return new _originalFloat32Array(...args);
  }
  if (args.length === 0) {
    return coreUtils.float32(0);
  }
  if (args.length === 1 && typeof args[0] === 'number') {
    return coreUtils.float32(args[0]);
  }
  if (args.length === 1 && (Array.isArray(args[0]) || ArrayBuffer.isView(args[0]))) {
    return new _originalFloat32Array(args[0]);
  }
  return new _originalFloat32Array(...args);
};

globalThis.Float32Array.prototype = _originalFloat32Array.prototype;

globalThis.Uint8Array = function(...args) {
  if (this instanceof Uint8Array) {
    return new _originalUint8Array(...args);
  }
  if (args.length === 0) {
    return coreUtils.uint8(0);
  }
  if (args.length === 1 && typeof args[0] === 'number') {
    return coreUtils.uint8(args[0]);
  }
  if (args.length === 1 && (Array.isArray(args[0]) || ArrayBuffer.isView(args[0]))) {
    return new _originalUint8Array(args[0]);
  }
  return new _originalUint8Array(...args);
};

globalThis.Uint8Array.prototype = _originalUint8Array.prototype;

globalThis.Int16Array = function(...args) {
  if (this instanceof Int16Array) {
    return new _originalInt16Array(...args);
  }
  if (args.length === 0) {
    return coreUtils.int16(0);
  }
  if (args.length === 1 && typeof args[0] === 'number') {
    return coreUtils.int16(args[0]);
  }
  if (args.length === 1 && (Array.isArray(args[0]) || ArrayBuffer.isView(args[0]))) {
    return new _originalInt16Array(args[0]);
  }
  return new _originalInt16Array(...args);
};

globalThis.Int16Array.prototype = _originalInt16Array.prototype;

globalThis.Uint16Array = function(...args) {
  if (this instanceof Uint16Array) {
    return new _originalUint16Array(...args);
  }
  if (args.length === 0) {
    return coreUtils.uint16(0);
  }
  if (args.length === 1 && typeof args[0] === 'number') {
    return coreUtils.uint16(args[0]);
  }
  if (args.length === 1 && (Array.isArray(args[0]) || ArrayBuffer.isView(args[0]))) {
    return new _originalUint16Array(args[0]);
  }
  return new _originalUint16Array(...args);
};

globalThis.Uint16Array.prototype = _originalUint16Array.prototype;

globalThis.Uint32Array = function(...args) {
  if (this instanceof Uint32Array) {
    return new _originalUint32Array(...args);
  }
  if (args.length === 0) {
    return coreUtils.uint32(0);
  }
  if (args.length === 1 && typeof args[0] === 'number') {
    return coreUtils.uint32(args[0]);
  }
  if (args.length === 1 && (Array.isArray(args[0]) || ArrayBuffer.isView(args[0]))) {
    return new _originalUint32Array(args[0]);
  }
  return new _originalUint32Array(...args);
};

globalThis.Uint32Array.prototype = _originalUint32Array.prototype;

globalThis.Float64Array = function(...args) {
  if (this instanceof Float64Array) {
    return new _originalFloat64Array(...args);
  }
  if (args.length === 0) {
    return coreUtils.float64(0);
  }
  if (args.length === 1 && typeof args[0] === 'number') {
    return coreUtils.float64(args[0]);
  }
  if (args.length === 1 && (Array.isArray(args[0]) || ArrayBuffer.isView(args[0]))) {
    return new _originalFloat64Array(args[0]);
  }
  return new _originalFloat64Array(...args);
};

globalThis.Float64Array.prototype = _originalFloat64Array.prototype;

globalThis.Map = function(iterable) {
  if (this instanceof Map) {
    return new _originalMap(iterable);
  }
  return coreUtils.createMap(iterable);
};

globalThis.Map.prototype = _originalMap.prototype;

globalThis.Set = function(iterable) {
  if (this instanceof Set) {
    return new _originalSet(iterable);
  }
  return coreUtils.createSet(iterable);
};

globalThis.Set.prototype = _originalSet.prototype;

globalThis.WeakMap = function() {
  if (this instanceof WeakMap) {
    return new _originalWeakMap();
  }
  return coreUtils.createWeakMap();
};

globalThis.WeakMap.prototype = _originalWeakMap.prototype;

globalThis.WeakSet = function() {
  if (this instanceof WeakSet) {
    return new _originalWeakSet();
  }
  return coreUtils.createWeakSet();
};

globalThis.WeakSet.prototype = _originalWeakSet.prototype;
