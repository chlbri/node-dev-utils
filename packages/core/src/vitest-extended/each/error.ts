import { expect, test } from 'vitest';

import { identity } from '../identity';
import { toArrayVitest } from '../toArray';
import type { _UseErrorEach_F, UseErrorEach_F } from './error.types';

/**
 * Runs error assertions for asynchronous test cases concurrently.
 */
export const useErrorAsyncEachCases: _UseErrorEach_F = (
  f,
  transform = identity as any,
  toError = () => undefined,
  ...cases
) => {
  test.concurrent.each(toArrayVitest.error(cases))(
    '%s',
    async (_, args, _error) => {
      const actual = async () => {
        const out = await f(...args);
        return transform(out);
      };
      const check = _error === undefined;
      const error = check ? toError(...args) : _error;

      await expect(actual).rejects.toThrowError(error);
    },
  );
};

/**
 * Higher-order function returning a test runner for asynchronous error assertions.
 *
 * @param f - Function to test.
 * @param transform - Optional transformer applied to the resolved return value.
 * @param toError - Optional function computing expected error message from arguments.
 *
 * @returns Function accepting error test cases to execute.
 */
export const useErrorAsyncEach: UseErrorEach_F = (
  f,
  transform,
  toError,
) => {
  return (...cases) =>
    useErrorAsyncEachCases(f, transform, toError, ...cases);
};
