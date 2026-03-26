import sleep from '@bemedev/sleep';
import type { VitestUtils } from 'vitest';

export type FakeWaiter1_F = (
  vi: VitestUtils,
) => (ms?: number, times?: number) => Promise<void>;

export type FakeWaiter2_F = (
  vi: VitestUtils,
  ms?: number,
) => (index: number, times?: number) => [string, () => Promise<void>];

export type FakeWaiter3_F = (
  vi: VitestUtils,
) => (
  index: number,
  ms?: number,
  times?: number,
) => [string, () => Promise<void>];

export type FakeWaiter = FakeWaiter1_F & {
  withDefaultDelay: FakeWaiter2_F;
  all: FakeWaiter3_F;
};

const buildInvite = (index = 0, ms = 0, times = 1) =>
  `#${index} Wait for ${ms}ms times ${times}`;

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
