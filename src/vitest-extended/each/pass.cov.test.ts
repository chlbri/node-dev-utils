import sleep from '@bemedev/sleep';
import { describe, expect } from 'vitest';
import { createTests } from '../createTests';
import { useEach, useEachAsync } from './pass';

describe('#01 => Specific tests', () => {
  describe('#01 => Sync', () => {
    const func = (a: number, b: number) => a + b;
    const tests = useEach(func, x => x.toLocaleString());

    tests(
      {
        invite: '1 + 2',
        parameters: [1, 2],
        expected: '3',
      },
      {
        invite: '1 + 2, with specific test',
        parameters: [1, 2],
        expected: '31',
        test: (value, expected) => {
          expect(value + 1).toBe(expected);
        },
      },
    );
  });

  describe('#02 => Async', () => {
    const func = async (a: number, b: number) => {
      await sleep(1);
      return a + b;
    };
    const tests = useEachAsync(func, x => x.toLocaleString());

    tests(
      {
        invite: '1 + 2',
        parameters: [1, 2],
        expected: '3',
      },
      {
        invite: '1 + 2, with specific test',
        parameters: [1, 2],
        expected: '31',
        test: (value, expected) => {
          expect(value + 1).toBe(expected);
        },
      },
    );
  });

  describe('#01 => With createTests', () => {
    const func = (a: number, b: number) => a + b;
    const { success } = createTests(func, {
      transform: x => x.toLocaleString(),
    });

    describe(
      '#01 => Success Tests',
      success(
        {
          invite: '1 + 2',
          parameters: [1, 2],
          expected: '3',
        },
        {
          invite: '1 + 2, with specific test',
          parameters: [1, 2],
          expected: '31',
          test: (value, expected) => {
            expect(value + 1).toBe(expected);
          },
        },
      ),
    );
  });
});
