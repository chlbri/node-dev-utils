import { extname, relative } from 'node:path';

import { globSync } from 'glob';

import { DEFAULT_EXCLUDE } from './constants';
import type { BuildInput_F } from './types';

/**
 * Builds entry points record for Rolldown from all
 * `src/[**]/*.ts]` files.
 *
 * @param ignores - Additional glob patterns to exclude from entry points.
 *
 * @returns An object mapping relative module names to absolute source paths.
 */
export const buildInput: BuildInput_F = (...ignores) =>
  Object.fromEntries(
    globSync('src/**/*.ts', {
      ignore: DEFAULT_EXCLUDE.concat(ignores),
    }).map(file => {
      const key = relative(
        'src',
        file.slice(0, file.length - extname(file).length),
      );
      const value = `${process.cwd()}/${file}`;

      return [key, value];
    }),
  );
