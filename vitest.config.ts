import { defineConfig } from 'vitest/config';
import { exclude } from './src/vitest-exclude';
import { IS_EXTENSION } from './src/rolldown-config/__tests__/constants';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    exclude({
      ignoreCoverageFiles: [
        '**/index.ts',
        '**/*.types.ts',
        '**/types.ts',
        '**/__tests__/**',
      ],
      ignoreTestFiles: IS_EXTENSION ? ['**/*.built.test.ts'] : undefined,
    }),
  ],

  test: {
    fileParallelism: false,
    bail: 100,
    maxConcurrency: 1,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    logHeapUsage: true,
    testTimeout: 50_000,
    hookTimeout: 50_000,
    coverage: {
      enabled: true,
      reportsDirectory: '.coverage',
      provider: 'v8',
    },
  },
});
