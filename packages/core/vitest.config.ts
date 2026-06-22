import { defineProject } from 'vitest/config';
import { IS_EXTENSION } from './src/rolldown-config/__tests__/constants';
import { exclude } from './src/vitest-exclude';

export default defineProject({
  root: '/Users/bri/Documents/GitHub/node-dev-utils/packages/core',
  resolve: {
    tsconfigPaths: true,
  },

  plugins: [
    exclude({
      ignoreCoverageFiles: [
        '**/index.ts',
        '**/lib/**',
        '**/*.types.ts',
        '**/types.ts',
        '**/__tests__/**',
      ],
      ignoreTestFiles: IS_EXTENSION ? ['**/*.built.test.ts'] : undefined,
    }),
  ],
  test: {
    name: 'core',
    fileParallelism: false,
    bail: 100,
    maxConcurrency: 1,
    globals: true,
    logHeapUsage: true,
    testTimeout: 50_000,
    hookTimeout: 50_000,
  },
});
