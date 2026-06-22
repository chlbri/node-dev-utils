import type { Fn } from '../bemedev/globals/types';
import type { ChainedFn, Identity, NextFn, TestArgs } from '../types';

export type _UseEach_F = <F extends Fn, T extends NextFn<F> = Identity<F>>(
  f: F,
  transform?: T,
  ...cases: TestArgs<ChainedFn<F, T>>
) => void;

export type UseEach_F = <F extends Fn, T extends NextFn<F> = Identity<F>>(
  f: F,
  transform?: T,
) => (...cases: TestArgs<ChainedFn<F, T>>) => void;

export type _UseAsyncEach_F = <
  F extends Fn<any, Promise<any>>,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
  ...cases: TestArgs<ChainedFn<F, T>>
) => void;

export type UseAsyncEach_F = <
  F extends Fn<any, Promise<any>>,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
) => (...cases: TestArgs<ChainedFn<F, T>>) => void;
