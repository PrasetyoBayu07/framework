/**
 * @module geometryUtils
 * @description Geometry utilities for LXRN framework.
 * Provides comprehensive geometric calculations including area, volume,
 * perimeter, surface area, distance, and point-in-shape tests for various
 * 2D and 3D geometric shapes.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function distance2D(x1, y1, x2, y2) {
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.distance2D: All arguments must be numbers');
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distance3D(x1, y1, z1, x2, y2, z2) {
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof z1 !== 'number' || 
      typeof x2 !== 'number' || typeof y2 !== 'number' || typeof z2 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.distance3D: All arguments must be numbers');
  }
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function areaCircle(radius) {
  if (typeof radius !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaCircle: radius must be a number');
  }
  if (radius < 0) {
    throw new Error('LXRN.geometryUtils.areaCircle: radius cannot be negative');
  }
  return Math.PI * radius * radius;
}

export function circumferenceCircle(radius) {
  if (typeof radius !== 'number') {
    throw new TypeError('LXRN.geometryUtils.circumferenceCircle: radius must be a number');
  }
  if (radius < 0) {
    throw new Error('LXRN.geometryUtils.circumferenceCircle: radius cannot be negative');
  }
  return 2 * Math.PI * radius;
}

export function areaRectangle(width, height) {
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaRectangle: width and height must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.areaRectangle: width and height cannot be negative');
  }
  return width * height;
}

export function perimeterRectangle(width, height) {
  if (typeof width !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.perimeterRectangle: width and height must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.perimeterRectangle: width and height cannot be negative');
  }
  return 2 * (width + height);
}

export function areaTriangle(base, height) {
  if (typeof base !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaTriangle: base and height must be numbers');
  }
  if (base < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.areaTriangle: base and height cannot be negative');
  }
  return 0.5 * base * height;
}

export function areaTriangleHeron(a, b, c) {
  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaTriangleHeron: a, b, and c must be numbers');
  }
  if (a < 0 || b < 0 || c < 0) {
    throw new Error('LXRN.geometryUtils.areaTriangleHeron: sides cannot be negative');
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('LXRN.geometryUtils.areaTriangleHeron: Invalid triangle sides');
  }
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

export function areaTrapezoid(base1, base2, height) {
  if (typeof base1 !== 'number' || typeof base2 !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaTrapezoid: base1, base2, and height must be numbers');
  }
  if (base1 < 0 || base2 < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.areaTrapezoid: bases and height cannot be negative');
  }
  return 0.5 * (base1 + base2) * height;
}

export function areaParallelogram(base, height) {
  if (typeof base !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaParallelogram: base and height must be numbers');
  }
  if (base < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.areaParallelogram: base and height cannot be negative');
  }
  return base * height;
}

export function areaEllipse(semiMajorAxis, semiMinorAxis) {
  if (typeof semiMajorAxis !== 'number' || typeof semiMinorAxis !== 'number') {
    throw new TypeError('LXRN.geometryUtils.areaEllipse: semiMajorAxis and semiMinorAxis must be numbers');
  }
  if (semiMajorAxis < 0 || semiMinorAxis < 0) {
    throw new Error('LXRN.geometryUtils.areaEllipse: axes cannot be negative');
  }
  return Math.PI * semiMajorAxis * semiMinorAxis;
}

export function volumeSphere(radius) {
  if (typeof radius !== 'number') {
    throw new TypeError('LXRN.geometryUtils.volumeSphere: radius must be a number');
  }
  if (radius < 0) {
    throw new Error('LXRN.geometryUtils.volumeSphere: radius cannot be negative');
  }
  return (4 / 3) * Math.PI * radius * radius * radius;
}

export function surfaceAreaSphere(radius) {
  if (typeof radius !== 'number') {
    throw new TypeError('LXRN.geometryUtils.surfaceAreaSphere: radius must be a number');
  }
  if (radius < 0) {
    throw new Error('LXRN.geometryUtils.surfaceAreaSphere: radius cannot be negative');
  }
  return 4 * Math.PI * radius * radius;
}

export function volumeCube(side) {
  if (typeof side !== 'number') {
    throw new TypeError('LXRN.geometryUtils.volumeCube: side must be a number');
  }
  if (side < 0) {
    throw new Error('LXRN.geometryUtils.volumeCube: side cannot be negative');
  }
  return side * side * side;
}

export function surfaceAreaCube(side) {
  if (typeof side !== 'number') {
    throw new TypeError('LXRN.geometryUtils.surfaceAreaCube: side must be a number');
  }
  if (side < 0) {
    throw new Error('LXRN.geometryUtils.surfaceAreaCube: side cannot be negative');
  }
  return 6 * side * side;
}

export function volumeCuboid(length, width, height) {
  if (typeof length !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.volumeCuboid: length, width, and height must be numbers');
  }
  if (length < 0 || width < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.volumeCuboid: dimensions cannot be negative');
  }
  return length * width * height;
}

export function surfaceAreaCuboid(length, width, height) {
  if (typeof length !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.surfaceAreaCuboid: length, width, and height must be numbers');
  }
  if (length < 0 || width < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.surfaceAreaCuboid: dimensions cannot be negative');
  }
  return 2 * (length * width + width * height + height * length);
}

export function volumeCylinder(radius, height) {
  if (typeof radius !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.volumeCylinder: radius and height must be numbers');
  }
  if (radius < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.volumeCylinder: radius and height cannot be negative');
  }
  return Math.PI * radius * radius * height;
}

export function surfaceAreaCylinder(radius, height) {
  if (typeof radius !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.surfaceAreaCylinder: radius and height must be numbers');
  }
  if (radius < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.surfaceAreaCylinder: radius and height cannot be negative');
  }
  return 2 * Math.PI * radius * (radius + height);
}

export function volumeCone(radius, height) {
  if (typeof radius !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.volumeCone: radius and height must be numbers');
  }
  if (radius < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.volumeCone: radius and height cannot be negative');
  }
  return (1 / 3) * Math.PI * radius * radius * height;
}

export function surfaceAreaCone(radius, height) {
  if (typeof radius !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.surfaceAreaCone: radius and height must be numbers');
  }
  if (radius < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.surfaceAreaCone: radius and height cannot be negative');
  }
  const slantHeight = Math.sqrt(radius * radius + height * height);
  return Math.PI * radius * (radius + slantHeight);
}

export function volumePyramid(baseArea, height) {
  if (typeof baseArea !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.volumePyramid: baseArea and height must be numbers');
  }
  if (baseArea < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.volumePyramid: baseArea and height cannot be negative');
  }
  return (1 / 3) * baseArea * height;
}

export function isPointInCircle(px, py, cx, cy, radius) {
  if (typeof px !== 'number' || typeof py !== 'number' || typeof cx !== 'number' || 
      typeof cy !== 'number' || typeof radius !== 'number') {
    throw new TypeError('LXRN.geometryUtils.isPointInCircle: All arguments must be numbers');
  }
  if (radius < 0) {
    throw new Error('LXRN.geometryUtils.isPointInCircle: radius cannot be negative');
  }
  const dist = distance2D(px, py, cx, cy);
  return dist <= radius;
}

export function isPointInRectangle(px, py, x, y, width, height) {
  if (typeof px !== 'number' || typeof py !== 'number' || typeof x !== 'number' || 
      typeof y !== 'number' || typeof width !== 'number' || typeof height !== 'number') {
    throw new TypeError('LXRN.geometryUtils.isPointInRectangle: All arguments must be numbers');
  }
  if (width < 0 || height < 0) {
    throw new Error('LXRN.geometryUtils.isPointInRectangle: width and height cannot be negative');
  }
  return px >= x && px <= x + width && py >= y && py <= y + height;
}

export function isPointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  if (typeof px !== 'number' || typeof py !== 'number' || typeof x1 !== 'number' || 
      typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number' ||
      typeof x3 !== 'number' || typeof y3 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.isPointInTriangle: All arguments must be numbers');
  }
  const d1 = sign(px, py, x1, y1, x2, y2);
  const d2 = sign(px, py, x2, y2, x3, y3);
  const d3 = sign(px, py, x3, y3, x1, y1);
  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
  return !(hasNeg && hasPos);
}

function sign(px, py, x1, y1, x2, y2) {
  return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
}

export function lineLength(x1, y1, x2, y2) {
  return distance2D(x1, y1, x2, y2);
}

export function slope(x1, y1, x2, y2) {
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.slope: All arguments must be numbers');
  }
  if (x1 === x2) {
    throw new Error('LXRN.geometryUtils.slope: Vertical line has undefined slope');
  }
  return (y2 - y1) / (x2 - x1);
}

export function midpoint(x1, y1, x2, y2) {
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.midpoint: All arguments must be numbers');
  }
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2
  };
}

export function angleBetweenLines(x1, y1, x2, y2, x3, y3, x4, y4) {
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number' ||
      typeof x3 !== 'number' || typeof y3 !== 'number' || typeof x4 !== 'number' || typeof y4 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.angleBetweenLines: All arguments must be numbers');
  }
  const m1 = slope(x1, y1, x2, y2);
  const m2 = slope(x3, y3, x4, y4);
  const angle = Math.atan(Math.abs((m2 - m1) / (1 + m1 * m2)));
  return angle;
}

export function circleFromPoints(x1, y1, x2, y2, x3, y3) {
  if (typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number' ||
      typeof x3 !== 'number' || typeof y3 !== 'number') {
    throw new TypeError('LXRN.geometryUtils.circleFromPoints: All arguments must be numbers');
  }
  const ax = x1, ay = y1, bx = x2, by = y2, cx = x3, cy = y3;
  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  if (d === 0) {
    throw new Error('LXRN.geometryUtils.circleFromPoints: Points are collinear');
  }
  const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
  const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
  const radius = distance2D(ux, uy, ax, ay);
  return { center: { x: ux, y: uy }, radius };
}

export const geometryUtils = {
  distance2D,
  distance3D,
  areaCircle,
  circumferenceCircle,
  areaRectangle,
  perimeterRectangle,
  areaTriangle,
  areaTriangleHeron,
  areaTrapezoid,
  areaParallelogram,
  areaEllipse,
  volumeSphere,
  surfaceAreaSphere,
  volumeCube,
  surfaceAreaCube,
  volumeCuboid,
  surfaceAreaCuboid,
  volumeCylinder,
  surfaceAreaCylinder,
  volumeCone,
  surfaceAreaCone,
  volumePyramid,
  isPointInCircle,
  isPointInRectangle,
  isPointInTriangle,
  lineLength,
  slope,
  midpoint,
  angleBetweenLines,
  circleFromPoints
};
