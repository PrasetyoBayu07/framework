/**
 * @module Matrix2
 * @description 2x2 matrix class.
 * @author LXRN
 * @version 1.0.0
 */

import { identity, multiply, transpose, inverse, determinant } from '../matrixUtils.js';

export class Matrix2 {
    constructor(n11, n12, n21, n22) {
        this.isMatrix2 = true;
        this.elements = [
            1, 0,
            0, 1
        ];

        if (n11 !== undefined) {
            this.set(n11, n12, n21, n22);
        }
    }

    // ===== STATIC =====
    static get isMatrix2() { return true; }

    // ===== SET =====
    set(n11, n12, n21, n22) {
        const te = this.elements;
        te[0] = n11;
        te[1] = n21;
        te[2] = n12;
        te[3] = n22;
        return this;
    }

    // ===== IDENTITY =====
    identity() {
        this.set(
            1, 0,
            0, 1
        );
        return this;
    }

    // ===== COPY / CLONE =====
    copy(m) {
        const te = this.elements;
        const me = m.elements;
        te[0] = me[0];
        te[1] = me[1];
        te[2] = me[2];
        te[3] = me[3];
        return this;
    }

    clone() {
        return new Matrix2().fromArray(this.elements);
    }

    // ===== MULTIPLY =====
    multiply(m) {
        return this.multiplyMatrices(this, m);
    }

    premultiply(m) {
        return this.multiplyMatrices(m, this);
    }

    multiplyMatrices(a, b) {
        const ae = a.elements;
        const be = b.elements;
        const te = this.elements;

        const a11 = ae[0], a12 = ae[2];
        const a21 = ae[1], a22 = ae[3];

        const b11 = be[0], b12 = be[2];
        const b21 = be[1], b22 = be[3];

        te[0] = a11 * b11 + a12 * b21;
        te[1] = a21 * b11 + a22 * b21;
        te[2] = a11 * b12 + a12 * b22;
        te[3] = a21 * b12 + a22 * b22;

        return this;
    }

    // ===== MULTIPLY SCALAR =====
    multiplyScalar(s) {
        const te = this.elements;
        te[0] *= s;
        te[1] *= s;
        te[2] *= s;
        te[3] *= s;
        return this;
    }

    // ===== DETERMINANT =====
    determinant() {
        const te = this.elements;
        return te[0] * te[3] - te[1] * te[2];
    }

    // ===== INVERSE =====
    invert() {
        const te = this.elements;
        const n11 = te[0], n21 = te[1];
        const n12 = te[2], n22 = te[3];

        const det = n11 * n22 - n21 * n12;

        if (det === 0) {
            return this.set(0, 0, 0, 0);
        }

        const detInv = 1 / det;

        te[0] = n22 * detInv;
        te[1] = -n21 * detInv;
        te[2] = -n12 * detInv;
        te[3] = n11 * detInv;

        return this;
    }

    // ===== TRANSPOSE =====
    transpose() {
        const te = this.elements;
        let tmp;
        tmp = te[1];
        te[1] = te[2];
        te[2] = tmp;
        return this;
    }

    // ===== TRANSPOSE INTO ARRAY =====
    transposeIntoArray(r) {
        const m = this.elements;
        r[0] = m[0];
        r[1] = m[2];
        r[2] = m[1];
        r[3] = m[3];
        return this;
    }

    // ===== EQUALS =====
    equals(matrix) {
        const te = this.elements;
        const me = matrix.elements;
        for (let i = 0; i < 4; i++) {
            if (te[i] !== me[i]) return false;
        }
        return true;
    }

    // ===== ARRAY =====
    fromArray(array, offset = 0) {
        for (let i = 0; i < 4; i++) {
            this.elements[i] = array[i + offset];
        }
        return this;
    }

    toArray(array = [], offset = 0) {
        const te = this.elements;
        array[offset] = te[0];
        array[offset + 1] = te[1];
        array[offset + 2] = te[2];
        array[offset + 3] = te[3];
        return array;
    }

    // ===== 2D TRANSFORMS =====
    makeRotation(theta) {
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        this.set(
            c, -s,
            s, c
        );
        return this;
    }

    makeScale(x, y) {
        this.set(
            x, 0,
            0, y
        );
        return this;
    }

    // ===== SET FROM MATRIX3 / MATRIX4 =====
    setFromMatrix3(m) {
        const me = m.elements;
        this.set(
            me[0], me[3],
            me[1], me[4]
        );
        return this;
    }

    setFromMatrix4(m) {
        const me = m.elements;
        this.set(
            me[0], me[4],
            me[1], me[5]
        );
        return this;
    }
}

// ===== STATIC =====
Matrix2.isMatrix2 = true;

export default Matrix2;
