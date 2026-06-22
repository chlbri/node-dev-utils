import { name } from './constants';
import type { Args, WithPattern } from './types';
import {
  buildInclude,
  defaultCovPattern,
  testPattern,
} from './vitest.utils';
import type { Plugin } from 'vitest/config';

/**
 * Create includeTest and includeCoverage arrays from glob patterns
 *
 * @param args Globs to ignore for test and coverage files
 * @returns an object with includeTest and includeCoverage string arrays
 */
export async function create(args: Args[1] = {}, root?: string) {
  const firsts = {
    patternTest: testPattern(root),
    patternCov: defaultCovPattern(root),
  };

  return create.withPattern(firsts, args, root);
}

create.withPattern = async (
  { patternTest, patternCov }: Partial<Args[0]> = {},
  { ignoreTestFiles, ignoreCoverageFiles }: Args[1] = {},
  root?: string,
) => {
  const files = await buildInclude(
    patternTest ?? testPattern(root),
    ignoreTestFiles,
    root,
  );
  const coverage = await buildInclude(
    patternCov ?? defaultCovPattern(root),
    ignoreCoverageFiles,
    root,
  );
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
  return {
    name,
    enforce: 'pre',
    config: async options => {
      const root = options?.root ?? process.cwd();
      const testConfig = options?.test;
      const coverage = options?.test?.coverage;

      const patternCov = defaultCovPattern(root);
      const patternTest = testPattern(root);

      const { ignoreCoverageFiles, ignoreTestFiles } = args;

      const all = await create.withPattern(
        { patternTest, patternCov },
        { ignoreCoverageFiles, ignoreTestFiles },
        root,
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
  } as Plugin;
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
) => {
  return {
    name,
    enforce: 'pre',
    config: async options => {
      const root = options?.root ?? process.cwd();
      const testConfig = options?.test;
      const coverage = options?.test?.coverage;

      const all = await create.withPattern(
        { patternTest, patternCov },
        { ignoreCoverageFiles, ignoreTestFiles },
        root,
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
