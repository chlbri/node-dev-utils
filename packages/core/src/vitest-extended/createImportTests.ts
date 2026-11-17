import { join } from 'node:path';

import { describe, expect, test } from 'vitest';

import { toStringFlat } from './toStringFlat';

/**
 * Options defining expected exported and non-exported symbols.
 */
export type PackageImportArgs = {
  path?: string;
  FAILS?: string[];
  SUCCESS: string[];
};

/**
 * Function type creating import test suites for a package.
 */
export type CreatePackageImportTest_F = (
  args: PackageImportArgs,
) => readonly [string, () => void];

/**
 * Creates Vitest test suites verifying that symbols exist in a package module.
 *
 * Only the existence of the symbols is checked, not their type.
 *
 * @param packageName - Name of the package to import from.
 *
 * @returns Function creating a tuple of test description and test runner.
 *
 * @example
 * ```ts
 * describe(
 *   ...createPackageImportTests('@bemedev/dev-utils')({
 *     path: 'vitest-extended',
 *     SUCCESS: ['createTests'],
 *     FAILS: ['missingExport'],
 *   }),
 * );
 * ```
 */
export const createImportTests = (
  packageName: string,
): CreatePackageImportTest_F => {
  return args => {
    const path = args.path;
    const target = path ? join(packageName, path) : packageName;
    const invite = `Importing from ${target}`;

    const testFn = async (fn: string) => {
      const mod = await import(target);
      expect(mod[fn]).toBeDefined();
    };

    const fn = () => {
      describe.skipIf(args.SUCCESS.length < 1)(
        '#01 => Symbols are inside the module',
        () => {
          const _index = (index: number) => {
            return toStringFlat(index + 1, args.SUCCESS.length);
          };

          args.SUCCESS.forEach((fn, index) => {
            test(`#${_index(index)} => should succeed with symbol ${fn}`, () => {
              return testFn(fn);
            });
          });
        },
      );

      if (!args.FAILS || args.FAILS.length < 1) return;

      describe('#02 => Symbols are not inside the module', () => {
        const _index = (index: number) => {
          return toStringFlat(index + 1, args.FAILS!.length);
        };

        args.FAILS!.forEach((fn, index) => {
          test.fails(`#${_index(index)} => should fail with symbol ${fn}`, () => {
            return testFn(fn);
          });
        });
      });
    };

    return [invite, fn] as const;
  };
};
