/**
 * @module complexUtils
 * @description Complex number operations for LXRN framework.
 * Provides comprehensive complex number math including creation, arithmetic,
 * conjugation, modulus, argument, powers, roots, exponential, logarithmic,
 * trigonometric functions, and polar conversions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function createComplex(real = 0, imaginary = 0) {
  if (typeof real !== 'number' || typeof imaginary !== 'number') {
    throw new TypeError('LXRN.complexUtils.createComplex: real and imaginary must be numbers');
  }
  return { real, imaginary };
}

export function add(c1, c2) {
  if (typeof c1 !== 'object' || typeof c2 !== 'object') {
    throw new TypeError('LXRN.complexUtils.add: c1 and c2 must be complex numbers');
  }
  return createComplex(
    c1.real + c2.real,
    c1.imaginary + c2.imaginary
  );
}

export function subtract(c1, c2) {
  if (typeof c1 !== 'object' || typeof c2 !== 'object') {
    throw new TypeError('LXRN.complexUtils.subtract: c1 and c2 must be complex numbers');
  }
  return createComplex(
    c1.real - c2.real,
    c1.imaginary - c2.imaginary
  );
}

export function multiply(c1, c2) {
  if (typeof c1 !== 'object' || typeof c2 !== 'object') {
    throw new TypeError('LXRN.complexUtils.multiply: c1 and c2 must be complex numbers');
  }
  return createComplex(
    c1.real * c2.real - c1.imaginary * c2.imaginary,
    c1.real * c2.imaginary + c1.imaginary * c2.real
  );
}

export function divide(c1, c2) {
  if (typeof c1 !== 'object' || typeof c2 !== 'object') {
    throw new TypeError('LXRN.complexUtils.divide: c1 and c2 must be complex numbers');
  }
  const denominator = c2.real * c2.real + c2.imaginary * c2.imaginary;
  if (denominator === 0) {
    throw new Error('LXRN.complexUtils.divide: Division by zero');
  }
  return createComplex(
    (c1.real * c2.real + c1.imaginary * c2.imaginary) / denominator,
    (c1.imaginary * c2.real - c1.real * c2.imaginary) / denominator
  );
}

export function conjugate(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.conjugate: c must be a complex number');
  }
  return createComplex(c.real, -c.imaginary);
}

export function modulus(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.modulus: c must be a complex number');
  }
  return Math.sqrt(c.real * c.real + c.imaginary * c.imaginary);
}

export function modulusSquared(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.modulusSquared: c must be a complex number');
  }
  return c.real * c.real + c.imaginary * c.imaginary;
}

export function argument(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.argument: c must be a complex number');
  }
  return Math.atan2(c.imaginary, c.real);
}

export function scale(c, scalar) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.scale: c must be a complex number');
  }
  if (typeof scalar !== 'number') {
    throw new TypeError('LXRN.complexUtils.scale: scalar must be a number');
  }
  return createComplex(c.real * scalar, c.imaginary * scalar);
}

export function negate(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.negate: c must be a complex number');
  }
  return createComplex(-c.real, -c.imaginary);
}

export function inverse(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.inverse: c must be a complex number');
  }
  const modSq = modulusSquared(c);
  if (modSq === 0) {
    throw new Error('LXRN.complexUtils.inverse: Cannot invert zero complex number');
  }
  return createComplex(c.real / modSq, -c.imaginary / modSq);
}

export function pow(c, exponent) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.pow: c must be a complex number');
  }
  if (typeof exponent !== 'number') {
    throw new TypeError('LXRN.complexUtils.pow: exponent must be a number');
  }
  const r = modulus(c);
  const theta = argument(c);
  const newR = Math.pow(r, exponent);
  const newTheta = theta * exponent;
  return createComplex(
    newR * Math.cos(newTheta),
    newR * Math.sin(newTheta)
  );
}

export function sqrt(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.sqrt: c must be a complex number');
  }
  const r = modulus(c);
  const theta = argument(c);
  const sqrtR = Math.sqrt(r);
  const halfTheta = theta / 2;
  return createComplex(
    sqrtR * Math.cos(halfTheta),
    sqrtR * Math.sin(halfTheta)
  );
}

export function exp(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.exp: c must be a complex number');
  }
  const eReal = Math.exp(c.real);
  return createComplex(
    eReal * Math.cos(c.imaginary),
    eReal * Math.sin(c.imaginary)
  );
}

export function log(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.log: c must be a complex number');
  }
  if (c.real === 0 && c.imaginary === 0) {
    throw new Error('LXRN.complexUtils.log: Cannot take log of zero');
  }
  return createComplex(
    Math.log(modulus(c)),
    argument(c)
  );
}

export function sin(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.sin: c must be a complex number');
  }
  return createComplex(
    Math.sin(c.real) * Math.cosh(c.imaginary),
    Math.cos(c.real) * Math.sinh(c.imaginary)
  );
}

export function cos(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.cos: c must be a complex number');
  }
  return createComplex(
    Math.cos(c.real) * Math.cosh(c.imaginary),
    -Math.sin(c.real) * Math.sinh(c.imaginary)
  );
}

export function tan(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.tan: c must be a complex number');
  }
  const sinC = sin(c);
  const cosC = cos(c);
  return divide(sinC, cosC);
}

export function sinh(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.sinh: c must be a complex number');
  }
  return createComplex(
    Math.sinh(c.real) * Math.cos(c.imaginary),
    Math.cosh(c.real) * Math.sin(c.imaginary)
  );
}

export function cosh(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.cosh: c must be a complex number');
  }
  return createComplex(
    Math.cosh(c.real) * Math.cos(c.imaginary),
    Math.sinh(c.real) * Math.sin(c.imaginary)
  );
}

export function tanh(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.tanh: c must be a complex number');
  }
  const sinhC = sinh(c);
  const coshC = cosh(c);
  return divide(sinhC, coshC);
}

export function isZero(c, epsilon = 1e-10) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.isZero: c must be a complex number');
  }
  return Math.abs(c.real) < epsilon && Math.abs(c.imaginary) < epsilon;
}

export function equals(c1, c2, epsilon = 1e-10) {
  if (typeof c1 !== 'object' || typeof c2 !== 'object') {
    throw new TypeError('LXRN.complexUtils.equals: c1 and c2 must be complex numbers');
  }
  return Math.abs(c1.real - c2.real) < epsilon &&
         Math.abs(c1.imaginary - c2.imaginary) < epsilon;
}

export function fromPolar(magnitude, angle) {
  if (typeof magnitude !== 'number' || typeof angle !== 'number') {
    throw new TypeError('LXRN.complexUtils.fromPolar: magnitude and angle must be numbers');
  }
  return createComplex(
    magnitude * Math.cos(angle),
    magnitude * Math.sin(angle)
  );
}

export function toPolar(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.toPolar: c must be a complex number');
  }
  return {
    magnitude: modulus(c),
    angle: argument(c)
  };
}

export function toArray(c) {
  if (typeof c !== 'object') {
    throw new TypeError('LXRN.complexUtils.toArray: c must be a complex number');
  }
  return [c.real, c.imaginary];
}

export function fromArray(arr) {
  if (!Array.isArray(arr) || arr.length !== 2) {
    throw new TypeError('LXRN.complexUtils.fromArray: arr must be an array with 2 elements');
  }
  return createComplex(arr[0], arr[1]);
}

export const complexUtils = {
  createComplex,
  add,
  subtract,
  multiply,
  divide,
  conjugate,
  modulus,
  modulusSquared,
  argument,
  scale,
  negate,
  inverse,
  pow,
  sqrt,
  exp,
  log,
  sin,
  cos,
  tan,
  sinh,
  cosh,
  tanh,
  isZero,
  equals,
  fromPolar,
  toPolar,
  toArray,
  fromArray
};
