import { isDefined } from './isDefined';
import type { ToArrayVitest_F, ToArray_F } from './types';

/**
 * Transforms test case arguments into the tuple format expected by Vitest each runners.
 */
export const toArrayVitest: ToArrayVitest_F = args => {
  return args.map(({ expected, invite, parameters: params, test }) => {
    const parameters = toArray(params);
    return [invite, parameters, expected, test] as any;
  });
};

toArrayVitest.error = args => {
  return args.map(({ invite, parameters: params, error }) => {
    const parameters = toArray.generic(params);
    return [invite, parameters, error] as any;
  });
};

/**
 * Normalizes a single value, array, null, or undefined into an array.
 */
export const toArray: ToArray_F = obj => {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    const isNotDefined = !isDefined(obj);
    if (isNotDefined) return [];

    return [obj];
  }
};

toArray.generic = obj => toArray(obj) as any;
