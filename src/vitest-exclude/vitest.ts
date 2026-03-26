import { name } from './constants';
import type { Args, Plugin, WithPattern } from './types';
import {
  buildInclude,
  defaultCovPattern,
  testPattern,
} from './vitest.utils';

/**
 * Plugin to add files with glob patterns to vitest
 *
 * @param ignore globs to exclude inside
 * @returns a vitest config
 *
 * @see {@link exclude.withPattern}
 * @remarks
 * You don't have to use test.exclude.
 * The default search patter is './src/**\/*.ts'
 */
export function exclude(args: Args[1] = {}) {
  const patternCov = defaultCovPattern();
  const patternTest = testPattern();
  return exclude.withPattern({ patternCov, patternTest }, args);
}

/**
 * Plugin to add files with glob patterns to vitest
 *
 * @param pattern The pattern where searching files
 * @param ignore globs to exclude inside
 * @returns a vitest config
 */
exclude.withPattern = ((
  { patternTest, patternCov },
  { ignoreCoverageFiles, ignoreTestFiles },
): Plugin => {
  return {
    name,
    enforce: 'pre',
    config: async options => {
      const testConfig = options?.test;
      const coverage = options?.test?.coverage;

      const includeCov = await buildInclude(
        patternCov,
        ignoreCoverageFiles,
      );
      const includeTest = await buildInclude(patternTest, ignoreTestFiles);

      return {
        ...options,
        test: {
          ...testConfig,
          include: includeTest,
          coverage: {
            ...coverage,
            include: includeCov,
          },
        },
      };
    },
  };
}) as WithPattern;
