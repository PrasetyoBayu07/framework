/**
 * @module matrixUtils
 * @description Matrix operations for LXRN framework.
 * Provides comprehensive matrix algebra functions including creation, multiplication,
 * inversion, determinant, transpose, and various matrix properties.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function createMatrix(rows, cols, defaultValue = 0) {
  if (typeof rows !== 'number' || typeof cols !== 'number' || rows < 0 || cols < 0 || !Number.isInteger(rows) || !Number.isInteger(cols)) {
    throw new TypeError('LXRN.matrixUtils.createMatrix: rows and cols must be non-negative integers');
  }
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = defaultValue;
    }
  }
  return matrix;
}

export function identity(size) {
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.matrixUtils.identity: size must be a non-negative integer');
  }
  const matrix = createMatrix(size, size);
  for (let i = 0; i < size; i++) {
    matrix[i][i] = 1;
  }
  return matrix;
}

export function multiply(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) {
    throw new TypeError('LXRN.matrixUtils.multiply: a and b must be non-empty matrices');
  }
  const rowsA = a.length;
  const colsA = a[0].length;
  const rowsB = b.length;
  const colsB = b[0].length;
  
  if (colsA !== rowsB) {
    throw new Error('LXRN.matrixUtils.multiply: Matrix dimensions do not match for multiplication');
  }
  
  const result = createMatrix(rowsA, colsB);
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

export function transpose(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError('LXRN.matrixUtils.transpose: matrix must be a non-empty matrix');
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = createMatrix(cols, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

export function determinant(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError('LXRN.matrixUtils.determinant: matrix must be a non-empty matrix');
  }
  const n = matrix.length;
  if (matrix[0].length !== n) {
    throw new Error('LXRN.matrixUtils.determinant: matrix must be square');
  }
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = [];
    for (let j = 1; j < n; j++) {
      subMatrix[j - 1] = [];
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          subMatrix[j - 1].push(matrix[j][k]);
        }
      }
    }
    det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
  }
  return det;
}

export function inverse(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError('LXRN.matrixUtils.inverse: matrix must be a non-empty matrix');
  }
  const det = determinant(matrix);
  if (det === 0) {
    throw new Error('LXRN.matrixUtils.inverse: Matrix is singular, cannot invert');
  }
  
  const n = matrix.length;
  const adjugate = createMatrix(n, n);
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const subMatrix = [];
      for (let k = 0; k < n; k++) {
        if (k !== i) {
          subMatrix.push([]);
          for (let l = 0; l < n; l++) {
            if (l !== j) {
              subMatrix[subMatrix.length - 1].push(matrix[k][l]);
            }
          }
        }
      }
      const cofactor = ((i + j) % 2 === 0 ? 1 : -1) * determinant(subMatrix);
      adjugate[j][i] = cofactor;
    }
  }
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      adjugate[i][j] /= det;
    }
  }
  
  return adjugate;
}

export function add(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) {
    throw new TypeError('LXRN.matrixUtils.add: a and b must be non-empty matrices');
  }
  const rows = a.length;
  const cols = a[0].length;
  if (b.length !== rows || b[0].length !== cols) {
    throw new Error('LXRN.matrixUtils.add: matrices must have same dimensions');
  }
  const result = createMatrix(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = a[i][j] + b[i][j];
    }
  }
  return result;
}

export function subtract(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) {
    throw new TypeError('LXRN.matrixUtils.subtract: a and b must be non-empty matrices');
  }
  const rows = a.length;
  const cols = a[0].length;
  if (b.length !== rows || b[0].length !== cols) {
    throw new Error('LXRN.matrixUtils.subtract: matrices must have same dimensions');
  }
  const result = createMatrix(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = a[i][j] - b[i][j];
    }
  }
  return result;
}

export function scalarMultiply(matrix, scalar) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError('LXRN.matrixUtils.scalarMultiply: matrix must be a non-empty matrix');
  }
  if (typeof scalar !== 'number') {
    throw new TypeError('LXRN.matrixUtils.scalarMultiply: scalar must be a number');
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = createMatrix(rows, cols);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = matrix[i][j] * scalar;
    }
  }
  return result;
}

export function trace(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError('LXRN.matrixUtils.trace: matrix must be a non-empty matrix');
  }
  if (matrix.length !== matrix[0].length) {
    throw new Error('LXRN.matrixUtils.trace: Matrix must be square for trace');
  }
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    sum += matrix[i][i];
  }
  return sum;
}

export function rank(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError('LXRN.matrixUtils.rank: matrix must be a non-empty matrix');
  }
  const m = matrix.length;
  const n = matrix[0].length;
  const result = matrix.map(row => [...row]);
  let rank = 0;
  let row = 0;
  
  for (let col = 0; col < n && row < m; col++) {
    let maxRow = row;
    for (let i = row + 1; i < m; i++) {
      if (Math.abs(result[i][col]) > Math.abs(result[maxRow][col])) {
        maxRow = i;
      }
    }
    
    if (Math.abs(result[maxRow][col]) < 1e-10) continue;
    
    [result[row], result[maxRow]] = [result[maxRow], result[row]];
    
    for (let i = row + 1; i < m; i++) {
      const factor = result[i][col] / result[row][col];
      for (let j = col; j < n; j++) {
        result[i][j] -= factor * result[row][j];
      }
    }
    row++;
    rank++;
  }
  
  return rank;
}

export function isSquare(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return false;
  return matrix.length === matrix[0].length;
}

export function isSymmetric(matrix) {
  if (!isSquare(matrix)) return false;
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== matrix[j][i]) return false;
    }
  }
  return true;
}

export function isIdentity(matrix) {
  if (!isSquare(matrix)) return false;
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        if (matrix[i][j] !== 1) return false;
      } else {
        if (matrix[i][j] !== 0) return false;
      }
    }
  }
  return true;
}

export function isDiagonal(matrix) {
  if (!isSquare(matrix)) return false;
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && matrix[i][j] !== 0) return false;
    }
  }
  return true;
}

export function isUpperTriangular(matrix) {
  if (!isSquare(matrix)) return false;
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (matrix[i][j] !== 0) return false;
    }
  }
  return true;
}

export function isLowerTriangular(matrix) {
  if (!isSquare(matrix)) return false;
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (matrix[i][j] !== 0) return false;
    }
  }
  return true;
}

export function toArray(matrix) {
  if (!Array.isArray(matrix)) {
    throw new TypeError('LXRN.matrixUtils.toArray: matrix must be an array');
  }
  return matrix.map(row => [...row]);
}

export function fromArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0 || !Array.isArray(arr[0])) {
    throw new TypeError('LXRN.matrixUtils.fromArray: arr must be a 2D array');
  }
  return arr.map(row => [...row]);
}

// ===== FUNGSI TAMBAHAN UNTUK TRANSFORMASI 3D =====

export function translationMatrix(tx, ty, tz) {
  return [
    [1, 0, 0, tx],
    [0, 1, 0, ty],
    [0, 0, 1, tz],
    [0, 0, 0, 1]
  ];
}

export function scalingMatrix(sx, sy, sz) {
  return [
    [sx, 0, 0, 0],
    [0, sy, 0, 0],
    [0, 0, sz, 0],
    [0, 0, 0, 1]
  ];
}

export function rotationMatrixFromQuaternion(q) {
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

export function composeMatrix(position, quaternion, scale) {
  const trans = translationMatrix(position.x, position.y, position.z);
  const rot = rotationMatrixFromQuaternion(quaternion);
  const sca = scalingMatrix(scale.x, scale.y, scale.z);
  const tr = multiply(trans, rot);
  return multiply(tr, sca);
}

export const matrixUtils = {
  createMatrix,
  identity,
  multiply,
  transpose,
  determinant,
  inverse,
  add,
  subtract,
  scalarMultiply,
  trace,
  rank,
  isSquare,
  isSymmetric,
  isIdentity,
  isDiagonal,
  isUpperTriangular,
  isLowerTriangular,
  toArray,
  fromArray,
  translationMatrix,
  scalingMatrix,
  rotationMatrixFromQuaternion,
  composeMatrix
};
