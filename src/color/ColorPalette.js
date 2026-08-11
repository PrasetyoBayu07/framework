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

    // ===== IMAGE PALETTE EXTRACTION =====

    /**
     * Generate a palette from an image
     * @param {HTMLImageElement|File|Blob|string} image - Image source
     * @param {number} count - Number of colors (default: 5)
     * @param {Object} options - Extraction options
     * @param {string} options.method - 'quantization' | 'kmeans' | 'histogram' (default: 'quantization')
     * @param {number} options.quality - 0-1, lower = faster (default: 1)
     * @param {number} options.maxIterations - For k-means (default: 10)
     * @param {number} options.quantizeBits - For quantization (default: 4)
     * @returns {Promise<ColorPalette>} Promise with palette
     */
    static async fromImage(image, count = 5, options = {}) {
        try {
            const pixelData = await this._getPixelData(image);
            const colors = this._extractColors(pixelData, count, options);
            return new ColorPalette(colors);
        } catch (error) {
            warn(`LXRN.ColorPalette.fromImage: ${error.message}`);
            return new ColorPalette([
                '#666666', '#888888', '#aaaaaa', '#cccccc', '#eeeeee'
            ]);
        }
    }

    /**
     * Get pixel data from various image sources
     * @private
     */
    static async _getPixelData(image) {
        // Browser environment
        if (typeof window !== 'undefined' && window.document) {
            return this._getPixelDataFromBrowser(image);
        }

        // React Native (if expo available)
        if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
            return this._getPixelDataFromReactNative(image);
        }

        throw new Error('Unsupported environment');
    }

    /**
     * Browser: extract pixel data via Canvas
     * @private
     */
    static _getPixelDataFromBrowser(image) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = 100;

            canvas.width = size;
            canvas.height = size;

            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                ctx.drawImage(img, 0, 0, size, size);
                const imageData = ctx.getImageData(0, 0, size, size);
                resolve(imageData.data);
            };

            img.onerror = reject;

            if (typeof image === 'string') {
                img.src = image;
            } else if (image instanceof HTMLImageElement) {
                img.src = image.src;
            } else if (image instanceof File || image instanceof Blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    img.src = e.target.result;
                };
                reader.onerror = reject;
                reader.readAsDataURL(image);
            } else {
                reject(new Error('Unsupported image type for browser'));
            }
        });
    }

    /**
     * React Native: extract pixel data via expo-image-manipulator
     * @private
     */
    static async _getPixelDataFromReactNative(image) {
        try {
            const { manipulateAsync } = require('expo-image-manipulator');

            const manipulated = await manipulateAsync(
                typeof image === 'string' ? image : image.uri,
                [{ resize: { width: 100, height: 100 } }],
                { base64: true }
            );

            if (!manipulated.base64) {
                throw new Error('Failed to get base64 data');
            }

            return this._base64ToPixelArray(manipulated.base64);
        } catch (error) {
            throw new Error('React Native: install expo-image-manipulator first');
        }
    }

    /**
     * Convert base64 to pixel array
     * @private
     */
    static _base64ToPixelArray(base64) {
        if (typeof atob !== 'undefined') {
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            return bytes;
        }

        if (typeof Buffer !== 'undefined') {
            return Buffer.from(base64, 'base64');
        }

        throw new Error('Unable to decode base64');
    }

    /**
     * Extract dominant colors from pixel data
     * @private
     */
    static _extractColors(pixelData, count, options = {}) {
        const {
            method = 'quantization',
            quality = 1,
            maxIterations = 10,
            quantizeBits = 4
        } = options;

        const pixels = this._samplePixels(pixelData, quality);

        if (pixels.length === 0) {
            throw new Error('No valid pixels found');
        }

        let extracted;
        switch (method) {
            case 'kmeans':
                extracted = this._kMeans(pixels, count, maxIterations);
                break;
            case 'histogram':
                extracted = this._histogramMethod(pixels, count);
                break;
            case 'quantization':
            default:
                extracted = this._colorQuantization(pixels, count, quantizeBits);
                break;
        }

        return extracted.map(([r, g, b]) => new Color([r, g, b]));
    }

    /**
     * Sample pixels from image data
     * @private
     */
    static _samplePixels(data, quality = 1) {
        const pixels = [];
        const step = Math.max(1, Math.floor(1 / quality));

        for (let i = 0; i < data.length; i += step * 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a < 128) continue;

            pixels.push([r, g, b]);
        }

        return pixels;
    }

    /**
     * Method 1: Color Quantization (Fastest)
     * @private
     */
    static _colorQuantization(pixels, count, bits = 4) {
        const mask = ~((1 << (8 - bits)) - 1) & 0xFF;
        const colorMap = new Map();

        pixels.forEach(([r, g, b]) => {
            const key = `${r & mask},${g & mask},${b & mask}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        });

        const sorted = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([key]) => {
                const [r, g, b] = key.split(',').map(Number);
                return [r, g, b];
            });

        return this._ensureColorCount(sorted, count);
    }

    /**
     * Method 2: K-Means Clustering (Most Accurate)
     * @private
     */
    static _kMeans(pixels, k, maxIterations = 10) {
        if (pixels.length === 0) return [];
        if (k >= pixels.length) return pixels;

        const centroids = this._kMeansPlusPlus(pixels, k);
        let clusters = Array.from({ length: k }, () => []);

        for (let iter = 0; iter < maxIterations; iter++) {
            clusters = Array.from({ length: k }, () => []);
            pixels.forEach(pixel => {
                let minDist = Infinity;
                let closest = 0;
                centroids.forEach((centroid, i) => {
                    const dist = this._euclideanDistance(pixel, centroid);
                    if (dist < minDist) {
                        minDist = dist;
                        closest = i;
                    }
                });
                clusters[closest].push(pixel);
            });

            let changed = false;
            centroids.forEach((centroid, i) => {
                if (clusters[i].length === 0) return;
                const newCentroid = this._averagePoints(clusters[i]);
                if (!this._arraysEqual(centroid, newCentroid)) {
                    centroids[i] = newCentroid;
                    changed = true;
                }
            });

            if (!changed) break;
        }

        return centroids.map(c => c.map(v => Math.round(clamp(v, 0, 255))));
    }

    /**
     * K-Means++ initialization
     * @private
     */
    static _kMeansPlusPlus(pixels, k) {
        const centroids = [];

        const firstIdx = Math.floor(Math.random() * pixels.length);
        centroids.push([...pixels[firstIdx]]);

        for (let i = 1; i < k; i++) {
            const distances = pixels.map(pixel => {
                let minDist = Infinity;
                centroids.forEach(centroid => {
                    const dist = this._euclideanDistance(pixel, centroid);
                    if (dist < minDist) minDist = dist;
                });
                return minDist;
            });

            const totalDist = distances.reduce((a, b) => a + b, 0);
            let r = Math.random() * totalDist;

            for (let j = 0; j < pixels.length; j++) {
                r -= distances[j];
                if (r <= 0) {
                    centroids.push([...pixels[j]]);
                    break;
                }
            }
        }

        return centroids;
    }

    /**
     * Method 3: Histogram Method (Balanced)
     * @private
     */
    static _histogramMethod(pixels, count) {
        const bins = 8;
        const binSize = 256 / bins;
        const histogram = new Map();

        pixels.forEach(([r, g, b]) => {
            const key = `${Math.floor(r/binSize)},${Math.floor(g/binSize)},${Math.floor(b/binSize)}`;
            histogram.set(key, (histogram.get(key) || 0) + 1);
        });

        const sorted = Array.from(histogram.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, count)
            .map(([key]) => {
                const [r, g, b] = key.split(',').map(v => Number(v) * binSize + binSize/2);
                return [r, g, b];
            });

        return this._ensureColorCount(sorted, count);
    }

    // ===== PRIVATE UTILITY METHODS =====

    /**
     * Euclidean distance between two RGB colors
     * @private
     */
    static _euclideanDistance(a, b) {
        const dr = a[0] - b[0];
        const dg = a[1] - b[1];
        const db = a[2] - b[2];
        return dr * dr + dg * dg + db * db;
    }

    /**
     * Average of multiple points
     * @private
     */
    static _averagePoints(points) {
        const sum = points.reduce((acc, p) => [
            acc[0] + p[0],
            acc[1] + p[1],
            acc[2] + p[2]
        ], [0, 0, 0]);
        return sum.map(v => v / points.length);
    }

    /**
     * Check if two arrays are equal
     * @private
     */
    static _arraysEqual(a, b) {
        return a.length === b.length && a.every((v, i) => v === b[i]);
    }

    /**
     * Ensure we have exactly 'count' colors
     * @private
     */
    static _ensureColorCount(colors, target) {
        const result = [...colors];

        while (result.length < target) {
            const last = result[result.length - 1] || [128, 128, 128];
            const variation = 20 * (result.length + 1);
            result.push([
                clamp(last[0] + variation, 0, 255),
                clamp(last[1] - variation, 0, 255),
                clamp(last[2] + variation * 0.5, 0, 255)
            ]);
        }

        return result.slice(0, target);
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
