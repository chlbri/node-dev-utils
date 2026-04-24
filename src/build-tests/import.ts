import { identity } from '#utils';
import { THIS1 } from './constants';

type Args<T = any> = {
  path?: string;
  fn: (out: any) => T;
};

type CustomImport_F = <T = any>(args: Args<T>) => Promise<T>;

export const customImport: CustomImport_F = async ({
  path = '',
  fn = identity,
}: Args) => {
  const _path = path === '' ? THIS1 : `${THIS1}/${path}`;
  const out = await import(_path);
  const out2 = fn(out);
  return out2;
};
