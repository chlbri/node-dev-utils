import type { Plugin } from 'vitest/config';

import { name } from './constants';
import type { Args, WithPattern } from './types';
import {
  buildInclude,
  defaultCovPattern,
  testPattern,
} from './vitest.utils';

/**
 * Creates include arrays for test and coverage files from glob patterns.
 *
 * @param args - Glob patterns to ignore for test and coverage files.
 * @param root - Optional root directory path.
 *
 * @returns An object with resolved `files` and `coverage` string arrays.
 */
export async function create(args: Args[1] = {}, root?: string) {
  const firsts = {
    patternTest: testPattern(root),
    patternCov: defaultCovPattern(root),
  };

  return create.withPattern(firsts, args, root);
}

/**
 * Creates include arrays using custom test and coverage glob patterns.
 *
 * @param patterns - Custom test and coverage pattern object.
 * @param patterns.patternTest - Glob pattern for test files.
 * @param patterns.patternCov - Glob pattern for coverage files.
 * @param args - Ignore options for tests and coverage.
 * @param root - Optional root directory path.
 *
 * @returns An object with resolved `files` and `coverage` string arrays.
 */
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
 * Vitest plugin to configure test and coverage file inclusion via glob patterns.
 *
 * @param args - Globs to ignore for test and coverage files.
 *
 * @returns Vitest plugin of type {@linkcode Plugin}.
 */
export function exclude(args: Args[1] = {}) {
  return {
    name,
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
          coverage: { ...coverage, include: all.coverage },
        },
      };
    },
  } as Plugin;
}

/**
 * Vitest plugin to configure test and coverage file inclusion with custom search patterns.
 *
 * @param patterns - Custom test and coverage glob patterns.
 * @param ignore - Globs to exclude.
 *
 * @returns Vitest plugin of type {@linkcode Plugin}.
 */
exclude.withPattern = ((
  { patternTest, patternCov },
  { ignoreCoverageFiles, ignoreTestFiles },
) => {
  return {
    name,
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
          coverage: { ...coverage, include: all.coverage },
        },
      };
    },
  };
}) as WithPattern;
