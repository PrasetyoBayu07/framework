/**
 * @module statsUtils
 * @description Statistical utilities for LXRN framework.
 * Provides comprehensive statistical functions including measures of central tendency,
 * dispersion, shape, correlation, and various statistical tests.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function sum(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.sum: arr must be an array');
  }
  if (arr.length === 0) return 0;
  return arr.reduce((acc, val) => {
    if (typeof val !== 'number') {
      throw new TypeError('LXRN.statsUtils.sum: array must contain only numbers');
    }
    return acc + val;
  }, 0);
}

export function mean(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.mean: arr must be an array');
  }
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

export function median(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.median: arr must be an array');
  }
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('LXRN.statsUtils.median: array must contain only numbers');
    }
    return a - b;
  });
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function mode(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.mode: arr must be an array');
  }
  if (arr.length === 0) return [];
  
  const frequency = {};
  let maxFreq = 0;
  let result = [];
  
  for (const item of arr) {
    frequency[item] = (frequency[item] || 0) + 1;
    if (frequency[item] > maxFreq) {
      maxFreq = frequency[item];
      result = [item];
    } else if (frequency[item] === maxFreq) {
      result.push(item);
    }
  }
  return [...new Set(result)];
}

export function variance(arr, population = true) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.variance: arr must be an array');
  }
  if (arr.length === 0) return 0;
  const avg = mean(arr);
  const squaredDiffs = arr.map(x => {
    if (typeof x !== 'number') {
      throw new TypeError('LXRN.statsUtils.variance: array must contain only numbers');
    }
    return Math.pow(x - avg, 2);
  });
  const divisor = population ? arr.length : arr.length - 1;
  if (divisor === 0) return 0;
  return sum(squaredDiffs) / divisor;
}

export function standardDeviation(arr, population = true) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.standardDeviation: arr must be an array');
  }
  if (arr.length === 0) return 0;
  return Math.sqrt(variance(arr, population));
}

export function min(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.min: arr must be an array');
  }
  if (arr.length === 0) return undefined;
  return Math.min(...arr);
}

export function max(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.max: arr must be an array');
  }
  if (arr.length === 0) return undefined;
  return Math.max(...arr);
}

export function range(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.range: arr must be an array');
  }
  if (arr.length === 0) return 0;
  return max(arr) - min(arr);
}

export function quantile(arr, q) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.quantile: arr must be an array');
  }
  if (typeof q !== 'number' || q < 0 || q > 1) {
    throw new Error('LXRN.statsUtils.quantile: q must be a number between 0 and 1');
  }
  if (arr.length === 0) return 0;
  
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

export function quartiles(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.quartiles: arr must be an array');
  }
  if (arr.length === 0) return { q1: 0, q2: 0, q3: 0 };
  return {
    q1: quantile(arr, 0.25),
    q2: quantile(arr, 0.5),
    q3: quantile(arr, 0.75)
  };
}

export function interquartileRange(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.interquartileRange: arr must be an array');
  }
  if (arr.length === 0) return 0;
  const q = quartiles(arr);
  return q.q3 - q.q1;
}

export function skewness(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.skewness: arr must be an array');
  }
  if (arr.length < 2) return 0;
  
  const avg = mean(arr);
  const std = standardDeviation(arr, false);
  if (std === 0) return 0;
  
  const n = arr.length;
  const cubedSum = arr.reduce((acc, x) => {
    if (typeof x !== 'number') {
      throw new TypeError('LXRN.statsUtils.skewness: array must contain only numbers');
    }
    return acc + Math.pow((x - avg) / std, 3);
  }, 0);
  return (n / ((n - 1) * (n - 2))) * cubedSum;
}

export function kurtosis(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.kurtosis: arr must be an array');
  }
  if (arr.length < 2) return 0;
  
  const avg = mean(arr);
  const std = standardDeviation(arr, false);
  if (std === 0) return 0;
  
  const n = arr.length;
  const fourthSum = arr.reduce((acc, x) => {
    if (typeof x !== 'number') {
      throw new TypeError('LXRN.statsUtils.kurtosis: array must contain only numbers');
    }
    return acc + Math.pow((x - avg) / std, 4);
  }, 0);
  return (n * (n + 1) / ((n - 1) * (n - 2) * (n - 3))) * fourthSum - (3 * Math.pow(n - 1, 2) / ((n - 2) * (n - 3)));
}

export function covariance(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new TypeError('LXRN.statsUtils.covariance: arr1 and arr2 must be arrays');
  }
  if (arr1.length !== arr2.length) {
    throw new Error('LXRN.statsUtils.covariance: arrays must have same length');
  }
  if (arr1.length === 0) return 0;
  
  const mean1 = mean(arr1);
  const mean2 = mean(arr2);
  const n = arr1.length;
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    if (typeof arr1[i] !== 'number' || typeof arr2[i] !== 'number') {
      throw new TypeError('LXRN.statsUtils.covariance: arrays must contain only numbers');
    }
    sum += (arr1[i] - mean1) * (arr2[i] - mean2);
  }
  
  return sum / (n - 1);
}

export function correlation(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new TypeError('LXRN.statsUtils.correlation: arr1 and arr2 must be arrays');
  }
  if (arr1.length !== arr2.length) {
    throw new Error('LXRN.statsUtils.correlation: arrays must have same length');
  }
  if (arr1.length === 0) return 0;
  
  const cov = covariance(arr1, arr2);
  const std1 = standardDeviation(arr1, false);
  const std2 = standardDeviation(arr2, false);
  
  if (std1 === 0 || std2 === 0) return 0;
  return cov / (std1 * std2);
}

export function zScore(arr, value) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.zScore: arr must be an array');
  }
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.statsUtils.zScore: value must be a number');
  }
  if (arr.length === 0) return 0;
  
  const avg = mean(arr);
  const std = standardDeviation(arr, false);
  if (std === 0) return 0;
  return (value - avg) / std;
}

export function zScores(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.zScores: arr must be an array');
  }
  if (arr.length === 0) return [];
  
  const avg = mean(arr);
  const std = standardDeviation(arr, false);
  if (std === 0) return arr.map(() => 0);
  return arr.map(x => {
    if (typeof x !== 'number') {
      throw new TypeError('LXRN.statsUtils.zScores: array must contain only numbers');
    }
    return (x - avg) / std;
  });
}

export function mad(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.mad: arr must be an array');
  }
  if (arr.length === 0) return 0;
  
  const avg = mean(arr);
  const absoluteDeviations = arr.map(x => {
    if (typeof x !== 'number') {
      throw new TypeError('LXRN.statsUtils.mad: array must contain only numbers');
    }
    return Math.abs(x - avg);
  });
  return mean(absoluteDeviations);
}

export function percentile(arr, p) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.percentile: arr must be an array');
  }
  if (typeof p !== 'number' || p < 0 || p > 100) {
    throw new Error('LXRN.statsUtils.percentile: p must be a number between 0 and 100');
  }
  return quantile(arr, p / 100);
}

export function percentileRank(arr, value) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.percentileRank: arr must be an array');
  }
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.statsUtils.percentileRank: value must be a number');
  }
  if (arr.length === 0) return 0;
  
  const lessThan = arr.filter(x => x < value).length;
  const equalTo = arr.filter(x => x === value).length;
  return ((lessThan + 0.5 * equalTo) / arr.length) * 100;
}

export function geometricMean(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.geometricMean: arr must be an array');
  }
  if (arr.length === 0) return 0;
  
  let product = 1;
  for (const val of arr) {
    if (typeof val !== 'number') {
      throw new TypeError('LXRN.statsUtils.geometricMean: array must contain only numbers');
    }
    if (val <= 0) {
      throw new Error('LXRN.statsUtils.geometricMean: geometric mean requires positive numbers');
    }
    product *= val;
  }
  return Math.pow(product, 1 / arr.length);
}

export function harmonicMean(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.harmonicMean: arr must be an array');
  }
  if (arr.length === 0) return 0;
  
  let sum = 0;
  for (const val of arr) {
    if (typeof val !== 'number') {
      throw new TypeError('LXRN.statsUtils.harmonicMean: array must contain only numbers');
    }
    if (val === 0) {
      throw new Error('LXRN.statsUtils.harmonicMean: harmonic mean requires non-zero numbers');
    }
    sum += 1 / val;
  }
  return arr.length / sum;
}

export function rootMeanSquare(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('LXRN.statsUtils.rootMeanSquare: arr must be an array');
  }
  if (arr.length === 0) return 0;
  
  const sumSquares = arr.reduce((acc, val) => {
    if (typeof val !== 'number') {
      throw new TypeError('LXRN.statsUtils.rootMeanSquare: array must contain only numbers');
    }
    return acc + val * val;
  }, 0);
  return Math.sqrt(sumSquares / arr.length);
}

export const statsUtils = {
  sum,
  mean,
  median,
  mode,
  variance,
  standardDeviation,
  min,
  max,
  range,
  quantile,
  quartiles,
  interquartileRange,
  skewness,
  kurtosis,
  covariance,
  correlation,
  zScore,
  zScores,
  mad,
  percentile,
  percentileRank,
  geometricMean,
  harmonicMean,
  rootMeanSquare
};
