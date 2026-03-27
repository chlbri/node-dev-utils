import { aliasTs } from './src/vitest-alias';
import { exclude } from './src/vitest-exclude';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig as any),
    exclude({
      ignoreCoverageFiles: ['**/index.ts', '**/*.types.ts', '**/types.ts'],
      ignoreTestFiles: ['src/build-tests/cli/**/*'],
    }),
    solid() as any,
  ],

  test: {
    environment: 'jsdom',
    fileParallelism: false,
    bail: 1_000,
    maxConcurrency: 1,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    logHeapUsage: true,
    testTimeout: 100_000,
    hookTimeout: 100_000,
    coverage: {
      enabled: true,
      extension: 'ts',
      reportsDirectory: '.coverage',
      all: true,
      provider: 'v8',
    },
  },
});
