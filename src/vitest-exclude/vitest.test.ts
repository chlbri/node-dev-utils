import { createTests } from '../vitest-extended/createTests';
import { describe } from 'vitest';
import { name } from './constants';
import { exclude } from './vitest';

type Fn = (...args: any) => any;

describe('vitest - exclude', () => {
  const environment = 'node';
  const enabled = true;
  const enforce = 'pre';

  const fn = async (...args: Parameters<typeof exclude>) => {
    const { name, enforce, config: c } = exclude(...args);
    const fn = c as Fn;
    const config = await fn({
      test: { environment, coverage: { enabled } },
    });
    return { config, name, enforce };
  };

  const { acceptation, success } = createTests(fn);

  describe('#00 => Acceptation', acceptation);

  describe(
    '#01 => Success',
    success(
      {
        invite: 'No ignore',
        parameters: [],
        expected: {
          name,
          enforce,
          config: {
            test: {
              include: ['src/vitest.test.ts', 'src/Counter.test.tsx'],
              environment,
              coverage: {
                enabled,
                include: [
                  'src/vitest.utils.ts',
                  'src/vitest.ts',
                  'src/vitest.test.ts',
                  'src/types.ts',
                  'src/index.ts',
                  'src/Counter.tsx',
                  'src/Counter.test.tsx',
                  'src/constants.ts',
                ],
              },
            },
          },
        },
      },

      {
        invite: 'Ignore all test files in coverage',
        parameters: [{ ignoreCoverageFiles: ['**/*.test.t{s,sx}'] }],
        expected: {
          name,
          enforce,
          config: {
            test: {
              environment,
              include: ['src/vitest.test.ts', 'src/Counter.test.tsx'],

              coverage: {
                enabled,
                include: [
                  'src/vitest.utils.ts',
                  'src/vitest.ts',
                  'src/types.ts',
                  'src/index.ts',
                  'src/Counter.tsx',
                  'src/constants.ts',
                ],
              },
            },
          },
        },
      },
      {
        invite: 'Ignore all index files',
        parameters: [{ ignoreCoverageFiles: ['**/index.ts'] }],
        expected: {
          name,
          enforce,
          config: {
            test: {
              environment,
              include: ['src/vitest.test.ts', 'src/Counter.test.tsx'],

              coverage: {
                enabled,
                include: [
                  'src/vitest.utils.ts',
                  'src/vitest.ts',
                  'src/vitest.test.ts',
                  'src/types.ts',
                  'src/Counter.tsx',
                  'src/Counter.test.tsx',
                  'src/constants.ts',
                ],
              },
            },
          },
        },
      },
      {
        invite: 'Ignore all index files and tsx files',
        parameters: [
          {
            ignoreCoverageFiles: ['**/index.ts', '**/*.tsx'],
            ignoreTestFiles: ['**/*.tsx'],
          },
        ],
        expected: {
          name,
          enforce,
          config: {
            test: {
              environment,
              include: ['src/vitest.test.ts'],

              coverage: {
                enabled,
                include: [
                  'src/vitest.utils.ts',
                  'src/vitest.ts',
                  'src/vitest.test.ts',
                  'src/types.ts',
                  'src/constants.ts',
                ],
              },
            },
          },
        },
      },
    ),
  );
});
