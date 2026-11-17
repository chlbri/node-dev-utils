import { createImportTests } from '@bemedev/dev-utils/vitest-extended';

describe('TESTS', () => {
  const createTests = createImportTests('@bemedev/dev-utils');

  describe('#01 => vitest-extended', () => {
    describe(
      ...createTests({
        SUCCESS: [
          'createImportTests',
          'createTests',
          'defineProject',
          'createFakeWaiter',
        ],
        FAILS: ['addTarball'],
        path: 'vitest-extended',
      }),
    );
  });
});
