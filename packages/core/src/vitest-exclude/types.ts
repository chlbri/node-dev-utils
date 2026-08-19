import type { Plugin } from 'vitest/config';

/**
 * Type helper to exclude undefined from a type.
 *
 * @template `T` - Base type.
 */
export type Define<T> = Exclude<T, undefined>;

/**
 * Argument tuple for glob pattern configuration and exclusions.
 */
export type Args = [
  { patternTest: string | string[]; patternCov: string | string[] },
  { ignoreTestFiles?: string[]; ignoreCoverageFiles?: string[] },
];

/**
 * Function type creating a Vitest plugin with explicit patterns.
 */
export type WithPattern = (...args: Args) => Plugin;
