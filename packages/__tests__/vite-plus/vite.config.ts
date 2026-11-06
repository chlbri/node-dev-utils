import { defineConfig as pack } from '@bemedev/dev-utils/pack';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: pack.fast({ clean: true }),
  test: {
    name: 'vite-plus',
    bail: 100,
    maxConcurrency: 1,
    globals: true,
    logHeapUsage: true,
  },
});
