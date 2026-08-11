/**
 * @module ColorSpace
 * @description Color space utilities wrapper for LXRN framework.
 * Combines colorUtils + constants + mathUtils for color operations.
 * @author LXRN
 * @version 1.0.0
 */

import { 
    rgbToHex, hexToRgb,
    rgbToHsl, hslToRgb,
    rgbToHsv, hsvToRgb,
    rgbToCmyk, cmykToRgb,
    blendColors, darken, lighten,
    saturate, desaturate,
    complement, invert, grayscale, temperature
} from '../colorUtils.js';

import { clamp, lerp } from '../mathUtils.js';

import {
    COLOR_WHITE, COLOR_BLACK, COLOR_RED, COLOR_GREEN, COLOR_BLUE,
    COLOR_YELLOW, COLOR_CYAN, COLOR_MAGENTA, COLOR_ORANGE, COLOR_PURPLE,
    COLOR_PINK, COLOR_BROWN,
    HEX_WHITE, HEX_BLACK, HEX_RED, HEX_GREEN, HEX_BLUE,
    HEX_YELLOW, HEX_CYAN, HEX_MAGENTA, HEX_ORANGE, HEX_PURPLE,
    HEX_PINK, HEX_BROWN,
    CSS_WHITE, CSS_BLACK, CSS_RED, CSS_GREEN, CSS_BLUE,
    CSS_YELLOW, CSS_CYAN, CSS_MAGENTA, CSS_ORANGE, CSS_PURPLE,
    CSS_PINK, CSS_BROWN
} from '../constants.js';

