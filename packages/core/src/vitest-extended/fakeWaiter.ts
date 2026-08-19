import type { VitestUtils } from 'vitest';

import { sleep } from '#utils/sleep';

/**
 * Function creating a waiter using Vitest utilities.
 *
 * @param vi - Vitest utilities object of type {@linkcode VitestUtils}.
 *
 * @returns An async function accepting delay `ms` and repeat `times`.
 */
export type FakeWaiter1_F = (
  vi: VitestUtils,
) => (ms?: number, times?: number) => Promise<void>;

/**
 * Function creating a waiter with a fixed default delay.
 *
 * @param vi - Vitest utilities object of type {@linkcode VitestUtils}.
 * @param ms - Delay in milliseconds.
 *
 * @returns A function taking index and times that returns a test invite and execution callback tuple.
 */
export type FakeWaiter2_F = (
  vi: VitestUtils,
  ms?: number,
) => (index: number, times?: number) => [string, () => Promise<void>];

/**
 * Function creating a waiter accepting index, delay, and repeat count.
 *
 * @param vi - Vitest utilities object of type {@linkcode VitestUtils}.
 *
 * @returns A function taking index, ms, and times that returns a test invite and execution callback tuple.
 */
export type FakeWaiter3_F = (
  vi: VitestUtils,
) => (
  index: number,
  ms?: number,
  times?: number,
) => [string, () => Promise<void>];

/**
 * Composite fake waiter function with helper properties.
 */
export type FakeWaiter = FakeWaiter1_F & {
  withDefaultDelay: FakeWaiter2_F;
  all: FakeWaiter3_F;
};

const buildInvite = (index = 0, ms = 0, times = 1) =>
  `#${index} Wait for ${ms}ms times ${times}`;

/**
 * Creates a timer-advancing waiter function that supports both fake timers and real delays.
 *
 * @param vi - Vitest utilities instance of type {@linkcode VitestUtils}.
 *
 * @returns An asynchronous waiting function.
 */
export const createFakeWaiter: FakeWaiter = vi => {
  return async (ms = 0, times = 1) => {
    const check = vi.isFakeTimers();
    for (let i = 0; i < times; i++) {
      if (check) await vi.advanceTimersByTimeAsync(ms);
      else await sleep(ms);
    }
  };
};

createFakeWaiter.withDefaultDelay = (vi, ms = 0) => {
  return (index, times = 1) => {
    const invite = buildInvite(index, ms, times);
    const fn = () => createFakeWaiter(vi)(ms, times);
    return [invite, fn] as const;
  };
};

createFakeWaiter.all = vi => {
  return (index, ms = 0, times = 1) => {
    const invite = buildInvite(index, ms, times);
    const fn = () => createFakeWaiter(vi)(ms, times);
    return [invite, fn] as const;
  };
};
