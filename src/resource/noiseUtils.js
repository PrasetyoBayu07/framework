/**
 * @module noiseUtils
 * @description Noise generation utilities for LXRN framework.
 * Provides Perlin noise, simplex noise, and fractal Brownian motion
 * for procedural generation and texture synthesis.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

let _noiseSeed = 1234567;

export function setNoiseSeed(seed) {
  if (typeof seed !== 'number' || !isFinite(seed)) {
    throw new TypeError('LXRN.noiseUtils.setNoiseSeed: Seed must be a finite number');
  }
  _noiseSeed = seed;
}

export function getNoiseSeed() {
  return _noiseSeed;
}

function _hash(x, y) {
  let h = _noiseSeed + x * 374761393 + y * 668265263;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return h;
}

function _hash3(x, y, z) {
  let h = _noiseSeed + x * 374761393 + y * 668265263 + z * 1274126177;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return h;
}

function _gradient(hash, x, y) {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function _gradient3(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function _fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function _lerp(a, b, t) {
  return a + t * (b - a);
}

export function perlin2D(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('LXRN.noiseUtils.perlin2D: x and y must be numbers');
  }
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  
  const dx = x - x0;
  const dy = y - y0;
  
  const g00 = _gradient(_hash(x0, y0), dx, dy);
  const g10 = _gradient(_hash(x1, y0), dx - 1, dy);
  const g01 = _gradient(_hash(x0, y1), dx, dy - 1);
  const g11 = _gradient(_hash(x1, y1), dx - 1, dy - 1);
  
  const u = _fade(dx);
  const v = _fade(dy);
  
  const l0 = _lerp(g00, g10, u);
  const l1 = _lerp(g01, g11, u);
  
  return _lerp(l0, l1, v);
}

export function perlin3D(x, y, z) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    throw new TypeError('LXRN.noiseUtils.perlin3D: x, y, and z must be numbers');
  }
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const z0 = Math.floor(z);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const z1 = z0 + 1;
  
  const dx = x - x0;
  const dy = y - y0;
  const dz = z - z0;
  
  const g000 = _gradient3(_hash3(x0, y0, z0), dx, dy, dz);
  const g100 = _gradient3(_hash3(x1, y0, z0), dx - 1, dy, dz);
  const g010 = _gradient3(_hash3(x0, y1, z0), dx, dy - 1, dz);
  const g110 = _gradient3(_hash3(x1, y1, z0), dx - 1, dy - 1, dz);
  const g001 = _gradient3(_hash3(x0, y0, z1), dx, dy, dz - 1);
  const g101 = _gradient3(_hash3(x1, y0, z1), dx - 1, dy, dz - 1);
  const g011 = _gradient3(_hash3(x0, y1, z1), dx, dy - 1, dz - 1);
  const g111 = _gradient3(_hash3(x1, y1, z1), dx - 1, dy - 1, dz - 1);
  
  const u = _fade(dx);
  const v = _fade(dy);
  const w = _fade(dz);
  
  const l00 = _lerp(g000, g100, u);
  const l01 = _lerp(g010, g110, u);
  const l10 = _lerp(g001, g101, u);
  const l11 = _lerp(g011, g111, u);
  
  const l0 = _lerp(l00, l01, v);
  const l1 = _lerp(l10, l11, v);
  
  return _lerp(l0, l1, w);
}

export function fbm2D(x, y, octaves = 6, lacunarity = 2, gain = 0.5) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('LXRN.noiseUtils.fbm2D: x and y must be numbers');
  }
  if (typeof octaves !== 'number' || octaves < 1 || !Number.isInteger(octaves)) {
    throw new TypeError('LXRN.noiseUtils.fbm2D: octaves must be a positive integer');
  }
  if (typeof lacunarity !== 'number' || lacunarity <= 0) {
    throw new TypeError('LXRN.noiseUtils.fbm2D: lacunarity must be a positive number');
  }
  if (typeof gain !== 'number' || gain <= 0 || gain >= 1) {
    throw new TypeError('LXRN.noiseUtils.fbm2D: gain must be between 0 and 1');
  }
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;
  
  for (let i = 0; i < octaves; i++) {
    value += amplitude * perlin2D(x * frequency, y * frequency);
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }
  
  return value / maxValue;
}

export function fbm3D(x, y, z, octaves = 6, lacunarity = 2, gain = 0.5) {
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    throw new TypeError('LXRN.noiseUtils.fbm3D: x, y, and z must be numbers');
  }
  if (typeof octaves !== 'number' || octaves < 1 || !Number.isInteger(octaves)) {
    throw new TypeError('LXRN.noiseUtils.fbm3D: octaves must be a positive integer');
  }
  if (typeof lacunarity !== 'number' || lacunarity <= 0) {
    throw new TypeError('LXRN.noiseUtils.fbm3D: lacunarity must be a positive number');
  }
  if (typeof gain !== 'number' || gain <= 0 || gain >= 1) {
    throw new TypeError('LXRN.noiseUtils.fbm3D: gain must be between 0 and 1');
  }
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;
  
  for (let i = 0; i < octaves; i++) {
    value += amplitude * perlin3D(x * frequency, y * frequency, z * frequency);
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }
  
  return value / maxValue;
}

export function ridgedNoise2D(x, y, octaves = 6, lacunarity = 2, gain = 0.5) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('LXRN.noiseUtils.ridgedNoise2D: x and y must be numbers');
  }
  if (typeof octaves !== 'number' || octaves < 1 || !Number.isInteger(octaves)) {
    throw new TypeError('LXRN.noiseUtils.ridgedNoise2D: octaves must be a positive integer');
  }
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;
  
  for (let i = 0; i < octaves; i++) {
    let noise = perlin2D(x * frequency, y * frequency);
    noise = 1 - Math.abs(noise);
    noise *= noise;
    value += amplitude * noise;
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }
  
  return value / maxValue;
}

export function cellularNoise2D(x, y, distanceFunction = 'euclidean') {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError('LXRN.noiseUtils.cellularNoise2D: x and y must be numbers');
  }
  const cellX = Math.floor(x);
  const cellY = Math.floor(y);
  const fracX = x - cellX;
  const fracY = y - cellY;
  
  let minDist = Infinity;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const h = _hash(cellX + i, cellY + j);
      const px = (h & 0xFFFF) / 65536.0;
      const py = ((h >> 16) & 0xFFFF) / 65536.0;
      const dx = fracX - i - px;
      const dy = fracY - j - py;
      
      let dist;
      switch (distanceFunction) {
        case 'euclidean':
          dist = dx * dx + dy * dy;
          break;
        case 'manhattan':
          dist = Math.abs(dx) + Math.abs(dy);
          break;
        case 'chebyshev':
          dist = Math.max(Math.abs(dx), Math.abs(dy));
          break;
        default:
          dist = dx * dx + dy * dy;
      }
      
      if (dist < minDist) {
        minDist = dist;
      }
    }
  }
  
  return Math.sqrt(minDist);
}

export const noiseUtils = {
  setNoiseSeed,
  getNoiseSeed,
  perlin2D,
  perlin3D,
  fbm2D,
  fbm3D,
  ridgedNoise2D,
  cellularNoise2D
};
