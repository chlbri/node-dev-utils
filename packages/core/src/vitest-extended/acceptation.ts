import type { Fn } from './bemedev/globals/types';
import { expect, test } from 'vitest';
import { isFunction } from './isFunction';

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
 * For test only
 * useTestFunctionAcceptation
 */
export const useTFA = useTestFunctionAcceptation;
