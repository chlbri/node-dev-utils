import { describe, test } from 'vitest';
import { helperFn } from './helper';
import { toStringFlat } from '../../vitest-extended/toStringFlat';

export type ImportArgs = {
  path?: string;
  FAILS: string[];
  SUCCESS: string[];
};

export type CreateImportTest_F = (
  args: ImportArgs,
) => readonly [string, () => void];

export const createImportFnTests: CreateImportTest_F = args => {
  const path = args.path;
  const invite = `Importing from ${path ?? 'index'}`;
  const testFn = (fn: string) => helperFn({ path, fn });

  const fn = () => {
    describe('#01 => Functions are inside the module', () => {
      const _index = (index: number) => {
        return toStringFlat(index + 1, args.SUCCESS.length);
      };

      args.SUCCESS.forEach((fn, index) => {
        test(`#${_index(index)} => should succeed with function ${fn}`, () => {
          return testFn(fn);
        });
      });
    });

    describe('#02 => Functions are not inside the module', () => {
      const _index = (index: number) => {
        return toStringFlat(index + 1, args.FAILS.length);
      };

      args.FAILS.forEach((fn, index) => {
        test.fails(`#${_index(index)} => should fail with function ${fn}`, () => {
          return testFn(fn);
        });
      });
    });
  };

  return [invite, fn] as const;
};