export const ColorSpace = {
    // ===== COLOR SPACE NAMES =====
    SRGB: 'srgb',
    LINEAR: 'linear',
    HSL: 'hsl',
    HSV: 'hsv',
    CMYK: 'cmyk',
    LAB: 'lab',
    XYZ: 'xyz',

    // ===== CONSTANTS (dari constants.js) =====
    WHITE: COLOR_WHITE,
    BLACK: COLOR_BLACK,
    RED: COLOR_RED,
    GREEN: COLOR_GREEN,
    BLUE: COLOR_BLUE,
    YELLOW: COLOR_YELLOW,
    CYAN: COLOR_CYAN,
    MAGENTA: COLOR_MAGENTA,
    ORANGE: COLOR_ORANGE,
    PURPLE: COLOR_PURPLE,
    PINK: COLOR_PINK,
    BROWN: COLOR_BROWN,

    HEX_WHITE,
    HEX_BLACK,
    HEX_RED,
    HEX_GREEN,
    HEX_BLUE,
    HEX_YELLOW,
    HEX_CYAN,
    HEX_MAGENTA,
    HEX_ORANGE,
    HEX_PURPLE,
    HEX_PINK,
    HEX_BROWN,

    CSS_WHITE,
    CSS_BLACK,
    CSS_RED,
    CSS_GREEN,
    CSS_BLUE,
    CSS_YELLOW,
    CSS_CYAN,
    CSS_MAGENTA,
    CSS_ORANGE,
    CSS_PURPLE,
    CSS_PINK,
    CSS_BROWN,

    // ===== KONVERSI (dari colorUtils) =====
    rgbToHex,
    hexToRgb,
    rgbToHsl,
    hslToRgb,
    rgbToHsv,
    hsvToRgb,
    rgbToCmyk,
    cmykToRgb,

    // ===== BLENDING (dari colorUtils) =====
    blend: blendColors,
    blendNormal: (c1, c2, t) => blendColors(c1, c2, t, 'normal'),
    blendMultiply: (c1, c2, t) => blendColors(c1, c2, t, 'multiply'),
    blendScreen: (c1, c2, t) => blendColors(c1, c2, t, 'screen'),
    blendOverlay: (c1, c2, t) => blendColors(c1, c2, t, 'overlay'),

    // ===== MANIPULASI (dari colorUtils) =====
    darken,
    lighten,
    saturate,
    desaturate,
    complement,
    invert,
    grayscale,
    temperature,

    // ===== RGB <-> LINEAR =====
    srgbToLinear(c) {
        return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    },

    linearToSrgb(c) {
        return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    },

    rgbToLinear(r, g, b) {
        if (typeof r === 'object' && r.r !== undefined) {
            return {
                r: this.srgbToLinear(r.r),
                g: this.srgbToLinear(r.g),
                b: this.srgbToLinear(r.b)
            };
        }
        return {
            r: this.srgbToLinear(r),
            g: this.srgbToLinear(g),
            b: this.srgbToLinear(b)
        };
    },

    linearToRgb(r, g, b) {
        if (typeof r === 'object' && r.r !== undefined) {
            return {
                r: this.linearToSrgb(r.r),
                g: this.linearToSrgb(r.g),
                b: this.linearToSrgb(r.b)
            };
        }
        return {
            r: this.linearToSrgb(r),
            g: this.linearToSrgb(g),
            b: this.linearToSrgb(b)
        };
    },

    // ===== RGB <-> XYZ =====
    rgbToXyz(r, g, b) {
        if (typeof r === 'object' && r.r !== undefined) {
            const rr = r.r, gg = r.g, bb = r.b;
            return {
                x: 0.4124564 * rr + 0.3575761 * gg + 0.1804375 * bb,
                y: 0.2126729 * rr + 0.7151522 * gg + 0.0721750 * bb,
                z: 0.0193339 * rr + 0.1191920 * gg + 0.9503041 * bb
            };
        }
        return {
            x: 0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
            y: 0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
            z: 0.0193339 * r + 0.1191920 * g + 0.9503041 * b
        };
    },

    xyzToRgb(x, y, z) {
        return {
            r: clamp(3.2404542 * x - 1.5371385 * y - 0.4985314 * z, 0, 1),
            g: clamp(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z, 0, 1),
            b: clamp(0.0556434 * x - 0.2040259 * y + 1.0572252 * z, 0, 1)
        };
    },

    // ===== RGB <-> LAB =====
    rgbToLab(r, g, b) {
        const xyz = this.rgbToXyz(r, g, b);
        return this.xyzToLab(xyz.x, xyz.y, xyz.z);
    },

    labToRgb(l, a, b) {
        const xyz = this.labToXyz(l, a, b);
        return this.xyzToRgb(xyz.x, xyz.y, xyz.z);
    },

    xyzToLab(x, y, z) {
        const refX = 0.95047, refY = 1.00000, refZ = 1.08883;
        const fx = x / refX, fy = y / refY, fz = z / refZ;

        const f = (t) => t > 0.008856 ? Math.pow(t, 1/3) : 7.787 * t + 16 / 116;

        return {
            l: 116 * f(fy) - 16,
            a: 500 * (f(fx) - f(fy)),
            b: 200 * (f(fy) - f(fz))
        };
    },

    labToXyz(l, a, b) {
        const fy = (l + 16) / 116;
        const fx = fy + a / 500;
        const fz = fy - b / 200;

        const fInv = (t) => {
            const t3 = t * t * t;
            return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787;
        };

        return {
            x: fInv(fx) * 0.95047,
            y: fInv(fy) * 1.00000,
            z: fInv(fz) * 1.08883
        };
    },

    // ===== COLOR TEMPERATURE =====
    temperatureToRgb(temp) {
        let t = temp / 100;
        let r, g, b;

        if (t <= 66) {
            r = 255;
            g = 99.4708025861 * Math.log(t) - 161.1195681661;
            if (t <= 19) {
                b = 0;
            } else {
                b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
            }
        } else {
            r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
            g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
            b = 255;
        }

        return {
            r: clamp(r / 255, 0, 1),
            g: clamp(g / 255, 0, 1),
            b: clamp(b / 255, 0, 1)
        };
    },

    // ===== TONE MAPPING =====
    reinhardToneMapping(color, exposure = 1) {
        const r = color.r * exposure, g = color.g * exposure, b = color.b * exposure;
        return {
            r: r / (1 + r),
            g: g / (1 + g),
            b: b / (1 + b)
        };
    },

    acesFilmicToneMapping(color, exposure = 1) {
        const r = color.r * exposure, g = color.g * exposure, b = color.b * exposure;
        const a = 2.51, bC = 0.03, c = 2.43, d = 0.59, e = 0.14;

        return {
            r: clamp((r * (a * r + bC)) / (r * (c * r + d) + e), 0, 1),
            g: clamp((g * (a * g + bC)) / (g * (c * g + d) + e), 0, 1),
            b: clamp((b * (a * b + bC)) / (b * (c * b + d) + e), 0, 1)
        };
    },

    // ===== GAMMA =====
    gammaCorrect(color, gamma = 2.2) {
        return {
            r: Math.pow(color.r, 1 / gamma),
            g: Math.pow(color.g, 1 / gamma),
            b: Math.pow(color.b, 1 / gamma)
        };
    },

    gammaDecode(color, gamma = 2.2) {
        return {
            r: Math.pow(color.r, gamma),
            g: Math.pow(color.g, gamma),
            b: Math.pow(color.b, gamma)
        };
    },

    // ===== CONVERT ANY COLOR TO RGB (0-1) =====
    toRgb(color) {
        if (typeof color === 'number') {
            return {
                r: ((color >> 16) & 255) / 255,
                g: ((color >> 8) & 255) / 255,
                b: (color & 255) / 255
            };
        }

        if (typeof color === 'string') {
            if (color.startsWith('#')) {
                const hex = parseInt(color.slice(1), 16);
                return {
                    r: ((hex >> 16) & 255) / 255,
                    g: ((hex >> 8) & 255) / 255,
                    b: (hex & 255) / 255
                };
            }
            if (color.startsWith('rgb')) {
                const match = color.match(/\d+/g);
                if (match) {
                    return {
                        r: parseInt(match[0]) / 255,
                        g: parseInt(match[1]) / 255,
                        b: parseInt(match[2]) / 255
                    };
                }
            }
            // CSS color names
            const names = {
                'white': { r: 1, g: 1, b: 1 },
                'black': { r: 0, g: 0, b: 0 },
                'red': { r: 1, g: 0, b: 0 },
                'green': { r: 0, g: 1, b: 0 },
                'blue': { r: 0, g: 0, b: 1 },
                'yellow': { r: 1, g: 1, b: 0 },
                'cyan': { r: 0, g: 1, b: 1 },
                'magenta': { r: 1, g: 0, b: 1 },
                'orange': { r: 1, g: 0.647, b: 0 },
                'purple': { r: 0.502, g: 0, b: 0.502 },
                'pink': { r: 1, g: 0.753, b: 0.796 },
                'brown': { r: 0.647, g: 0.165, b: 0.165 }
            };
            if (names[color.toLowerCase()]) {
                return names[color.toLowerCase()];
            }
        }

        if (typeof color === 'object') {
            if (color.r !== undefined && color.g !== undefined && color.b !== undefined) {
                const r = color.r > 1 ? color.r / 255 : color.r;
                const g = color.g > 1 ? color.g / 255 : color.g;
                const b = color.b > 1 ? color.b / 255 : color.b;
                return { r, g, b };
            }
            if (color.h !== undefined && color.s !== undefined && color.l !== undefined) {
                const result = hslToRgb(color.h * 360, color.s * 100, color.l * 100);
                return { r: result.r / 255, g: result.g / 255, b: result.b / 255 };
            }
            if (color.h !== undefined && color.s !== undefined && color.v !== undefined) {
                const result = hsvToRgb(color.h * 360, color.s * 100, color.v * 100);
                return { r: result.r / 255, g: result.g / 255, b: result.b / 255 };
            }
            if (color.c !== undefined && color.m !== undefined && color.y !== undefined && color.k !== undefined) {
                const result = cmykToRgb(color.c * 100, color.m * 100, color.y * 100, color.k * 100);
                return { r: result.r / 255, g: result.g / 255, b: result.b / 255 };
            }
        }

        return { r: 1, g: 1, b: 1 };
    },

    // ===== CONVERT TO HEX =====
    toHex(color) {
        const rgb = this.toRgb(color);
        return rgbToHex(
            Math.round(rgb.r * 255),
            Math.round(rgb.g * 255),
            Math.round(rgb.b * 255)
        );
    },

    // ===== CONVERT TO HSL (0-1) =====
    toHSL(color) {
        const rgb = this.toRgb(color);
        const result = rgbToHsl(
            Math.round(rgb.r * 255),
            Math.round(rgb.g * 255),
            Math.round(rgb.b * 255)
        );
        return { h: result.h / 360, s: result.s / 100, l: result.l / 100 };
    },

    // ===== CONVERT TO HSV (0-1) =====
    toHSV(color) {
        const rgb = this.toRgb(color);
        const result = rgbToHsv(
            Math.round(rgb.r * 255),
            Math.round(rgb.g * 255),
            Math.round(rgb.b * 255)
        );
        return { h: result.h / 360, s: result.s / 100, v: result.v / 100 };
    },

    // ===== CONVERT TO CMYK (0-1) =====
    toCMYK(color) {
        const rgb = this.toRgb(color);
        const result = rgbToCmyk(
            Math.round(rgb.r * 255),
            Math.round(rgb.g * 255),
            Math.round(rgb.b * 255)
        );
        return { c: result.c / 100, m: result.m / 100, y: result.y / 100, k: result.k / 100 };
    },

    // ===== CONVERT TO CSS STRING =====
    toCSS(color) {
        const rgb = this.toRgb(color);
        return `rgb(${Math.round(rgb.r * 255)}, ${Math.round(rgb.g * 255)}, ${Math.round(rgb.b * 255)})`;
    },

    // ===== CONVERT TO RGBA STRING =====
    toRGBA(color, alpha = 1) {
        const rgb = this.toRgb(color);
        return `rgba(${Math.round(rgb.r * 255)}, ${Math.round(rgb.g * 255)}, ${Math.round(rgb.b * 255)}, ${alpha})`;
    },

    // ===== LERP BETWEEN TWO COLORS =====
    lerp(c1, c2, t) {
        const a = this.toRgb(c1);
        const b = this.toRgb(c2);
        const tClamp = clamp(t, 0, 1);
        return {
            r: lerp(a.r, b.r, tClamp),
            g: lerp(a.g, b.g, tClamp),
            b: lerp(a.b, b.b, tClamp)
        };
    },

    // ===== RANDOM COLOR =====
    random() {
        return {
            r: Math.random(),
            g: Math.random(),
            b: Math.random()
        };
    },

    // ===== RANDOM HEX =====
    randomHex() {
        return this.toHex(this.random());
    },

    // ===== RANDOM CSS =====
    randomCSS() {
        return this.toCSS(this.random());
    },

    // ===== IS COLOR VALID =====
    isValid(color) {
        try {
            this.toRgb(color);
            return true;
        } catch {
            return false;
        }
    },

    // ===== IS DARK =====
    isDark(color) {
        const rgb = this.toRgb(color);
        const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
        return luminance < 0.5;
    },

    // ===== IS LIGHT =====
    isLight(color) {
        return !this.isDark(color);
    }
};

export default ColorSpace;
