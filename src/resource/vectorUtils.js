/**
 * @module vectorUtils
 * @description Vector operations for LXRN framework.
 * Provides comprehensive vector math for 2D, 3D, and 4D vectors including
 * addition, subtraction, scaling, dot product, cross product, normalization,
 * interpolation, and various vector properties.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function createVector(x, y, z = 0, w = 1) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof w !== 'number') {
    throw new TypeError('LXRN.vectorUtils.createVector: All arguments must be numbers');
  }
  return { x, y, z, w };
}

export function vec2(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('LXRN.vectorUtils.vec2: x and y must be numbers');
  }
  return { x, y };
}

export function vec3(x, y, z) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    throw new TypeError('LXRN.vectorUtils.vec3: x, y, and z must be numbers');
  }
  return { x, y, z };
}

export function vec4(x, y, z, w) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof w !== 'number') {
    throw new TypeError('LXRN.vectorUtils.vec4: x, y, z, and w must be numbers');
  }
  return { x, y, z, w };
}

export function add(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.add: v1 and v2 must be vectors');
  }
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: (v1.z || 0) + (v2.z || 0),
    w: (v1.w || 1) + (v2.w || 1)
  };
}

export function subtract(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.subtract: v1 and v2 must be vectors');
  }
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: (v1.z || 0) - (v2.z || 0),
    w: (v1.w || 1) - (v2.w || 1)
  };
}

export function scale(vector, scalar) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.scale: vector must be a vector');
  }
  if (typeof scalar !== 'number') {
    throw new TypeError('LXRN.vectorUtils.scale: scalar must be a number');
  }
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
    z: (vector.z || 0) * scalar,
    w: (vector.w || 1) * scalar
  };
}

export function dot(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.dot: v1 and v2 must be vectors');
  }
  let result = v1.x * v2.x + v1.y * v2.y;
  if (v1.z !== undefined && v2.z !== undefined) {
    result += v1.z * v2.z;
  }
  if (v1.w !== undefined && v2.w !== undefined) {
    result += v1.w * v2.w;
  }
  return result;
}

export function cross(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.cross: v1 and v2 must be vectors');
  }
  if (v1.z === undefined || v2.z === undefined) {
    throw new Error('LXRN.vectorUtils.cross: cross product requires 3D vectors');
  }
  return {
    x: v1.y * v2.z - v1.z * v2.y,
    y: v1.z * v2.x - v1.x * v2.z,
    z: v1.x * v2.y - v1.y * v2.x
  };
}

export function length(vector) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.length: vector must be a vector');
  }
  let result = vector.x * vector.x + vector.y * vector.y;
  if (vector.z !== undefined) {
    result += vector.z * vector.z;
  }
  if (vector.w !== undefined) {
    result += vector.w * vector.w;
  }
  return Math.sqrt(result);
}

export function lengthSquared(vector) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.lengthSquared: vector must be a vector');
  }
  let result = vector.x * vector.x + vector.y * vector.y;
  if (vector.z !== undefined) {
    result += vector.z * vector.z;
  }
  if (vector.w !== undefined) {
    result += vector.w * vector.w;
  }
  return result;
}

export function normalize(vector) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.normalize: vector must be a vector');
  }
  const len = length(vector);
  if (len === 0) return { ...vector };
  return scale(vector, 1 / len);
}

export function distance(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.distance: v1 and v2 must be vectors');
  }
  return length(subtract(v1, v2));
}

export function distanceSquared(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.distanceSquared: v1 and v2 must be vectors');
  }
  return lengthSquared(subtract(v1, v2));
}

export function angle(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.angle: v1 and v2 must be vectors');
  }
  const dotProduct = dot(v1, v2);
  const len1 = length(v1);
  const len2 = length(v2);
  if (len1 === 0 || len2 === 0) return 0;
  return Math.acos(Math.max(-1, Math.min(1, dotProduct / (len1 * len2))));
}

export function project(v1, v2) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.project: v1 and v2 must be vectors');
  }
  const dotProduct = dot(v1, v2);
  const lenSq = dot(v2, v2);
  if (lenSq === 0) return createVector(0, 0);
  return scale(v2, dotProduct / lenSq);
}

export function reflect(vector, normal) {
  if (typeof vector !== 'object' || typeof normal !== 'object') {
    throw new TypeError('LXRN.vectorUtils.reflect: vector and normal must be vectors');
  }
  const normalizedNormal = normalize(normal);
  const dotProduct = 2 * dot(vector, normalizedNormal);
  return subtract(vector, scale(normalizedNormal, dotProduct));
}

export function lerp(v1, v2, t) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.lerp: v1 and v2 must be vectors');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new TypeError('LXRN.vectorUtils.lerp: t must be a number between 0 and 1');
  }
  return {
    x: v1.x + (v2.x - v1.x) * t,
    y: v1.y + (v2.y - v1.y) * t,
    z: (v1.z || 0) + ((v2.z || 0) - (v1.z || 0)) * t,
    w: (v1.w || 1) + ((v2.w || 1) - (v1.w || 1)) * t
  };
}

export function slerp(v1, v2, t) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.slerp: v1 and v2 must be vectors');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new TypeError('LXRN.vectorUtils.slerp: t must be a number between 0 and 1');
  }
  const angleBetween = angle(v1, v2);
  if (angleBetween === 0) return { ...v1 };
  const sinAngle = Math.sin(angleBetween);
  const weight1 = Math.sin((1 - t) * angleBetween) / sinAngle;
  const weight2 = Math.sin(t * angleBetween) / sinAngle;
  return add(scale(v1, weight1), scale(v2, weight2));
}

export function isZero(vector, epsilon = 1e-10) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.isZero: vector must be a vector');
  }
  return Math.abs(vector.x) < epsilon && 
         Math.abs(vector.y) < epsilon && 
         (vector.z === undefined || Math.abs(vector.z) < epsilon);
}

export function equals(v1, v2, epsilon = 1e-10) {
  if (typeof v1 !== 'object' || typeof v2 !== 'object') {
    throw new TypeError('LXRN.vectorUtils.equals: v1 and v2 must be vectors');
  }
  return Math.abs(v1.x - v2.x) < epsilon &&
         Math.abs(v1.y - v2.y) < epsilon &&
         (v1.z === undefined || Math.abs(v1.z - v2.z) < epsilon) &&
         (v1.w === undefined || Math.abs(v1.w - v2.w) < epsilon);
}

export function max(vector) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.max: vector must be a vector');
  }
  let maxVal = vector.x;
  if (vector.y > maxVal) maxVal = vector.y;
  if (vector.z !== undefined && vector.z > maxVal) maxVal = vector.z;
  if (vector.w !== undefined && vector.w > maxVal) maxVal = vector.w;
  return maxVal;
}

export function min(vector) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.min: vector must be a vector');
  }
  let minVal = vector.x;
  if (vector.y < minVal) minVal = vector.y;
  if (vector.z !== undefined && vector.z < minVal) minVal = vector.z;
  if (vector.w !== undefined && vector.w < minVal) minVal = vector.w;
  return minVal;
}

export function clamp(vector, minVal, maxVal) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.clamp: vector must be a vector');
  }
  if (typeof minVal !== 'number' || typeof maxVal !== 'number') {
    throw new TypeError('LXRN.vectorUtils.clamp: minVal and maxVal must be numbers');
  }
  if (minVal > maxVal) {
    throw new Error('LXRN.vectorUtils.clamp: minVal cannot be greater than maxVal');
  }
  return {
    x: Math.max(minVal, Math.min(maxVal, vector.x)),
    y: Math.max(minVal, Math.min(maxVal, vector.y)),
    z: vector.z !== undefined ? Math.max(minVal, Math.min(maxVal, vector.z)) : undefined,
    w: vector.w !== undefined ? Math.max(minVal, Math.min(maxVal, vector.w)) : undefined
  };
}

export function toArray(vector) {
  if (typeof vector !== 'object') {
    throw new TypeError('LXRN.vectorUtils.toArray: vector must be a vector');
  }
  const result = [vector.x, vector.y];
  if (vector.z !== undefined) result.push(vector.z);
  if (vector.w !== undefined) result.push(vector.w);
  return result;
}

export function fromArray(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw new TypeError('LXRN.vectorUtils.fromArray: arr must be an array with at least 2 elements');
  }
  if (arr.length === 2) return vec2(arr[0], arr[1]);
  if (arr.length === 3) return vec3(arr[0], arr[1], arr[2]);
  if (arr.length === 4) return vec4(arr[0], arr[1], arr[2], arr[3]);
  throw new Error('LXRN.vectorUtils.fromArray: array must have 2, 3, or 4 elements');
}

export const vectorUtils = {
  createVector,
  vec2,
  vec3,
  vec4,
  add,
  subtract,
  scale,
  dot,
  cross,
  length,
  lengthSquared,
  normalize,
  distance,
  distanceSquared,
  angle,
  project,
  reflect,
  lerp,
  slerp,
  isZero,
  equals,
  max,
  min,
  clamp,
  toArray,
  fromArray
};
