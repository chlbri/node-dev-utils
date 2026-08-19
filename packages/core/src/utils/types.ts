export * from '#bemedev/globals/types';

/**
 * Normalizes a single value, array, null, or undefined into an array.
 *
 * @template `T` - Item type.
 *
 * @param value - Optional single value or array.
 *
 * @returns Array containing the value(s).
 */
export type ToArray_F = <T>(value?: T | T[]) => T[];
