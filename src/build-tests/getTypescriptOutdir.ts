import type { types } from '@bemedev/types';
import editJsonFile from 'edit-json-file';
import { DOT, PATH_OUT_DIR, TS_PATH } from './constants';

type Fn1 = types.Fn<[], string>;

export const getTypescriptOutdir: Fn1 = () => {
  const file = editJsonFile(TS_PATH);

  const outDir1 = file.get(PATH_OUT_DIR) as string;
  /* v8 ignore next 3 */
  const outDir2 = outDir1.startsWith(DOT)
    ? outDir1.replace(DOT, '')
    : outDir1;

  return outDir2;
};
