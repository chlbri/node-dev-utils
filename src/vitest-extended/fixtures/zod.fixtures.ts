import type { Fn } from '../bemedev/globals/types';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { useTFA } from '../acceptation';
import { TestReturn } from '../types';
import { transformZTF, type Any } from './zod';

// #region Types
type TFunc = ReturnType<typeof transformZTF<z.ZodString>>;
type TT = (zod: Any) => TestReturn<TFunc, []>;
// #endregion

export const useWorkflow = (createTest: TT) => {
  describe('#1 => string', () => {
    const useTest = createTest(z.string());

    useTest(
      {
        invite: '#1 => boolean fails',
        parameters: [true],
        expected: false,
      },
      { invite: '#2 => number fails', parameters: [5], expected: false },
      { invite: '#3 => string pass', parameters: ['str'], expected: true },
    );
  });

  describe('#2 => number', () => {
    const useTest = createTest(z.number());

    useTest(
      {
        invite: '#1 => boolean fails',
        parameters: [true],
        expected: false,
      },
      { invite: '#2 => number pass', parameters: [5], expected: true },
      {
        invite: '#3 => string fails',
        parameters: ['str'],
        expected: false,
      },
    );
  });

  describe('#3 => enum ["PILE", "FACE"]', () => {
    const useTest = createTest(z.enum(['PILE', 'FACE']));

    useTest(
      {
        invite: '#1 => boolean fails',
        parameters: [true],
        expected: false,
      },
      { invite: '#2 => number fails', parameters: [5], expected: false },
      {
        invite: '#3 => simple string fails',
        parameters: ['str'],
        expected: false,
      },
      {
        invite: '#4 => string PILE pass',
        parameters: ['PILE'],
        expected: true,
      },
      {
        invite: '#5 => string FACE pass',
        parameters: ['FACE'],
        expected: true,
      },
    );
  });

  describe('#3 => Tuple ["PILE", "FACE"]', () => {
    const useTest = createTest(z.enum(['PILE', 'FACE']));

    useTest(
      {
        invite: '#1 => boolean fails',
        parameters: [true],
        expected: false,
      },
      { invite: '#2 => number fails', parameters: [5], expected: false },
      {
        invite: '#3 => simple string fails',
        parameters: ['str'],
        expected: false,
      },
      {
        invite: '#4 => string PILE pass',
        parameters: ['PILE'],
        expected: true,
      },
      {
        invite: '#5 => string FACE pass',
        parameters: ['FACE'],
        expected: true,
      },
    );
  });
};

export const _useTFA = <F extends Fn>(f: F) => {
  describe('#0 => Accceptation', () => useTFA(f));

  describe('#1 => It create function', () => {
    const zod = z.string();
    const tester = f(zod);

    test('#1 => The created value is defined', () => {
      expect(tester).toBeDefined();
    });

    test('#2=> The created value is a function', () => {
      expect(typeof tester).toBe('function');
    });
  });
};
