/**
 * @module Box3
 * @description 3D axis-aligned bounding box.
 * @author LXRN
 * @version 1.0.0
 */

import { Vector3 } from './Vector3.js';

const _points = [
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3(),
    new Vector3()
];

const _vector = new Vector3();
const _box = new Box3();

// triangle centered vertices
const _v0 = new Vector3();
const _v1 = new Vector3();
const _v2 = new Vector3();

// triangle edge vectors
const _f0 = new Vector3();
const _f1 = new Vector3();
const _f2 = new Vector3();

const _center = new Vector3();
const _extents = new Vector3();
const _triangleNormal = new Vector3();
const _testAxis = new Vector3();

function satForAxes(axes, v0, v1, v2, extents) {
    for (let i = 0, j = axes.length - 3; i <= j; i += 3) {
        _testAxis.fromArray(axes, i);
        const r = extents.x * Math.abs(_testAxis.x) +
                  extents.y * Math.abs(_testAxis.y) +
                  extents.z * Math.abs(_testAxis.z);
        const p0 = v0.dot(_testAxis);
        const p1 = v1.dot(_testAxis);
        const p2 = v2.dot(_testAxis);
        if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
            return false;
        }
    }
    return true;
}

export class Box3 {
    constructor(min = new Vector3(+Infinity, +Infinity, +Infinity),
                max = new Vector3(-Infinity, -Infinity, -Infinity)) {
        this.isBox3 = true;
        this.min = min;
        this.max = max;
    }

    // ===== STATIC =====
    static get isBox3() { return true; }

    // ===== SET =====
    set(min, max) {
        this.min.copy(min);
        this.max.copy(max);
        return this;
    }

    // ===== SET FROM ARRAY =====
    setFromArray(array) {
        this.makeEmpty();
        for (let i = 0, il = array.length; i < il; i += 3) {
            this.expandByPoint(_vector.fromArray(array, i));
        }
        return this;
    }

