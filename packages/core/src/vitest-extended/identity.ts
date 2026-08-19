import { expect } from 'vitest';

/**
 * Identity function returning its argument unmodified.
 *
 * @template `T` - Type of the input value.
 *
 * @param value - The input value.
 *
 * @returns The unchanged `value` of type `T`.
 */
export const identity = <T>(value: T) => value;

/**
 * Default equality comparison using Vitest's `expect.toStrictEqual`. Sorts
 * arrays prior to comparison.
 *
 * @param value - The actual received value.
 * @param expected - The expected value.
 *
 * @returns The Vitest assertion result.
 */
export const defaultEquality = (value: any, expected: any) => {
  const checkArray = Array.isArray(value) && Array.isArray(expected);

  if (checkArray) {
    return expect(value.sort()).toStrictEqual(expected.sort());
  }
  return expect(value).toStrictEqual(expected);
};
