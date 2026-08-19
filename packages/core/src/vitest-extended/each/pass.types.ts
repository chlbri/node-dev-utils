import type { Fn } from '../../utils/bemedev/globals/types';
import type { ChainedFn, Identity, NextFn, TestArgs } from '../types';

/**
 * Runner function signature for synchronous parameterized tests.
 *
 * @template | {@linkcode Fn} `F` - Source function under test.
 * @template | {@linkcode NextFn} `T` - Output transformer type, defaults to {@linkcode Identity}.
 */
export type _UseEach_F = <F extends Fn, T extends NextFn<F> = Identity<F>>(
  f: F,
  transform?: T,
  ...cases: TestArgs<ChainedFn<F, T>>
) => void;

/**
 * Higher-order function returning a test runner for synchronous parameterized tests.
 *
 * @template | {@linkcode Fn} `F` - Source function under test.
 * @template | {@linkcode NextFn} `T` - Output transformer type, defaults to {@linkcode Identity}.
 */
export type UseEach_F = <F extends Fn, T extends NextFn<F> = Identity<F>>(
  f: F,
  transform?: T,
) => (...cases: TestArgs<ChainedFn<F, T>>) => void;

/**
 * Runner function signature for asynchronous parameterized tests.
 *
 * @template | {@linkcode Fn} `F` - Source async function under test.
 * @template | {@linkcode NextFn} `T` - Output transformer type, defaults to {@linkcode Identity}.
 */
export type _UseAsyncEach_F = <
  F extends Fn<any, Promise<any>>,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
  ...cases: TestArgs<ChainedFn<F, T>>
) => void;

/**
 * Higher-order function returning a test runner for asynchronous parameterized tests.
 *
 * @template | {@linkcode Fn} `F` - Source async function under test.
 * @template | {@linkcode NextFn} `T` - Output transformer type, defaults to {@linkcode Identity}.
 */
export type UseAsyncEach_F = <
  F extends Fn<any, Promise<any>>,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
) => (...cases: TestArgs<ChainedFn<F, T>>) => void;
