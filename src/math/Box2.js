/**
 * @module Box2
 * @description 2D axis-aligned bounding box.
 * @author LXRN
 * @version 1.0.0
 */

import { Vector2 } from './Vector2.js';

const _vector = new Vector2();

export class Box2 {
    constructor(min = new Vector2(+Infinity, +Infinity), max = new Vector2(-Infinity, -Infinity)) {
        this.isBox2 = true;
        this.min = min;
        this.max = max;
    }

    // ===== STATIC =====
    static get isBox2() { return true; }

    // ===== SET =====
    set(min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }

    // ===== SET FROM POINTS =====
    setFromPoints(points) {
        this.makeEmpty();
        for (let i = 0, il = points.length; i < il; i++) {
            this.expandByPoint(points[i]);
        }
        return this;
    }

    // ===== SET FROM CENTER AND SIZE =====
    setFromCenterAndSize(center, size) {
        const halfSize = _vector.copy(size).multiplyScalar(0.5);
        this.min.copy(center).sub(halfSize);
        this.max.copy(center).add(halfSize);
        return this;
    }

    // ===== CLONE / COPY =====
    clone() {
        return new Box2().copy(this);
    }

    copy(box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }

    // ===== MAKE EMPTY =====
    makeEmpty() {
        this.min.x = this.min.y = +Infinity;
        this.max.x = this.max.y = -Infinity;
        return this;
    }

    // ===== IS EMPTY =====
    isEmpty() {
        return (this.max.x < this.min.x) || (this.max.y < this.min.y);
    }

    // ===== GET CENTER =====
    getCenter(target) {
        return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }

    // ===== GET SIZE =====
    getSize(target) {
        return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
    }

    // ===== EXPAND BY POINT =====
    expandByPoint(point) {
        this.min.min(point);
        this.max.max(point);
        return this;
    }

    // ===== EXPAND BY VECTOR =====
    expandByVector(vector) {
        this.min.sub(vector);
        this.max.add(vector);
        return this;
    }

    // ===== EXPAND BY SCALAR =====
    expandByScalar(scalar) {
        this.min.addScalar(-scalar);
        this.max.addScalar(scalar);
        return this;
    }

    // ===== CONTAINS POINT =====
    containsPoint(point) {
        return point.x >= this.min.x && point.x <= this.max.x &&
               point.y >= this.min.y && point.y <= this.max.y;
    }

    // ===== CONTAINS BOX =====
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x &&
               this.min.y <= box.min.y && box.max.y <= this.max.y;
    }

    // ===== GET PARAMETER =====
    getParameter(point, target) {
        return target.set(
            (point.x - this.min.x) / (this.max.x - this.min.x),
            (point.y - this.min.y) / (this.max.y - this.min.y)
        );
    }

    // ===== INTERSECTS BOX =====
    intersectsBox(box) {
        return box.max.x >= this.min.x && box.min.x <= this.max.x &&
               box.max.y >= this.min.y && box.min.y <= this.max.y;
    }

    // ===== CLAMP POINT =====
    clampPoint(point, target) {
        return target.copy(point).clamp(this.min, this.max);
    }

    // ===== DISTANCE TO POINT =====
    distanceToPoint(point) {
        return this.clampPoint(point, _vector).distanceTo(point);
    }

    // ===== INTERSECT =====
    intersect(box) {
        this.min.max(box.min);
        this.max.min(box.max);
        if (this.isEmpty()) this.makeEmpty();
        return this;
    }

    // ===== UNION =====
    union(box) {
        this.min.min(box.min);
        this.max.max(box.max);
        return this;
    }

    // ===== TRANSLATE =====
    translate(offset) {
        this.min.add(offset);
        this.max.add(offset);
        return this;
    }

    // ===== EQUALS =====
    equals(box) {
        return box.min.equals(this.min) && box.max.equals(this.max);
    }
}

// ===== STATIC =====
Box2.isBox2 = true;

export default Box2;
