import { aliasTs } from './src/vitest-alias';
import { exclude } from './src/vitest-exclude';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig as any),
    exclude({ ignoreCoverageFiles: ['**/index.ts'] }),
  ],
  test: {
    fileParallelism: false,
    bail: 10,
    maxConcurrency: 1,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    globals: true,
    logHeapUsage: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      reportsDirectory: '.coverage',
      all: true,
      provider: 'v8',
    },
  },
});
