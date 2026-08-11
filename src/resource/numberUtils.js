/**
 * @module numberUtils
 * @description Number manipulation utilities for LXRN framework.
 * Provides comprehensive number operations including formatting, rounding,
 * precision control, prime number operations, GCD, LCM, factorial,
 * Fibonacci, and various number theory functions.
 * @author LXRN (Luxarion)
 * @version 1.0.0
 */

import { clamp } from './mathUtils.js';

export function roundTo(value, decimalPlaces = 0) {
  if (typeof value !== 'number' || typeof decimalPlaces !== 'number') {
    throw new TypeError('LXRN.numberUtils.roundTo: value and decimalPlaces must be numbers');
  }
  if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) {
    throw new Error('LXRN.numberUtils.roundTo: decimalPlaces must be a non-negative integer');
  }
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export function floorTo(value, decimalPlaces = 0) {
  if (typeof value !== 'number' || typeof decimalPlaces !== 'number') {
    throw new TypeError('LXRN.numberUtils.floorTo: value and decimalPlaces must be numbers');
  }
  if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) {
    throw new Error('LXRN.numberUtils.floorTo: decimalPlaces must be a non-negative integer');
  }
  const factor = Math.pow(10, decimalPlaces);
  return Math.floor(value * factor) / factor;
}

export function ceilTo(value, decimalPlaces = 0) {
  if (typeof value !== 'number' || typeof decimalPlaces !== 'number') {
    throw new TypeError('LXRN.numberUtils.ceilTo: value and decimalPlaces must be numbers');
  }
  if (decimalPlaces < 0 || !Number.isInteger(decimalPlaces)) {
    throw new Error('LXRN.numberUtils.ceilTo: decimalPlaces must be a non-negative integer');
  }
  const factor = Math.pow(10, decimalPlaces);
  return Math.ceil(value * factor) / factor;
}

export function isEven(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.isEven: value must be a number');
  }
  return value % 2 === 0;
}

export function isOdd(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.isOdd: value must be a number');
  }
  return value % 2 !== 0;
}

export function isPrime(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.isPrime: value must be a number');
  }
  if (value < 2 || !Number.isInteger(value)) return false;
  if (value === 2) return true;
  if (value % 2 === 0) return false;
  const sqrt = Math.sqrt(value);
  for (let i = 3; i <= sqrt; i += 2) {
    if (value % i === 0) return false;
  }
  return true;
}

export function nextPrime(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.nextPrime: value must be a number');
  }
  if (!Number.isInteger(value)) {
    value = Math.floor(value);
  }
  let num = value + 1;
  while (!isPrime(num)) {
    num++;
  }
  return num;
}

export function prevPrime(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.prevPrime: value must be a number');
  }
  if (!Number.isInteger(value)) {
    value = Math.ceil(value);
  }
  if (value <= 2) return 2;
  let num = value - 1;
  while (!isPrime(num)) {
    num--;
  }
  return num;
}

export function gcd(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.numberUtils.gcd: a and b must be numbers');
  }
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

export function lcm(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('LXRN.numberUtils.lcm: a and b must be numbers');
  }
  a = Math.abs(a);
  b = Math.abs(b);
  if (a === 0 || b === 0) return 0;
  return (a * b) / gcd(a, b);
}

export function gcdMultiple(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('LXRN.numberUtils.gcdMultiple: numbers must be an array');
  }
  if (numbers.length === 0) return 0;
  let result = Math.abs(numbers[0]);
  for (let i = 1; i < numbers.length; i++) {
    result = gcd(result, numbers[i]);
  }
  return result;
}

export function lcmMultiple(numbers) {
  if (!Array.isArray(numbers)) {
    throw new TypeError('LXRN.numberUtils.lcmMultiple: numbers must be an array');
  }
  if (numbers.length === 0) return 0;
  let result = Math.abs(numbers[0]);
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }
  return result;
}

