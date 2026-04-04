import { identity } from '#utils';
import { THIS1 } from './constants';
import type { IndexImport } from './types';

type CustomImport_F = <T = IndexImport>(
  fn?: (out: any) => T,
) => Promise<T>;

export const customImport: CustomImport_F = async (fn = identity) => {
  const out = await import(THIS1);
  const out2 = fn(out);
  return out2;
};
