import { identity } from '#utils';

import { THIS1 } from './constants';

type Args<T = any> = { path?: string; fn: (out: any) => T };

type CustomImport_F = <T = any>(args: Args<T>) => Promise<T>;

/**
 * Dynamically imports a module or submodule from the generated test package.
 *
 * @template `T` - Extracted return type.
 *
 * @param args - Import options containing submodule path and extractor function.
 *
 * @returns Promise resolving to the extracted module value.
 */
export const customImport: CustomImport_F = async ({
  path = '',
  fn = identity,
}: Args) => {
  const _path = path === '' ? THIS1 : `${THIS1}/${path}`;
  const out = await import(_path);
  const out2 = fn(out);
  return out2;
};
