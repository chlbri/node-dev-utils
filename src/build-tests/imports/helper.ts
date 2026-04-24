import { expect } from 'vitest';
import type { Fn } from '../../vitest-extended/bemedev/globals/types';
import { customImport } from '../import';

export type Helper_F = (args: {
  path?: string;
  fn: string;
}) => Promise<void>;

export const helperFn = async <T extends Fn = Fn>({
  path,
  fn,
}: {
  path?: string;
  fn: string;
}) => {
  const _fn = await customImport<T>({ path, fn: m => m[fn] });
  expect(_fn).toBeDefined();
  expect(_fn).toBeTypeOf('function');
};