    // ===== SET FROM BUFFER ATTRIBUTE =====
    setFromBufferAttribute(attribute) {
        this.makeEmpty();
        for (let i = 0, il = attribute.count; i < il; i++) {
            this.expandByPoint(_vector.fromBufferAttribute(attribute, i));
        }
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

    // ===== SET FROM OBJECT =====
    setFromObject(object, precise = false) {
        this.makeEmpty();
        return this.expandByObject(object, precise);
    }

    // ===== CLONE / COPY =====
    clone() {
        return new Box3().copy(this);
    }

    copy(box) {
        this.min.copy(box.min);
        this.max.copy(box.max);
        return this;
    }

    // ===== MAKE EMPTY =====
    makeEmpty() {
        this.min.x = this.min.y = this.min.z = +Infinity;
        this.max.x = this.max.y = this.max.z = -Infinity;
        return this;
    }

    // ===== IS EMPTY =====
    isEmpty() {
        return (this.max.x < this.min.x) ||
               (this.max.y < this.min.y) ||
               (this.max.z < this.min.z);
    }

    // ===== GET CENTER =====
    getCenter(target) {
        return this.isEmpty() ? target.set(0, 0, 0) :
               target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }

    // ===== GET SIZE =====
    getSize(target) {
        return this.isEmpty() ? target.set(0, 0, 0) :
               target.subVectors(this.max, this.min);
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

    // ===== EXPAND BY OBJECT =====
    expandByObject(object, precise = false) {
        object.updateWorldMatrix(false, false);

        const geometry = object.geometry;

        if (geometry !== undefined) {
            const positionAttribute = geometry.getAttribute('position');

            if (precise === true && positionAttribute !== undefined && object.isInstancedMesh !== true) {
                for (let i = 0, l = positionAttribute.count; i < l; i++) {
                    if (object.isMesh === true) {
                        object.getVertexPosition(i, _vector);
                    } else {
                        _vector.fromBufferAttribute(positionAttribute, i);
                    }
                    _vector.applyMatrix4(object.matrixWorld);
                    this.expandByPoint(_vector);
                }
            } else {
                if (object.boundingBox !== undefined) {
                    if (object.boundingBox === null) {
                        object.computeBoundingBox();
                    }
                    _box.copy(object.boundingBox);
                } else {
                    if (geometry.boundingBox === null) {
                        geometry.computeBoundingBox();
                    }
                    _box.copy(geometry.boundingBox);
                }
                _box.applyMatrix4(object.matrixWorld);
                this.union(_box);
            }
        }

        const children = object.children;
        for (let i = 0, l = children.length; i < l; i++) {
            this.expandByObject(children[i], precise);
        }

        return this;
    }

    // ===== CONTAINS POINT =====
    containsPoint(point) {
        return point.x >= this.min.x && point.x <= this.max.x &&
               point.y >= this.min.y && point.y <= this.max.y &&
               point.z >= this.min.z && point.z <= this.max.z;
    }

    // ===== CONTAINS BOX =====
    containsBox(box) {
        return this.min.x <= box.min.x && box.max.x <= this.max.x &&
               this.min.y <= box.min.y && box.max.y <= this.max.y &&
               this.min.z <= box.min.z && box.max.z <= this.max.z;
    }

    // ===== GET PARAMETER =====
    getParameter(point, target) {
        return target.set(
            (point.x - this.min.x) / (this.max.x - this.min.x),
            (point.y - this.min.y) / (this.max.y - this.min.y),
            (point.z - this.min.z) / (this.max.z - this.min.z)
        );
    }

    // ===== INTERSECTS BOX =====
    intersectsBox(box) {
        return box.max.x >= this.min.x && box.min.x <= this.max.x &&
               box.max.y >= this.min.y && box.min.y <= this.max.y &&
               box.max.z >= this.min.z && box.min.z <= this.max.z;
    }

    // ===== INTERSECTS SPHERE =====
    intersectsSphere(sphere) {
        this.clampPoint(sphere.center, _vector);
        return _vector.distanceToSquared(sphere.center) <= (sphere.radius * sphere.radius);
    }

    // ===== INTERSECTS PLANE =====
    intersectsPlane(plane) {
        let min, max;

        if (plane.normal.x > 0) {
            min = plane.normal.x * this.min.x;
            max = plane.normal.x * this.max.x;
        } else {
            min = plane.normal.x * this.max.x;
            max = plane.normal.x * this.min.x;
        }

        if (plane.normal.y > 0) {
            min += plane.normal.y * this.min.y;
            max += plane.normal.y * this.max.y;
        } else {
            min += plane.normal.y * this.max.y;
            max += plane.normal.y * this.min.y;
        }

        if (plane.normal.z > 0) {
            min += plane.normal.z * this.min.z;
            max += plane.normal.z * this.max.z;
        } else {
            min += plane.normal.z * this.max.z;
            max += plane.normal.z * this.min.z;
        }

        return (min <= -plane.constant && max >= -plane.constant);
    }

    // ===== INTERSECTS TRIANGLE =====
    intersectsTriangle(triangle) {
        if (this.isEmpty()) return false;

        this.getCenter(_center);
        _extents.subVectors(this.max, _center);

        _v0.subVectors(triangle.a, _center);
        _v1.subVectors(triangle.b, _center);
        _v2.subVectors(triangle.c, _center);

        _f0.subVectors(_v1, _v0);
        _f1.subVectors(_v2, _v1);
        _f2.subVectors(_v0, _v2);

        let axes = [
            0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y,
            _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x,
            -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0
        ];
        if (!satForAxes(axes, _v0, _v1, _v2, _extents)) return false;

        axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        if (!satForAxes(axes, _v0, _v1, _v2, _extents)) return false;

        _triangleNormal.crossVectors(_f0, _f1);
        axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];

        return satForAxes(axes, _v0, _v1, _v2, _extents);
    }

    // ===== CLAMP POINT =====
    clampPoint(point, target) {
        return target.copy(point).clamp(this.min, this.max);
    }

    // ===== DISTANCE TO POINT =====
    distanceToPoint(point) {
        return this.clampPoint(point, _vector).distanceTo(point);
    }

    // ===== GET BOUNDING SPHERE =====
    getBoundingSphere(target) {
        if (this.isEmpty()) {
            target.makeEmpty();
        } else {
            this.getCenter(target.center);
            target.radius = this.getSize(_vector).length() * 0.5;
        }
        return target;
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

    // ===== APPLY MATRIX =====
    applyMatrix4(matrix) {
        if (this.isEmpty()) return this;

        _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);
        _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);
        _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);
        _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);
        _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);
        _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);
        _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);
        _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);

        this.setFromPoints(_points);
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

    // ===== TO JSON / FROM JSON =====
    toJSON() {
        return {
            min: this.min.toArray(),
            max: this.max.toArray()
        };
    }

    fromJSON(json) {
        this.min.fromArray(json.min);
        this.max.fromArray(json.max);
        return this;
    }
}

// ===== STATIC =====
Box3.isBox3 = true;

export default Box3;
