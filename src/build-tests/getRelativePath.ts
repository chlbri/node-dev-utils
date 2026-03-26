import type { types } from '@bemedev/types';
import { relative } from 'node:path';
import { TARBALL_EXTENSION } from './constants';

type GetRelativePath_F = types.Fn<[string], string>;

export const getRelativePath0: GetRelativePath_F = result => {
  const split = result.split('\n');
  const out1 = split.find(val => val.endsWith(TARBALL_EXTENSION));
  const out2 = relative(process.cwd(), out1!);

  return out2;
};
