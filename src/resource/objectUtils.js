/**
 * @module objectUtils
 * @description Object manipulation utilities for LXRN framework.
 * Provides comprehensive object operations including deep cloning, merging,
 * picking, omitting, flattening, and various object transformation functions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Map) {
    const result = new Map();
    for (const [key, value] of obj) {
      result.set(deepClone(key), deepClone(value));
    }
    return result;
  }
  if (obj instanceof Set) {
    const result = new Set();
    for (const value of obj) {
      result.add(deepClone(value));
    }
    return result;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

export function deepMerge(target, ...sources) {
  if (typeof target !== 'object' || target === null) {
    throw new TypeError('LXRN.objectUtils.deepMerge: target must be an object');
  }
  const result = deepClone(target);
  for (const source of sources) {
    if (typeof source !== 'object' || source === null) continue;
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceVal = source[key];
        const resultVal = result[key];
        if (sourceVal !== null && typeof sourceVal === 'object' && 
            resultVal !== null && typeof resultVal === 'object' &&
            !Array.isArray(sourceVal) && !Array.isArray(resultVal) &&
            !(sourceVal instanceof Date) && !(resultVal instanceof Date)) {
          result[key] = deepMerge(resultVal, sourceVal);
        } else {
          result[key] = deepClone(sourceVal);
        }
      }
    }
  }
  return result;
}

export function pick(obj, keys) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.pick: obj must be an object');
  }
  if (!Array.isArray(keys)) {
    throw new TypeError('LXRN.objectUtils.pick: keys must be an array');
  }
  const result = {};
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function omit(obj, keys) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.omit: obj must be an object');
  }
  if (!Array.isArray(keys)) {
    throw new TypeError('LXRN.objectUtils.omit: keys must be an array');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function flattenKeys(obj, prefix = '') {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.flattenKeys: obj must be an object');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        Object.assign(result, flattenKeys(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }
  return result;
}

export function unflattenKeys(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.unflattenKeys: obj must be an object');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const parts = key.split('.');
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          current[part] = obj[key];
        } else {
          if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {};
          }
          current = current[part];
        }
      }
    }
  }
  return result;
}

export function mapValues(obj, fn) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.mapValues: obj must be an object');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.objectUtils.mapValues: fn must be a function');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = fn(obj[key], key, obj);
    }
  }
  return result;
}

export function mapKeys(obj, fn) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.mapKeys: obj must be an object');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.objectUtils.mapKeys: fn must be a function');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = fn(key, obj[key], obj);
      result[newKey] = obj[key];
    }
  }
  return result;
}

export function filterKeys(obj, fn) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.filterKeys: obj must be an object');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.objectUtils.filterKeys: fn must be a function');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && fn(key, obj[key], obj)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function filterValues(obj, fn) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.filterValues: obj must be an object');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.objectUtils.filterValues: fn must be a function');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && fn(obj[key], key, obj)) {
      result[key] = obj[key];
    }
  }
  return result;
}

export function invert(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.invert: obj must be an object');
  }
  const result = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error('LXRN.objectUtils.invert: object values must be strings or numbers');
      }
      result[value] = key;
    }
  }
  return result;
}

export function size(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.size: obj must be an object');
  }
  return Object.keys(obj).length;
}

export function isEmpty(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.isEmpty: obj must be an object');
  }
  return Object.keys(obj).length === 0;
}

export function hasKey(obj, key) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.hasKey: obj must be an object');
  }
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function hasValue(obj, value) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.hasValue: obj must be an object');
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
      return true;
    }
  }
  return false;
}

export function findKey(obj, value) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.findKey: obj must be an object');
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
      return key;
    }
  }
  return undefined;
}

export function findKeys(obj, value) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('LXRN.objectUtils.findKeys: obj must be an object');
  }
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === value) {
      result.push(key);
    }
  }
  return result;
}

export const objectUtils = {
  deepClone,
  deepMerge,
  pick,
  omit,
  flattenKeys,
  unflattenKeys,
  mapValues,
  mapKeys,
  filterKeys,
  filterValues,
  invert,
  size,
  isEmpty,
  hasKey,
  hasValue,
  findKey,
  findKeys
};
