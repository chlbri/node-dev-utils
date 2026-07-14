import { esmExternalRequirePlugin } from 'rolldown/plugins';

import { circulars } from './circulars';
import { clean } from './clean';
import { externals } from './externals';
import { typescript } from './typescript';
import { typescriptFast } from './typescript.fast';

export const PLUGIN_BUILDERS = {
  typescript,
  circulars,
  externals,
  clean,
  fast: typescriptFast,
  esm: esmExternalRequirePlugin,
};

export const DEFAULT_PLUGINS_ORDER = Object.keys(
  PLUGIN_BUILDERS,
) as (keyof typeof PLUGIN_BUILDERS)[];
