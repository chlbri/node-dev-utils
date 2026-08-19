import { beforeAll, vi } from 'vitest';

import type { Fn } from '../utils/bemedev/globals/types';
import { useTFA } from './acceptation';
import type { _CreateTests_F } from './createTests.types';
import { useErrorAsyncEach } from './each/error';
import { useEachAsync } from './each/pass';
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
 * Creates structured test suites with acceptation, success, and failure runners.
 *
 * @template `F0` - Function parameters array type.
 * @template `F1` - Function return value type.
 * @template `F2` - Transformed return value type, defaults to `F1`.
 *
 * @param func - Function under test of type {@linkcode Fn}.
 * @param args - Configuration options.
 * @param args.transform - Optional output transformer of type {@linkcode Fn}.
 * @param args.toError - Optional error mapping function of type {@linkcode Fn}.
 *
 * @returns Test suite object with acceptation, success, and fails methods.
 *
 * @example
 * ```ts
 * const useTests = createTests(add);
 * useTests.success({
 *   invite: 'For : 1,2,3',
 *   parameters: [[1, 2, 3]],
 *   expected: 6,
 * })();
 * ```
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

/**
 * Creates structured test suites with an async instantiation or mock implementation.
 *
 * @template `F0` - Function parameters array type.
 * @template `F1` - Function return value type.
 * @template `F2` - Transformed return value type, defaults to `F1`.
 *
 * @param f - Fallback or default function of type {@linkcode Fn}.
 * @param options - Configuration options for instantiation and formatting.
 * @param options.instanciation - Async function returning the target implementation.
 * @param options.name - Name identifier for test descriptions.
 * @param options.transform - Optional output transformer.
 * @param options.toError - Optional error mapping function.
 *
 * @returns Test suite object with acceptation, success, and fails methods.
 */
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
