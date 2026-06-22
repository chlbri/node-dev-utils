import { relative } from 'node:path';
import { TARBALL_EXTENSION } from './constants';
import type { Fn } from '#utils/types';

type GetRelativePath_F = Fn<[string], string>;

export const getRelativePath0: GetRelativePath_F = result => {
  const split = result.split('\n');
  const out1 = split.find(val => val.endsWith(TARBALL_EXTENSION));
  const out2 = relative(process.cwd(), out1!);

  return out2;
};
