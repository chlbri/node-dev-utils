import type { Fn } from '../bemedev/globals/types';
import type { Identity, NextFn, TestErrors } from '../types';

export type ToError_F<F extends Fn> = (
  ...params: Parameters<F>
) => string | undefined;

export type _UseErrorEach_F = <
  F extends Fn,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
  toError?: ToError_F<F>,
  ...cases: TestErrors<F>
) => void;

export type UseErrorEach_F = <
  F extends Fn,
  T extends NextFn<F> = Identity<F>,
>(
  f: F,
  transform?: T,
  toError?: ToError_F<F>,
) => Fn<TestErrors<F>, void>;
