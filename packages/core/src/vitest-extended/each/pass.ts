import { test } from 'vitest';

import { defaultEquality, identity } from '../identity';
import { toArrayVitest } from '../toArray';
import type {
  _UseAsyncEach_F,
  _UseEach_F,
  UseAsyncEach_F,
  UseEach_F,
} from './pass.types';

// #region Sync
const useEachCases: _UseEach_F = (
  func,
  transform = identity as any,
  ...cases
) => {
  test.concurrent.each(toArrayVitest(cases))(
    '%s',
    (_, args, expected, test = defaultEquality) => {
      const value = transform(func(...args));
      return test(value, expected);
    },
  );
};

/**
 * Runs parameterized tests with strict equality checks across multiple cases.
 *
 * @param func - Function to test.
 * @param transform - Optional transformer applied to the return value.
 *
 * @returns Function accepting test cases to execute.
 */
export const useEach: UseEach_F = (func, transform) => {
  return (...cases) => useEachCases(func, transform, ...cases);
};
// #endregion

// #region Async
const useEachAsyncCases: _UseAsyncEach_F = (
  f,
  transform = identity as any,
  ...cases
) => {
  test.concurrent.each(toArrayVitest(cases))(
    '%s',
    async (_, args, expected, test = defaultEquality) => {
      const _value = await f(...args);
      const value = await transform(_value);
      return test(value, expected);
    },
  );
};

/**
 * Runs asynchronous parameterized tests with strict equality checks across multiple cases.
 *
 * @param func - Async function to test.
 * @param transform - Optional transformer applied to the resolved return value.
 *
 * @returns Function accepting test cases to execute.
 */
export const useEachAsync: UseAsyncEach_F = (func, transform) => {
  return (...cases) => useEachAsyncCases(func, transform, ...cases);
};

// #endregion
