import type { Fn } from '../utils/bemedev/globals/types';
import type { TestArgs, TestErrors } from './types';

/**
 * Return interface for test suite generator containing acceptation, success, and fails methods.
 *
 * @template | {@linkcode Fn} `F` - Target test function type.
 */
export type ReturnR<F extends Fn> = {
  acceptation: () => void;
  success: (...cases: TestArgs<F>) => () => void;
  fails: (...cases: TestErrors<F>) => () => void;
};

/**
 * Internal function signature for creating a test suite structure.
 *
 * @template `F0` - Function parameters array type.
 * @template `F1` - Function return value type.
 * @template `F2` - Transformed return type, defaults to `F1`.
 */
export type _CreateTests_F = <F0 extends any[], F1, F2 = F1>(
  func: Fn<F0, F1>,
  transform?: Fn<[Awaited<F1>], F2>,
  toError?: Fn<F0, string | undefined>,
  name?: string,
) => ReturnR<Fn<F0, F2>>;
