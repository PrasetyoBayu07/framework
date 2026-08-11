/**
 * @module Vector3
 * @description 3D vector class.
 * @author LXRN
 * @version 1.0.0
 */

import { vec3, add, sub, scale, dot, cross, length, normalize, lerp } from '../vectorUtils.js';
import { clamp, euclideanModulo } from '../mathUtils.js';
import { Quaternion } from './Quaternion.js';
import { Euler } from './Euler.js';

const _vector = new Vector3();
const _quaternion = new Quaternion();

export class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // ===== STATIC FLAG =====
    static get isVector3() { return true; }

    // ===== SET METHODS =====
    set(x, y, z) {
        if (z === undefined) z = this.z;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        return this;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setZ(z) {
        this.z = z;
        return this;
    }

    setComponent(index, value) {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            default: throw new Error('LXRN.Vector3: index is out of range: ' + index);
        }
        return this;
    }

    getComponent(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            default: throw new Error('LXRN.Vector3: index is out of range: ' + index);
        }
    }

    // ===== COPY / CLONE =====
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    }

    // ===== ADD =====
    add(v) {
        const result = add({ x: this.x, y: this.y, z: this.z }, { x: v.x, y: v.y, z: v.z });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        return this;
    }

    addVectors(a, b) {
        const result = add({ x: a.x, y: a.y, z: a.z }, { x: b.x, y: b.y, z: b.z });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    addScaledVector(v, s) {
        const result = scale({ x: v.x, y: v.y, z: v.z }, s);
        this.x += result.x;
        this.y += result.y;
        this.z += result.z;
        return this;
    }

    // ===== SUB =====
    sub(v) {
        const result = sub({ x: this.x, y: this.y, z: this.z }, { x: v.x, y: v.y, z: v.z });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        return this;
    }

    subVectors(a, b) {
        const result = sub({ x: a.x, y: a.y, z: a.z }, { x: b.x, y: b.y, z: b.z });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    // ===== MULTIPLY =====
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    }

    multiplyScalar(scalar) {
        const result = scale({ x: this.x, y: this.y, z: this.z }, scalar);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        return this;
    }

    // ===== DIVIDE =====
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    }

    divideScalar(scalar) {
        if (scalar === 0) return this;
        return this.multiplyScalar(1 / scalar);
    }

    // ===== APPLY TRANSFORMATIONS =====
    applyEuler(euler) {
        _quaternion.setFromEuler(euler);
        return this.applyQuaternion(_quaternion);
    }

    applyAxisAngle(axis, angle) {
        _quaternion.setFromAxisAngle(axis, angle);
        return this.applyQuaternion(_quaternion);
    }

    applyMatrix3(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements || m._m;

        if (e.length === 9) {
            this.x = e[0] * x + e[3] * y + e[6] * z;
            this.y = e[1] * x + e[4] * y + e[7] * z;
            this.z = e[2] * x + e[5] * y + e[8] * z;
        } else {
            this.x = e[0][0] * x + e[0][1] * y + e[0][2] * z;
            this.y = e[1][0] * x + e[1][1] * y + e[1][2] * z;
            this.z = e[2][0] * x + e[2][1] * y + e[2][2] * z;
        }
        return this;
    }

    applyNormalMatrix(m) {
        return this.applyMatrix3(m).normalize();
    }

    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements || m._m;
        let w = 1;

        if (e.length === 16) {
            w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
            this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
            this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
            this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
        } else {
            w = 1 / (m[3][0] * x + m[3][1] * y + m[3][2] * z + m[3][3]);
            this.x = (m[0][0] * x + m[0][1] * y + m[0][2] * z + m[0][3]) * w;
            this.y = (m[1][0] * x + m[1][1] * y + m[1][2] * z + m[1][3]) * w;
            this.z = (m[2][0] * x + m[2][1] * y + m[2][2] * z + m[2][3]) * w;
        }
        return this;
    }

    applyQuaternion(q) {
        const vx = this.x, vy = this.y, vz = this.z;
        const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);

        this.x = vx + qw * tx + qy * tz - qz * ty;
        this.y = vy + qw * ty + qz * tx - qx * tz;
        this.z = vz + qw * tz + qx * ty - qy * tx;

        return this;
    }

    project(camera) {
        const m = camera.matrixWorldInverse || camera._matrixWorldInverse;
        const p = camera.projectionMatrix || camera._projectionMatrix;
        return this.applyMatrix4(m).applyMatrix4(p);
    }

    unproject(camera) {
        const pInv = camera.projectionMatrixInverse || camera._projectionMatrixInverse;
        const m = camera.matrixWorld || camera._matrixWorld;
        return this.applyMatrix4(pInv).applyMatrix4(m);
    }

    transformDirection(m) {
        const x = this.x, y = this.y, z = this.z;
        const e = m.elements || m._m;

        if (e.length === 16) {
            this.x = e[0] * x + e[4] * y + e[8] * z;
            this.y = e[1] * x + e[5] * y + e[9] * z;
            this.z = e[2] * x + e[6] * y + e[10] * z;
        } else {
            this.x = m[0][0] * x + m[0][1] * y + m[0][2] * z;
            this.y = m[1][0] * x + m[1][1] * y + m[1][2] * z;
            this.z = m[2][0] * x + m[2][1] * y + m[2][2] * z;
        }
        return this.normalize();
    }

    // ===== MIN / MAX / CLAMP =====
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        return this;
    }

    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        return this;
    }

    clamp(min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        return this;
    }

    clampScalar(minVal, maxVal) {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        this.z = clamp(this.z, minVal, maxVal);
        return this;
    }

    clampLength(min, max) {
        const len = this.length();
        if (len === 0) return this;
        const newLen = clamp(len, min, max);
        return this.multiplyScalar(newLen / len);
    }

    // ===== FLOOR / CEIL / ROUND =====
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }

    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        return this;
    }

    // ===== NEGATE =====
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    // ===== DOT / CROSS =====
    dot(v) {
        return dot({ x: this.x, y: this.y, z: this.z }, { x: v.x, y: v.y, z: v.z });
    }

    cross(v) {
        return this.crossVectors(this, v);
    }

    crossVectors(a, b) {
        const result = cross({ x: a.x, y: a.y, z: a.z }, { x: b.x, y: b.y, z: b.z });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    // ===== LENGTH =====
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length() {
        return length({ x: this.x, y: this.y, z: this.z });
    }

    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    // ===== NORMALIZE =====
    normalize() {
        const len = this.length();
        if (len === 0) return this;
        return this.divideScalar(len);
    }

    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }

    // ===== LERP =====
    lerp(v, alpha) {
        const result = lerp({ x: this.x, y: this.y, z: this.z }, { x: v.x, y: v.y, z: v.z }, alpha);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    lerpVectors(v1, v2, alpha) {
        const result = lerp({ x: v1.x, y: v1.y, z: v1.z }, { x: v2.x, y: v2.y, z: v2.z }, alpha);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        return this;
    }

    // ===== PROJECT / REFLECT =====
    projectOnVector(v) {
        const denominator = v.lengthSq();
        if (denominator === 0) return this.set(0, 0, 0);
        const scalar = v.dot(this) / denominator;
        return this.copy(v).multiplyScalar(scalar);
    }

    projectOnPlane(planeNormal) {
        _vector.copy(this).projectOnVector(planeNormal);
        return this.sub(_vector);
    }

    reflect(normal) {
        return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }

    // ===== ANGLE =====
    angleTo(v) {
        const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
        if (denominator === 0) return Math.PI / 2;
        const theta = this.dot(v) / denominator;
        return Math.acos(clamp(theta, -1, 1));
    }

    // ===== DISTANCE =====
    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return dx * dx + dy * dy + dz * dz;
    }

    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }

    // ===== SET FROM SPHERICAL =====
    setFromSpherical(s) {
        return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }

    setFromSphericalCoords(radius, phi, theta) {
        const sinPhiRadius = Math.sin(phi) * radius;
        this.x = sinPhiRadius * Math.sin(theta);
        this.y = Math.cos(phi) * radius;
        this.z = sinPhiRadius * Math.cos(theta);
        return this;
    }

    // ===== SET FROM CYLINDRICAL =====
    setFromCylindrical(c) {
        return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }

    setFromCylindricalCoords(radius, theta, y) {
        this.x = radius * Math.sin(theta);
        this.y = y;
        this.z = radius * Math.cos(theta);
        return this;
    }

    // ===== SET FROM MATRIX =====
    setFromMatrixPosition(m) {
        const e = m.elements || m._m;
        if (e.length === 16) {
            this.x = e[12];
            this.y = e[13];
            this.z = e[14];
        } else {
            this.x = m[0][3];
            this.y = m[1][3];
            this.z = m[2][3];
        }
        return this;
    }

    setFromMatrixScale(m) {
        const sx = this.setFromMatrixColumn(m, 0).length();
        const sy = this.setFromMatrixColumn(m, 1).length();
        const sz = this.setFromMatrixColumn(m, 2).length();
        this.x = sx;
        this.y = sy;
        this.z = sz;
        return this;
    }

    setFromMatrixColumn(m, index) {
        const e = m.elements || m._m;
        const i = index * 4;
        if (e.length === 16) {
            this.x = e[i];
            this.y = e[i + 1];
            this.z = e[i + 2];
        } else {
            this.x = m[0][index];
            this.y = m[1][index];
            this.z = m[2][index];
        }
        return this;
    }

    setFromMatrix3Column(m, index) {
        const e = m.elements || m._m;
        const i = index * 3;
        if (e.length === 9) {
            this.x = e[i];
            this.y = e[i + 1];
            this.z = e[i + 2];
        } else {
            this.x = m[0][index];
            this.y = m[1][index];
            this.z = m[2][index];
        }
        return this;
    }

    // ===== SET FROM EULER / COLOR =====
    setFromEuler(e) {
        this.x = e.x;
        this.y = e.y;
        this.z = e.z;
        return this;
    }

    setFromColor(c) {
        this.x = c.r;
        this.y = c.g;
        this.z = c.b;
        return this;
    }

    // ===== EQUALS =====
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }

    // ===== ARRAY =====
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        return array;
    }

    // ===== FROM BUFFER ATTRIBUTE =====
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        return this;
    }

    // ===== RANDOM =====
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        return this;
    }

    randomDirection() {
        const theta = Math.random() * Math.PI * 2;
        const u = Math.random() * 2 - 1;
        const c = Math.sqrt(1 - u * u);
        this.x = c * Math.cos(theta);
        this.y = u;
        this.z = c * Math.sin(theta);
        return this;
    }

    // ===== ITERATOR =====
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}

// ===== STATIC =====
Vector3.isVector3 = true;

export default Vector3;
