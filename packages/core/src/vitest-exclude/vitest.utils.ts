import { existsSync } from 'fs';
import { join } from 'node:path';

import { glob } from 'glob';

export const hasSrc = (root = process.cwd()) => {
  return existsSync(join(root, 'src'));
};

export const defaultCovPattern = (root?: string) => {
  const _src = hasSrc(root);
  /* v8 ignore next */
  return `${_src ? 'src/' : ''}**/*.t{s,sx}`;
};

const mapper = (str: string) => str.replace(/\\/g, '/');
export const buildInclude = async (
  pattern: string | string[],
  ignore?: string[],
  root = process.cwd(),
) => {
  const include = await glob(pattern, { ignore, cwd: root });

  return include.map(mapper).sort();
};

export const testPattern = (root?: string) => {
  const _src = hasSrc(root);
  /* v8 ignore next */
  return `${_src ? 'src/' : ''}**/*.{test,spec}.{ts,js,tsx,jsx}`;
};
