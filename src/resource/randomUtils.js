/**
 * @module randomUtils
 * @description Advanced random number generation utilities for LXRN framework.
 * Provides various probability distributions including uniform, normal,
 * exponential, poisson, binomial, geometric, beta, gamma, chi-square,
 * student-t, F-distribution, log-normal, Weibull, Pareto, Laplace,
 * Cauchy, Rayleigh, Maxwell-Boltzmann, and Bernoulli distributions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

let _randomSeed = 1234567;

export function setRandomSeed(seed) {
  if (typeof seed !== 'number' || !isFinite(seed)) {
    throw new TypeError('LXRN.randomUtils.setRandomSeed: Seed must be a finite number');
  }
  _randomSeed = seed;
}

export function getRandomSeed() {
  return _randomSeed;
}

function _nextRandom() {
  let t = _randomSeed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

export function uniform(min = 0, max = 1) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('LXRN.randomUtils.uniform: min and max must be numbers');
  }
  if (min > max) {
    throw new Error('LXRN.randomUtils.uniform: min cannot be greater than max');
  }
  return min + _nextRandom() * (max - min);
}

export function uniformInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('LXRN.randomUtils.uniformInt: min and max must be numbers');
  }
  if (min > max) {
    throw new Error('LXRN.randomUtils.uniformInt: min cannot be greater than max');
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('LXRN.randomUtils.uniformInt: min and max must be integers');
  }
  return Math.floor(uniform(min, max + 1));
}

export function normal(mean = 0, stdDev = 1) {
  if (typeof mean !== 'number' || typeof stdDev !== 'number') {
    throw new TypeError('LXRN.randomUtils.normal: mean and stdDev must be numbers');
  }
  if (stdDev < 0) {
    throw new Error('LXRN.randomUtils.normal: stdDev cannot be negative');
  }
  let u1, u2, z1;
  do {
    u1 = _nextRandom();
    u2 = _nextRandom();
  } while (u1 === 0);
  
  z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + stdDev * z1;
}

export function exponential(lambda = 1) {
  if (typeof lambda !== 'number') {
    throw new TypeError('LXRN.randomUtils.exponential: lambda must be a number');
  }
  if (lambda <= 0) {
    throw new Error('LXRN.randomUtils.exponential: lambda must be positive');
  }
  return -Math.log(1 - _nextRandom()) / lambda;
}

export function poisson(lambda = 1) {
  if (typeof lambda !== 'number') {
    throw new TypeError('LXRN.randomUtils.poisson: lambda must be a number');
  }
  if (lambda < 0) {
    throw new Error('LXRN.randomUtils.poisson: lambda must be non-negative');
  }
  if (lambda === 0) return 0;
  if (lambda < 1) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= _nextRandom();
    } while (p > L);
    return k - 1;
  }
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= _nextRandom();
  } while (p > L);
  return k - 1;
}

export function binomial(trials = 1, probability = 0.5) {
  if (typeof trials !== 'number' || typeof probability !== 'number') {
    throw new TypeError('LXRN.randomUtils.binomial: trials and probability must be numbers');
  }
  if (trials < 0 || !Number.isInteger(trials)) {
    throw new Error('LXRN.randomUtils.binomial: trials must be a non-negative integer');
  }
  if (probability < 0 || probability > 1) {
    throw new Error('LXRN.randomUtils.binomial: probability must be between 0 and 1');
  }
  let successes = 0;
  for (let i = 0; i < trials; i++) {
    if (_nextRandom() < probability) successes++;
  }
  return successes;
}

export function geometric(probability = 0.5) {
  if (typeof probability !== 'number') {
    throw new TypeError('LXRN.randomUtils.geometric: probability must be a number');
  }
  if (probability <= 0 || probability > 1) {
    throw new Error('LXRN.randomUtils.geometric: probability must be between 0 and 1');
  }
  return Math.floor(Math.log(1 - _nextRandom()) / Math.log(1 - probability));
}

export function beta(alpha = 1, betaParam = 1) {
  if (typeof alpha !== 'number' || typeof betaParam !== 'number') {
    throw new TypeError('LXRN.randomUtils.beta: alpha and betaParam must be numbers');
  }
  if (alpha <= 0 || betaParam <= 0) {
    throw new Error('LXRN.randomUtils.beta: alpha and betaParam must be positive');
  }
  const x = gamma(alpha, 1);
  const y = gamma(betaParam, 1);
  return x / (x + y);
}

export function gamma(shape = 1, scale = 1) {
  if (typeof shape !== 'number' || typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.gamma: shape and scale must be numbers');
  }
  if (shape <= 0 || scale <= 0) {
    throw new Error('LXRN.randomUtils.gamma: shape and scale must be positive');
  }
  if (shape < 1) {
    const u = _nextRandom();
    return gamma(1 + shape, scale) * Math.pow(u, 1 / shape);
  }
  
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  
  while (true) {
    let v = _nextRandom();
    let x = normal(0, 1);
    if (v < 1 - 0.0331 * Math.pow(x, 4)) {
      return d * x + d;
    }
    if (Math.log(v) < 0.5 * Math.pow(x, 2) + d * (1 - x + Math.log(x))) {
      return d * x + d;
    }
  }
}

export function chiSquare(degreesOfFreedom = 1) {
  if (typeof degreesOfFreedom !== 'number') {
    throw new TypeError('LXRN.randomUtils.chiSquare: degreesOfFreedom must be a number');
  }
  if (degreesOfFreedom < 1 || !Number.isInteger(degreesOfFreedom)) {
    throw new Error('LXRN.randomUtils.chiSquare: degreesOfFreedom must be a positive integer');
  }
  let sum = 0;
  for (let i = 0; i < degreesOfFreedom; i++) {
    const z = normal(0, 1);
    sum += z * z;
  }
  return sum;
}

export function studentT(degreesOfFreedom = 1) {
  if (typeof degreesOfFreedom !== 'number') {
    throw new TypeError('LXRN.randomUtils.studentT: degreesOfFreedom must be a number');
  }
  if (degreesOfFreedom < 1 || !Number.isInteger(degreesOfFreedom)) {
    throw new Error('LXRN.randomUtils.studentT: degreesOfFreedom must be a positive integer');
  }
  const z = normal(0, 1);
  const chi2 = chiSquare(degreesOfFreedom);
  return z / Math.sqrt(chi2 / degreesOfFreedom);
}

export function fisherF(d1 = 1, d2 = 1) {
  if (typeof d1 !== 'number' || typeof d2 !== 'number') {
    throw new TypeError('LXRN.randomUtils.fisherF: d1 and d2 must be numbers');
  }
  if (d1 < 1 || !Number.isInteger(d1) || d2 < 1 || !Number.isInteger(d2)) {
    throw new Error('LXRN.randomUtils.fisherF: d1 and d2 must be positive integers');
  }
  const chi1 = chiSquare(d1);
  const chi2 = chiSquare(d2);
  return (chi1 / d1) / (chi2 / d2);
}

export function logNormal(mean = 0, stdDev = 1) {
  if (typeof mean !== 'number' || typeof stdDev !== 'number') {
    throw new TypeError('LXRN.randomUtils.logNormal: mean and stdDev must be numbers');
  }
  if (stdDev < 0) {
    throw new Error('LXRN.randomUtils.logNormal: stdDev cannot be negative');
  }
  return Math.exp(normal(mean, stdDev));
}

export function weibull(shape = 1, scale = 1) {
  if (typeof shape !== 'number' || typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.weibull: shape and scale must be numbers');
  }
  if (shape <= 0 || scale <= 0) {
    throw new Error('LXRN.randomUtils.weibull: shape and scale must be positive');
  }
  return scale * Math.pow(-Math.log(1 - _nextRandom()), 1 / shape);
}

export function pareto(shape = 1, scale = 1) {
  if (typeof shape !== 'number' || typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.pareto: shape and scale must be numbers');
  }
  if (shape <= 0 || scale <= 0) {
    throw new Error('LXRN.randomUtils.pareto: shape and scale must be positive');
  }
  return scale / Math.pow(1 - _nextRandom(), 1 / shape);
}

export function laplace(mean = 0, scale = 1) {
  if (typeof mean !== 'number' || typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.laplace: mean and scale must be numbers');
  }
  if (scale <= 0) {
    throw new Error('LXRN.randomUtils.laplace: scale must be positive');
  }
  const u = _nextRandom() - 0.5;
  return mean - scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u));
}

export function cauchy(median = 0, scale = 1) {
  if (typeof median !== 'number' || typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.cauchy: median and scale must be numbers');
  }
  if (scale <= 0) {
    throw new Error('LXRN.randomUtils.cauchy: scale must be positive');
  }
  return median + scale * Math.tan(Math.PI * (_nextRandom() - 0.5));
}

export function rayleigh(scale = 1) {
  if (typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.rayleigh: scale must be a number');
  }
  if (scale <= 0) {
    throw new Error('LXRN.randomUtils.rayleigh: scale must be positive');
  }
  return scale * Math.sqrt(-2 * Math.log(1 - _nextRandom()));
}

export function maxwellBoltzmann(scale = 1) {
  if (typeof scale !== 'number') {
    throw new TypeError('LXRN.randomUtils.maxwellBoltzmann: scale must be a number');
  }
  if (scale <= 0) {
    throw new Error('LXRN.randomUtils.maxwellBoltzmann: scale must be positive');
  }
  const x = normal(0, scale);
  const y = normal(0, scale);
  const z = normal(0, scale);
  return Math.sqrt(x * x + y * y + z * z);
}

export function bernoulli(probability = 0.5) {
  if (typeof probability !== 'number') {
    throw new TypeError('LXRN.randomUtils.bernoulli: probability must be a number');
  }
  if (probability < 0 || probability > 1) {
    throw new Error('LXRN.randomUtils.bernoulli: probability must be between 0 and 1');
  }
  return _nextRandom() < probability ? 1 : 0;
}

export function shuffle(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.randomUtils.shuffle: array must be an array');
  }
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = uniformInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function sample(array, size) {
  if (!Array.isArray(array)) {
    throw new TypeError('LXRN.randomUtils.sample: array must be an array');
  }
  if (typeof size !== 'number' || size < 0 || !Number.isInteger(size)) {
    throw new TypeError('LXRN.randomUtils.sample: size must be a non-negative integer');
  }
  if (size > array.length) {
    throw new Error('LXRN.randomUtils.sample: size cannot be greater than array length');
  }
  const shuffled = shuffle(array);
  return shuffled.slice(0, size);
}

export function weightedRandom(items, weights) {
  if (!Array.isArray(items) || !Array.isArray(weights)) {
    throw new TypeError('LXRN.randomUtils.weightedRandom: items and weights must be arrays');
  }
  if (items.length !== weights.length) {
    throw new Error('LXRN.randomUtils.weightedRandom: items and weights must have same length');
  }
  if (items.length === 0) {
    throw new Error('LXRN.randomUtils.weightedRandom: items array cannot be empty');
  }
  const totalWeight = weights.reduce((sum, w) => {
    if (typeof w !== 'number' || w < 0) {
      throw new TypeError('LXRN.randomUtils.weightedRandom: weights must be non-negative numbers');
    }
    return sum + w;
  }, 0);
  if (totalWeight === 0) {
    throw new Error('LXRN.randomUtils.weightedRandom: total weight must be greater than 0');
  }
  let random = _nextRandom() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }
  return items[items.length - 1];
}

export function randomInt(min, max) {
  return uniformInt(min, max);
}

export function randomFloat(min, max) {
  return uniform(min, max);
}

export const randomUtils = {
  setRandomSeed,
  getRandomSeed,
  uniform,
  uniformInt,
  normal,
  exponential,
  poisson,
  binomial,
  geometric,
  beta,
  gamma,
  chiSquare,
  studentT,
  fisherF,
  logNormal,
  weibull,
  pareto,
  laplace,
  cauchy,
  rayleigh,
  maxwellBoltzmann,
  bernoulli,
  shuffle,
  sample,
  weightedRandom,
  randomInt,
  randomFloat
};
