/**
 * @module colorUtils
 * @description Color utilities for LXRN framework.
 * Provides comprehensive color manipulation including conversions between
 * RGB, HSL, HSV, HEX, CMYK, and color operations like blending, darkening,
 * lightening, and color temperature calculations.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

export function rgbToHex(r, g, b) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.colorUtils.rgbToHex: r, g, and b must be numbers');
  }
  if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
    throw new Error('LXRN.colorUtils.rgbToHex: r, g, and b must be between 0 and 255');
  }
  const hex = (r << 16) | (g << 8) | b;
  return '#' + hex.toString(16).padStart(6, '0');
}

export function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('LXRN.colorUtils.hexToRgb: hex must be a string');
  }
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('LXRN.colorUtils.hexToRgb: Invalid hex color format');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

export function rgbToHsl(r, g, b) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.colorUtils.rgbToHsl: r, g, and b must be numbers');
  }
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = 2 + (b - r) / diff;
    } else {
      h = 4 + (r - g) / diff;
    }
    h = h / 6;
    if (h < 0) h += 1;
  }
  
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h, s, l) {
  if (typeof h !== 'number' || typeof s !== 'number' || typeof l !== 'number') {
    throw new TypeError('LXRN.colorUtils.hslToRgb: h, s, and l must be numbers');
  }
  h = h / 360;
  s = s / 100;
  l = l / 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function rgbToHsv(r, g, b) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.colorUtils.rgbToHsv: r, g, and b must be numbers');
  }
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  
  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = 2 + (b - r) / diff;
    } else {
      h = 4 + (r - g) / diff;
    }
    h = h / 6;
    if (h < 0) h += 1;
  }
  
  return { h: h * 360, s: s * 100, v: v * 100 };
}

export function hsvToRgb(h, s, v) {
  if (typeof h !== 'number' || typeof s !== 'number' || typeof v !== 'number') {
    throw new TypeError('LXRN.colorUtils.hsvToRgb: h, s, and v must be numbers');
  }
  h = h / 360;
  s = s / 100;
  v = v / 100;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  let r, g, b;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }
  
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function rgbToCmyk(r, g, b) {
  if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.colorUtils.rgbToCmyk: r, g, and b must be numbers');
  }
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  const k = 1 - Math.max(r, g, b);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  
  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

export function cmykToRgb(c, m, y, k) {
  if (typeof c !== 'number' || typeof m !== 'number' || typeof y !== 'number' || typeof k !== 'number') {
    throw new TypeError('LXRN.colorUtils.cmykToRgb: c, m, y, and k must be numbers');
  }
  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;
  
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

export function blendColors(color1, color2, t = 0.5, mode = 'normal') {
  if (typeof color1 !== 'object' || typeof color2 !== 'object') {
    throw new TypeError('LXRN.colorUtils.blendColors: color1 and color2 must be color objects');
  }
  if (typeof t !== 'number' || t < 0 || t > 1) {
    throw new Error('LXRN.colorUtils.blendColors: t must be between 0 and 1');
  }
  
  const r1 = color1.r, g1 = color1.g, b1 = color1.b;
  const r2 = color2.r, g2 = color2.g, b2 = color2.b;
  
  let r, g, b;
  
  switch (mode) {
    case 'normal':
      r = r1 + (r2 - r1) * t;
      g = g1 + (g2 - g1) * t;
      b = b1 + (b2 - b1) * t;
      break;
    case 'multiply':
      r = r1 * r2 / 255;
      g = g1 * g2 / 255;
      b = b1 * b2 / 255;
      break;
    case 'screen':
      r = 255 - ((255 - r1) * (255 - r2)) / 255;
      g = 255 - ((255 - g1) * (255 - g2)) / 255;
      b = 255 - ((255 - b1) * (255 - b2)) / 255;
      break;
    case 'overlay':
      r = r1 < 128 ? (2 * r1 * r2 / 255) : (255 - 2 * (255 - r1) * (255 - r2) / 255);
      g = g1 < 128 ? (2 * g1 * g2 / 255) : (255 - 2 * (255 - g1) * (255 - g2) / 255);
      b = b1 < 128 ? (2 * b1 * b2 / 255) : (255 - 2 * (255 - b1) * (255 - b2) / 255);
      break;
    default:
      throw new Error('LXRN.colorUtils.blendColors: Invalid blend mode');
  }
  
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

export function darken(color, amount) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.darken: color must be a color object');
  }
  if (typeof amount !== 'number' || amount < 0 || amount > 1) {
    throw new Error('LXRN.colorUtils.darken: amount must be between 0 and 1');
  }
  const hsl = rgbToHsl(color.r, color.g, color.b);
  hsl.l = Math.max(0, hsl.l - amount * 100);
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

export function lighten(color, amount) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.lighten: color must be a color object');
  }
  if (typeof amount !== 'number' || amount < 0 || amount > 1) {
    throw new Error('LXRN.colorUtils.lighten: amount must be between 0 and 1');
  }
  const hsl = rgbToHsl(color.r, color.g, color.b);
  hsl.l = Math.min(100, hsl.l + amount * 100);
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

export function saturate(color, amount) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.saturate: color must be a color object');
  }
  if (typeof amount !== 'number' || amount < 0 || amount > 1) {
    throw new Error('LXRN.colorUtils.saturate: amount must be between 0 and 1');
  }
  const hsl = rgbToHsl(color.r, color.g, color.b);
  hsl.s = Math.min(100, hsl.s + amount * 100);
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

export function desaturate(color, amount) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.desaturate: color must be a color object');
  }
  if (typeof amount !== 'number' || amount < 0 || amount > 1) {
    throw new Error('LXRN.colorUtils.desaturate: amount must be between 0 and 1');
  }
  const hsl = rgbToHsl(color.r, color.g, color.b);
  hsl.s = Math.max(0, hsl.s - amount * 100);
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

export function complement(color) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.complement: color must be a color object');
  }
  const hsl = rgbToHsl(color.r, color.g, color.b);
  hsl.h = (hsl.h + 180) % 360;
  return hslToRgb(hsl.h, hsl.s, hsl.l);
}

export function invert(color) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.invert: color must be a color object');
  }
  return {
    r: 255 - color.r,
    g: 255 - color.g,
    b: 255 - color.b
  };
}

export function grayscale(color) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.grayscale: color must be a color object');
  }
  const gray = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
  return { r: Math.round(gray), g: Math.round(gray), b: Math.round(gray) };
}

export function temperature(color) {
  if (typeof color !== 'object') {
    throw new TypeError('LXRN.colorUtils.temperature: color must be a color object');
  }
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  
  const temp = 2000 + (r / (b + 0.0001)) * 3000;
  return Math.min(20000, Math.max(1000, temp));
}

export const colorUtils = {
  rgbToHex,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmyk,
  cmykToRgb,
  blendColors,
  darken,
  lighten,
  saturate,
  desaturate,
  complement,
  invert,
  grayscale,
  temperature
};
