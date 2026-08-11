# LXRN Framework

A comprehensive mathematical and utility framework for JavaScript.

## Features

- **Complete Math Utilities**: All mathematical operations, constants, and extensions
- **Core Utilities**: Wrapper functions for all JavaScript built-in objects
- **Matrix Operations**: Matrix algebra including determinant, inverse, transpose
- **Vector Operations**: 2D, 3D, 4D vector math
- **Quaternion Operations**: 3D rotation using quaternions
- **Complex Numbers**: Full complex number support
- **Statistical Functions**: Mean, median, variance, standard deviation, and more
- **Geometry Functions**: Area, volume, distance calculations
- **Noise Generation**: Perlin noise, simplex noise
- **Random Distributions**: Normal, exponential, poisson, binomial, etc.
- **String Manipulation**: CamelCase, snake_case, kebab-case, etc.
- **Array Utilities**: Chunk, unique, shuffle, groupBy, etc.
- **Date/Time Utilities**: Formatting, parsing, difference, etc.
- **Promise Utilities**: Retry, timeout, debounce, throttle, etc.
- **Caching System**: LRU cache, TTL cache, memoization
- **Event System**: EventEmitter with pub/sub
- **Configuration Management**: Config with environment variables
- **Debugging Utilities**: Logging, timing, counting

## Installation

```bash
npm install lxrn
```

Usage

```javascript
import LXRN from 'lxrn';

// Math utilities
console.log(LXRN.mathUtils.PI);
console.log(LXRN.mathUtils.clamp(5, 0, 10));

// Core utilities
console.log(LXRN.coreUtils.isArray([]));
console.log(LXRN.coreUtils.keys({ a: 1, b: 2 }));

// Or use enhanced global objects
console.log(Math.TWO_PI);
console.log(Math.clamp(5, 0, 10));
```

License

MIT
