import { type types, castings } from '@bemedev/types';
import editJsonFile from 'edit-json-file';
import sortKeys from 'sort-keys';
import { BIN_KEY, EXPORT_KEY, EXPORT_KEYS } from './constants';
import { getTypescriptOutdir } from './getTypescriptOutdir';

type BuldPackageJson_F = types.Fn<
  [],
  {
    packageJson: object;
    outDir: string;
  }
>;

export const buildPackageJson: BuldPackageJson_F = () => {
  const file = editJsonFile('./package.json');
  const outDir = getTypescriptOutdir();
  const lib = `${outDir}/`;

  const replaceLib = (str: string) => str.replace(lib, '');

  // #region Set export values
  EXPORT_KEYS.forEach(key => {
    const value = file.get(key);
    if (value) {
      const transformed = replaceLib(value);
      file.set(key, transformed);
    }
  });
  // #endregion

  // #region Set Export key
  const valueExports = file.get(EXPORT_KEY);

  if (valueExports) {
    const transformedExports = Object.entries(valueExports).reduce(
      (acc, [key, value]) => {
        const entries = Object.entries(value as any);
        const _value = entries.reduce((acc, [key, value]) => {
          acc[key] = replaceLib(value as any);
          return acc;
        }, {} as any);
        acc[key] = key.includes('package.json') ? value : _value;
        return acc;
      },
      {} as any,
    );

    file.set(EXPORT_KEY, transformedExports);
  }
  // #endregion

  // #region Set bin
  const bin1 = castings.objects.dynamic<Record<string, string>>(
    file.get(BIN_KEY),
  );

  if (bin1) {
    const bin2 = Object.entries(bin1).reduce((acc, [key, value]) => {
      acc[key] = replaceLib(value);
      return acc;
    }, {} as any);
    const bin3 = sortKeys(bin2);

    file.set(BIN_KEY, bin3);
  }
  // #endregion

  // #region Unset some props
  file.unset('files');
  file.unset('scripts');
  file.unset('devDependencies');
  // #endregion

  const packageJson = file.get();

  return { packageJson, outDir };
};
