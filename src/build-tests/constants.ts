import { castings } from '@bemedev/types';

export const FILE_ORIGIN = 'file';
export const devKey = 'devDependencies';
export const this1 = 'this-gen-1';
export const EXPORT_KEYS = castings.arrays.tupleOf(
  'main',
  'typings',
  'module',
);
export const EXPORT_KEY = 'exports';
export const PATH_OUT_DIR = 'compilerOptions.outDir';
export const DOT = './';
export const BIN_KEY = 'bin';

export const TS_PATH = './tsconfig.json';
export const PACKAGE_PATH = './package.json';
export const TARBALL_FOLDER = '.pack';

export const TARBALL_EXTENSION = '.tgz';

export const TEARDOWN_COMMAND = `pnpm remove ${this1}`;

export const FIXTURES = castings.commons.const({
  true: 'true',
  false: 'false',
  recursive: 'TEST_RECURSIVE',
  vitest: 'VITEST_VSCODE',
});
