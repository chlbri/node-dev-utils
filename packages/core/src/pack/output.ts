import { DEFAULT_DIR } from './constants';
import type { PackOutput } from './types';

/**
 * Builds the shared output configuration for Vite+ Pack.
 *
 * The bundle is unbundled (`preserveModules` equivalent) and emitted both as
 * ESM (`.js`) and CJS (`.cjs`) files.
 *
 * @param dir - Target output directory name, defaults to {@linkcode DEFAULT_DIR}.
 * @param sourcemap - Whether to generate source maps.
 *
 * @returns Output options of type {@linkcode PackOutput}.
 */
export const buildOutput = (outDir = DEFAULT_DIR, sourcemap = false): PackOutput => {
  return {
    outDir,
    format: ['esm'],
    unbundle: true,
    fixedExtension: false,
    sourcemap,
  };
};
