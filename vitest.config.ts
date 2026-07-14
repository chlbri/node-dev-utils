import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    slowTestThreshold: 3000,

    coverage: {
      enabled: true,
      reportsDirectory: '.coverage',
      provider: 'v8',
    },

    projects: [
      'packages/core/vitest.config.ts',
      'packages/__tests__/project1/vitest.config.ts',
    ],
  },
});
