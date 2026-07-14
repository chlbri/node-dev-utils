import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

import { globSync } from 'glob';
import { transformSync } from 'oxc-transform';
import type { RolldownPluginOption } from 'rolldown';
import { replaceTscAliasPaths } from 'tsc-alias';

import { DEFAULT_DIR } from '../constants';
import { toArray } from '../utils';
import { findConfigFile, readTsConfig } from './typescript.config';

type Props = {
  exclude?: string | string[];
  include?: Record<string, string>;
  declarationMap?: boolean;
  dir?: string;
};

export const typescript = ({
  exclude,
  include,
  declarationMap,
  dir,
}: Props = {}): RolldownPluginOption => {
  let done = false;

  return {
    name: 'bemedev-dts',
    options(opts) {
      const existing = toArray(opts.external).filter(
        v => typeof v === 'string' || v instanceof RegExp,
      );
      opts.external = [...existing, 'source-map-support'];
      return opts;
    },
    closeBundle: {
      order: 'pre',
      async handler() {
        if (done) return;
        const cwd = process.cwd();

        const tsconfigPath = findConfigFile(cwd, 'tsconfig.json')!;

        const configFile = readTsConfig(tsconfigPath);
        const outDir =
          configFile.compilerOptions.outDir ?? dir ?? DEFAULT_DIR;
        const rootDir =
          configFile.compilerOptions.rootDir ?? join(cwd, 'src');

        let files: string[];
        if (include && Object.keys(include).length > 0) {
          files = Object.values(include);
        } else {
          files = globSync(join(rootDir, '**/*.{ts,tsx,cts,mts}'), {
            ignore: toArray(exclude),
          });
        }

        files = files.filter(
          file =>
            !file.endsWith('.d.ts') &&
            !file.endsWith('.d.cts') &&
            !file.endsWith('.d.mts'),
        );

        const errors: any[] = [];

        for (const file of files) {
          try {
            const content = readFileSync(file, 'utf-8');
            const result = transformSync(file, content, {
              typescript: { declaration: { sourcemap: !!declarationMap } },
              sourcemap: !!declarationMap,
            });

            if (result.errors && result.errors.length > 0) {
              errors.push(...result.errors);
            }

            // Compute output path relative to rootDir
            const relativePath = relative(rootDir, file);
            let dtsName = relativePath;
            if (relativePath.endsWith('.tsx')) {
              dtsName = relativePath.slice(0, -4) + '.d.ts';
            } else if (relativePath.endsWith('.ts')) {
              dtsName = relativePath.slice(0, -3) + '.d.ts';
            } else if (relativePath.endsWith('.cts')) {
              dtsName = relativePath.slice(0, -4) + '.d.cts';
            } else if (relativePath.endsWith('.mts')) {
              dtsName = relativePath.slice(0, -4) + '.d.mts';
            }

            const outPath = join(outDir, dtsName);
            const outMapPath = outPath + '.map';

            // Ensure output directory exists
            mkdirSync(dirname(outPath), { recursive: true });

            let dtsCode = result.declaration ?? '';
            if (declarationMap && result.declarationMap) {
              dtsCode += `\n//# sourceMappingURL=${basename(dtsName)}.map\n`;
              writeFileSync(
                outMapPath,
                JSON.stringify(result.declarationMap),
                'utf-8',
              );
            }

            writeFileSync(outPath, dtsCode, 'utf-8');
          } catch (err: any) {
            console.error(`[bemedev-dts] Failed to process ${file}:`, err);
          }
        }

        if (errors.length > 0) {
          console.error(`[bemedev-dts] Generation completed with errors:`);
          for (const err of errors) {
            console.error(
              `Error in ${err.filename || 'unknown file'}: ${err.message}`,
            );
            if (err.codeframe) {
              console.error(err.codeframe);
            }
          }
        }

        await replaceTscAliasPaths({ configFile: tsconfigPath, outDir });

        done = true;
        console.log('DTS generation complete');
      },
    },
  };
};
