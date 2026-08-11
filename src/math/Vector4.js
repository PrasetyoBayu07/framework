/**
 * @module Vector4
 * @description 4D vector class.
 * @author LXRN
 * @version 1.0.0
 */

import { vec4, add, sub, scale, dot, length, normalize, lerp } from '../vectorUtils.js';
import { clamp, euclideanModulo } from '../mathUtils.js';

export class Vector4 {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    // ===== STATIC FLAG =====
    static get isVector4() { return true; }

    // ===== WIDTH / HEIGHT ALIAS =====
    get width() { return this.z; }
    set width(value) { this.z = value; }

    get height() { return this.w; }
    set height(value) { this.w = value; }

    // ===== SET METHODS =====
    set(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
        this.z = scalar;
        this.w = scalar;
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

    setW(w) {
        this.w = w;
        return this;
    }

    setComponent(index, value) {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            case 2: this.z = value; break;
            case 3: this.w = value; break;
            default: throw new Error('LXRN.Vector4: index is out of range: ' + index);
        }
        return this;
    }

    getComponent(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            case 2: return this.z;
            case 3: return this.w;
            default: throw new Error('LXRN.Vector4: index is out of range: ' + index);
        }
    }

    // ===== COPY / CLONE =====
    clone() {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = (v.w !== undefined) ? v.w : 1;
        return this;
    }

    // ===== ADD =====
    add(v) {
        const result = add({ x: this.x, y: this.y, z: this.z, w: this.w }, { x: v.x, y: v.y, z: v.z, w: v.w });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        this.z += s;
        this.w += s;
        return this;
    }

    addVectors(a, b) {
        const result = add({ x: a.x, y: a.y, z: a.z, w: a.w }, { x: b.x, y: b.y, z: b.z, w: b.w });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    addScaledVector(v, s) {
        const result = scale({ x: v.x, y: v.y, z: v.z, w: v.w }, s);
        this.x += result.x;
        this.y += result.y;
        this.z += result.z;
        this.w += result.w;
        return this;
    }

    // ===== SUB =====
    sub(v) {
        const result = sub({ x: this.x, y: this.y, z: this.z, w: this.w }, { x: v.x, y: v.y, z: v.z, w: v.w });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    subScalar(s) {
        this.x -= s;
        this.y -= s;
        this.z -= s;
        this.w -= s;
        return this;
    }

    subVectors(a, b) {
        const result = sub({ x: a.x, y: a.y, z: a.z, w: a.w }, { x: b.x, y: b.y, z: b.z, w: b.w });
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    // ===== MULTIPLY =====
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;
        return this;
    }

    multiplyScalar(scalar) {
        const result = scale({ x: this.x, y: this.y, z: this.z, w: this.w }, scalar);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    multiplyVectors(a, b) {
        this.x = a.x * b.x;
        this.y = a.y * b.y;
        this.z = a.z * b.z;
        this.w = a.w * b.w;
        return this;
    }

    // ===== DIVIDE =====
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;
        return this;
    }

    divideScalar(scalar) {
        if (scalar === 0) return this;
        return this.multiplyScalar(1 / scalar);
    }

    // ===== APPLY MATRIX =====
    applyMatrix4(m) {
        const x = this.x, y = this.y, z = this.z, w = this.w;
        const e = m.elements || m._m;

        if (e.length === 16) {
            this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
            this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
            this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
            this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
        } else {
            this.x = m[0][0] * x + m[0][1] * y + m[0][2] * z + m[0][3] * w;
            this.y = m[1][0] * x + m[1][1] * y + m[1][2] * z + m[1][3] * w;
            this.z = m[2][0] * x + m[2][1] * y + m[2][2] * z + m[2][3] * w;
            this.w = m[3][0] * x + m[3][1] * y + m[3][2] * z + m[3][3] * w;
        }
        return this;
    }

    // ===== SET AXIS ANGLE =====
    setAxisAngleFromQuaternion(q) {
        // q is assumed to be normalized
        this.w = 2 * Math.acos(q.w);
        const s = Math.sqrt(1 - q.w * q.w);
        if (s < 0.0001) {
            this.x = 1;
            this.y = 0;
            this.z = 0;
        } else {
            this.x = q.x / s;
            this.y = q.y / s;
            this.z = q.z / s;
        }
        return this;
    }

    setAxisAngleFromRotationMatrix(m) {
        const e = m.elements || m._m;
        let angle, x, y, z;
        const epsilon = 0.01;
        const epsilon2 = 0.1;

        let m11, m12, m13, m21, m22, m23, m31, m32, m33;

        if (e.length === 16) {
            m11 = e[0]; m12 = e[4]; m13 = e[8];
            m21 = e[1]; m22 = e[5]; m23 = e[9];
            m31 = e[2]; m32 = e[6]; m33 = e[10];
        } else {
            m11 = e[0][0]; m12 = e[0][1]; m13 = e[0][2];
            m21 = e[1][0]; m22 = e[1][1]; m23 = e[1][2];
            m31 = e[2][0]; m32 = e[2][1]; m33 = e[2][2];
        }

        if ((Math.abs(m12 - m21) < epsilon) &&
            (Math.abs(m13 - m31) < epsilon) &&
            (Math.abs(m23 - m32) < epsilon)) {

            if ((Math.abs(m12 + m21) < epsilon2) &&
                (Math.abs(m13 + m31) < epsilon2) &&
                (Math.abs(m23 + m32) < epsilon2) &&
                (Math.abs(m11 + m22 + m33 - 3) < epsilon2)) {

                this.set(1, 0, 0, 0);
                return this;
            }

            angle = Math.PI;

            const xx = (m11 + 1) / 2;
            const yy = (m22 + 1) / 2;
            const zz = (m33 + 1) / 2;
            const xy = (m12 + m21) / 4;
            const xz = (m13 + m31) / 4;
            const yz = (m23 + m32) / 4;

            if ((xx > yy) && (xx > zz)) {
                if (xx < epsilon) {
                    x = 0;
                    y = 0.707106781;
                    z = 0.707106781;
                } else {
                    x = Math.sqrt(xx);
                    y = xy / x;
                    z = xz / x;
                }
            } else if (yy > zz) {
                if (yy < epsilon) {
                    x = 0.707106781;
                    y = 0;
                    z = 0.707106781;
                } else {
                    y = Math.sqrt(yy);
                    x = xy / y;
                    z = yz / y;
                }
            } else {
                if (zz < epsilon) {
                    x = 0.707106781;
                    y = 0.707106781;
                    z = 0;
                } else {
                    z = Math.sqrt(zz);
                    x = xz / z;
                    y = yz / z;
                }
            }

            this.set(x, y, z, angle);
            return this;
        }

        let s = Math.sqrt((m32 - m23) * (m32 - m23) +
                          (m13 - m31) * (m13 - m31) +
                          (m21 - m12) * (m21 - m12));

        if (Math.abs(s) < 0.001) s = 1;

        this.x = (m32 - m23) / s;
        this.y = (m13 - m31) / s;
        this.z = (m21 - m12) / s;
        this.w = Math.acos((m11 + m22 + m33 - 1) / 2);

        return this;
    }

    // ===== SET FROM MATRIX POSITION =====
    setFromMatrixPosition(m) {
        const e = m.elements || m._m;
        if (e.length === 16) {
            this.x = e[12];
            this.y = e[13];
            this.z = e[14];
            this.w = e[15];
        } else {
            this.x = m[0][3];
            this.y = m[1][3];
            this.z = m[2][3];
            this.w = m[3][3];
        }
        return this;
    }

    // ===== MIN / MAX / CLAMP =====
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        this.z = Math.min(this.z, v.z);
        this.w = Math.min(this.w, v.w);
        return this;
    }

    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        this.z = Math.max(this.z, v.z);
        this.w = Math.max(this.w, v.w);
        return this;
    }

    clamp(min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        this.w = clamp(this.w, min.w, max.w);
        return this;
    }

    clampScalar(minVal, maxVal) {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
        this.z = clamp(this.z, minVal, maxVal);
        this.w = clamp(this.w, minVal, maxVal);
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
        this.w = Math.floor(this.w);
        return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }

    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        this.z = Math.trunc(this.z);
        this.w = Math.trunc(this.w);
        return this;
    }

    // ===== NEGATE =====
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;
        return this;
    }

    // ===== DOT =====
    dot(v) {
        return dot({ x: this.x, y: this.y, z: this.z, w: this.w }, { x: v.x, y: v.y, z: v.z, w: v.w });
    }

    // ===== LENGTH =====
    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    length() {
        return length({ x: this.x, y: this.y, z: this.z, w: this.w });
    }

    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
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
        const result = lerp({ x: this.x, y: this.y, z: this.z, w: this.w }, { x: v.x, y: v.y, z: v.z, w: v.w }, alpha);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    lerpVectors(v1, v2, alpha) {
        const result = lerp({ x: v1.x, y: v1.y, z: v1.z, w: v1.w }, { x: v2.x, y: v2.y, z: v2.z, w: v2.w }, alpha);
        this.x = result.x;
        this.y = result.y;
        this.z = result.z;
        this.w = result.w;
        return this;
    }

    // ===== EQUALS =====
    equals(v) {
        return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
    }

    // ===== ARRAY =====
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];
        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
        return array;
    }

    // ===== FROM BUFFER ATTRIBUTE =====
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        this.z = attribute.getZ(index);
        this.w = attribute.getW(index);
        return this;
    }

    // ===== RANDOM =====
    random() {
        this.x = Math.random();
        this.y = Math.random();
        this.z = Math.random();
        this.w = Math.random();
        return this;
    }

    // ===== ITERATOR =====
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
        yield this.w;
    }
}

// ===== STATIC =====
Vector4.isVector4 = true;

export default Vector4;