export function factorial(n) {
  if (typeof n !== 'number') {
    throw new TypeError('LXRN.numberUtils.factorial: n must be a number');
  }
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('LXRN.numberUtils.factorial: n must be a non-negative integer');
  }
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function fibonacci(n) {
  if (typeof n !== 'number') {
    throw new TypeError('LXRN.numberUtils.fibonacci: n must be a number');
  }
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('LXRN.numberUtils.fibonacci: n must be a non-negative integer');
  }
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

export function isPerfectNumber(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.isPerfectNumber: value must be a number');
  }
  if (value < 2 || !Number.isInteger(value)) return false;
  let sum = 0;
  for (let i = 1; i <= value / 2; i++) {
    if (value % i === 0) sum += i;
  }
  return sum === value;
}

export function isArmstrongNumber(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.isArmstrongNumber: value must be a number');
  }
  if (value < 0 || !Number.isInteger(value)) return false;
  const digits = String(value).split('').map(Number);
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
  return sum === value;
}

export function digitSum(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.digitSum: value must be a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.digitSum: value must be an integer');
  }
  return String(Math.abs(value)).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

export function digitProduct(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.digitProduct: value must be a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.digitProduct: value must be an integer');
  }
  const digits = String(Math.abs(value)).split('').map(Number);
  return digits.reduce((acc, digit) => acc * digit, 1);
}

export function reverseNumber(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.reverseNumber: value must be a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.reverseNumber: value must be an integer');
  }
  const reversed = parseInt(String(Math.abs(value)).split('').reverse().join(''));
  return value < 0 ? -reversed : reversed;
}

export function isPalindrome(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.isPalindrome: value must be a number');
  }
  if (!Number.isInteger(value)) return false;
  const str = String(Math.abs(value));
  return str === str.split('').reverse().join('');
}

export function divisors(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.divisors: value must be a number');
  }
  if (value < 1 || !Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.divisors: value must be a positive integer');
  }
  const result = [];
  for (let i = 1; i <= Math.sqrt(value); i++) {
    if (value % i === 0) {
      result.push(i);
      if (i !== value / i) {
        result.push(value / i);
      }
    }
  }
  return result.sort((a, b) => a - b);
}

export function primeFactors(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.primeFactors: value must be a number');
  }
  if (value < 2 || !Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.primeFactors: value must be an integer greater than 1');
  }
  const factors = [];
  let num = value;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  if (num > 1) factors.push(num);
  return factors;
}

export function toBinary(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.toBinary: value must be a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.toBinary: value must be an integer');
  }
  return value.toString(2);
}

export function toOctal(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.toOctal: value must be a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.toOctal: value must be an integer');
  }
  return value.toString(8);
}

export function toHex(value) {
  if (typeof value !== 'number') {
    throw new TypeError('LXRN.numberUtils.toHex: value must be a number');
  }
  if (!Number.isInteger(value)) {
    throw new Error('LXRN.numberUtils.toHex: value must be an integer');
  }
  return value.toString(16).toUpperCase();
}

export function fromBinary(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.numberUtils.fromBinary: str must be a string');
  }
  return parseInt(str, 2);
}

export function fromOctal(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.numberUtils.fromOctal: str must be a string');
  }
  return parseInt(str, 8);
}

export function fromHex(str) {
  if (typeof str !== 'string') {
    throw new TypeError('LXRN.numberUtils.fromHex: str must be a string');
  }
  return parseInt(str, 16);
}

export const numberUtils = {
  clamp,
  roundTo,
  floorTo,
  ceilTo,
  isEven,
  isOdd,
  isPrime,
  nextPrime,
  prevPrime,
  gcd,
  lcm,
  gcdMultiple,
  lcmMultiple,
  factorial,
  fibonacci,
  isPerfectNumber,
  isArmstrongNumber,
  digitSum,
  digitProduct,
  reverseNumber,
  isPalindrome,
  divisors,
  primeFactors,
  toBinary,
  toOctal,
  toHex,
  fromBinary,
  fromOctal,
  fromHex
};
