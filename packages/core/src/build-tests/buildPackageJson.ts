import editJsonFile from 'edit-json-file';
import sortKeys from 'sort-keys';

import type { Fn } from '#utils';

import { BIN_KEY, EXPORT_KEY, EXPORT_KEYS } from './constants';
import { getTypescriptOutdir } from './getTypescriptOutdir';

/**
 * Function type building the distribution `package.json` and resolving the
 * TypeScript output directory.
 *
 * @see -- type {@linkcode Fn}
 */
type BuldPackageJson_F = Fn<[], { packageJson: object; outDir: string }>;

/**
 * Transforms `package.json` for packed distribution by adjusting paths and
 * removing internal fields.
 *
 * Rewrites the {@linkcode EXPORT_KEYS} entries, the `exports` map and the
 * `bin` field so that they point to the packed output, then removes
 * `files`, `scripts` and `devDependencies`.
 *
 * @returns Object containing the modified `packageJson` and the `outDir`
 * resolved by {@linkcode getTypescriptOutdir}.
 */
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
  const bin1 = file.get(BIN_KEY) as Record<string, string> | undefined | string;

  if (bin1) {
    if (typeof bin1 === 'string') {
      const bin2 = replaceLib(bin1);
      file.set(BIN_KEY, bin2);
    } else {
      const bin2 = Object.entries(bin1).reduce((acc, [key, value]) => {
        acc[key] = replaceLib(value);
        return acc;
      }, {} as any);

      const bin3 = sortKeys(bin2);
      file.set(BIN_KEY, bin3);
    }
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
