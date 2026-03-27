import type { types } from '@bemedev/types';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sh from 'shelljs';
import { buildPackageJson } from './buildPackageJson';
import { DOT, PACKAGE_PATH, TARBALL_FOLDER } from './constants';
import { getRelativePath0 } from './getRelativePath';

type Pack_F = types.Fn<[], Promise<string>>;

export const pack: Pack_F = async () => {
  const { packageJson, outDir } = buildPackageJson();

  const fileToWrite = `${DOT}${join(outDir, PACKAGE_PATH)}`;

  await writeFile(fileToWrite, JSON.stringify(packageJson, null, 2));
  const folderTocreate = `${DOT}${TARBALL_FOLDER}`;
  sh.rm('-Rf', [folderTocreate]);
  sh.mkdir(folderTocreate);

  sh.cd(`${DOT}${outDir}`);

  const out1 = sh
    .exec(`pnpm pack --pack-destination ../${TARBALL_FOLDER}`)
    .toString();

  sh.cd('..');

  const out2 = getRelativePath0(out1);

  return out2;
};
