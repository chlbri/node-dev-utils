import type { RolldownPluginOption, RolldownOptions } from 'rolldown';

export type { RolldownOptions };
import type { PLUGIN_BUILDERS } from './plugins';

/**
 * Normalizes a single value, array, null, or undefined into an array.
 *
 * @template `T` - Item type.
 *
 * @param value - Optional single value or array.
 *
 * @returns Array containing the value(s).
 */
export type ToArray_F = <T>(value?: T | T[]) => T[];

/**
 * Configuration parameters for Rolldown bundle generation.
 */
export type Params = {
  circularDeps?: string | string[];
  excludesTS?: string | string[];
  ignoresJS?: string | string[];
  externals?: string | string[];
  dir?: string;
  sourcemap?: boolean;
  declarationMap?: boolean;
  plugins?: (RolldownPluginOption | keyof typeof PLUGIN_BUILDERS)[];
};

/**
 * Function type building the input entry points record from glob patterns.
 */
export type BuildInput_F = (
  ...ignores: string[]
) => Record<string, string>;

/**
 * Rolldown configuration generator with predefined presets (`bemedev`, `fast`, `default`).
 */
export type Config_F = {
  (additionals?: Params): RolldownOptions;
  bemedev: (additionals?: Params) => RolldownOptions;
  fast: (additionals?: Omit<Params, 'plugins'>) => RolldownOptions;
  default: (additionals?: Params) => RolldownOptions;
};
