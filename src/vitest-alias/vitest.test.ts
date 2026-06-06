import { describe, expect, test } from 'vitest';
import { resolve } from 'node:path';
import { createAlias, aliasTs } from './vitest';

describe('vitest-alias', () => {
  const cwd = process.cwd();

  test('createAlias with object', () => {
    const tsconfig = {
      compilerOptions: {
        baseUrl: './src',
        paths: {
          '#utils/*': ['./utils/*'],
        },
      },
    };
    const alias = createAlias(tsconfig);
    expect(alias).toEqual({
      '#utils': resolve(cwd, 'src/utils'),
    });
  });

  test('createAlias with undefined loads default tsconfig.json', () => {
    const alias = createAlias();
    expect(alias).toEqual({
      '#utils': resolve(cwd, 'src/utils/index.ts'),
    });
  });

  test('createAlias with custom path', () => {
    const alias = createAlias('tsconfig.json');
    expect(alias).toEqual({
      '#utils': resolve(cwd, 'src/utils/index.ts'),
    });
  });

  test('aliasTs plugin config', () => {
    const plugin = aliasTs() as any;
    expect(plugin.name).toBe('aliasTs');
    expect(plugin.enforce).toBe('pre');

    if (typeof plugin.config === 'function') {
      const result = plugin.config({
        test: {
          environment: 'node',
        },
      });
      expect(result).toEqual({
        test: {
          environment: 'node',
          alias: {
            '#utils': resolve(cwd, 'src/utils/index.ts'),
          },
        },
      });
    } else {
      throw new Error('plugin.config is not a function');
    }
  });
});
