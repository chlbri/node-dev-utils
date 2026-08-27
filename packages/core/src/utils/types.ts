export * from '#bemedev/globals/types';

/**
 * Normalizes a single value, array, null, or undefined into an array.
 *
 * @template `T` - Item type.
 *
 * @param value - Optional single value or array of type {@linkcode SoA}.
 *
 * @returns Array containing the value(s).
 */
export type ToArray_F = <T>(value?: T | T[] | ReadonlyArray<T>) => T[];

/**
 * Single or Array (SoA) helper type. Represents a single value, an array of
 * values, or a readonly array of values.
 *
 * @template `T` - Item type.
 */
export type SoA<T> = T | T[] | ReadonlyArray<T>;
