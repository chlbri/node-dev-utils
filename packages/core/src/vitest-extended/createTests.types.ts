import type { Fn } from './bemedev/globals/types';
import type { TestArgs, TestErrors } from './types';

type ReturnR<F extends Fn> = {
  acceptation: () => void;
  success: (...cases: TestArgs<F>) => () => void;
  fails: (...cases: TestErrors<F>) => () => void;
};

export type _CreateTests_F = <F0 extends any[], F1, F2 = F1>(
  func: Fn<F0, F1>,
  transform?: Fn<[Awaited<F1>], F2>,
  toError?: Fn<F0, string | undefined>,
  name?: string,
) => ReturnR<Fn<F0, F2>>;
