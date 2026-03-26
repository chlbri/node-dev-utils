import sleep from '@bemedev/sleep';
import { expect, test, type TestOptions } from 'vitest';
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
 * Build a test with a done function with a timeout
 * @param invite The description of the test
 * @param fn Where you can test, Don't async this function
 * @param options Options for the test like TestAPI from vitest
 * @returns a vitest test
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
 * Build a test that fails with a done function with a timeout
 * @param invite The description of the test
 * @param fn Where you can test, Don't async this function
 * @param options Options for the test like TestAPI from vitest
 * @returns a vitest test
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
 * Build a concurrent test with a done function with a timeout
 * @param invite The description of the test
 * @param fn Where you can test, Don't async this function
 * @param options Options for the test like TestAPI from vitest
 * @returns a vitest test
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
