import { describe, expect, test } from 'vitest';
import { useTFA } from '../acceptation';
import { useEach } from '../each/pass';
import { partialCallO } from './partialCall';

describe('partialCallO', () => {
  describe('#0 => Acceptation', () => useTFA(partialCallO));

  describe('#1 => Acceptation 1', () => {
    const calc = ({ a, b }: { a: number; b: number }) => a + b;
    const tester = partialCallO(calc, { a: 1 });

    test('#1 => The created value is defined', () => {
      expect(tester).toBeDefined();
    });

    test('#2=> The created value is a function', () => {
      expect(typeof tester).toBe('function');
    });
  });

  describe('#2 => Workflows', () => {
    const calc = ({ a, b }: { a: number; b: number }) => a + b;

    const createTest = (a: number) => {
      const tester = partialCallO(calc, { a });
      const useTest = useEach(tester);

      return useTest;
    };

    describe('Workflow #1 => a = 1', () => {
      const useTest = createTest(1);

      useTest(
        {
          invite: '#1 => b = 1 ===>> a + b = 2',
          parameters: { b: 1 },
          expected: 2,
        },
        {
          invite: '#2 => b = 10 ===>> a + b = 11',
          parameters: { b: 10 },
          expected: 11,
        },
        {
          invite: '#3 => b = 4 ===>> a + b = 5',
          parameters: { b: 4 },
          expected: 5,
        },
      );
    });

    describe('Workflow #2 => a = 100', () => {
      const useTest = createTest(100);

      useTest(
        {
          invite: '#1 => b = 100 ===>> a + b = 200',
          parameters: { b: 100 },
          expected: 200,
        },
        {
          invite: '#2 => b = 1000 ===>> a + b = 1100',
          parameters: [{ b: 1000 }],
          expected: 1100,
        },
        {
          invite: '#3 => b = 457 ===>> a + b = 557',
          parameters: [{ b: 457 }],
          expected: 557,
        },
      );
    });
  });
});
