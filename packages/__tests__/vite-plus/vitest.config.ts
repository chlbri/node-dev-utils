import { defineProject } from '@bemedev/dev-utils/vitest-extended';

export default defineProject({
  test: {
    name: 'vite-plus',
    bail: 100,
    maxConcurrency: 1,
    globals: true,
    logHeapUsage: true,
  },
});
