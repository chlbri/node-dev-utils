import type { Fn } from '../../utils/bemedev/globals/types';
import type { Identity, NextFn, TestErrors } from '../types';

/**
 * Function computing an expected error message from function parameters.
 *
 * @template | {@linkcode Fn} `F` - Function type.
 */
export type ToError_F<F extends Fn> = (
  ...params: Parameters<F>
) => string | undefined;

/**
 * Runner function signature for error assertion test cases.
 *
 * @template | {@linkcode Fn} `F` - Target function type.
 * @template | {@linkcode NextFn} `T` - Transformer function type, defaults to {@linkcode Identity}.
 */
export type _UseErrorEach_F = <
  F extends Fn,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
  toError?: ToError_F<F>,
  ...cases: TestErrors<F>
) => void;

/**
 * Higher-order function returning a test runner for error assertion cases.
 *
 * @template | {@linkcode Fn} `F` - Target function type.
 * @template | {@linkcode NextFn} `T` - Transformer function type, defaults to {@linkcode Identity}.
 */
export type UseErrorEach_F = <
  F extends Fn,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
  toError?: ToError_F<F>,
) => Fn<TestErrors<F>, void>;
