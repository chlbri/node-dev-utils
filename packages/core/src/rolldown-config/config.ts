import { defineConfig as _defineConfig } from 'rolldown';
import { esmExternalRequirePlugin } from 'rolldown/plugins';

import { toArray } from '#utils';

import { DEFAULT_CIRCULAR_DEPS, DEFAULT_EXCLUDE } from './constants';
import { buildInput } from './input';
import { buildOutput } from './output';
import { PLUGIN_BUILDERS } from './plugins';
import type { Config_F, Params } from './types';

export const defineConfig: Config_F = additionals => {
  return defineConfig.default(additionals);
};

const producePlugins = ({
  circularDeps,
  ignoresJS,
  dir,
  sourcemap = false,
  excludesTS,
  declarationMap,
  plugins,
}: Params = {}) => {
  const include = buildInput(...toArray(excludesTS));
  const exclude = DEFAULT_EXCLUDE.concat(toArray(excludesTS));
  const unordered = {
    typescript: () =>
      PLUGIN_BUILDERS.typescript({
        include,
        exclude,
        declarationMap,
        dir,
      }),
    circulars: () => PLUGIN_BUILDERS.circulars({ exclude: circularDeps }),
    externals: () =>
      PLUGIN_BUILDERS.externals({
        // exclude peerDependencies and dependencies
        optDeps: false,
        builtinsPrefix: 'strip',
        include: excludesTS,
      }),
    clean: () => PLUGIN_BUILDERS.clean({ ignoresJS, sourcemap, dir }),
    fast: () => {
      return PLUGIN_BUILDERS.fast({
        include,
        exclude,
        declarationMap,
        dir,
      });
    },
    esm: esmExternalRequirePlugin,
  };

  const defaultOrdered = () => [
    unordered.circulars(),
    unordered.externals(),
    unordered.esm(),
    unordered.typescript(),
    unordered.clean(),
  ];

  return plugins
    ? plugins
        .map(p => {
          if (typeof p === 'string') return unordered[p]();
          return p;
        })
        .filter(p => !!p)
    : defaultOrdered();
};

defineConfig.default = ({ dir, sourcemap = false, ...rest } = {}) => {
  const input = buildInput();
  const external = rest.externals;
  const output = buildOutput(dir, sourcemap);

  const plugins = producePlugins({ dir, sourcemap, ...rest });

  return _defineConfig({
    input,
    plugins,
    external,
    output,
    platform: 'node',
  });
};

defineConfig.fast = rest => {
  return defineConfig.default({
    ...rest,
    plugins: ['circulars', 'externals', 'esm', 'fast', 'clean'],
  });
};

defineConfig.bemedev = additionals => {
  // #region constants
  const circularDeps = DEFAULT_CIRCULAR_DEPS.concat(
    toArray(additionals?.circularDeps),
  );
  const ignoresJS = toArray(additionals?.ignoresJS).concat(
    DEFAULT_CIRCULAR_DEPS,
  );

  const excludesTS = DEFAULT_EXCLUDE.concat(
    toArray(additionals?.excludesTS),
  );
  const _sourcemap = additionals?.sourcemap;
  const sourcemap = _sourcemap === undefined || _sourcemap === true;
  // #endregion

  return defineConfig.default({
    ...additionals,
    circularDeps,
    excludesTS,
    ignoresJS,
    sourcemap,
  });
};
