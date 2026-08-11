/**
 * @module Vector2
 * @description 2D vector class.
 * @author LXRN
 * @version 1.0.0
 */

import { vec2, add, sub, scale, dot, length, normalize, lerp } from '../vectorUtils.js';
import { clamp, euclideanModulo } from '../mathUtils.js';

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // ===== STATIC FLAG =====
    static get isVector2() { return true; }

    // ===== WIDTH / HEIGHT ALIAS =====
    get width() { return this.x; }
    set width(value) { this.x = value; }

    get height() { return this.y; }
    set height(value) { this.y = value; }

    // ===== SET METHODS =====
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;
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

    setComponent(index, value) {
        switch (index) {
            case 0: this.x = value; break;
            case 1: this.y = value; break;
            default: throw new Error('LXRN.Vector2: index is out of range: ' + index);
        }
        return this;
    }

    getComponent(index) {
        switch (index) {
            case 0: return this.x;
            case 1: return this.y;
            default: throw new Error('LXRN.Vector2: index is out of range: ' + index);
        }
    }

    // ===== COPY / CLONE =====
    clone() {
        return new Vector2(this.x, this.y);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }

    // ===== ADD =====
    add(v) {
        const result = add({ x: this.x, y: this.y }, { x: v.x, y: v.y });
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    addScalar(s) {
        this.x += s;
        this.y += s;
        return this;
    }

    addVectors(a, b) {
        const result = add({ x: a.x, y: a.y }, { x: b.x, y: b.y });
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    addScaledVector(v, s) {
        const result = scale({ x: v.x, y: v.y }, s);
        this.x += result.x;
        this.y += result.y;
        return this;
    }

    // ===== SUB =====
    sub(v) {
        const result = sub({ x: this.x, y: this.y }, { x: v.x, y: v.y });
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    subScalar(s) {
        this.x -= s;
        this.y -= s;
        return this;
    }

    subVectors(a, b) {
        const result = sub({ x: a.x, y: a.y }, { x: b.x, y: b.y });
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    // ===== MULTIPLY =====
    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    multiplyScalar(scalar) {
        const result = scale({ x: this.x, y: this.y }, scalar);
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    // ===== DIVIDE =====
    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    divideScalar(scalar) {
        if (scalar === 0) return this;
        return this.multiplyScalar(1 / scalar);
    }

    // ===== APPLY MATRIX =====
    applyMatrix3(m) {
        const x = this.x, y = this.y;
        const e = m.elements || m._m;

        if (e.length === 9) {
            this.x = e[0] * x + e[3] * y + e[6];
            this.y = e[1] * x + e[4] * y + e[7];
        } else {
            this.x = e[0][0] * x + e[0][1] * y + e[0][2];
            this.y = e[1][0] * x + e[1][1] * y + e[1][2];
        }
        return this;
    }

    // ===== MIN / MAX / CLAMP =====
    min(v) {
        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);
        return this;
    }

    max(v) {
        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);
        return this;
    }

    clamp(min, max) {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        return this;
    }

    clampScalar(minVal, maxVal) {
        this.x = clamp(this.x, minVal, maxVal);
        this.y = clamp(this.y, minVal, maxVal);
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
        return this;
    }

    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    roundToZero() {
        this.x = Math.trunc(this.x);
        this.y = Math.trunc(this.y);
        return this;
    }

    // ===== NEGATE =====
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    // ===== DOT / CROSS =====
    dot(v) {
        return dot({ x: this.x, y: this.y }, { x: v.x, y: v.y });
    }

    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    // ===== LENGTH =====
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return length({ x: this.x, y: this.y });
    }

    manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    // ===== NORMALIZE =====
    normalize() {
        const len = this.length();
        if (len === 0) return this;
        return this.divideScalar(len);
    }

    // ===== ANGLE =====
    angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI;
    }

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
        return dx * dx + dy * dy;
    }

    manhattanDistanceTo(v) {
        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }

    // ===== SET LENGTH =====
    setLength(length) {
        return this.normalize().multiplyScalar(length);
    }

    // ===== LERP =====
    lerp(v, alpha) {
        const result = lerp({ x: this.x, y: this.y }, { x: v.x, y: v.y }, alpha);
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    lerpVectors(v1, v2, alpha) {
        const result = lerp({ x: v1.x, y: v1.y }, { x: v2.x, y: v2.y }, alpha);
        this.x = result.x;
        this.y = result.y;
        return this;
    }

    // ===== EQUALS =====
    equals(v) {
        return this.x === v.x && this.y === v.y;
    }

    // ===== ARRAY =====
    fromArray(array, offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

    toArray(array = [], offset = 0) {
        array[offset] = this.x;
        array[offset + 1] = this.y;
        return array;
    }

    // ===== FROM BUFFER ATTRIBUTE =====
    fromBufferAttribute(attribute, index) {
        this.x = attribute.getX(index);
        this.y = attribute.getY(index);
        return this;
    }

    // ===== ROTATE AROUND =====
    rotateAround(center, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;
        return this;
    }

    // ===== RANDOM =====
    random() {
        this.x = Math.random();
        this.y = Math.random();
        return this;
    }

    // ===== ITERATOR =====
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}

// ===== STATIC =====
Vector2.isVector2 = true;

export default Vector2;
