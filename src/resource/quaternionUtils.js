/**
 * @module quaternionUtils
 * @description Quaternion operations for LXRN framework.
 * Provides comprehensive quaternion math for 3D rotations including
 * creation from axis-angle and Euler angles, multiplication, conjugation,
 * normalization, slerp interpolation, and conversion to/from various formats.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function createQuaternion(x = 0, y = 0, z = 0, w = 1) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number' || typeof w !== 'number') {
    throw new TypeError('LXRN.quaternionUtils.createQuaternion: All arguments must be numbers');
  }
  return { x, y, z, w };
}

export function identity() {
  return createQuaternion(0, 0, 0, 1);
}

export function fromAxisAngle(axis, angle) {
  if (typeof axis !== 'object' || typeof angle !== 'number') {
    throw new TypeError('LXRN.quaternionUtils.fromAxisAngle: axis must be a vector and angle must be a number');
  }
  const halfAngle = angle / 2;
  const s = Math.sin(halfAngle);
  return createQuaternion(
    axis.x * s,
    axis.y * s,
    axis.z * s,
    Math.cos(halfAngle)
  );
}

export function fromEuler(x, y, z, order = 'XYZ') {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    throw new TypeError('LXRN.quaternionUtils.fromEuler: x, y, and z must be numbers');
  }
  const cx = Math.cos(x / 2);
  const cy = Math.cos(y / 2);
  const cz = Math.cos(z / 2);
  const sx = Math.sin(x / 2);
  const sy = Math.sin(y / 2);
  const sz = Math.sin(z / 2);

  let qx, qy, qz, qw;

  switch (order) {
    case 'XYZ':
      qx = sx * cy * cz + cx * sy * sz;
      qy = cx * sy * cz - sx * cy * sz;
      qz = cx * cy * sz + sx * sy * cz;
      qw = cx * cy * cz - sx * sy * sz;
      break;
    case 'YXZ':
      qx = sx * cy * cz + cx * sy * sz;
      qy = cx * sy * cz - sx * cy * sz;
      qz = cx * cy * sz - sx * sy * cz;
      qw = cx * cy * cz + sx * sy * sz;
      break;
    case 'ZXY':
      qx = sx * cy * cz - cx * sy * sz;
      qy = cx * sy * cz + sx * cy * sz;
      qz = cx * cy * sz + sx * sy * cz;
      qw = cx * cy * cz - sx * sy * sz;
      break;
    case 'ZYX':
      qx = sx * cy * cz - cx * sy * sz;
      qy = cx * sy * cz + sx * cy * sz;
      qz = cx * cy * sz - sx * sy * cz;
      qw = cx * cy * cz + sx * sy * sz;
      break;
    case 'YZX':
      qx = sx * cy * cz + cx * sy * sz;
      qy = cx * sy * cz + sx * cy * sz;
      qz = cx * cy * sz - sx * sy * cz;
      qw = cx * cy * cz - sx * sy * sz;
      break;
    case 'XZY':
      qx = sx * cy * cz - cx * sy * sz;
      qy = cx * sy * cz - sx * cy * sz;
      qz = cx * cy * sz + sx * sy * cz;
      qw = cx * cy * cz + sx * sy * sz;
      break;
    default:
      throw new Error('LXRN.quaternionUtils.fromEuler: Invalid order');
  }

  return createQuaternion(qx, qy, qz, qw);
}

export function multiply(q1, q2) {
  if (typeof q1 !== 'object' || typeof q2 !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.multiply: q1 and q2 must be quaternions');
  }
  return createQuaternion(
    q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x,
    -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y,
    q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z,
    -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w
  );
}

export function conjugate(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.conjugate: q must be a quaternion');
  }
  return createQuaternion(-q.x, -q.y, -q.z, q.w);
}

export function inverse(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.inverse: q must be a quaternion');
  }
  const lenSq = q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;
  if (lenSq === 0) return identity();
  const conjugateQ = conjugate(q);
  return createQuaternion(
    conjugateQ.x / lenSq,
    conjugateQ.y / lenSq,
    conjugateQ.z / lenSq,
    conjugateQ.w / lenSq
  );
}

export function normalize(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.normalize: q must be a quaternion');
  }
  const len = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
  if (len === 0) return { ...q };
  return createQuaternion(q.x / len, q.y / len, q.z / len, q.w / len);
}

export function length(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.length: q must be a quaternion');
  }
  return Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
}

export function lengthSquared(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.lengthSquared: q must be a quaternion');
  }
  return q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;
}

export function slerp(q1, q2, t) {
  if (typeof q1 !== 'object' || typeof q2 !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.slerp: q1 and q2 must be quaternions');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new TypeError('LXRN.quaternionUtils.slerp: t must be a number between 0 and 1');
  }
  let cosHalfAngle = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
  
  if (cosHalfAngle < 0) {
    q2 = createQuaternion(-q2.x, -q2.y, -q2.z, -q2.w);
    cosHalfAngle = -cosHalfAngle;
  }
  
  if (cosHalfAngle > 1) {
    cosHalfAngle = 1;
  }
  
  const halfAngle = Math.acos(cosHalfAngle);
  const sinHalfAngle = Math.sin(halfAngle);
  
  if (sinHalfAngle === 0) {
    return { ...q1 };
  }
  
  const weight1 = Math.sin((1 - t) * halfAngle) / sinHalfAngle;
  const weight2 = Math.sin(t * halfAngle) / sinHalfAngle;
  
  return createQuaternion(
    q1.x * weight1 + q2.x * weight2,
    q1.y * weight1 + q2.y * weight2,
    q1.z * weight1 + q2.z * weight2,
    q1.w * weight1 + q2.w * weight2
  );
}

export function lerp(q1, q2, t) {
  if (typeof q1 !== 'object' || typeof q2 !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.lerp: q1 and q2 must be quaternions');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new TypeError('LXRN.quaternionUtils.lerp: t must be a number between 0 and 1');
  }
  return createQuaternion(
    q1.x + (q2.x - q1.x) * t,
    q1.y + (q2.y - q1.y) * t,
    q1.z + (q2.z - q1.z) * t,
    q1.w + (q2.w - q1.w) * t
  );
}

export function nlerp(q1, q2, t) {
  if (typeof q1 !== 'object' || typeof q2 !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.nlerp: q1 and q2 must be quaternions');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new TypeError('LXRN.quaternionUtils.nlerp: t must be a number between 0 and 1');
  }
  const result = lerp(q1, q2, t);
  return normalize(result);
}

export function rotateVector(q, v) {
  if (typeof q !== 'object' || typeof v !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.rotateVector: q must be a quaternion and v must be a vector');
  }
  const qConj = conjugate(q);
  const qV = createQuaternion(v.x, v.y, v.z, 0);
  const result = multiply(multiply(q, qV), qConj);
  return { x: result.x, y: result.y, z: result.z };
}

export function toAxisAngle(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.toAxisAngle: q must be a quaternion');
  }
  const qNorm = normalize(q);
  const angle = 2 * Math.acos(qNorm.w);
  const sinHalfAngle = Math.sqrt(1 - qNorm.w * qNorm.w);
  
  if (sinHalfAngle === 0) {
    return { axis: { x: 1, y: 0, z: 0 }, angle: 0 };
  }
  
  return {
    axis: {
      x: qNorm.x / sinHalfAngle,
      y: qNorm.y / sinHalfAngle,
      z: qNorm.z / sinHalfAngle
    },
    angle
  };
}

export function toEuler(q, order = 'XYZ') {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.toEuler: q must be a quaternion');
  }
  const qx = q.x;
  const qy = q.y;
  const qz = q.z;
  const qw = q.w;
  
  let x, y, z;
  
  switch (order) {
    case 'XYZ':
      x = Math.atan2(2 * (qx * qw - qy * qz), 1 - 2 * (qx * qx + qy * qy));
      y = Math.asin(2 * (qx * qz + qy * qw));
      z = Math.atan2(2 * (qz * qw - qx * qy), 1 - 2 * (qy * qy + qz * qz));
      break;
    default:
      throw new Error('LXRN.quaternionUtils.toEuler: Invalid order');
  }
  
  return { x, y, z };
}

export function isIdentity(q, epsilon = 1e-10) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.isIdentity: q must be a quaternion');
  }
  return Math.abs(q.x) < epsilon &&
         Math.abs(q.y) < epsilon &&
         Math.abs(q.z) < epsilon &&
         Math.abs(q.w - 1) < epsilon;
}

export function equals(q1, q2, epsilon = 1e-10) {
  if (typeof q1 !== 'object' || typeof q2 !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.equals: q1 and q2 must be quaternions');
  }
  return Math.abs(q1.x - q2.x) < epsilon &&
         Math.abs(q1.y - q2.y) < epsilon &&
         Math.abs(q1.z - q2.z) < epsilon &&
         Math.abs(q1.w - q2.w) < epsilon;
}

export function toArray(q) {
  if (typeof q !== 'object') {
    throw new TypeError('LXRN.quaternionUtils.toArray: q must be a quaternion');
  }
  return [q.x, q.y, q.z, q.w];
}

export function fromArray(arr) {
  if (!Array.isArray(arr) || arr.length !== 4) {
    throw new TypeError('LXRN.quaternionUtils.fromArray: arr must be an array with 4 elements');
  }
  return createQuaternion(arr[0], arr[1], arr[2], arr[3]);
}

export function toMatrix4(q) {
  const { x, y, z, w } = q;
  const x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2;
  const yy = y * y2, yz = y * z2, zz = z * z2;
  const wx = w * x2, wy = w * y2, wz = w * z2;

  return [
    [1 - (yy + zz), xy - wz, xz + wy, 0],
    [xy + wz, 1 - (xx + zz), yz - wx, 0],
    [xz - wy, yz + wx, 1 - (xx + yy), 0],
    [0, 0, 0, 1]
  ];
}

export const quaternionUtils = {
  createQuaternion,
  identity,
  fromAxisAngle,
  fromEuler,
  multiply,
  conjugate,
  inverse,
  normalize,
  length,
  lengthSquared,
  slerp,
  lerp,
  nlerp,
  rotateVector,
  toAxisAngle,
  toEuler,
  isIdentity,
  equals,
  toArray,
  fromArray,
  toMatrix4
};
