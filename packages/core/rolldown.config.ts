import { defineConfig } from './src/rolldown-config';

export default defineConfig.bemedev({
  excludesTS: [
    '**/*.tsx',
    '**/fixtures/**/*.ts',
    '**/fixtures.ts',
    '**/*.fixtures.ts',
  ],
});
