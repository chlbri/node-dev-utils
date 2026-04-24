import { beforeAll, describe } from 'vitest';
import { $ } from 'zx';
import { addTarball } from '../build-tests/addTarball';
import { createImportFnTests } from '../build-tests/imports/create';

beforeAll(async () => {
  await $`pnpm run build`;
  await addTarball();
});

describe('Built package exports', () => {
  describe(
    ...createImportFnTests({
      path: 'build-tests',
      SUCCESS: [
        'addTarball',
        'cleanup',
        'customImport',
        'createImportFnTests',
      ],
      FAILS: [
        'notAFunction',
        'missingExport',
        'buildPackageJson',
        'defineConfig',
      ],
    }),
  );

  describe(
    ...createImportFnTests({
      path: 'rolldown',
      SUCCESS: ['defineConfig'],
      FAILS: [
        'addTarball',
        'cleanup',
        'addTarball',
        'cleanup',
        'customImport',
        'createImportFnTests',
      ],
    }),
  );

  describe(
    ...createImportFnTests({
      path: 'utils',
      SUCCESS: ['identity', 'sleep'],
      FAILS: [
        'createAlias',
        'exclude',
        'addTarball',
        'cleanup',
        'customImport',
        'createImportFnTests',
      ],
    }),
  );

  describe(
    ...createImportFnTests({
      path: 'vitest-alias',
      SUCCESS: ['createAlias', 'aliasTs'],
      FAILS: [
        'identity',
        'sleep',
        'addTarball',
        'cleanup',
        'customImport',
        'createImportFnTests',
      ],
    }),
  );

  describe(
    ...createImportFnTests({
      path: 'vitest-exclude',
      SUCCESS: ['create', 'exclude'],
      FAILS: [
        'identity',
        'sleep',
        'addTarball',
        'cleanup',
        'customImport',
        'createImportFnTests',
      ],
    }),
  );

  describe(
    ...createImportFnTests({
      path: 'vitest-extended',
      SUCCESS: [
        'useTestFunctionAcceptation',
        'useTFA',
        'createTests',
        'doneTest',
        'useErrorAsyncEach',
        'useEach',
        'useEachAsync',
        'useErrorAsyncEachCases',
        'createFakeWaiter',
      ],
      FAILS: [
        'identity',
        'sleep',
        'addTarball',
        'cleanup',
        'customImport',
        'createImportFnTests',
      ],
    }),
  );
});
