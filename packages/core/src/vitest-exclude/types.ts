import type { Plugin } from 'vitest/config';

export type Define<T> = Exclude<T, undefined>;

export type Args = [
  { patternTest: string | string[]; patternCov: string | string[] },
  {
    ignoreTestFiles?: string[];
    ignoreCoverageFiles?: string[];
  },
];

export type WithPattern = (...args: Args) => Plugin;
