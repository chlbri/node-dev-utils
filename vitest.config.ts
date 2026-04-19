import { defineConfig } from 'vitest/config';
import { aliasTs } from './src/vitest-alias';
import { exclude } from './src/vitest-exclude';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig as any),
    exclude({
      ignoreCoverageFiles: ['**/index.ts', '**/*.types.ts', '**/types.ts'],
      ignoreTestFiles: ['src/build-tests/cli/**/*'],
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
