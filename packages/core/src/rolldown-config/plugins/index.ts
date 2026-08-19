import { esmExternalRequirePlugin } from 'rolldown/plugins';

import { circulars } from './circulars';
import { clean } from './clean';
import { externals } from './externals';
import { typescript } from './typescript';
import { typescriptFast } from './typescript.fast';

/**
 * Registry mapping plugin keys to their factory functions.
 */
export const PLUGIN_BUILDERS = {
  typescript,
  circulars,
  externals,
  clean,
  fast: typescriptFast,
  esm: esmExternalRequirePlugin,
};

/**
 * Default ordering sequence for Rolldown build plugins.
 */
export const DEFAULT_PLUGINS_ORDER = Object.keys(
  PLUGIN_BUILDERS,
) as (keyof typeof PLUGIN_BUILDERS)[];
