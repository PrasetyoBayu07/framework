/**
 * @module ColorPalette
 * @description Color palette generator for LXRN framework.
 * Provides color scheme generation including analogous, complementary, triadic,
 * tetradic, and custom palettes.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import { Color } from './Color.js';
import { clamp, lerp, euclideanModulo } from '../core/mathUtils.js';
import { warn, createTypeError, createError } from '../core/coreUtils.js';

export class ColorPalette {
    /**
     * Create a new palette
     * @param {Array<Color|string|number>} colors - Base colors
     * @param {Object} options - Palette options
     */
    constructor(colors = [], options = {}) {
        this.colors = [];
        this.options = {
            count: 5,
            variation: 0.1,
            ...options
        };

        if (colors.length > 0) {
            this.setColors(colors);
        } else {
            // Default: blue palette
            this.setColors(['#0066ff', '#3399ff', '#66ccff', '#99ddff', '#ccf0ff']);
        }
    }

    // ===== SET METHODS =====

    /**
     * Set palette colors
     * @param {Array} colors - Array of colors
     * @returns {ColorPalette} This instance
     */
    setColors(colors) {
        if (!Array.isArray(colors) || colors.length === 0) {
            throw createError('ColorPalette', 'setColors', 'colors must be a non-empty array');
        }

        this.colors = colors.map(c => {
            if (c instanceof Color) return c;
            return new Color(c);
        });

        return this;
    }

    /**
     * Add a color to the palette
     * @param {Color|string|number} color - Color to add
     * @returns {ColorPalette} This instance
     */
    addColor(color) {
        if (!(color instanceof Color)) {
            color = new Color(color);
        }
        this.colors.push(color);
        return this;
    }

    /**
     * Remove a color from the palette
     * @param {number} index - Index of color to remove
     * @returns {ColorPalette} This instance
     */
    removeColor(index) {
        if (typeof index !== 'number' || !Number.isInteger(index)) {
            throw createTypeError('ColorPalette', 'removeColor', 'index', 'integer');
        }
        if (index >= 0 && index < this.colors.length) {
            this.colors.splice(index, 1);
        }
        return this;
    }

    // ===== GET METHODS =====

    /**
     * Get a color from the palette
     * @param {number} index - Index of color
     * @returns {Color} Color at index
     */
    getColor(index) {
        if (typeof index !== 'number' || !Number.isInteger(index)) {
            throw createTypeError('ColorPalette', 'getColor', 'index', 'integer');
        }
        if (index < 0 || index >= this.colors.length) {
            throw createError('ColorPalette', 'getColor', `Index ${index} out of range`);
        }
        return this.colors[index];
    }

    /**
     * Get all colors
     * @returns {Array<Color>} Array of colors
     */
    getColors() {
        return this.colors.map(c => c.clone());
    }

    /**
     * Get colors as HEX strings
     * @returns {Array<string>} Array of HEX strings
     */
    getHexArray() {
        return this.colors.map(c => c.getHexString());
    }

    /**
     * Get colors as CSS strings
     * @returns {Array<string>} Array of CSS strings
     */
    getCSSArray() {
        return this.colors.map(c => c.getStyle());
    }

    /**
     * Get colors as RGB objects
     * @returns {Array<Object>} Array of RGB objects
     */
    getRGBArray() {
        return this.colors.map(c => ({ r: c.r, g: c.g, b: c.b }));
    }

    /**
     * Get colors as HSL objects
     * @returns {Array<Object>} Array of HSL objects
     */
    getHSLArray() {
        return this.colors.map(c => c.getHSL({}));
    }

    /**
     * Get palette size
     * @returns {number} Number of colors in palette
     */
    size() {
        return this.colors.length;
    }

    // ===== PALETTE GENERATION =====

    /**
     * Generate a monochromatic palette
     * @param {Color} baseColor - Base color
     * @param {number} count - Number of colors
     * @param {string} variant - 'light', 'dark', or 'both'
     * @returns {ColorPalette} New palette
     */
    static monochromatic(baseColor, count = 5, variant = 'both') {
        const base = new Color(baseColor);
        const hsl = base.getHSL({});
        const colors = [];

        for (let i = 0; i < count; i++) {
            const t = count > 1 ? i / (count - 1) : 0;
            let lightness;

            if (variant === 'light') {
                lightness = 0.5 + t * 0.5;
            } else if (variant === 'dark') {
                lightness = 0.5 - t * 0.5;
            } else {
                lightness = t;
            }

            const color = new Color().setHSL(hsl.h, hsl.s, lightness);
            colors.push(color);
        }

        return new ColorPalette(colors);
    }

    /**
     * Generate an analogous palette
     * @param {Color} baseColor - Base color
     * @param {number} count - Number of colors
     * @param {number} spread - Spread in degrees (default: 30)
     * @returns {ColorPalette} New palette
     */
    static analogous(baseColor, count = 5, spread = 30) {
        const base = new Color(baseColor);
        const hsl = base.getHSL({});
        const colors = [];

        const halfSpread = spread / 2;
        const step = count > 1 ? spread / (count - 1) : 0;

        for (let i = 0; i < count; i++) {
            const hue = euclideanModulo(hsl.h + (i * step - halfSpread) / 360, 1);
            const color = new Color().setHSL(hue, hsl.s, hsl.l);
            colors.push(color);
        }

        return new ColorPalette(colors);
    }

    /**
     * Generate a complementary palette
     * @param {Color} baseColor - Base color
     * @param {number} count - Number of colors (including complement)
     * @returns {ColorPalette} New palette
     */
    static complementary(baseColor, count = 2) {
        const base = new Color(baseColor);
        const hsl = base.getHSL({});
        const colors = [base];

        if (count > 1) {
            const complement = new Color().setHSL(euclideanModulo(hsl.h + 0.5, 1), hsl.s, hsl.l);
            colors.push(complement);

            // Add intermediate colors if count > 2
            for (let i = 1; i < count - 1; i++) {
                const t = i / (count - 1);
                const hue = euclideanModulo(hsl.h + t * 0.5, 1);
                const color = new Color().setHSL(hue, hsl.s, hsl.l);
                colors.push(color);
            }
        }

        return new ColorPalette(colors);
    }

    /**
     * Generate a split complementary palette
     * @param {Color} baseColor - Base color
     * @param {number} offset - Offset in degrees (default: 30)
     * @returns {ColorPalette} New palette
     */
    static splitComplementary(baseColor, offset = 30) {
        const base = new Color(baseColor);
        const hsl = base.getHSL({});
        const offsetRad = offset / 360;

        const color1 = new Color().setHSL(euclideanModulo(hsl.h + 0.5 - offsetRad, 1), hsl.s, hsl.l);
        const color2 = new Color().setHSL(euclideanModulo(hsl.h + 0.5 + offsetRad, 1), hsl.s, hsl.l);

        return new ColorPalette([base, color1, color2]);
    }

    /**
     * Generate a triadic palette
     * @param {Color} baseColor - Base color
     * @param {number} spread - Spread in degrees (default: 120)
     * @returns {ColorPalette} New palette
     */
    static triadic(baseColor, spread = 120) {
        const base = new Color(baseColor);
        const hsl = base.getHSL({});
        const spreadRad = spread / 360;

        const color1 = new Color().setHSL(euclideanModulo(hsl.h + spreadRad, 1), hsl.s, hsl.l);
        const color2 = new Color().setHSL(euclideanModulo(hsl.h + spreadRad * 2, 1), hsl.s, hsl.l);

        return new ColorPalette([base, color1, color2]);
    }

    /**
     * Generate a tetradic (double complementary) palette
     * @param {Color} baseColor - Base color
     * @param {number} spread - Spread in degrees (default: 90)
     * @returns {ColorPalette} New palette
     */
    static tetradic(baseColor, spread = 90) {
        const base = new Color(baseColor);
        const hsl = base.getHSL({});
        const spreadRad = spread / 360;

        const color1 = new Color().setHSL(euclideanModulo(hsl.h + spreadRad, 1), hsl.s, hsl.l);
        const color2 = new Color().setHSL(euclideanModulo(hsl.h + 0.5, 1), hsl.s, hsl.l);
        const color3 = new Color().setHSL(euclideanModulo(hsl.h + 0.5 + spreadRad, 1), hsl.s, hsl.l);

        return new ColorPalette([base, color1, color2, color3]);
    }

    /**
     * Generate a square palette
     * @param {Color} baseColor - Base color
     * @returns {ColorPalette} New palette
     */
    static square(baseColor) {
        return ColorPalette.tetradic(baseColor, 90);
    }

    /**
     * Generate a palette from an image (placeholder)
     * @param {ImageData|string} image - Image data or URL
     * @param {number} count - Number of colors
     * @returns {Promise<ColorPalette>} Promise with palette
     */
    static async fromImage(image, count = 5) {
        // This is a placeholder for image palette extraction
        warn('LXRN.ColorPalette.fromImage: Image palette extraction is not yet implemented');
        return new ColorPalette(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']);
    }

    // ===== MANIPULATION =====

    /**
     * Sort colors by hue
     * @param {string} order - 'asc' or 'desc'
     * @returns {ColorPalette} This instance
     */
    sortByHue(order = 'asc') {
        if (order !== 'asc' && order !== 'desc') {
            throw createError('ColorPalette', 'sortByHue', 'order must be "asc" or "desc"');
        }
        const hslColors = this.colors.map(c => ({
            color: c,
            hsl: c.getHSL({})
        }));

        hslColors.sort((a, b) => {
            const diff = a.hsl.h - b.hsl.h;
            return order === 'asc' ? diff : -diff;
        });

        this.colors = hslColors.map(item => item.color);
        return this;
    }

    /**
     * Sort colors by lightness
     * @param {string} order - 'asc' or 'desc'
     * @returns {ColorPalette} This instance
     */
    sortByLightness(order = 'asc') {
        if (order !== 'asc' && order !== 'desc') {
            throw createError('ColorPalette', 'sortByLightness', 'order must be "asc" or "desc"');
        }
        const hslColors = this.colors.map(c => ({
            color: c,
            hsl: c.getHSL({})
        }));

        hslColors.sort((a, b) => {
            const diff = a.hsl.l - b.hsl.l;
            return order === 'asc' ? diff : -diff;
        });

        this.colors = hslColors.map(item => item.color);
        return this;
    }

    /**
     * Sort colors by saturation
     * @param {string} order - 'asc' or 'desc'
     * @returns {ColorPalette} This instance
     */
    sortBySaturation(order = 'asc') {
        if (order !== 'asc' && order !== 'desc') {
            throw createError('ColorPalette', 'sortBySaturation', 'order must be "asc" or "desc"');
        }
        const hslColors = this.colors.map(c => ({
            color: c,
            hsl: c.getHSL({})
        }));

        hslColors.sort((a, b) => {
            const diff = a.hsl.s - b.hsl.s;
            return order === 'asc' ? diff : -diff;
        });

        this.colors = hslColors.map(item => item.color);
        return this;
    }

    /**
     * Apply a transformation to all colors
     * @param {Function} fn - Transformation function
     * @returns {ColorPalette} This instance
     */
    mapColors(fn) {
        if (typeof fn !== 'function') {
            throw createTypeError('ColorPalette', 'mapColors', 'fn', 'function');
        }
        this.colors = this.colors.map(c => fn(c));
        return this;
    }

    /**
     * Adjust all colors by a uniform amount
     * @param {number} hueShift - Hue shift in degrees
     * @param {number} satShift - Saturation shift (0-1)
     * @param {number} lightShift - Lightness shift (0-1)
     * @returns {ColorPalette} This instance
     */
    adjustAll(hueShift = 0, satShift = 0, lightShift = 0) {
        this.colors = this.colors.map(c => {
            const hsl = c.getHSL({});
            const newColor = new Color().setHSL(
                euclideanModulo(hsl.h + hueShift / 360, 1),
                clamp(hsl.s + satShift, 0, 1),
                clamp(hsl.l + lightShift, 0, 1)
            );
            return newColor;
        });
        return this;
    }

    /**
     * Clone the palette
     * @returns {ColorPalette} New palette instance
     */
    clone() {
        return new ColorPalette(this.colors.map(c => c.clone()));
    }

    // ===== EXPORT =====

    /**
     * Export palette to JSON
     * @returns {Object} JSON representation
     */
    toJSON() {
        return {
            colors: this.colors.map(c => c.getHexString()),
            options: this.options
        };
    }

    /**
     * Import palette from JSON
     * @param {Object} json - JSON representation
     * @returns {ColorPalette} This instance
     */
    fromJSON(json) {
        if (typeof json !== 'object' || json === null) {
            throw createTypeError('ColorPalette', 'fromJSON', 'json', 'object');
        }
        if (json.colors) {
            this.setColors(json.colors);
        }
        if (json.options) {
            this.options = { ...this.options, ...json.options };
        }
        return this;
    }

    // ===== STATIC PRESETS =====

    /**
     * Get predefined palettes
     * @param {string} name - Palette name
     * @returns {ColorPalette} New palette
     */
    static preset(name) {
        const presets = {
            'material': ['#F44336', '#E91E63', '#9C27B0', '#3F51B5', '#2196F3'],
            'pastel': ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
            'vivid': ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0000FF'],
            'earth': ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F5DEB3'],
            'cool': ['#003366', '#0066CC', '#3399FF', '#66CCFF', '#99DDFF'],
            'warm': ['#FF6600', '#FF8833', '#FFAA66', '#FFCC99', '#FFEECC'],
            'neon': ['#FF00FF', '#FF0099', '#FF6600', '#FFFF00', '#00FF00'],
            'retro': ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96CEB4'],
            'rainbow': ['#FF0000', '#FF8800', '#FFFF00', '#00FF00', '#0000FF', '#8800FF'],
            'monochrome': ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF'],
            'sunset': ['#FF6B6B', '#FF9F43', '#FECA57', '#FF9FF3', '#54A0FF'],
            'ocean': ['#0066FF', '#00CCFF', '#00FFCC', '#66FF99', '#CCFF66']
        };

        if (!presets[name]) {
            throw createError('ColorPalette', 'preset', `Unknown preset: ${name}`);
        }

        return new ColorPalette(presets[name]);
    }
}

export default ColorPalette;
