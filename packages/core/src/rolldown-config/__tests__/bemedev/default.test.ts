import { defineConfig } from '../../config';
import { useBuild, useBundle, useTests } from '../fixtures';

useBuild();

describe('bemedev options', () => {
  const { writeCjs, writeEsm } = useBundle(defineConfig.bemedev());

  test('#1 Write esm', ...writeEsm);

  describe(
    '#2 => Check files',
    useTests({
      '.d.ts': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: true,
      },
      '.js': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
      },
      '.cjs': {
        config: false,
        constants: false,
        index: false,
        input: false,
        types: false,
      },
      '.d.ts.map': {
        config: false,
        constants: false,
        index: false,
        input: false,
        types: false,
      },
      '.js.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
      },
      '.cjs.map': {
        config: false,
        constants: false,
        input: false,
        types: false,
      },
    }),
  );

  test('#3 Write commonjs', ...writeCjs);

  describe(
    '#4 => Checks files',
    useTests({
      '.d.ts': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: true,
      },
      '.js': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
      },
      '.cjs': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
      },
      '.d.ts.map': {
        config: false,
        constants: false,
        index: false,
        input: false,
        types: false,
      },
      '.js.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
      },
      '.cjs.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
      },
    }),
  );
});
