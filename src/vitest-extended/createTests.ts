import { beforeAll, vi } from 'vitest';
import { useTFA } from './acceptation';
import type { Fn } from './bemedev/globals/types';
import type { _CreateTests_F } from './createTests.types';
import { useErrorAsyncEach } from './each/error';
import {
  useEachAsync,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type useEach,
} from './each/pass';
import { toStringFlat } from './toStringFlat';

export type { _CreateTests_F };

const _create: _CreateTests_F = (func, transform, toError, name) => {
  return {
    acceptation: () => useTFA(func, name),

    fails: (...cases) => {
      const length = cases.length;

      return () => {
        const useTests = useErrorAsyncEach(
          func,
          transform as any,
          toError,
        );

        const _cases: any = cases.map(
          ({ invite: _invite, parameters, error }, index) => {
            const invite = `#${toStringFlat(index + 1, length)} => ${_invite}`;
            const out = { invite, parameters, error };
            return out;
          },
        );

        return useTests(..._cases);
      };
    },

    success: (...cases) => {
      const length = cases.length;
      return () => {
        const useTests = useEachAsync(func as any, transform);

        const _cases: any = cases.map(
          ({ invite: _invite, parameters, expected, test }, index) => {
            const invite = `#${toStringFlat(index + 1, length)} => ${_invite}`;
            const out = { invite, parameters, expected, test };
            return out;
          },
        );

        return useTests(..._cases);
      };
    },
  };
};

/**
 * Creates tests for function in a better way
 * NB : We use strict-equality, {@link useEach|see}
 * @param library The test library
 * @param f The function to test
 * @param
 * @returns A test.each like function to tests many cases
 *
 * NB: If the first argument is an array, wrap the value in another array,
 *
 * @example
 * // ./add.ts
 *export const add = (args: string[]) => args.reduce(
 *    (acc, value) => {
 *      acc+=value
 *      return acc;
 *    },
 *  0)
 *
 *
 * // .add.test.ts
 *import { createTests } from '@bemedev/vitest-extended';
 *import { add } from './add';
 *
 *const useTests = createTests(add)
 *
 *useTests(
 *   {
 *     invite: 'For : 1,2,3,4,5,6,7,8,9',
 *     parameters: [[1, 2, 3, 4, 5, 6, 7, 8, 9]], // like this!
 *   }
 *)
 *
 */
export const createTests = <F0 extends any[], F1, F2 = F1>(
  func: Fn<F0, F1>,
  args?: {
    transform?: Fn<[Awaited<F1>], F2>;
    toError?: Fn<F0, string | undefined>;
  },
) => {
  const { transform, toError } = args || {};
  return _create(func, transform, toError);
};

createTests.withImplementation = <F0 extends any[], F1, F2 = F1>(
  f: Fn<NoInfer<F0>, NoInfer<F1>>,
  {
    instanciation,
    name,
    transform,
    toError,
  }: {
    instanciation: () => Promise<Fn<F0, F1>> | Fn<F0, F1>;
    name: string;
    transform?: Fn<[Awaited<F1>], F2>;
    toError?: Fn<F0, string | undefined>;
  },
) => {
  const func = vi.fn(f);

  if (instanciation) {
    beforeAll(async () => {
      const impl = await instanciation();
      func.mockImplementation(impl);
    });
  }

  return _create(func, transform, toError, name);
};

createTests.withoutImplementation = createTests;
