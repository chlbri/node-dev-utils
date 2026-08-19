/**
 * File scheme identifier prefix.
 */
export const FILE_ORIGIN = 'file';

/**
 * Dev dependencies field name in package.json.
 */
export const devKey = 'devDependencies';

/**
 * Generated temporary package name.
 */
export const THIS1 = 'this-gen-1';

/**
 * Entry keys to rewrite in package.json.
 */
export const EXPORT_KEYS = ['main', 'typings', 'module'] as const;

/**
 * Exports field name in package.json.
 */
export const EXPORT_KEY = 'exports';

/**
 * JSON path to compiler options output directory in tsconfig.json.
 */
export const PATH_OUT_DIR = 'compilerOptions.outDir';

/**
 * Relative current directory prefix.
 */
export const DOT = './';

/**
 * Bin field name in package.json.
 */
export const BIN_KEY = 'bin';

/**
 * Default relative path to tsconfig.json.
 */
export const TS_PATH = './tsconfig.json';

/**
 * Default relative path to package.json.
 */
export const PACKAGE_PATH = './package.json';

/**
 * Temporary folder name for packing tarballs.
 */
export const TARBALL_FOLDER = '.pack';

/**
 * Extension for packed tarball archives.
 */
export const TARBALL_EXTENSION = '.tgz';

/**
 * Shell command to remove temporary generated dependency.
 */
export const TEARDOWN_COMMAND = `pnpm remove ${THIS1}`;

/**
 * Default output directory relative path.
 */
export const DEFAULT_OUT_DIR = './lib';

// export const FIXTURES = {
//   true: 'true',
//   false: 'false',
//   recursive: 'TEST_RECURSIVE',
//   vitest: 'VITEST_VSCODE',
// } as const;
