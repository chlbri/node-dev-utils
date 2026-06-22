import editJsonFile, { type JsonEditor } from 'edit-json-file';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOT, PATH_OUT_DIR, TS_PATH } from './constants';
import type { Fn } from '#utils/types';

type Fn1 = Fn<[], string>;

export const getTypescriptOutdir: Fn1 = () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  let file: JsonEditor | undefined = editJsonFile(
    path.resolve(__dirname, '../../', TS_PATH),
  );

  const outDir1 = file.get(PATH_OUT_DIR) as string;
  /* v8 ignore next 3 */
  const outDir2 = outDir1.startsWith(DOT)
    ? outDir1.replace(DOT, '')
    : outDir1;

  file = undefined;

  return outDir2;
};
