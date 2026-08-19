import type { Undefiny } from '../utils/bemedev/globals/types';
export type { Undefiny };

/**
 * Type guard to check if a value is defined (not `null` and not `undefined`).
 *
 * @template `T` - Type of the value to test.
 *
 * @param value - The value to check of type {@linkcode Undefiny}.
 *
 * @returns `true` if `value` is defined, otherwise `false`.
 */
export const isDefined = <T>(value?: Undefiny<T>): value is T => {
  return value !== undefined && value !== null;
};
