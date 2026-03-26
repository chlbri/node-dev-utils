import type { ViteUserConfig } from 'vitest/config';

export type Define<T> = Exclude<T, undefined>;

export type Plugin = Exclude<
  Define<ViteUserConfig['plugins']>[number],
  Promise<any> | null | undefined | false | Array<any>
>;

export type Args = [
  { patternTest: string | string[]; patternCov: string | string[] },
  {
    ignoreTestFiles?: string[];
    ignoreCoverageFiles?: string[];
  },
];

export type WithPattern = (...args: Args) => Plugin;
