/**
 * @module Plane
 * @description Infinite 2D plane in 3D space.
 * @author LXRN
 * @version 1.0.0
 */

import { Matrix3 } from './Matrix3.js';
import { Vector3 } from './Vector3.js';

const _vector1 = new Vector3();
const _vector2 = new Vector3();
const _normalMatrix = new Matrix3();

export class Plane {
    constructor(normal = new Vector3(1, 0, 0), constant = 0) {
        this.isPlane = true;
        this.normal = normal;
        this.constant = constant;
    }

    // ===== STATIC =====
    static get isPlane() { return true; }

    // ===== SET =====
    set(normal, constant) {
        this.normal.copy(normal);
        this.constant = constant;
        return this;
    }

    // ===== SET COMPONENTS =====
    setComponents(x, y, z, w) {
        this.normal.set(x, y, z);
        this.constant = w;
        return this;
    }

    // ===== SET FROM NORMAL AND COPLANAR POINT =====
    setFromNormalAndCoplanarPoint(normal, point) {
        this.normal.copy(normal);
        this.constant = -point.dot(this.normal);
        return this;
    }

    // ===== SET FROM COPLANAR POINTS =====
    setFromCoplanarPoints(a, b, c) {
        const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize();
        this.setFromNormalAndCoplanarPoint(normal, a);
        return this;
    }

    // ===== COPY / CLONE =====
    copy(plane) {
        this.normal.copy(plane.normal);
        this.constant = plane.constant;
        return this;
    }

    clone() {
        return new Plane().copy(this);
    }

    // ===== NORMALIZE =====
    normalize() {
        const inverseNormalLength = 1.0 / this.normal.length();
        this.normal.multiplyScalar(inverseNormalLength);
        this.constant *= inverseNormalLength;
        return this;
    }

    // ===== NEGATE =====
    negate() {
        this.constant *= -1;
        this.normal.negate();
        return this;
    }

    // ===== DISTANCE TO POINT =====
    distanceToPoint(point) {
        return this.normal.dot(point) + this.constant;
    }

    // ===== DISTANCE TO SPHERE =====
    distanceToSphere(sphere) {
        return this.distanceToPoint(sphere.center) - sphere.radius;
    }

    // ===== PROJECT POINT =====
    projectPoint(point, target) {
        return target.copy(point).addScaledVector(this.normal, -this.distanceToPoint(point));
    }

    // ===== INTERSECT LINE =====
    intersectLine(line, target, clampToLine = true) {
        const direction = line.delta(_vector1);
        const denominator = this.normal.dot(direction);

        if (denominator === 0) {
            if (this.distanceToPoint(line.start) === 0) {
                return target.copy(line.start);
            }
            return null;
        }

        const t = -(line.start.dot(this.normal) + this.constant) / denominator;

        if (clampToLine === true && (t < 0 || t > 1)) {
            return null;
        }

        return target.copy(line.start).addScaledVector(direction, t);
    }

    // ===== INTERSECTS LINE =====
    intersectsLine(line) {
        const startSign = this.distanceToPoint(line.start);
        const endSign = this.distanceToPoint(line.end);
        return (startSign < 0 && endSign > 0) || (endSign < 0 && startSign > 0);
    }

    // ===== INTERSECTS BOX =====
    intersectsBox(box) {
        return box.intersectsPlane(this);
    }

    // ===== INTERSECTS SPHERE =====
    intersectsSphere(sphere) {
        return sphere.intersectsPlane(this);
    }

    // ===== COPLANAR POINT =====
    coplanarPoint(target) {
        return target.copy(this.normal).multiplyScalar(-this.constant);
    }

    // ===== APPLY MATRIX =====
    applyMatrix4(matrix, optionalNormalMatrix) {
        const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
        const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
        const normal = this.normal.applyMatrix3(normalMatrix).normalize();
        this.constant = -referencePoint.dot(normal);
        return this;
    }

    // ===== TRANSLATE =====
    translate(offset) {
        this.constant -= offset.dot(this.normal);
        return this;
    }

    // ===== EQUALS =====
    equals(plane) {
        return plane.normal.equals(this.normal) && (plane.constant === this.constant);
    }

    // ===== TO JSON / FROM JSON =====
    toJSON() {
        return {
            normal: this.normal.toArray(),
            constant: this.constant
        };
    }

    fromJSON(json) {
        this.normal.fromArray(json.normal);
        this.constant = json.constant;
        return this;
    }
}

// ===== STATIC =====
Plane.isPlane = true;

export default Plane;
