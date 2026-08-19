import { relative } from 'node:path';

import type { Fn } from '#utils/types';

import { TARBALL_EXTENSION } from './constants';

type GetRelativePath_F = Fn<[string], string>;

/**
 * Extracts and computes the relative path to the generated tarball file from pack output.
 *
 * @param result - Shell stdout output from `pnpm pack`.
 *
 * @returns Relative path to the tarball archive.
 */
export const getRelativePath0: GetRelativePath_F = result => {
  const split = result.split('\n');
  const out1 = split.find(val => val.endsWith(TARBALL_EXTENSION));
  const out2 = relative(process.cwd(), out1!);

  return out2;
};
