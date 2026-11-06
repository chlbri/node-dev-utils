import { clean } from '../../rolldown-config/plugins/clean';
import { circulars } from './circulars';

/**
 * Registry mapping plugin keys to their factory functions.
 *
 * Vite+ Pack natively handles declaration generation (`dts`), output
 * cleaning (`clean`) and dependency externals (`external`), so only the
 * circular dependencies plugin is exposed here.
 */
export const DEFAULT_PLUGINS = { circulars, clean } as const;

/**
 * Default ordering sequence for Vite+ Pack plugins.
 */
export const DEFAULT_PLUGINS_ORDER = Object.keys(
  DEFAULT_PLUGINS,
) as (keyof typeof DEFAULT_PLUGINS)[];
