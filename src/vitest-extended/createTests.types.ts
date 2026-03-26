import type { Fn } from './bemedev/globals/types';
import type { ToError_F } from './each/error.types';
import type {
  ChainedFn,
  Identity,
  NextFn,
  TestArgs,
  TestErrors,
} from './types';

type ReturnR<F extends Fn> = {
  acceptation: () => void;
  success: (...cases: TestArgs<F>) => () => void;
  fails: (...cases: TestErrors<F>) => () => void;
};

export type _CreateTests_F = <
  F extends Fn,
  T extends NextFn<F> = Identity<F>,
>(
  func: F,
  transform?: T,
  toError?: ToError_F<F>,
  name?: string,
) => ReturnR<ChainedFn<F, T>>;
