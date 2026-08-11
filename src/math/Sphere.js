/**
 * @module Sphere
 * @description 3D sphere defined by center and radius.
 * @author LXRN
 * @version 1.0.0
 */

import { Box3 } from './Box3.js';
import { Vector3 } from './Vector3.js';

const _box = new Box3();
const _v1 = new Vector3();
const _v2 = new Vector3();

export class Sphere {
    constructor(center = new Vector3(), radius = -1) {
        this.isSphere = true;
        this.center = center;
        this.radius = radius;
    }

    // ===== STATIC =====
    static get isSphere() { return true; }

    // ===== SET =====
    set(center, radius) {
        this.center.copy(center);
        this.radius = radius;
        return this;
    }

    // ===== SET FROM POINTS =====
    setFromPoints(points, optionalCenter) {
        const center = this.center;

        if (optionalCenter !== undefined) {
            center.copy(optionalCenter);
        } else {
            _box.setFromPoints(points).getCenter(center);
        }

        let maxRadiusSq = 0;
        for (let i = 0, il = points.length; i < il; i++) {
            maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
        }

        this.radius = Math.sqrt(maxRadiusSq);
        return this;
    }

    // ===== COPY / CLONE =====
    copy(sphere) {
        this.center.copy(sphere.center);
        this.radius = sphere.radius;
        return this;
    }

    clone() {
        return new Sphere().copy(this);
    }

    // ===== IS EMPTY =====
    isEmpty() {
        return this.radius < 0;
    }

    // ===== MAKE EMPTY =====
    makeEmpty() {
        this.center.set(0, 0, 0);
        this.radius = -1;
        return this;
    }

    // ===== CONTAINS POINT =====
    containsPoint(point) {
        return point.distanceToSquared(this.center) <= (this.radius * this.radius);
    }

    // ===== DISTANCE TO POINT =====
    distanceToPoint(point) {
        return point.distanceTo(this.center) - this.radius;
    }

    // ===== INTERSECTS SPHERE =====
    intersectsSphere(sphere) {
        const radiusSum = this.radius + sphere.radius;
        return sphere.center.distanceToSquared(this.center) <= (radiusSum * radiusSum);
    }

    // ===== INTERSECTS BOX =====
    intersectsBox(box) {
        return box.intersectsSphere(this);
    }

    // ===== INTERSECTS PLANE =====
    intersectsPlane(plane) {
        return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }

    // ===== CLAMP POINT =====
    clampPoint(point, target) {
        const deltaLengthSq = this.center.distanceToSquared(point);
        target.copy(point);

        if (deltaLengthSq > (this.radius * this.radius)) {
            target.sub(this.center).normalize();
            target.multiplyScalar(this.radius).add(this.center);
        }

        return target;
    }

    // ===== GET BOUNDING BOX =====
    getBoundingBox(target) {
        if (this.isEmpty()) {
            target.makeEmpty();
            return target;
        }

        target.set(this.center, this.center);
        target.expandByScalar(this.radius);
        return target;
    }

    // ===== APPLY MATRIX =====
    applyMatrix4(matrix) {
        this.center.applyMatrix4(matrix);
        this.radius = this.radius * matrix.getMaxScaleOnAxis();
        return this;
    }

    // ===== TRANSLATE =====
    translate(offset) {
        this.center.add(offset);
        return this;
    }

    // ===== EXPAND BY POINT =====
    expandByPoint(point) {
        if (this.isEmpty()) {
            this.center.copy(point);
            this.radius = 0;
            return this;
        }

        _v1.subVectors(point, this.center);
        const lengthSq = _v1.lengthSq();

        if (lengthSq > (this.radius * this.radius)) {
            const length = Math.sqrt(lengthSq);
            const delta = (length - this.radius) * 0.5;
            this.center.addScaledVector(_v1, delta / length);
            this.radius += delta;
        }

        return this;
    }

    // ===== UNION =====
    union(sphere) {
        if (sphere.isEmpty()) {
            return this;
        }

        if (this.isEmpty()) {
            this.copy(sphere);
            return this;
        }

        if (this.center.equals(sphere.center) === true) {
            this.radius = Math.max(this.radius, sphere.radius);
        } else {
            _v2.subVectors(sphere.center, this.center).setLength(sphere.radius);
            this.expandByPoint(_v1.copy(sphere.center).add(_v2));
            this.expandByPoint(_v1.copy(sphere.center).sub(_v2));
        }

        return this;
    }

    // ===== EQUALS =====
    equals(sphere) {
        return sphere.center.equals(this.center) && (sphere.radius === this.radius);
    }

    // ===== TO JSON / FROM JSON =====
    toJSON() {
        return {
            radius: this.radius,
            center: this.center.toArray()
        };
    }

    fromJSON(json) {
        this.radius = json.radius;
        this.center.fromArray(json.center);
        return this;
    }
}

// ===== STATIC =====
Sphere.isSphere = true;

export default Sphere;
