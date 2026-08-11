/**
 * @module ColorManagement
 * @description Global color manager using ColorSpace.
 * Manages color space conversions and working color space globally.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import ColorSpace from './ColorSpace.js';
import { warn } from '../core/coreUtils.js';
import {
    SRGBColorSpace,
    LinearSRGBColorSpace,
    DisplayP3ColorSpace,
    Rec2020ColorSpace,
    ACESColorSpace
} from '../core/constants.js';

export const ColorManagement = {
    enabled: true,
    _workingColorSpace: LinearSRGBColorSpace,

    /**
     * Get the current working color space.
     * @returns {string} The current working color space.
     */
    get workingColorSpace() {
        return this._workingColorSpace;
    },

    /**
     * Set the working color space with validation.
     * @param {string} value - The color space to set.
     */
    set workingColorSpace(value) {
        if (!this.spaces[value]) {
            throw new Error(`LXRN.ColorManagement: Unknown color space: ${value}`);
        }
        this._workingColorSpace = value;
    },

    /**
     * Registered color spaces with their transfer functions.
     */
    spaces: {
        'srgb': {
            transfer: 'srgb',
            toLinear: ColorSpace.srgbToLinear || ((c) => c),
            fromLinear: ColorSpace.linearToSrgb || ((c) => c)
        },
        'linear-srgb': {
            transfer: 'linear',
            toLinear: (c) => c,
            fromLinear: (c) => c
        },
        'display-p3': {
            transfer: 'srgb',
            toLinear: (c) => Math.pow(c, 2.4),
            fromLinear: (c) => Math.pow(c, 1 / 2.4)
        },
        'rec2020': {
            transfer: 'pq',
            toLinear: (c) => c,
            fromLinear: (c) => c
        },
        'aces': {
            transfer: 'linear',
            toLinear: (c) => c,
            fromLinear: (c) => c
        }
    },

    /**
     * Convert a color from one color space to another.
     * @param {Object} color - The color object { r, g, b }.
     * @param {string} sourceSpace - The source color space.
     * @param {string} targetSpace - The target color space.
     * @returns {Object} The converted color { r, g, b }.
     */
    convert(color, sourceSpace, targetSpace) {
        if (!this.enabled || sourceSpace === targetSpace) {
            return { r: color.r, g: color.g, b: color.b };
        }

        if (!this.spaces[sourceSpace]) {
            throw new Error(`LXRN.ColorManagement: Unknown source space: ${sourceSpace}`);
        }

        if (!this.spaces[targetSpace]) {
            throw new Error(`LXRN.ColorManagement: Unknown target space: ${targetSpace}`);
        }

        const result = { r: color.r, g: color.g, b: color.b };

        // Decode from source to linear
        if (this.spaces[sourceSpace].transfer === 'srgb') {
            result.r = this.spaces[sourceSpace].toLinear(result.r);
            result.g = this.spaces[sourceSpace].toLinear(result.g);
            result.b = this.spaces[sourceSpace].toLinear(result.b);
        }

        // Encode from linear to target
        if (this.spaces[targetSpace].transfer === 'srgb') {
            result.r = this.spaces[targetSpace].fromLinear(result.r);
            result.g = this.spaces[targetSpace].fromLinear(result.g);
            result.b = this.spaces[targetSpace].fromLinear(result.b);
        }

        return result;
    },

    /**
     * Convert a color from working space to target space.
     * @param {Object} color - The color object { r, g, b }.
     * @param {string} targetSpace - The target color space.
     * @returns {Object} The converted color { r, g, b }.
     */
    workingToColorSpace(color, targetSpace) {
        return this.convert(color, this.workingColorSpace, targetSpace);
    },

    /**
     * Convert a color from source space to working space.
     * @param {Object} color - The color object { r, g, b }.
     * @param {string} sourceSpace - The source color space.
     * @returns {Object} The converted color { r, g, b }.
     */
    colorSpaceToWorking(color, sourceSpace) {
        return this.convert(color, sourceSpace, this.workingColorSpace);
    },

    /**
     * Define additional color spaces.
     * @param {Object} spaces - The color spaces to define.
     */
    define(spaces) {
        if (typeof spaces !== 'object') {
            throw new TypeError('LXRN.ColorManagement.define: spaces must be an object');
        }
        Object.assign(this.spaces, spaces);
    },

    /**
     * Get the transfer function of a color space.
     * @param {string} colorSpace - The color space name.
     * @returns {string} The transfer function name.
     */
    getTransfer(colorSpace) {
        return this.spaces[colorSpace]?.transfer || 'linear';
    }
};

// Initialize working color space
ColorManagement._workingColorSpace = LinearSRGBColorSpace;

export default ColorManagement;
