/**
 * @module arrayUtils
 * @description Array manipulation utilities for LXRN framework.
 * Provides comprehensive array operations including chunking, unique filtering,
 * shuffling, sorting, grouping, flattening, intersection, difference,
 * union, compacting, zipping, range generation, and various statistical
 * operations on arrays.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function chunk(array, size) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.chunk: array must be an array');
  }
  if (typeof size !== 'number' || size < 1 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.arrayUtils.chunk: size must be a positive integer');
  }
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function unique(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.unique: array must be an array');
  }
  return [...new Set(array)];
}

export function uniqueBy(array, key) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.uniqueBy: array must be an array');
  }
  const seen = new Set();
  return array.filter(item => {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

export function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.shuffle: array must be an array');
  }
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function sortBy(array, key, order = 'asc') {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.sortBy: array must be an array');
  }
  const result = [...array];
  return result.sort((a, b) => {
    const valA = typeof key === 'function' ? key(a) : a[key];
    const valB = typeof key === 'function' ? key(b) : b[key];
    if (order === 'asc') {
      return valA < valB ? -1 : valA > valB ? 1 : 0;
    } else {
      return valA > valB ? -1 : valA < valB ? 1 : 0;
    }
  });
}

export function groupBy(array, key) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.groupBy: array must be an array');
  }
  const result = {};
  for (const item of array) {
    const group = typeof key === 'function' ? key(item) : item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
  }
  return result;
}

export function flatten(array, depth = 1) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.flatten: array must be an array');
  }
  if (typeof depth !== 'number' || depth < 0 || !Number.isInteger(depth)) {
    throw new TypeError('LXRN.arrayUtils.flatten: depth must be a non-negative integer');
  }
  return array.flat(depth);
}

export function deepFlatten(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.deepFlatten: array must be an array');
  }
  return array.reduce((acc, val) => {
    return acc.concat(Array.isArray(val) ? deepFlatten(val) : val);
  }, []);
}

export function intersection(...arrays) {
  if (arrays.length === 0) return [];
  if (!arrays.every(arr => Array.isArray(arr))) {
    throw new TypeError('LXRN.arrayUtils.intersection: all arguments must be arrays');
  }
  return arrays.reduce((acc, arr) => {
    return acc.filter(item => arr.includes(item));
  });
}

export function difference(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new TypeError('LXRN.arrayUtils.difference: array1 and array2 must be arrays');
  }
  return array1.filter(item => !array2.includes(item));
}

export function symmetricDifference(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new TypeError('LXRN.arrayUtils.symmetricDifference: array1 and array2 must be arrays');
  }
  return [
    ...difference(array1, array2),
    ...difference(array2, array1)
  ];
}

export function union(...arrays) {
  if (!arrays.every(arr => Array.isArray(arr))) {
    throw new TypeError('LXRN.arrayUtils.union: all arguments must be arrays');
  }
  return unique(arrays.flat());
}

export function compact(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.compact: array must be an array');
  }
  return array.filter(item => item != null);
}

export function without(array, ...items) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.without: array must be an array');
  }
  return array.filter(item => !items.includes(item));
}

export function pluck(array, key) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.pluck: array must be an array');
  }
  return array.map(item => item[key]);
}

export function zip(...arrays) {
  if (!arrays.every(arr => Array.isArray(arr))) {
    throw new TypeError('LXRN.arrayUtils.zip: all arguments must be arrays');
  }
  const minLength = Math.min(...arrays.map(arr => arr.length));
  return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
}

export function unzip(pairs) {
  if (!Array.isArray(pairs)) {
    throw new TypeError('LXRN.arrayUtils.unzip: pairs must be an array');
  }
  const result = [[], []];
  for (const [first, second] of pairs) {
    result[0].push(first);
    result[1].push(second);
  }
  return result;
}

export function range(start, end, step = 1) {
  if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
    throw new TypeError('LXRN.arrayUtils.range: start, end, and step must be numbers');
  }
  if (step === 0) {
    throw new Error('LXRN.arrayUtils.range: step cannot be zero');
  }
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
}

export function sum(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.sum: array must be an array');
  }
  return array.reduce((acc, val) => {
    if (typeof val !== 'number') {
      throw new TypeError('LXRN.arrayUtils.sum: array must contain only numbers');
    }
    return acc + val;
  }, 0);
}

export function average(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.average: array must be an array');
  }
  if (array.length === 0) return 0;
  return sum(array) / array.length;
}

export function median(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.median: array must be an array');
  }
  if (array.length === 0) return 0;
  const sorted = [...array].sort((a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('LXRN.arrayUtils.median: array must contain only numbers');
    }
    return a - b;
  });
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function mode(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.mode: array must be an array');
  }
  if (array.length === 0) return [];
  
  const frequency = {};
  let maxFreq = 0;
  let result = [];
  
  for (const item of array) {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxFreq) {
      maxFreq = frequency[item];
      result = [item];
    } else if (frequency[item] === maxFreq) {
      result.push(item);
    }
  }
  return unique(result);
}

export function variance(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.variance: array must be an array');
  }
  if (array.length === 0) return 0;
  const avg = average(array);
  return average(array.map(x => {
    if (typeof x !== 'number') {
      throw new TypeError('LXRN.arrayUtils.variance: array must contain only numbers');
    }
    return Math.pow(x - avg, 2);
  }));
}

export function standardDeviation(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.standardDeviation: array must be an array');
  }
  return Math.sqrt(variance(array));
}

export function minBy(array, key) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.minBy: array must be an array');
  }
  if (array.length === 0) return undefined;
  let minItem = array[0];
  let minValue = typeof key === 'function' ? key(minItem) : minItem[key];
  for (const item of array.slice(1)) {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (value < minValue) {
      minValue = value;
      minItem = item;
    }
  }
  return minItem;
}

export function maxBy(array, key) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.maxBy: array must be an array');
  }
  if (array.length === 0) return undefined;
  let maxItem = array[0];
  let maxValue = typeof key === 'function' ? key(maxItem) : maxItem[key];
  for (const item of array.slice(1)) {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (value > maxValue) {
      maxValue = value;
      maxItem = item;
    }
  }
  return maxItem;
}

export function partition(array, predicate) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.partition: array must be an array');
  }
  const truthy = [];
  const falsy = [];
  for (const item of array) {
    if (typeof predicate === 'function' ? predicate(item) : item[predicate]) {
      truthy.push(item);
    } else {
      falsy.push(item);
    }
  }
  return [truthy, falsy];
}

export function take(array, n) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.take: array must be an array');
  }
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('LXRN.arrayUtils.take: n must be a non-negative integer');
  }
  return array.slice(0, n);
}

export function takeRight(array, n) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.takeRight: array must be an array');
  }
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('LXRN.arrayUtils.takeRight: n must be a non-negative integer');
  }
  return array.slice(-n);
}

export function drop(array, n) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.drop: array must be an array');
  }
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('LXRN.arrayUtils.drop: n must be a non-negative integer');
  }
  return array.slice(n);
}

export function dropRight(array, n) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.arrayUtils.dropRight: array must be an array');
  }
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new TypeError('LXRN.arrayUtils.dropRight: n must be a non-negative integer');
  }
  return array.slice(0, -n);
}

export const arrayUtils = {
  chunk,
  unique,
  uniqueBy,
  shuffle,
  sortBy,
  groupBy,
  flatten,
  deepFlatten,
  intersection,
  difference,
  symmetricDifference,
  union,
  compact,
  without,
  pluck,
  zip,
  unzip,
  range,
  sum,
  average,
  median,
  mode,
  variance,
  standardDeviation,
  minBy,
  maxBy,
  partition,
  take,
  takeRight,
  drop,
  dropRight
};
