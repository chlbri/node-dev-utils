import { existsSync } from 'fs';
import { join } from 'node:path';

import { glob } from 'glob';

/**
 * Checks if a `src` directory exists at the specified project root.
 *
 * @param root - Root directory path, defaults to `process.cwd()`.
 *
 * @returns `true` if `src` exists, otherwise `false`.
 */
export const hasSrc = (root = process.cwd()) => {
  return existsSync(join(root, 'src'));
};

/**
 * Computes default coverage glob patterns based on directory structure.
 *
 * @param root - Optional root directory path.
 *
 * @returns Coverage glob pattern string.
 */
export const defaultCovPattern = (root?: string) => {
  const _src = hasSrc(root);
  /* v8 ignore next */
  return `${_src ? 'src/' : ''}**/*.t{s,sx}`;
};

const mapper = (str: string) => str.replace(/\\/g, '/');

/**
 * Resolves glob matches and normalizes file path separators.
 *
 * @param pattern - Glob pattern(s) to match.
 * @param ignore - Optional array of patterns to ignore.
 * @param root - Root working directory.
 *
 * @returns Array of normalized matched file paths.
 */
export const buildInclude = async (
  pattern: string | string[],
  ignore?: string[],
  root = process.cwd(),
) => {
  const include = await glob(pattern, { ignore, cwd: root });

  return include.map(mapper).sort();
};

/**
 * Computes default test glob patterns based on directory structure.
 *
 * @param root - Optional root directory path.
 *
 * @returns Test glob pattern string.
 */
export const testPattern = (root?: string) => {
  const _src = hasSrc(root);
  /* v8 ignore next */
  return `${_src ? 'src/' : ''}**/*.{test,spec}.{ts,js,tsx,jsx}`;
};
