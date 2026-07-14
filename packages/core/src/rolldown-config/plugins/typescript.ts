import { existsSync } from 'node:fs';

import ts from '@typescript/typescript6';
import type { RolldownPluginOption } from 'rolldown';
import { replaceTscAliasPaths } from 'tsc-alias';

import { toArray } from '#utils';

import { DEFAULT_DIR } from '../constants';
import { readTsConfig } from './typescript.config';

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

        const tsconfigPath = ts.findConfigFile(
          cwd,
          existsSync,
          'tsconfig.json',
        )!;

        const configFile = readTsConfig(tsconfigPath);
        const host = ts.createCompilerHost(configFile.options);
        const outDir = configFile.options.outDir ?? dir ?? DEFAULT_DIR;

        const parsed = ts.parseJsonConfigFileContent(
          {
            ...configFile,
            include,
            exclude: [...toArray(exclude), '*.ts'],
            compilerOptions: {
              ...configFile.options,
              outDir,
              noEmit: false,
              emitDeclarationOnly: true,
              declaration: true,
              declarationMap,
            },
          },
          ts.sys,
          cwd,
        );

        const program = ts.createProgram(
          parsed.fileNames,
          {
            ...configFile.options,
            outDir,
            noEmit: false,
            emitDeclarationOnly: true,
            declaration: true,
            declarationMap,
          },
          host,
        );

        const emitResult = program.emit();

        const errors = ts
          .getPreEmitDiagnostics(program)
          .concat(emitResult.diagnostics)
          .filter(d => d.category === ts.DiagnosticCategory.Error);

        if (errors.length > 0) {
          console.error(
            ts.formatDiagnosticsWithColorAndContext(errors, host),
          );
        }

        await replaceTscAliasPaths({ configFile: tsconfigPath, outDir });

        done = true;
        console.log('DTS generation complete');
      },
    },
  };
};
