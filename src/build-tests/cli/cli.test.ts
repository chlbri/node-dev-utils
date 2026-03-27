import { castings, typings } from '@bemedev/types';
import { runSafely } from 'cmd-ts';
import editJsonFile from 'edit-json-file';
import isInCi from 'is-in-ci';
import { existsSync, readdirSync } from 'node:fs';
import { extname } from 'node:path';
import sh from 'shelljs';
import {
  BIN_KEY,
  DOT,
  PACKAGE_PATH,
  PATH_OUT_DIR,
  TARBALL_EXTENSION,
  TARBALL_FOLDER,
  TS_PATH,
} from '../constants';
import { BIN, cli } from './cli';

const folderTocreate = `${DOT}${TARBALL_FOLDER}`;

const useFunc = () => {
  sh.rm('-Rf', [folderTocreate]);
};

const first = () =>
  test(`#0 => Delete the ${TARBALL_FOLDER} folder`, useFunc);

const desc = describe.skipIf(isInCi);

desc('#1 => CLI - ts', () => {
  first();

  test('#1 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#2 => Run th cli', () => runSafely(cli, ['pre']));

  test('#3 => The pack is  defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(true);
  });

  describe('#4 the pack folder has the tarball', () => {
    let file = typings.strings.type;

    beforeEach(() => {
      file = readdirSync(folderTocreate)[0];
    });

    test("#1 => It's really a tarbal", () => {
      expect(extname(file)).toBe(TARBALL_EXTENSION);
    });

    test("#2 => It's realated to the current project", () => {
      const file2 = editJsonFile(PACKAGE_PATH);
      const name = castings
        .strings(file2.get('name'))
        .replace('@', '')
        .replace('/', '-');

      expect(file.startsWith(name)).toBe(true);
    });
  });

  test('#5 => Remove folder', useFunc);

  test('#6 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#7 => Final refinements', () => {
    useFunc();
    return runSafely(cli, ['post']);
  });
});

desc('#2 => CLI - ts - cov', () => {
  first();

  let tsConfig = typings.commons.unknown<editJsonFile.JsonEditor>();
  let outDir0 = typings.strings.type;

  test('#0 => To cover, change something in tsconfig', () => {
    tsConfig = editJsonFile(TS_PATH);
    outDir0 = tsConfig.get(PATH_OUT_DIR);
    const outDir = outDir0.replace(DOT, '');

    tsConfig.set(PATH_OUT_DIR, outDir);
    tsConfig.save();
  });

  test('#1 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#2 => Run th cli', () => runSafely(cli, ['pretest']));

  test('#3 => The pack is  defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(true);
  });

  describe('#4 the pack folder has the tarball', () => {
    let file = typings.strings.type;

    beforeEach(() => {
      file = readdirSync(folderTocreate)[0];
    });

    test("#1 => It's really a tarbal", () => {
      expect(extname(file)).toBe(TARBALL_EXTENSION);
    });

    test("#2 => It's realated to the current project", () => {
      const file2 = editJsonFile(PACKAGE_PATH);
      const name = castings
        .strings(file2.get('name'))
        .replace('@', '')
        .replace('/', '-');

      expect(file.startsWith(name)).toBe(true);
    });
  });

  test('#5 => Remove folder', useFunc);

  test('#6 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#7 => To cover, return to the same', () => {
    tsConfig.set(PATH_OUT_DIR, outDir0);
    tsConfig.save();
  });

  test('#7 => Final refinements', () => {
    useFunc();
    return runSafely(cli, ['posttest']);
  });
});

desc('#3 => The CLI prebuilt', () => {
  first();

  test('#1 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#2 => Run th cli', () => {
    const file = editJsonFile(PACKAGE_PATH);
    const bin = file.get(`${BIN_KEY}.${cli.name}`);
    sh.exec(`node ${DOT}${bin} pre:test`);
  });

  test('#3 => The pack is  defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(true);
  });

  describe('#4 the pack folder has the tarball', () => {
    let file = typings.strings.type;

    beforeAll(() => {
      file = readdirSync(folderTocreate)[0];
    });

    test("#1 => It's really a tarbal", () => {
      expect(extname(file)).toBe(TARBALL_EXTENSION);
    });

    test("#2 => It's realated to the current project", () => {
      const file2 = editJsonFile(PACKAGE_PATH);
      const name = castings
        .strings(file2.get('name'))
        .replace('@', '')
        .replace('/', '-');

      expect(file.startsWith(name)).toBe(true);
    });
  });

  test('#5 => Remove folder', useFunc);

  test('#6 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#7 => Final refinements', () => {
    useFunc();
    const file = editJsonFile(PACKAGE_PATH);
    const bin = file.get(`${BIN_KEY}.${cli.name}`);
    return sh.exec(`node ${DOT}${bin} post:test`);
  });
});

desc('#3 => The CLI built', () => {
  first();

  test('#1 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#2 => Run th cli', () => {
    const file = editJsonFile(PACKAGE_PATH);
    const bin = file.get(`${BIN_KEY}.${cli.name}`);
    sh.exec(`node ${DOT}${bin} pre-test`);
  });

  test('#3 => The pack is  defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(true);
  });

  describe('#4 the pack folder has the tarball', () => {
    let file = typings.strings.type;

    beforeAll(() => {
      file = readdirSync(folderTocreate)[0];
    });

    test("#1 => It's really a tarbal", () => {
      expect(extname(file)).toBe(TARBALL_EXTENSION);
    });

    test("#2 => It's realated to the current project", () => {
      const file2 = editJsonFile(PACKAGE_PATH);
      const name = castings
        .strings(file2.get('name'))
        .replace('@', '')
        .replace('/', '-');

      expect(file.startsWith(name)).toBe(true);
    });
  });

  test('#5 => Remove folder', useFunc);

  test('#6 => The pack is not defined', () => {
    const actual = existsSync(folderTocreate);
    expect(actual).toBe(false);
  });

  test('#7 => Final refinements', () => {
    useFunc();
    return sh.exec(`pnpm ${BIN} post-test`);
  });
});
