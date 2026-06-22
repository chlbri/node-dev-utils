import { expect } from 'vitest';

export const identity = <T>(value: T) => value;

export const defaultEquality = (value: any, expected: any) => {
  const checkArray = Array.isArray(value) && Array.isArray(expected);

  if (checkArray) {
    return expect(value.sort()).toStrictEqual(expected.sort());
  }
  return expect(value).toStrictEqual(expected);
};
