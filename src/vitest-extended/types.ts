import type { Fn, RuA } from './bemedev/globals/types';

type ReR<F extends Fn> = Awaited<ReturnType<F>>;
type TestFn<F extends Fn> = Fn<[ReR<F>, ReR<F>], void>;
type LengthOf<T> = T extends readonly any[] ? T['length'] : never;

export type SimpleParams<F extends Fn, P extends RuA = Parameters<F>> =
  LengthOf<P> extends 0
    ? { parameters?: never }
    : 1 extends LengthOf<P>
      ? undefined extends P[0]
        ? { parameters?: P | P[0] }
        : 0 extends LengthOf<P>
          ? { parameters?: P | P[0] }
          : { parameters: P | P[0] }
      : { parameters: P };

export type TestArgs<F extends Fn> = ({
  invite: string;
  expected: ReR<F>;
  /**
   * Optional test function for specific cases
   */
  test?: TestFn<F>;
} & SimpleParams<F>)[];

export type TestArgs2<F extends Fn> = [
  invite: string,
  parameters: Parameters<F>,
  expected: ReR<F>,
  /**
   * Optional test function for specific cases
   */
  test?: TestFn<F>,
][];

export type TestErrors<F extends Fn> = ({
  invite: string;
  error?: string;
} & SimpleParams<F>)[];

export type TestErrors2<F extends Fn> = [
  invite: string,
  parameters: Parameters<F>,
  error?: string,
][];

export interface ToArray_F {
  <T>(obj: any): T[];
  generic: <T>(obj: T) => T[];
}

export interface ToArrayVitest_F {
  <F extends Fn>(params: TestArgs<F>): TestArgs2<F>;
  error: <F extends Fn>(params: TestErrors<F>) => TestErrors2<F>;
}

export type TestReturn<F extends Fn, A extends TestArgs<F>> =
  LengthOf<A> extends 0 ? Fn<TestArgs<F>, void> : void;

export type TestDoneFunction = Fn<[context: () => boolean], void>;

export type ToCreateTestsWithImplementation_F = <F extends Fn>(
  f: F,
  implementation: { instanciation: () => Promise<F> | F; name: string },
) => (...cases: TestArgs<F>) => void;

export type FakeWaiter_F = (params: {
  ms?: number;
  times?: number;
  fake: boolean;
}) => Promise<void>;

export type NextFn<F extends Fn, R = any> = Fn<[ReturnType<F>], R>;

export type Identity<F extends Fn> = Fn<[ReturnType<F>], ReturnType<F>>;

export type ChainedFn<F extends Fn, T extends NextFn<F>> = Fn<
  Parameters<F>,
  ReR<T>
>;
