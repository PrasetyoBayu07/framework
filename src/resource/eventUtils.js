/**
 * @module eventUtils
 * @description Event system utilities for LXRN framework.
 * Provides comprehensive event handling including EventEmitter with
 * support for synchronous/asynchronous events, wildcards, and priority-based
 * event listeners.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export class EventEmitter {
  constructor() {
    this.events = new Map();
    this.maxListeners = 10;
    this._onceWrappers = new Map();
  }

  on(event, listener, priority = 0) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.on: event must be a string');
    }
    if (typeof listener !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.on: listener must be a function');
    }
    if (typeof priority !== 'number') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.on: priority must be a number');
    }

    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    const listeners = this.events.get(event);
    const entry = { listener, priority, once: false };
    
    let insertIndex = listeners.length;
    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i].priority < priority) {
        insertIndex = i;
        break;
      }
    }
    listeners.splice(insertIndex, 0, entry);

    if (listeners.length > this.maxListeners) {
      console.warn(`Possible EventEmitter memory leak: ${listeners.length + 1} listeners for event "${event}"`);
    }

    return this;
  }

  once(event, listener, priority = 0) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.once: event must be a string');
    }
    if (typeof listener !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.once: listener must be a function');
    }

    const wrapped = (...args) => {
      this.off(event, wrapped);
      listener(...args);
    };
    this._onceWrappers.set(listener, wrapped);
    this.on(event, wrapped, priority);
    return this;
  }

  off(event, listener) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.off: event must be a string');
    }
    if (typeof listener !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.off: listener must be a function');
    }

    if (!this.events.has(event)) {
      return this;
    }

    const listeners = this.events.get(event);
    const index = listeners.findIndex(l => l.listener === listener || l.listener === this._onceWrappers.get(listener));
    
    if (index !== -1) {
      listeners.splice(index, 1);
      if (listeners.length === 0) {
        this.events.delete(event);
      }
      if (this._onceWrappers.has(listener)) {
        this._onceWrappers.delete(listener);
      }
    }

    return this;
  }

  emit(event, ...args) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.emit: event must be a string');
    }

    if (!this.events.has(event)) {
      return false;
    }

    const listeners = this.events.get(event);
    const toRemove = [];

    for (let i = 0; i < listeners.length; i++) {
      const { listener, once } = listeners[i];
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error in event listener for "${event}":`, error);
      }
      if (once) {
        toRemove.push(i);
      }
    }

    if (toRemove.length > 0) {
      for (const index of toRemove.reverse()) {
        listeners.splice(index, 1);
      }
      if (listeners.length === 0) {
        this.events.delete(event);
      }
    }

    return true;
  }

  emitAsync(event, ...args) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.emitAsync: event must be a string');
    }

    if (!this.events.has(event)) {
      return Promise.resolve(false);
    }

    const listeners = this.events.get(event);
    const toRemove = [];
    const promises = [];

    for (let i = 0; i < listeners.length; i++) {
      const { listener, once } = listeners[i];
      try {
        const result = listener(...args);
        if (result && typeof result.then === 'function') {
          promises.push(result);
        }
      } catch (error) {
        promises.push(Promise.reject(error));
        console.error(`Error in event listener for "${event}":`, error);
      }
      if (once) {
        toRemove.push(i);
      }
    }

    if (toRemove.length > 0) {
      for (const index of toRemove.reverse()) {
        listeners.splice(index, 1);
      }
      if (listeners.length === 0) {
        this.events.delete(event);
      }
    }

    return promises.length > 0 ? Promise.all(promises).then(() => true) : Promise.resolve(true);
  }

  listenerCount(event) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.listenerCount: event must be a string');
    }
    if (!this.events.has(event)) {
      return 0;
    }
    return this.events.get(event).length;
  }

  eventNames() {
    return Array.from(this.events.keys());
  }

  removeAllListeners(event) {
    if (event !== undefined) {
      if (typeof event !== 'string') {
        throw new TypeError('LXRN.eventUtils.EventEmitter.removeAllListeners: event must be a string');
      }
      this.events.delete(event);
    } else {
      this.events.clear();
    }
    return this;
  }

  setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('LXRN.eventUtils.EventEmitter.setMaxListeners: n must be a non-negative integer');
    }
    this.maxListeners = n;
    return this;
  }

  getMaxListeners() {
    return this.maxListeners;
  }

  listeners(event) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.listeners: event must be a string');
    }
    if (!this.events.has(event)) {
      return [];
    }
    return this.events.get(event).map(l => l.listener);
  }

  rawListeners(event) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.rawListeners: event must be a string');
    }
    if (!this.events.has(event)) {
      return [];
    }
    return this.events.get(event).map(l => ({ listener: l.listener, once: l.once, priority: l.priority }));
  }

  prependListener(event, listener) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.prependListener: event must be a string');
    }
    if (typeof listener !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.prependListener: listener must be a function');
    }

    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    const listeners = this.events.get(event);
    listeners.unshift({ listener, priority: 0, once: false });

    return this;
  }

  prependOnceListener(event, listener) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.prependOnceListener: event must be a string');
    }
    if (typeof listener !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventEmitter.prependOnceListener: listener must be a function');
    }

    const wrapped = (...args) => {
      this.off(event, wrapped);
      listener(...args);
    };
    this._onceWrappers.set(listener, wrapped);
    this.prependListener(event, wrapped);
    return this;
  }
}

export class EventBus {
  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe(event, callback, priority = 0) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.subscribe: event must be a string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventBus.subscribe: callback must be a function');
    }
    this.emitter.on(event, callback, priority);
    return () => this.unsubscribe(event, callback);
  }

  subscribeOnce(event, callback, priority = 0) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.subscribeOnce: event must be a string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventBus.subscribeOnce: callback must be a function');
    }
    this.emitter.once(event, callback, priority);
    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.unsubscribe: event must be a string');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('LXRN.eventUtils.EventBus.unsubscribe: callback must be a function');
    }
    this.emitter.off(event, callback);
  }

  publish(event, data) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.publish: event must be a string');
    }
    return this.emitter.emit(event, data);
  }

  publishAsync(event, data) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.publishAsync: event must be a string');
    }
    return this.emitter.emitAsync(event, data);
  }

  once(event, callback) {
    return this.subscribeOnce(event, callback);
  }

  clear(event) {
    if (event !== undefined) {
      if (typeof event !== 'string') {
        throw new TypeError('LXRN.eventUtils.EventBus.clear: event must be a string');
      }
      this.emitter.removeAllListeners(event);
    }
    return this;
  }

  clearAll() {
    this.emitter.removeAllListeners();
    return this;
  }

  hasListeners(event) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.hasListeners: event must be a string');
    }
    return this.emitter.listenerCount(event) > 0;
  }

  getListeners(event) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.getListeners: event must be a string');
    }
    return this.emitter.listenerCount(event);
  }

  getEvents() {
    return this.emitter.eventNames();
  }

  getRawListeners(event) {
    if (typeof event !== 'string') {
      throw new TypeError('LXRN.eventUtils.EventBus.getRawListeners: event must be a string');
    }
    return this.emitter.rawListeners(event);
  }

  setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
      throw new TypeError('LXRN.eventUtils.EventBus.setMaxListeners: n must be a non-negative integer');
    }
    this.emitter.setMaxListeners(n);
    return this;
  }

  getMaxListeners() {
    return this.emitter.getMaxListeners();
  }
}

export function createEventEmitter() {
  return new EventEmitter();
}

export function createEventBus() {
  return new EventBus();
}

export const eventUtils = {
  EventEmitter,
  EventBus,
  createEventEmitter,
  createEventBus
};
