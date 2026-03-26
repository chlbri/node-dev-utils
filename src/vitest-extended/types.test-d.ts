import type { Fn } from './bemedev/globals/types';
import { expectTypeOf } from 'vitest';
import type { SimpleParams } from './types';

type HSP<T extends any[]> = SimpleParams<Fn<T>>;

// #region Test 1
type Params1 = [string, ...number[]];
type FN1 = HSP<Params1>;

expectTypeOf<FN1>().toEqualTypeOf<{
  parameters?: string | Params1;
}>();
// #endregion

// #region Test 2
type Params2 = [];
type FN2 = HSP<Params2>;

expectTypeOf<FN2>().toEqualTypeOf<{
  parameters?: never;
}>();
// #endregion

// #region Test 3
type Params3 = [boolean?];
type FN3 = HSP<Params3>;

expectTypeOf<FN3>().toEqualTypeOf<{
  parameters?: boolean | Params3;
}>();
// #endregion

// #region Test 4
type Params4 = [object?, ...string[]];
type FN4 = HSP<Params4>;

expectTypeOf<FN4>().toEqualTypeOf<{
  parameters?: object | Params4;
}>();
// #endregion

// #region Test 5
type Params5 = string[];
type FN5 = HSP<Params5>;

expectTypeOf<FN5>().toEqualTypeOf<{
  parameters?: string | Params5;
}>();
// #endregion

// #region Test 6
type Params6 = [...params: string[]];
type FN6 = HSP<Params6>;

expectTypeOf<FN6>().toEqualTypeOf<{
  parameters?: string | Params5;
}>();
// #endregion
