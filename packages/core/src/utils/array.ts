import type { ToArray_F } from './types';

/**
 * Normalizes a single value, array, null, or undefined into an array.
 *
 * @param value - Value to normalize.
 *
 * @returns Array containing the value, or empty array if null/undefined.
 */
export const toArray: ToArray_F = value => {
  const check1 = value === undefined || value === null;

  if (check1) return [];
  if (Array.isArray(value)) return value;

  return [value];
};

export { type ToArray_F };
