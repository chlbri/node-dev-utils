import { relative } from 'node:path';

import { globSync } from 'glob';
import { circularDependencies } from 'rollup-plugin-circular-dependencies';
import type { TsdownPluginOption } from 'vite-plus/pack';
import {} from 'vite-plus/pack';

import { toArray, type SoA } from '#utils';

import { withoutExtension } from '../../rolldown-config/helpers';
import { WARNING_CODES } from '../constants';

/**
 * Options for the circular dependencies plugin.
 */
export type CircularDependenciesOptions = Omit<
  Parameters<typeof circularDependencies>[0],
  'exclude'
> & { exclude?: SoA<string> };

/**
 * Creates a configured circular dependencies plugin instance with suppression
 * for known patterns.
 *
 * @param options - Configuration options of type {@linkcode CircularDependenciesOptions}.
 *
 * @returns Rolldown plugin option of type {@linkcode TsdownPluginOption}.
 */
export function circulars(
  options: CircularDependenciesOptions = {},
): TsdownPluginOption {
  const all = circularDependencies(options);
  const exclude = toArray(options.exclude);

  const CIRCULAR_CHUNKS = exclude
    .filter(Boolean)
    .map(f => globSync(f, { nodir: true }))
    .flat()
    .map(withoutExtension)
    .map(file => relative('src', file));

  return {
    ...all,
    name: 'better circular-dependencies',
    onLog: {
      handler: (_, { code, names }) => {
        if (
          code === WARNING_CODES.CIRCULAR_DEPENDENCY &&
          names?.every(name => CIRCULAR_CHUNKS.includes(name))
        ) {
          const STARS = '*'.repeat(20);
          console.log(STARS);
          console.log('[bemedev] Skipping circular dependency warnings for:');
          names?.forEach(name => console.log(`  -> 📄 ${name}`));
          console.log(STARS);
          console.log();
          return false;
        }

        return;
      },
    },
  };
}
