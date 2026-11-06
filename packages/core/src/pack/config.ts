import { toArray } from '#utils';

import { getConfig } from '../rolldown-config/plugins/typescript.config';
import { DEFAULT_CIRCULAR_DEPS, DEFAULT_EXCLUDE } from './constants';
import { buildEntry } from './input';
import { buildOutput } from './output';
import { DEFAULT_PLUGINS } from './plugins';
import type { Config_F, DtsOptions, Params } from './types';

/**
 * Generates a Vite+ Pack configuration using default or customized options.
 *
 * The returned object is meant to be used as the `pack` field of a Vite+
 * configuration:
 *
 * @example
 * ```ts
 * import { defineConfig } from '@bemedev/dev-utils/pack';
 * import { defineConfig as defineViteConfig } from 'vite-plus';
 *
 * export default defineViteConfig({
 *   pack: defineConfig.bemedev(),
 * });
 * ```
 *
 * @param additionals - Optional build configuration parameters of type {@linkcode Params}.
 *
 */
export const defineConfig: Config_F = additionals => {
  return defineConfig.default(additionals);
};

const producePlugins = ({
  circularDeps,
  plugins,
  ignoresJS,
  sourcemap,
  dir,
}: Params = {}) => {
  const unordered = {
    circulars: () => DEFAULT_PLUGINS.circulars({ exclude: circularDeps }),
    clean: () => DEFAULT_PLUGINS.clean({ ignoresJS, sourcemap, dir }),
  };

  return plugins
    ? plugins
        .map(p => {
          if (typeof p === 'string') return unordered[p]();
          return p;
        })
        .filter(p => !!p)
    : [unordered.circulars()];
};

defineConfig.default = ({
  dir,
  sourcemap: _sourcemap = false,
  excludesTS,
  ignoresJS,
  externals,
  dts,
  circularDeps,
  plugins: _plugins,
  ...rest
} = {}) => {
  const config = getConfig(process.cwd());
  const entry = buildEntry(...toArray(excludesTS));
  const declarationMap = !_sourcemap ? config.options.declarationMap : _sourcemap;
  const sourcemap = !_sourcemap ? config.options.sourceMap : _sourcemap;
  const output = buildOutput(config.options.outDir ?? dir, sourcemap);
  const neverBundle = toArray(externals);

  const _defaultDts: DtsOptions = { generator: 'tsc', sourcemap: declarationMap };

  const __dts: DtsOptions = !dts
    ? config.options.declaration === true
      ? _defaultDts
      : false
    : dts === true
      ? _defaultDts
      : typeof dts === 'string'
        ? dts
        : { ...dts, sourcemap: declarationMap };

  const plugins = producePlugins({
    circularDeps,
    plugins: _plugins,
    ignoresJS,
    sourcemap,
    dir,
  });

  return {
    ...rest,
    ...output,
    entry,
    platform: 'node',
    dts: __dts,
    deps: { ...rest.deps, neverBundle },
    plugins,
  };
};

defineConfig.fast = rest => {
  return defineConfig.default({ ...rest, dts: { generator: 'oxc', eager: true } });
};

defineConfig.bemedev = additionals => {
  // #region constants
  const circularDeps = DEFAULT_CIRCULAR_DEPS.concat(
    toArray(additionals?.circularDeps),
  );

  const excludesTS = DEFAULT_EXCLUDE.concat(toArray(additionals?.excludesTS));
  const _sourcemap = additionals?.sourcemap;
  const sourcemap = _sourcemap === undefined || _sourcemap === true;
  // #endregion

  return defineConfig.default({
    ...additionals,
    circularDeps,
    excludesTS,
    sourcemap,
  });
};
