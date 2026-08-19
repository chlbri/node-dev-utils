import { expect, test, type TestOptions } from 'vitest';

import { sleep } from '#utils/sleep';

import type { TestDoneFunction } from './types';

const useDone = (ms = 0) => {
  let executed = false;
  const done = () => (executed = true);

  const testDone = async () => {
    await sleep(ms);
    expect(executed).toBe(true);
  };

  return { done, testDone };
};

const min100 = (ms = 0) => Math.max(100, ms);

// #region Preparation
const getTimeout = (options?: TestOptions | number) => {
  if (typeof options === 'number') return min100(options);
  return min100(options?.timeout);
};

const objectify = (
  options?: TestOptions | number,
): [TestOptions, number] => {
  const _timeout = getTimeout(options);
  const timeout = _timeout + 100;

  let _options = { timeout };
  if (!(typeof options === 'number')) {
    _options = { ...options, timeout };
  }

  return [_options, _timeout];
};
// #endregion

/**
 * Build a test with a done callback function and a timeout.
 *
 * @param invite - The description of the test.
 * @param fn - Test callback function of type {@linkcode TestDoneFunction}.
 * @param options - Timeout in milliseconds or test options of type {@linkcode TestOptions}.
 *
 * @returns A Vitest test execution result.
 */
export const doneTest = (
  invite: string,
  fn: TestDoneFunction,
  options: number | TestOptions = 100,
) => {
  const [_options, ms] = objectify(options);

  return test(invite, _options, () => {
    const { done, testDone } = useDone(ms);
    fn(done);
    return testDone();
  });
};

/**
 * Build a test expected to fail with a done callback function and a timeout.
 *
 * @param invite - The description of the test.
 * @param fn - Test callback function of type {@linkcode TestDoneFunction}.
 * @param options - Timeout in milliseconds or test options of type {@linkcode TestOptions}.
 *
 * @returns A Vitest test execution result.
 */
doneTest.fails = (
  invite: string,
  fn: TestDoneFunction,
  options: number | TestOptions = 100,
) => {
  const [_options, ms] = objectify(options);

  return test.fails(invite, _options, () => {
    const { done, testDone } = useDone(ms);
    fn(done);
    return testDone();
  });
};

/**
 * Build a concurrent test with a done callback function and a timeout.
 *
 * @param invite - The description of the test.
 * @param fn - Test callback function of type {@linkcode TestDoneFunction}.
 * @param options - Timeout in milliseconds or test options of type {@linkcode TestOptions}.
 *
 * @returns A Vitest test execution result.
 */
doneTest.concurrent = (
  invite: string,
  fn: TestDoneFunction,
  options: number | TestOptions = 100,
) => {
  const [_options, ms] = objectify(options);

  return test.concurrent(invite, _options, () => {
    const { done, testDone } = useDone(ms);
    fn(done);
    return testDone();
  });
};
