import { useBuild, useRebuild, useTests } from '../fixtures';

useBuild();

describe('bemedev options - with declarationMap', () => {
  const { testCjs, testEsm } = useRebuild({
    declarationMap: true,
    sourcemap: true,
  });

  test('#1 Write esm', ...testEsm());

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
        config: true,
        constants: true,
        index: true,
        input: true,
        types: true,
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

  test('#1 Write commonjs', ...testCjs());

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
        config: true,
        constants: true,
        index: true,
        input: true,
        types: true,
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
