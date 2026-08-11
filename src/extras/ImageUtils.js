/**
 * @module ImageUtils
 * @description Image utility functions.
 * @author LXRN
 * @version 1.0.0
 */

import { createElement, warn } from '../coreUtils.js';
import { ColorSpace } from './ColorSpace.js';

let _canvas;

export class ImageUtils {
    static getDataURL(image, type = 'image/png') {
        if (/^data:/i.test(image.src)) {
            return image.src;
        }

        if (typeof HTMLCanvasElement === 'undefined') {
            return image.src;
        }

        let canvas;

        if (image instanceof HTMLCanvasElement) {
            canvas = image;
        } else {
            if (_canvas === undefined) _canvas = createElement('canvas');
            _canvas.width = image.width;
            _canvas.height = image.height;

            const context = _canvas.getContext('2d');

            if (image instanceof ImageData) {
                context.putImageData(image, 0, 0);
            } else {
                context.drawImage(image, 0, 0, image.width, image.height);
            }

            canvas = _canvas;
        }

        return canvas.toDataURL(type);
    }

    static sRGBToLinear(image) {
        if ((typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement) ||
            (typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement) ||
            (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap)) {

            const canvas = createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);

            const imageData = context.getImageData(0, 0, image.width, image.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i++) {
                data[i] = Math.floor(ColorSpace.srgbToLinear(data[i] / 255) * 255);
            }

            context.putImageData(imageData, 0, 0);
            return canvas;

        } else if (image.data) {
            const data = image.data.slice(0);

            for (let i = 0; i < data.length; i++) {
                if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
                    data[i] = Math.floor(ColorSpace.srgbToLinear(data[i] / 255) * 255);
                } else {
                    data[i] = ColorSpace.srgbToLinear(data[i]);
                }
            }

            return {
                data: data,
                width: image.width,
                height: image.height
            };

        } else {
            warn('ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.');
            return image;
        }
    }
}

export default ImageUtils;
