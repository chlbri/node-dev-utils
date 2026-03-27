import type { types } from '@bemedev/types';
import { buildPackageJson } from './buildPackageJson';
import { EXPORT_KEYS } from './constants';

describe('Build new package.json for npm pack', () => {
  const { packageJson } = buildPackageJson();
  const keys = Object.keys(packageJson);

  const innerTest = (key: string, check: boolean, index: number) => {
    const presence = check ? 'present' : 'absent';

    return test(`#${index} => key : ${key} is ${presence}`, () => {
      expect(keys.includes(key)).toBe(check);
    });
  };

  type Mapper = types.Fn<
    [check: boolean],
    types.Fn<[key: string, index: number], void>
  >;

  const mapper: Mapper = check => (key, index) => {
    return innerTest(key, check, index);
  };

  describe('#1 => Keys are absents', () => {
    const KEYS = ['scripts', 'files', 'devDependencies'];
    KEYS.forEach(mapper(false));
  });

  describe('#2 => Keys are presents', () => {
    const KEYS = [
      'name',
      'author',
      'repository',
      'license',
      ...EXPORT_KEYS,
      'dependencies',
    ];
    KEYS.forEach(mapper(true));
  });
});
