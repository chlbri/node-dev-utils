import { describe, expect, it, vi } from 'vitest';
import { createFakeWaiter } from './fakeWaiter';

describe('fakeWaiter', () => {
  it('#01 => should wait for the specified time', async () => {
    const waiter = createFakeWaiter(vi);
    const start = Date.now();
    await waiter(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  it('02 => should wait multiple times', async () => {
    vi.useFakeTimers();
    const waiter = createFakeWaiter(vi);
    const start = Date.now();
    await waiter(100, 3);
    const end = Date.now();
    expect(end - start).toBe(300);
    vi.useRealTimers();
  });

  it('#03 => should use fake timers if available', async () => {
    vi.useFakeTimers();
    const waiter = createFakeWaiter(vi);
    const start = Date.now();
    await waiter(100);
    const end = Date.now();
    expect(end - start).toBe(100);
    vi.useRealTimers();
  });

  it('#04 => should build invite with default delay', () => {
    const [invite] = createFakeWaiter.withDefaultDelay(vi, 100)(1, 2);
    expect(invite).toBe('#1 Wait for 100ms times 2');
  });

  it('#05 => should build invite for all', () => {
    const [invite] = createFakeWaiter.all(vi)(1, 100, 2);
    expect(invite).toBe('#1 Wait for 100ms times 2');
  });

  it(...createFakeWaiter.all(vi)(6, 100, 2));
  it(...createFakeWaiter.withDefaultDelay(vi, 100)(7, 1));
});
