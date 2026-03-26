import { runSafely } from 'cmd-ts';
import isInCi from 'is-in-ci';
import sh from 'shelljs';
import { FIXTURES } from '../constants';
import { BIN, cli } from './cli';

// #region Preparation
const hasExtension = process.env[FIXTURES.vitest] === FIXTURES.true;
const recursive = process.env[FIXTURES.recursive] === FIXTURES.true;

const check = isInCi || hasExtension || recursive;

const useHook = () => {
  beforeEach(() => {
    sh.exec('pnpm run build');
    process.env[FIXTURES.recursive] = FIXTURES.true;
    return runSafely(cli, ['pretest']);
  });

  afterEach(() => {
    process.env[FIXTURES.recursive] = FIXTURES.false;
  });

  afterAll(() => {
    delete process.env[FIXTURES.recursive];
  });
};

const TIMEOUT = 1_000_000;
// #endregion

describe.skipIf(check)('#1 => Tests From TARBALL', () => {
  useHook();

  const makeTest =
    (...params: string[]) =>
    () => {
      let command = `pnpm ${BIN} test`;
      params.forEach(param => {
        command += ` ${param}`;
      });
      const { code, stderr } = sh.exec(command);
      if (stderr) {
        console.warn(stderr);
      }
      expect(code).toBe(0);
    };

  test('#1 => Test only', makeTest(), TIMEOUT);
  test('#2 => Test and -b', makeTest('-b'), TIMEOUT);
  test('#3 => Test and pre', makeTest('--pre'), TIMEOUT);
  test('#4 => Test and posttest', makeTest('--posttest'), TIMEOUT);
  test('#5 => Test and post', makeTest('--post'), TIMEOUT);

  test(
    '#6 => Test with pretest and -a',
    makeTest('--pretest', '-a'),
    TIMEOUT,
  );
});
