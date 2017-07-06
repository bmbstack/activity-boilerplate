/**
 * @function
 * @memberof module:utils
 * @param {number} origin 原数值
 * @param {number} [num] 保留位数
 * @returns {number}
 * @example
 * import { toFixed } from 'path/to/utils/number';
 * const origin = 3.1415926;
 * toFixed(origin, 2); // output 3.14
 */
export function toFixed(origin ,num = 2) {
    let digit = Math.pow(10, num);
    return Math.round(origin * digit) / digit;
}
