import type { OutputOptions } from 'rolldown';
import { DEFAULT_DIR } from './constants';

export const buildOutput = (dir = DEFAULT_DIR, sourcemap: boolean) => {
  return [
    {
      format: 'es',
      sourcemap,
      preserveModulesRoot: 'src',
      dir,
      preserveModules: true,
      entryFileNames: '[name].js',
    },
    {
      format: 'cjs',
      sourcemap,
      preserveModulesRoot: 'src',
      dir,
      preserveModules: true,
      entryFileNames: '[name].cjs',
    },
  ] as const satisfies OutputOptions[];
};
