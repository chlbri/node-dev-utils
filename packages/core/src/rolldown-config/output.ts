import type { OutputOptions } from 'rolldown';

import { DEFAULT_DIR } from './constants';
import { getConfig } from './plugins/typescript.config';

/**
 * Builds ES and CJS output configurations for Rolldown.
 *
 * @param dir - Target output directory name, defaults to {@linkcode DEFAULT_DIR}.
 * @param sourcemap - Whether to generate source maps.
 *
 * @returns Array of output configurations of type {@linkcode OutputOptions}.
 */
export const buildOutput = (dir = DEFAULT_DIR, sourcemap: boolean) => {
  const config = getConfig(process.cwd());
  const outDir = config.options.outDir ?? dir ?? DEFAULT_DIR;
  return [
    {
      format: 'es',
      sourcemap,
      preserveModulesRoot: 'src',
      dir: outDir,
      preserveModules: true,
      entryFileNames: '[name].js',
    },
    {
      format: 'cjs',
      sourcemap,
      preserveModulesRoot: 'src',
      dir: outDir,
      preserveModules: true,
      entryFileNames: '[name].cjs',
    },
  ] as const satisfies OutputOptions[];
};
