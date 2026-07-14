import type { OutputOptions } from 'rolldown';

import { DEFAULT_DIR } from './constants';
import { getConfig } from './plugins/typescript.config';

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
