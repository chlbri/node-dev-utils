import type { Fn } from '#utils/types';
import editJsonFile, { type JsonEditor } from 'edit-json-file';
import { resolve } from 'path';
import { DEFAULT_OUT_DIR, DOT, PATH_OUT_DIR, TS_PATH } from './constants';

type Fn1 = Fn<[], string>;

export const getTypescriptOutdir: Fn1 = () => {
  let file: JsonEditor | undefined = editJsonFile(
    resolve(process.cwd(), TS_PATH),
  );

  const outDir1 = file.get(PATH_OUT_DIR) ?? DEFAULT_OUT_DIR;
  /* v8 ignore next 3 */
  const outDir2 = outDir1.startsWith(DOT)
    ? outDir1.replace(DOT, '')
    : outDir1;

  file = undefined;
  return outDir2;
};
