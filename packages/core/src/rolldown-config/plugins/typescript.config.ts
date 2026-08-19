import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

import ts from '@typescript/typescript6';

const _readFile = (filePath: string): string | undefined => {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch {
    return undefined;
  }
};

const _readDirectory: ts.ParseConfigHost['readDirectory'] = (
  rootDir,
  extensions,
  _,
  __,
  depth,
): string[] => {
  const results: string[] = [];

  const walk = (dir: string, currentDepth: number) => {
    if (depth !== undefined && currentDepth > depth) return;

    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }

      if (stat.isDirectory()) {
        walk(fullPath, currentDepth + 1);
      } else if (
        !extensions ||
        extensions.some(ext => entry.endsWith(ext))
      ) {
        results.push(fullPath);
      }
    }
  };

  walk(rootDir, 0);
  return results;
};

const _host: ts.ParseConfigHost = {
  useCaseSensitiveFileNames: true,
  readDirectory: _readDirectory,
  fileExists: existsSync,
  readFile: _readFile,
};

/**
 * Loads and parses the closest `tsconfig.json` from the search path.
 *
 * @param searchPath - Directory path from which to locate the tsconfig.
 * @param configName - Name of the configuration file, defaults to `'tsconfig.json'`.
 *
 * @returns Parsed TypeScript configuration object.
 */
export function getConfig(
  searchPath: string,
  configName: string = 'tsconfig.json',
) {
  const tsconfigPath = ts.findConfigFile(
    searchPath,
    existsSync,
    configName,
  )!;

  const configFile = readTsConfig(tsconfigPath);
  return configFile;
}

/**
 * Reads and parses the specified `tsconfig.json` file path.
 *
 * @param path - Absolute or relative path to the tsconfig file.
 *
 * @returns Parsed TypeScript configuration object.
 */
export const readTsConfig = (path: string) => {
  const configFile = ts.readConfigFile(path, _readFile);

  if (configFile.error) {
    throw new Error(
      ts.formatDiagnostic(configFile.error, {
        getCanonicalFileName: f => f,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => '\n',
      }),
    );
  }

  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    _host,
    dirname(path),
  );

  return parsedConfig;
};
