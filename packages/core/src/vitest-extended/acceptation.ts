import { expect, test } from 'vitest';

import type { Fn } from '../utils/bemedev/globals/types';
import { isFunction } from './isFunction';

/**
 * Creates baseline definition and function type tests for a given function.
 *
 * @param f - Target function to test of type {@linkcode Fn}.
 * @param _name - Optional custom name for test assertions.
 */
export const useTestFunctionAcceptation = (f: Fn, _name?: string) => {
  const name = _name ?? f.name;

  test(`#01 => ${name} is defined`, () => {
    expect(f).toBeDefined();
  });
  test(`#02 => ${name} is a function`, () => {
    const check = isFunction(f);
    expect(check).toBe(true);
  });
};

/**
 * Alias for {@linkcode useTestFunctionAcceptation}.
 */
export const useTFA = useTestFunctionAcceptation;
