/**
 * @module ColorManagement
 * @description Global color manager using ColorSpace.
 * @author LXRN
 * @version 1.0.0
 */

import ColorSpace from './ColorSpace.js';
import { warn } from '../coreUtils.js';

export const ColorManagement = {
    enabled: true,
    workingColorSpace: 'linear-srgb',

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
        }
    },

    convert(color, sourceSpace, targetSpace) {
        if (!this.enabled || sourceSpace === targetSpace) return color;

        // Decode from source
        if (this.spaces[sourceSpace]?.transfer === 'srgb') {
            color.r = this.spaces[sourceSpace].toLinear(color.r);
            color.g = this.spaces[sourceSpace].toLinear(color.g);
            color.b = this.spaces[sourceSpace].toLinear(color.b);
        }

        // Encode to target
        if (this.spaces[targetSpace]?.transfer === 'srgb') {
            color.r = this.spaces[targetSpace].fromLinear(color.r);
            color.g = this.spaces[targetSpace].fromLinear(color.g);
            color.b = this.spaces[targetSpace].fromLinear(color.b);
        }

        return color;
    },

    workingToColorSpace(color, targetSpace) {
        return this.convert(color, this.workingColorSpace, targetSpace);
    },

    colorSpaceToWorking(color, sourceSpace) {
        return this.convert(color, sourceSpace, this.workingColorSpace);
    },

    define(spaces) {
        Object.assign(this.spaces, spaces);
    },

    getTransfer(colorSpace) {
        return this.spaces[colorSpace]?.transfer || 'linear';
    }
};

export default ColorManagement;
