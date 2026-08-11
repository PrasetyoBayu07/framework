/**
 * @module interpolationUtils
 * @description Interpolation utilities for LXRN framework.
 * Provides various interpolation methods including linear, cubic, Bezier,
 * Catmull-Rom, Hermite, and spline interpolation.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import { clamp, lerp } from './mathUtils.js';

export function linearInterpolation(p0, p1, t) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.linearInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.linearInterpolation: t must be between 0 and 1');
  }
  return (1 - t) * p0 + t * p1;
}

export function cubicInterpolation(p0, p1, p2, p3, t) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof p2 !== 'number' || 
      typeof p3 !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.cubicInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.cubicInterpolation: t must be between 0 and 1');
  }
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

export function bezierInterpolation(p0, p1, p2, p3, t) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof p2 !== 'number' || 
      typeof p3 !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.bezierInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.bezierInterpolation: t must be between 0 and 1');
  }
  const u = 1 - t;
  const t2 = t * t;
  const u2 = u * u;
  const t3 = t2 * t;
  const u3 = u2 * u;
  return u3 * p0 + 3 * u2 * t * p1 + 3 * u * t2 * p2 + t3 * p3;
}

export function catmullRomInterpolation(p0, p1, p2, p3, t) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof p2 !== 'number' || 
      typeof p3 !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.catmullRomInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.catmullRomInterpolation: t must be between 0 and 1');
  }
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

export function hermiteInterpolation(p0, p1, m0, m1, t) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof m0 !== 'number' || 
      typeof m1 !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.hermiteInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.hermiteInterpolation: t must be between 0 and 1');
  }
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  return h00 * p0 + h10 * m0 + h01 * p1 + h11 * m1;
}

export function splineInterpolation(points, t) {
  if (!Array.isArray(points) || points.length < 4) {
    throw new TypeError('LXRN.interpolationUtils.splineInterpolation: points must be an array with at least 4 points');
  }
  if (typeof t !== 'number' || t < 0 || t > points.length - 1) {
    throw new Error('LXRN.interpolationUtils.splineInterpolation: t must be between 0 and points.length - 1');
  }
  const n = points.length;
  const index = Math.floor(t);
  const frac = t - index;
  
  const p0 = points[Math.max(0, index - 1)];
  const p1 = points[index];
  const p2 = points[Math.min(n - 1, index + 1)];
  const p3 = points[Math.min(n - 1, index + 2)];
  
  return catmullRomInterpolation(p0, p1, p2, p3, frac);
}

export function lerp2D(p0, p1, t) {
  if (typeof p0 !== 'object' || typeof p1 !== 'object') {
    throw new TypeError('LXRN.interpolationUtils.lerp2D: p0 and p1 must be points');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.lerp2D: t must be between 0 and 1');
  }
  return {
    x: linearInterpolation(p0.x, p1.x, t),
    y: linearInterpolation(p0.y, p1.y, t)
  };
}

export function lerp3D(p0, p1, t) {
  if (typeof p0 !== 'object' || typeof p1 !== 'object') {
    throw new TypeError('LXRN.interpolationUtils.lerp3D: p0 and p1 must be points');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.lerp3D: t must be between 0 and 1');
  }
  return {
    x: linearInterpolation(p0.x, p1.x, t),
    y: linearInterpolation(p0.y, p1.y, t),
    z: linearInterpolation(p0.z, p1.z, t)
  };
}

export function bilinearInterpolation(p00, p10, p01, p11, tx, ty) {
  if (typeof p00 !== 'object' || typeof p10 !== 'object' || typeof p01 !== 'object' || typeof p11 !== 'object') {
    throw new TypeError('LXRN.interpolationUtils.bilinearInterpolation: All points must be objects');
  }
  if (typeof tx !== 'number' || tx < 0 || tx > 1) {
    throw new Error('LXRN.interpolationUtils.bilinearInterpolation: tx must be between 0 and 1');
  }
  if (typeof ty !== 'number' || ty < 0 || ty > 1) {
    throw new Error('LXRN.interpolationUtils.bilinearInterpolation: ty must be between 0 and 1');
  }
  const top = lerp2D(p00, p10, tx);
  const bottom = lerp2D(p01, p11, tx);
  return lerp2D(top, bottom, ty);
}

export function trilinearInterpolation(p000, p100, p010, p110, p001, p101, p011, p111, tx, ty, tz) {
  if (typeof p000 !== 'object' || typeof p100 !== 'object' || typeof p010 !== 'object' || typeof p110 !== 'object' ||
      typeof p001 !== 'object' || typeof p101 !== 'object' || typeof p011 !== 'object' || typeof p111 !== 'object') {
    throw new TypeError('LXRN.interpolationUtils.trilinearInterpolation: All points must be objects');
  }
  if (typeof tx !== 'number' || tx < 0 || tx > 1) {
    throw new Error('LXRN.interpolationUtils.trilinearInterpolation: tx must be between 0 and 1');
  }
  if (typeof ty !== 'number' || ty < 0 || ty > 1) {
    throw new Error('LXRN.interpolationUtils.trilinearInterpolation: ty must be between 0 and 1');
  }
  if (typeof tz !== 'number' || tz < 0 || tz > 1) {
    throw new Error('LXRN.interpolationUtils.trilinearInterpolation: tz must be between 0 and 1');
  }
  const front = bilinearInterpolation(p000, p100, p010, p110, tx, ty);
  const back = bilinearInterpolation(p001, p101, p011, p111, tx, ty);
  return lerp3D(front, back, tz);
}

export function smoothstepInterpolation(edge0, edge1, x) {
  if (typeof edge0 !== 'number' || typeof edge1 !== 'number' || typeof x !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.smoothstepInterpolation: All arguments must be numbers');
  }
  if (edge0 === edge1) {
    throw new Error('LXRN.interpolationUtils.smoothstepInterpolation: edge0 and edge1 cannot be equal');
  }
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function smootherstepInterpolation(edge0, edge1, x) {
  if (typeof edge0 !== 'number' || typeof edge1 !== 'number' || typeof x !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.smootherstepInterpolation: All arguments must be numbers');
  }
  if (edge0 === edge1) {
    throw new Error('LXRN.interpolationUtils.smootherstepInterpolation: edge0 and edge1 cannot be equal');
  }
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function cosineInterpolation(p0, p1, t) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof t !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.cosineInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.cosineInterpolation: t must be between 0 and 1');
  }
  const mu2 = (1 - Math.cos(t * Math.PI)) / 2;
  return p0 * (1 - mu2) + p1 * mu2;
}

export function exponentialInterpolation(p0, p1, t, exponent = 2) {
  if (typeof p0 !== 'number' || typeof p1 !== 'number' || typeof t !== 'number' || typeof exponent !== 'number') {
    throw new TypeError('LXRN.interpolationUtils.exponentialInterpolation: All arguments must be numbers');
  }
  if (t < 0 || t > 1) {
    throw new Error('LXRN.interpolationUtils.exponentialInterpolation: t must be between 0 and 1');
  }
  if (exponent <= 0) {
    throw new Error('LXRN.interpolationUtils.exponentialInterpolation: exponent must be positive');
  }
  const mu = Math.pow(t, exponent);
  return p0 * (1 - mu) + p1 * mu;
}

export const interpolationUtils = {
  linearInterpolation,
  cubicInterpolation,
  bezierInterpolation,
  catmullRomInterpolation,
  hermiteInterpolation,
  splineInterpolation,
  lerp2D,
  lerp3D,
  bilinearInterpolation,
  trilinearInterpolation,
  smoothstepInterpolation,
  smootherstepInterpolation,
  cosineInterpolation,
  exponentialInterpolation
};
