/**
 * @module promiseUtils
 * @description Promise and async utilities for LXRN framework.
 * Provides comprehensive promise operations including delay, retry, timeout,
 * debounce, throttle, memoization, and various promise composition functions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function delay(ms) {
  if (typeof ms !== 'number' || ms < 0) {
    throw new TypeError('LXRN.promiseUtils.delay: ms must be a non-negative number');
  }
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function retry(fn, retries = 3, delayMs = 1000) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.retry: fn must be a function');
  }
  if (typeof retries !== 'number' || retries < 0 || !Number.isInteger(retries)) {
    throw new TypeError('LXRN.promiseUtils.retry: retries must be a non-negative integer');
  }
  if (typeof delayMs !== 'number' || delayMs < 0) {
    throw new TypeError('LXRN.promiseUtils.retry: delayMs must be a non-negative number');
  }
  return new Promise((resolve, reject) => {
    const attempt = (attempts) => {
      try {
        fn().then(resolve).catch(error => {
          if (attempts <= 1) {
            reject(error);
          } else {
            setTimeout(() => attempt(attempts - 1), delayMs);
          }
        });
      } catch (error) {
        if (attempts <= 1) {
          reject(error);
        } else {
          setTimeout(() => attempt(attempts - 1), delayMs);
        }
      }
    };
    attempt(retries);
  });
}

export function timeout(promise, ms) {
  if (!(promise instanceof Promise)) {
    throw new TypeError('LXRN.promiseUtils.timeout: promise must be a Promise');
  }
  if (typeof ms !== 'number' || ms < 0) {
    throw new TypeError('LXRN.promiseUtils.timeout: ms must be a non-negative number');
  }
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`LXRN.promiseUtils.timeout: Timeout after ${ms}ms`));
    }, ms);
    
    promise.then(result => {
      clearTimeout(timer);
      resolve(result);
    }).catch(error => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

export function allSettled(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('LXRN.promiseUtils.allSettled: promises must be an array');
  }
  return Promise.allSettled(promises);
}

export function any(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError('LXRN.promiseUtils.any: promises must be an array');
  }
  return Promise.any(promises);
}

export function allWithProgress(promises, onProgress) {
  if (!Array.isArray(promises)) {
    throw new TypeError('LXRN.promiseUtils.allWithProgress: promises must be an array');
  }
  if (typeof onProgress !== 'function') {
    throw new TypeError('LXRN.promiseUtils.allWithProgress: onProgress must be a function');
  }
  let completed = 0;
  const total = promises.length;
  
  return Promise.all(promises.map(async (promise, index) => {
    const result = await promise;
    completed++;
    onProgress(completed, total, index, result);
    return result;
  }));
}

export function sequential(funcs) {
  if (!Array.isArray(funcs)) {
    throw new TypeError('LXRN.promiseUtils.sequential: funcs must be an array');
  }
  if (!funcs.every(f => typeof f === 'function')) {
    throw new TypeError('LXRN.promiseUtils.sequential: all items in funcs must be functions');
  }
  return funcs.reduce(async (acc, fn) => {
    const result = await acc;
    return fn(result);
  }, Promise.resolve());
}

export function parallel(funcs) {
  if (!Array.isArray(funcs)) {
    throw new TypeError('LXRN.promiseUtils.parallel: funcs must be an array');
  }
  if (!funcs.every(f => typeof f === 'function')) {
    throw new TypeError('LXRN.promiseUtils.parallel: all items in funcs must be functions');
  }
  return Promise.all(funcs.map(fn => fn()));
}

export function raceWithTimeout(promises, ms) {
  if (!Array.isArray(promises)) {
    throw new TypeError('LXRN.promiseUtils.raceWithTimeout: promises must be an array');
  }
  if (typeof ms !== 'number' || ms < 0) {
    throw new TypeError('LXRN.promiseUtils.raceWithTimeout: ms must be a non-negative number');
  }
  return Promise.race([
    ...promises,
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(`LXRN.promiseUtils.raceWithTimeout: Race timeout after ${ms}ms`)), ms);
    })
  ]);
}

export function retryWithBackoff(fn, options = {}) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.retryWithBackoff: fn must be a function');
  }
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 30000,
    factor = 2
  } = options;
  
  if (typeof maxRetries !== 'number' || maxRetries < 0 || !Number.isInteger(maxRetries)) {
    throw new TypeError('LXRN.promiseUtils.retryWithBackoff: maxRetries must be a non-negative integer');
  }
  if (typeof initialDelay !== 'number' || initialDelay < 0) {
    throw new TypeError('LXRN.promiseUtils.retryWithBackoff: initialDelay must be a non-negative number');
  }
  if (typeof maxDelay !== 'number' || maxDelay < 0) {
    throw new TypeError('LXRN.promiseUtils.retryWithBackoff: maxDelay must be a non-negative number');
  }
  if (typeof factor !== 'number' || factor <= 1) {
    throw new TypeError('LXRN.promiseUtils.retryWithBackoff: factor must be greater than 1');
  }
  
  return new Promise((resolve, reject) => {
    let retries = 0;
    let delay = initialDelay;
    
    const attempt = () => {
      try {
        fn().then(resolve).catch(error => {
          retries++;
          if (retries > maxRetries) {
            reject(error);
          } else {
            const backoffDelay = Math.min(delay, maxDelay);
            setTimeout(attempt, backoffDelay);
            delay *= factor;
          }
        });
      } catch (error) {
        retries++;
        if (retries > maxRetries) {
          reject(error);
        } else {
          const backoffDelay = Math.min(delay, maxDelay);
          setTimeout(attempt, backoffDelay);
          delay *= factor;
        }
      }
    };
    
    attempt();
  });
}

export function debouncePromise(fn, wait) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.debouncePromise: fn must be a function');
  }
  if (typeof wait !== 'number' || wait < 0) {
    throw new TypeError('LXRN.promiseUtils.debouncePromise: wait must be a non-negative number');
  }
  let timer = null;
  let resolveQueue = [];
  let rejectQueue = [];
  let isExecuting = false;
  
  return function(...args) {
    return new Promise((resolve, reject) => {
      resolveQueue.push(resolve);
      rejectQueue.push(reject);
      
      if (timer) {
        clearTimeout(timer);
      }
      
      timer = setTimeout(() => {
        const currentResolve = resolveQueue;
        const currentReject = rejectQueue;
        resolveQueue = [];
        rejectQueue = [];
        timer = null;
        
        try {
          const result = fn(...args);
          if (result instanceof Promise) {
            result.then(
              value => currentResolve.forEach(res => res(value)),
              error => currentReject.forEach(rej => rej(error))
            );
          } else {
            currentResolve.forEach(res => res(result));
          }
        } catch (error) {
          currentReject.forEach(rej => rej(error));
        }
      }, wait);
    });
  };
}

export function throttlePromise(fn, wait) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.throttlePromise: fn must be a function');
  }
  if (typeof wait !== 'number' || wait < 0) {
    throw new TypeError('LXRN.promiseUtils.throttlePromise: wait must be a non-negative number');
  }
  let timer = null;
  let lastExecution = 0;
  let pendingResolve = null;
  let pendingReject = null;
  
  return function(...args) {
    return new Promise((resolve, reject) => {
      const now = Date.now();
      const remaining = wait - (now - lastExecution);
      
      if (remaining <= 0) {
        lastExecution = now;
        try {
          const result = fn(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      } else {
        if (timer) {
          clearTimeout(timer);
        }
        pendingResolve = resolve;
        pendingReject = reject;
        timer = setTimeout(() => {
          lastExecution = Date.now();
          timer = null;
          try {
            const result = fn(...args);
            pendingResolve(result);
          } catch (error) {
            pendingReject(error);
          }
          pendingResolve = null;
          pendingReject = null;
        }, remaining);
      }
    });
  };
}

export function memoizePromise(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.memoizePromise: fn must be a function');
  }
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function withTimeout(fn, ms) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.withTimeout: fn must be a function');
  }
  if (typeof ms !== 'number' || ms < 0) {
    throw new TypeError('LXRN.promiseUtils.withTimeout: ms must be a non-negative number');
  }
  return function(...args) {
    return timeout(Promise.resolve(fn(...args)), ms);
  };
}

export function toPromise(value) {
  if (value instanceof Promise) return value;
  return Promise.resolve(value);
}

export function isPromise(value) {
  return value && typeof value.then === 'function';
}

export function finallyCatch(promise, callback) {
  if (!(promise instanceof Promise)) {
    throw new TypeError('LXRN.promiseUtils.finallyCatch: promise must be a Promise');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('LXRN.promiseUtils.finallyCatch: callback must be a function');
  }
  return promise.finally(callback);
}

export function safePromise(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('LXRN.promiseUtils.safePromise: fn must be a function');
  }
  return function(...args) {
    try {
      const result = fn(...args);
      return result instanceof Promise ? result : Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export function cancellablePromise(promise) {
  if (!(promise instanceof Promise)) {
    throw new TypeError('LXRN.promiseUtils.cancellablePromise: promise must be a Promise');
  }
  let isCancelled = false;
  let cancel = () => {
    isCancelled = true;
  };
  
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      result => {
        if (!isCancelled) resolve(result);
      },
      error => {
        if (!isCancelled) reject(error);
      }
    );
  });
  
  wrappedPromise.cancel = cancel;
  wrappedPromise.isCancelled = () => isCancelled;
  
  return wrappedPromise;
}

export const promiseUtils = {
  delay,
  retry,
  timeout,
  allSettled,
  any,
  allWithProgress,
  sequential,
  parallel,
  raceWithTimeout,
  retryWithBackoff,
  debouncePromise,
  throttlePromise,
  memoizePromise,
  withTimeout,
  toPromise,
  isPromise,
  finallyCatch,
  safePromise,
  cancellablePromise
};
