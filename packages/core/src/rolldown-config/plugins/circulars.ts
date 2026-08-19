import { relative } from 'node:path';

import { globSync } from 'glob';
import type { RolldownPluginOption } from 'rolldown';
import { circularDependencies } from 'rollup-plugin-circular-dependencies';

import { toArray } from '#utils';

import { WARNING_CODES } from '../constants';
import { withoutExtension } from '../helpers';

/**
 * Options for the circular dependencies plugin.
 */
export type CircularDependenciesOptions = Parameters<
  typeof circularDependencies
>[0] & { exclude?: string | string[] };

/**
 * Creates a configured circular dependencies plugin instance with suppression for known patterns.
 *
 * @param options - Configuration options of type {@linkcode CircularDependenciesOptions}.
 *
 * @returns Rolldown plugin option of type {@linkcode RolldownPluginOption}.
 */
export function circulars(
  options: CircularDependenciesOptions = {},
): RolldownPluginOption {
  const all = circularDependencies(options);
  const exclude = toArray(options.exclude);

  const CIRCULAR_CHUNKS = exclude
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
          console.log(
            '[bemedev] Skipping circular dependency warnings for:',
          );
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
