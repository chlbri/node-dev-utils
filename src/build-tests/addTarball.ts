import editJsonFile from 'edit-json-file';
import sh from 'shelljs';
import sortKeys from 'sort-keys';
import { devKey, FILE_ORIGIN, PACKAGE_PATH, this1 } from './constants';
import { pack } from './pack';

export const addTarball = async () => {
  // #region Install the tarball
  const _packed = await pack();
  const packed = `${FILE_ORIGIN}:${_packed}`;
  sh.exec(`pnpm add -D ${this1}@${packed}`);
  // #endregion

  const file = editJsonFile(PACKAGE_PATH);

  const devDeps = sortKeys(file.get(devKey));
  file.set(devKey, devDeps);
  file.save();
};
