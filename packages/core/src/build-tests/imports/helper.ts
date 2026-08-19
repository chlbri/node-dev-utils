import { expect } from 'vitest';

import type { Fn } from '../../utils/bemedev/globals/types';
import { customImport } from '../import';

/**
 * Helper function type for verifying exported functions.
 */
export type Helper_F = (args: {
  path?: string;
  fn: string;
}) => Promise<void>;

/**
 * Asserts that a specified function is defined and exported from a module.
 *
 * @template | {@linkcode Fn} `T` - Expected function type.
 *
 * @param args - Options object.
 * @param args.path - Submodule path to import from.
 * @param args.fn - Named export function name.
 */
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
