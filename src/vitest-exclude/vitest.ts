import { name } from './constants';
import type { Args, Plugin, WithPattern } from './types';
import {
  buildInclude,
  defaultCovPattern,
  testPattern,
} from './vitest.utils';

/**
 * Create includeTest and includeCoverage arrays from glob patterns
 *
 * @param args Globs to ignore for test and coverage files
 * @returns an object with includeTest and includeCoverage string arrays
 */
export async function create(args: Args[1] = {}) {
  const firsts = {
    patternTest: testPattern(),
    patternCov: defaultCovPattern(),
  };

  return create.withPattern(firsts, args);
}

create.withPattern = async (
  {
    patternTest = testPattern(),
    patternCov = defaultCovPattern(),
  }: Partial<Args[0]> = {},
  { ignoreTestFiles, ignoreCoverageFiles }: Args[1] = {},
) => {
  const files = await buildInclude(patternTest, ignoreTestFiles);
  const coverage = await buildInclude(patternCov, ignoreCoverageFiles);
  return { files, coverage };
};

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

      const all = await create.withPattern(
        { patternTest, patternCov },
        { ignoreCoverageFiles, ignoreTestFiles },
      );

      return {
        ...options,
        test: {
          ...testConfig,
          include: all.files,
          coverage: {
            ...coverage,
            include: all.coverage,
          },
        },
      };
    },
  };
}) as WithPattern;
