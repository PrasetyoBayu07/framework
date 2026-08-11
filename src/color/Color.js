/**
 * @module Color
 * @description Color class using ColorSpace and ColorManagement.
 * Provides a comprehensive color object with manipulation methods.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import { clamp, euclideanModulo, lerp } from '../core/mathUtils.js';
import { warn } from '../core/coreUtils.js';
import {
    COLOR_WHITE, COLOR_BLACK, COLOR_RED, COLOR_GREEN, COLOR_BLUE,
    COLOR_YELLOW, COLOR_CYAN, COLOR_MAGENTA, COLOR_ORANGE, COLOR_PURPLE,
    COLOR_PINK, COLOR_BROWN, COLOR_GRAY, COLOR_LIGHT_GRAY, COLOR_DARK_GRAY,
    HEX_WHITE, HEX_BLACK, HEX_RED, HEX_GREEN, HEX_BLUE,
    HEX_YELLOW, HEX_CYAN, HEX_MAGENTA, HEX_ORANGE, HEX_PURPLE,
    HEX_PINK, HEX_BROWN, HEX_GRAY, HEX_LIGHT_GRAY, HEX_DARK_GRAY,
    CSS_WHITE, CSS_BLACK, CSS_RED, CSS_GREEN, CSS_BLUE,
    CSS_YELLOW, CSS_CYAN, CSS_MAGENTA, CSS_ORANGE, CSS_PURPLE,
    CSS_PINK, CSS_BROWN,
    DEFAULT_ALPHA,
    SRGBColorSpace,
    LinearSRGBColorSpace
} from '../core/constants.js';
import ColorSpace from './ColorSpace.js';
import ColorManagement from './ColorManagement.js';

const _colorKeywords = {
    'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF,
    'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF, 'beige': 0xF5F5DC,
    'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD,
    'blue': 0x0000FF, 'blueviolet': 0x8A2BE2, 'brown': 0xA52A2A,
    'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00,
    'chocolate': 0xD2691E, 'coral': 0xFF7F50, 'cornflowerblue': 0x6495ED,
    'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF,
    'darkblue': 0x00008B, 'darkcyan': 0x008B8B, 'darkgoldenrod': 0xB8860B,
    'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9,
    'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B, 'darkolivegreen': 0x556B2F,
    'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000,
    'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F, 'darkslateblue': 0x483D8B,
    'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1,
    'darkviolet': 0x9400D3, 'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF,
    'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF,
    'firebrick': 0xB22222, 'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22,
    'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF,
    'gold': 0xFFD700, 'goldenrod': 0xDAA520, 'gray': 0x808080,
    'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080,
    'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4, 'indianred': 0xCD5C5C,
    'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C,
    'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080,
    'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1,
    'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE,
    'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
    'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000,
    'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE,
    'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC, 'mediumvioletred': 0xC71585,
    'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1,
    'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD, 'navy': 0x000080,
    'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23,
    'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE,
    'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD,
    'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399,
    'red': 0xFF0000, 'rosybrown': 0xBC8F8F, 'royalblue': 0x4169E1,
    'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460,
    'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE, 'sienna': 0xA0522D,
    'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD,
    'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C,
    'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347,
    'turquoise': 0x40E0D0, 'violet': 0xEE82EE, 'wheat': 0xF5DEB3,
    'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00,
    'yellowgreen': 0x9ACD32
};

const _hslA = { h: 0, s: 0, l: 0 };
const _hslB = { h: 0, s: 0, l: 0 };
const _color = new Color();

function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
}

export class Color {
    /**
     * Create a new Color instance.
     * @param {number|string|Object} r - Red value (0-1), hex string, or color object.
     * @param {number} [g] - Green value (0-1).
     * @param {number} [b] - Blue value (0-1).
     */
    constructor(r, g, b) {
        this.isColor = true;
        this.r = 1;
        this.g = 1;
        this.b = 1;
        this.a = DEFAULT_ALPHA;
        this._colorSpace = ColorManagement.workingColorSpace;
        return this.set(r, g, b);
    }

    // ===== STATIC =====
    static get isColor() { return true; }

    // ===== COLOR SPACE =====
    get colorSpace() {
        return this._colorSpace;
    }

    set colorSpace(value) {
        if (!ColorManagement.spaces[value]) {
            throw new Error(`LXRN.Color: Unknown color space: ${value}`);
        }
        const converted = ColorManagement.workingToColorSpace(
            { r: this.r, g: this.g, b: this.b },
            value
        );
        this.r = converted.r;
        this.g = converted.g;
        this.b = converted.b;
        this._colorSpace = value;
    }

    // ===== SET METHODS =====
    set(r, g, b) {
        if (g === undefined && b === undefined) {
            const value = r;
            if (value && value.isColor) {
                this.copy(value);
            } else if (typeof value === 'number') {
                this.setHex(value);
            } else if (typeof value === 'string') {
                this.setStyle(value);
            } else if (typeof value === 'object') {
                this.setObject(value);
            }
        } else {
            this.setRGB(r, g, b);
        }
        return this;
    }

    setScalar(scalar) {
        if (typeof scalar !== 'number') {
            throw new TypeError('LXRN.Color.setScalar: scalar must be a number');
        }
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;
        return this;
    }

    setHex(hex, colorSpace = SRGBColorSpace) {
        if (typeof hex !== 'number') {
            throw new TypeError('LXRN.Color.setHex: hex must be a number');
        }
        hex = Math.floor(hex);
        const r = ((hex >> 16) & 255) / 255;
        const g = ((hex >> 8) & 255) / 255;
        const b = (hex & 255) / 255;
        return this.setRGB(r, g, b, colorSpace);
    }

    setRGB(r, g, b, colorSpace = SRGBColorSpace) {
        if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
            throw new TypeError('LXRN.Color.setRGB: r, g, and b must be numbers');
        }
        const working = ColorManagement.colorSpaceToWorking(
            { r, g, b },
            colorSpace
        );
        this.r = working.r;
        this.g = working.g;
        this.b = working.b;
        this._colorSpace = ColorManagement.workingColorSpace;
        return this;
    }

    setHSL(h, s, l, colorSpace = SRGBColorSpace) {
        if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
            throw new TypeError('LXRN.Color.setHSL: h, s, and l must be numbers');
        }
        h = euclideanModulo(h, 1);
        s = clamp(s, 0, 1);
        l = clamp(l, 0, 1);

        const temp = { r: 0, g: 0, b: 0 };
        if (s === 0) {
            temp.r = temp.g = temp.b = l;
        } else {
            const p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
            const q = (2 * l) - p;
            temp.r = hue2rgb(q, p, h + 1 / 3);
            temp.g = hue2rgb(q, p, h);
            temp.b = hue2rgb(q, p, h - 1 / 3);
        }

        const working = ColorManagement.colorSpaceToWorking(temp, colorSpace);
        this.r = working.r;
        this.g = working.g;
        this.b = working.b;
        this._colorSpace = ColorManagement.workingColorSpace;
        return this;
    }

    setObject(obj) {
        if (typeof obj !== 'object' || obj === null) {
            throw new TypeError('LXRN.Color.setObject: obj must be an object');
        }
        if (obj.r !== undefined && obj.g !== undefined && obj.b !== undefined) {
            const space = obj.colorSpace || SRGBColorSpace;
            return this.setRGB(obj.r, obj.g, obj.b, space);
        }
        if (obj.h !== undefined && obj.s !== undefined && obj.l !== undefined) {
            const space = obj.colorSpace || SRGBColorSpace;
            return this.setHSL(obj.h, obj.s, obj.l, space);
        }
        if (obj.h !== undefined && obj.s !== undefined && obj.v !== undefined) {
            const rgb = ColorSpace.hsvToRgb(obj.h * 360, obj.s * 100, obj.v * 100);
            const space = obj.colorSpace || SRGBColorSpace;
            return this.setRGB(rgb.r / 255, rgb.g / 255, rgb.b / 255, space);
        }
        if (obj.c !== undefined && obj.m !== undefined && obj.y !== undefined && obj.k !== undefined) {
            const rgb = ColorSpace.cmykToRgb(obj.c * 100, obj.m * 100, obj.y * 100, obj.k * 100);
            const space = obj.colorSpace || SRGBColorSpace;
            return this.setRGB(rgb.r / 255, rgb.g / 255, rgb.b / 255, space);
        }
        return this;
    }

    setStyle(style, colorSpace = SRGBColorSpace) {
        if (typeof style !== 'string') {
            throw new TypeError('LXRN.Color.setStyle: style must be a string');
        }

        function handleAlpha(string) {
            if (string === undefined) return;
            if (parseFloat(string) < 1) {
                warn('Color: Alpha component of ' + style + ' will be ignored.');
            }
        }

        let m;

        if (m = /^(\w+)\(([^\)]*)\)/.exec(style)) {
            let color;
            const name = m[1];
            const components = m[2];

            switch (name) {
                case 'rgb':
                case 'rgba':
                    if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        handleAlpha(color[4]);
                        return this.setRGB(
                            Math.min(255, parseInt(color[1], 10)) / 255,
                            Math.min(255, parseInt(color[2], 10)) / 255,
                            Math.min(255, parseInt(color[3], 10)) / 255,
                            colorSpace
                        );
                    }
                    if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        handleAlpha(color[4]);
                        return this.setRGB(
                            Math.min(100, parseInt(color[1], 10)) / 100,
                            Math.min(100, parseInt(color[2], 10)) / 100,
                            Math.min(100, parseInt(color[3], 10)) / 100,
                            colorSpace
                        );
                    }
                    break;

                case 'hsl':
                case 'hsla':
                    if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                        handleAlpha(color[4]);
                        return this.setHSL(
                            parseFloat(color[1]) / 360,
                            parseFloat(color[2]) / 100,
                            parseFloat(color[3]) / 100,
                            colorSpace
                        );
                    }
                    break;

                default:
                    warn('Color: Unknown color model ' + style);
            }
        } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
            const hex = m[1];
            const size = hex.length;

            if (size === 3) {
                return this.setRGB(
                    parseInt(hex.charAt(0), 16) / 15,
                    parseInt(hex.charAt(1), 16) / 15,
                    parseInt(hex.charAt(2), 16) / 15,
                    colorSpace
                );
            } else if (size === 6) {
                return this.setHex(parseInt(hex, 16), colorSpace);
            } else {
                warn('Color: Invalid hex color ' + style);
            }
        } else if (style && style.length > 0) {
            return this.setColorName(style, colorSpace);
        }

        return this;
    }

    setColorName(style, colorSpace = SRGBColorSpace) {
        if (typeof style !== 'string') {
            throw new TypeError('LXRN.Color.setColorName: style must be a string');
        }
        const hex = _colorKeywords[style.toLowerCase()];
        if (hex !== undefined) {
            this.setHex(hex, colorSpace);
        } else {
            warn('Color: Unknown color ' + style);
        }
        return this;
    }

    // ===== COPY / CLONE =====
    clone() {
        return new Color().copy(this);
    }

    copy(color) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.copy: color must be a color object');
        }
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a !== undefined ? color.a : DEFAULT_ALPHA;
        this._colorSpace = color._colorSpace || ColorManagement.workingColorSpace;
        return this;
    }

    copySRGBToLinear(color) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.copySRGBToLinear: color must be a color object');
        }
        this.r = ColorSpace.srgbToLinear(color.r);
        this.g = ColorSpace.srgbToLinear(color.g);
        this.b = ColorSpace.srgbToLinear(color.b);
        this._colorSpace = LinearSRGBColorSpace;
        return this;
    }

    copyLinearToSRGB(color) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.copyLinearToSRGB: color must be a color object');
        }
        this.r = ColorSpace.linearToSrgb(color.r);
        this.g = ColorSpace.linearToSrgb(color.g);
        this.b = ColorSpace.linearToSrgb(color.b);
        this._colorSpace = SRGBColorSpace;
        return this;
    }

    convertSRGBToLinear() {
        return this.copySRGBToLinear(this);
    }

    convertLinearToSRGB() {
        return this.copyLinearToSRGB(this);
    }

    // ===== GET METHODS =====
    getHex(colorSpace = SRGBColorSpace) {
        const rgb = this.getRGB({}, colorSpace);
        return Math.round(clamp(rgb.r * 255, 0, 255)) * 65536 +
            Math.round(clamp(rgb.g * 255, 0, 255)) * 256 +
            Math.round(clamp(rgb.b * 255, 0, 255));
    }

    getHexString(colorSpace = SRGBColorSpace) {
        return ('000000' + this.getHex(colorSpace).toString(16)).slice(-6);
    }

    getHSL(target, colorSpace = SRGBColorSpace) {
        if (typeof target !== 'object' || target === null) {
            throw new TypeError('LXRN.Color.getHSL: target must be an object');
        }
        const rgb = this.getRGB({}, colorSpace);
        const r = rgb.r, g = rgb.g, b = rgb.b;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let hue, saturation;
        const lightness = (min + max) / 2.0;

        if (min === max) {
            hue = 0;
            saturation = 0;
        } else {
            const delta = max - min;
            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
            switch (max) {
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;
            }
            hue /= 6;
        }

        target.h = hue;
        target.s = saturation;
        target.l = lightness;
        return target;
    }

    getRGB(target, colorSpace = SRGBColorSpace) {
        if (typeof target !== 'object' || target === null) {
            throw new TypeError('LXRN.Color.getRGB: target must be an object');
        }
        const converted = ColorManagement.workingToColorSpace(
            { r: this.r, g: this.g, b: this.b },
            colorSpace
        );
        target.r = converted.r;
        target.g = converted.g;
        target.b = converted.b;
        return target;
    }

    getStyle(colorSpace = SRGBColorSpace) {
        const rgb = this.getRGB({}, colorSpace);
        if (this.a < 1) {
            return `rgba(${Math.round(rgb.r * 255)},${Math.round(rgb.g * 255)},${Math.round(rgb.b * 255)},${this.a.toFixed(2)})`;
        }
        if (colorSpace !== SRGBColorSpace) {
            return `color(${colorSpace} ${rgb.r.toFixed(3)} ${rgb.g.toFixed(3)} ${rgb.b.toFixed(3)})`;
        }
        return `rgb(${Math.round(rgb.r * 255)},${Math.round(rgb.g * 255)},${Math.round(rgb.b * 255)})`;
    }

    // ===== OPERATIONS =====
    offsetHSL(h, s, l) {
        if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
            throw new TypeError('LXRN.Color.offsetHSL: h, s, and l must be numbers');
        }
        this.getHSL(_hslA);
        return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);
    }

    add(color) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.add: color must be a color object');
        }
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    }

    addColors(color1, color2) {
        if (typeof color1 !== 'object' || color1.r === undefined ||
            typeof color2 !== 'object' || color2.r === undefined) {
            throw new TypeError('LXRN.Color.addColors: color1 and color2 must be color objects');
        }
        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;
        return this;
    }

    addScalar(s) {
        if (typeof s !== 'number') {
            throw new TypeError('LXRN.Color.addScalar: s must be a number');
        }
        this.r += s;
        this.g += s;
        this.b += s;
        return this;
    }

    sub(color) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.sub: color must be a color object');
        }
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);
        return this;
    }

    multiply(color) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.multiply: color must be a color object');
        }
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;
        return this;
    }

    multiplyScalar(s) {
        if (typeof s !== 'number') {
            throw new TypeError('LXRN.Color.multiplyScalar: s must be a number');
        }
        this.r *= s;
        this.g *= s;
        this.b *= s;
        return this;
    }

    lerp(color, alpha) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.lerp: color must be a color object');
        }
        if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
            throw new Error('LXRN.Color.lerp: alpha must be between 0 and 1');
        }
        const target = color.clone().convertToWorking();
        this.r += (target.r - this.r) * alpha;
        this.g += (target.g - this.g) * alpha;
        this.b += (target.b - this.b) * alpha;
        return this;
    }

    lerpColors(color1, color2, alpha) {
        if (typeof color1 !== 'object' || color1.r === undefined ||
            typeof color2 !== 'object' || color2.r === undefined) {
            throw new TypeError('LXRN.Color.lerpColors: color1 and color2 must be color objects');
        }
        if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
            throw new Error('LXRN.Color.lerpColors: alpha must be between 0 and 1');
        }
        this.r = color1.r + (color2.r - color1.r) * alpha;
        this.g = color1.g + (color2.g - color1.g) * alpha;
        this.b = color1.b + (color2.b - color1.b) * alpha;
        return this;
    }

    lerpHSL(color, alpha) {
        if (typeof color !== 'object' || color.r === undefined) {
            throw new TypeError('LXRN.Color.lerpHSL: color must be a color object');
        }
        if (typeof alpha !== 'number' || alpha < 0 || alpha > 1) {
            throw new Error('LXRN.Color.lerpHSL: alpha must be between 0 and 1');
        }
        this.getHSL(_hslA);
        color.getHSL(_hslB);
        const h = lerp(_hslA.h, _hslB.h, alpha);
        const s = lerp(_hslA.s, _hslB.s, alpha);
        const l = lerp(_hslA.l, _hslB.l, alpha);
        this.setHSL(h, s, l);
        return this;
    }

    // ===== TRANSFORMATIONS =====
    setFromVector3(v) {
        if (typeof v !== 'object' || v.x === undefined) {
            throw new TypeError('LXRN.Color.setFromVector3: v must be a Vector3-like object');
        }
        this.r = v.x;
        this.g = v.y;
        this.b = v.z;
        return this;
    }

    applyMatrix3(m) {
        if (typeof m !== 'object') {
            throw new TypeError('LXRN.Color.applyMatrix3: m must be a Matrix3-like object');
        }
        const r = this.r,
            g = this.g,
            b = this.b;
        const e = m.elements || m._m;
        if (e.length === 9) {
            this.r = e[0] * r + e[3] * g + e[6] * b;
            this.g = e[1] * r + e[4] * g + e[7] * b;
            this.b = e[2] * r + e[5] * g + e[8] * b;
        } else {
            this.r = e[0][0] * r + e[0][1] * g + e[0][2] * b;
            this.g = e[1][0] * r + e[1][1] * g + e[1][2] * b;
            this.b = e[2][0] * r + e[2][1] * g + e[2][2] * b;
        }
        return this;
    }

    // ===== CONVERSION =====
    convertTo(colorSpace) {
        if (this._colorSpace === colorSpace) return this;
        const converted = ColorManagement.workingToColorSpace(
            { r: this.r, g: this.g, b: this.b },
            colorSpace
        );
        this.r = converted.r;
        this.g = converted.g;
        this.b = converted.b;
        this._colorSpace = colorSpace;
        return this;
    }

    convertToWorking() {
        return this.convertTo(ColorManagement.workingColorSpace);
    }

    // ===== UTILITY =====
    equals(c) {
        if (typeof c !== 'object' || c.r === undefined) {
            return false;
        }
        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);
    }

    fromArray(array, offset = 0) {
        if (!Array.isArray(array) && !(array instanceof Float32Array)) {
            throw new TypeError('LXRN.Color.fromArray: array must be an array');
        }
        if (typeof offset !== 'number' || offset < 0) {
            throw new Error('LXRN.Color.fromArray: offset must be a non-negative number');
        }
        this.r = array[offset];
        this.g = array[offset + 1];
        this.b = array[offset + 2];
        return this;
    }

    toArray(array = [], offset = 0) {
        if (!Array.isArray(array) && !(array instanceof Float32Array)) {
            throw new TypeError('LXRN.Color.toArray: array must be an array');
        }
        if (typeof offset !== 'number' || offset < 0) {
            throw new Error('LXRN.Color.toArray: offset must be a non-negative number');
        }
        array[offset] = this.r;
        array[offset + 1] = this.g;
        array[offset + 2] = this.b;
        return array;
    }

    fromBufferAttribute(attribute, index) {
        if (typeof attribute !== 'object' || typeof attribute.getX !== 'function') {
            throw new TypeError('LXRN.Color.fromBufferAttribute: attribute must be a BufferAttribute-like object');
        }
        if (typeof index !== 'number' || index < 0) {
            throw new Error('LXRN.Color.fromBufferAttribute: index must be a non-negative number');
        }
        this.r = attribute.getX(index);
        this.g = attribute.getY(index);
        this.b = attribute.getZ(index);
        return this;
    }

    toJSON() {
        return {
            hex: this.getHex(),
            colorSpace: this._colorSpace,
            alpha: this.a
        };
    }

    fromJSON(json) {
        if (typeof json === 'number') {
            this.setHex(json);
        } else if (typeof json === 'object' && json !== null) {
            this.setHex(json.hex);
            if (json.colorSpace) {
                this._colorSpace = json.colorSpace;
            }
            if (json.alpha !== undefined) {
                this.a = json.alpha;
            }
        }
        return this;
    }

    // ===== ITERATOR =====
    *[Symbol.iterator]() {
        yield this.r;
        yield this.g;
        yield this.b;
    }
}

// ===== STATIC =====
Color.isColor = true;
Color.NAMES = _colorKeywords;

export default Color;
