import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';

function stripComments(jsonString: string): string {
  return jsonString.replace(
    /\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g,
    (m, g) => (g ? '' : m),
  );
}

export function findConfigFile(
  searchPath: string,
  configName: string = 'tsconfig.json',
): string | undefined {
  let dir = searchPath;
  while (true) {
    const filePath = join(dir, configName);
    if (existsSync(filePath)) {
      return filePath;
    }
    const parentDir = dirname(dir);
    if (parentDir === dir) {
      break;
    }
    dir = parentDir;
  }
  return undefined;
}

export const readTsConfig = (path: string): { compilerOptions: any } => {
  if (!existsSync(path)) {
    throw new Error(`tsconfig.json not found at ${path}`);
  }
  const content = readFileSync(path, 'utf-8');
  const cleanJson = stripComments(content);
  let config: any;
  try {
    config = JSON.parse(cleanJson);
  } catch (e: any) {
    throw new Error(
      `Failed to parse tsconfig.json at ${path}: ${e.message}`,
      { cause: e },
    );
  }

  let compilerOptions = config.compilerOptions || {};
  const configDir = dirname(path);

  const extendsPaths = Array.isArray(config.extends)
    ? config.extends
    : config.extends
      ? [config.extends]
      : [];

  for (const extPath of extendsPaths) {
    let baseConfigPath: string | undefined;
    if (extPath.startsWith('.')) {
      baseConfigPath = resolve(configDir, extPath);
    } else {
      baseConfigPath = findConfigFile(
        join(configDir, 'node_modules'),
        extPath,
      );
      if (!baseConfigPath) {
        baseConfigPath = createRequire(import.meta.url).resolve(extPath, {
          paths: [configDir],
        });
      }
    }

    if (baseConfigPath && existsSync(baseConfigPath)) {
      const baseConfig = readTsConfig(baseConfigPath);
      compilerOptions = {
        ...baseConfig.compilerOptions,
        ...compilerOptions,
      };
    }
  }

  if (compilerOptions.rootDir) {
    compilerOptions.rootDir = resolve(configDir, compilerOptions.rootDir);
  }

  if (compilerOptions.outDir) {
    compilerOptions.outDir = resolve(configDir, compilerOptions.outDir);
  }

  return { compilerOptions };
};
