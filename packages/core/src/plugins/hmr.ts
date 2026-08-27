import { execSync } from 'child_process';
import { resolve, isAbsolute } from 'path';

import { type Plugin } from 'vitest/config';

import { toArray } from '#utils/array';
import { clamp } from '#utils/clamp';
import type { SoA } from '#utils/types';

/**
 * Configuration options for the HMR add-on plugin.
 */
export type HmrPluginProps = {
  /** Single file path or array of file paths of type {@linkcode SoA} to watch for changes. */
  paths?: SoA<string>;

  /** Single shell command or array of shell commands of type {@linkcode SoA} to execute when a change is detected. */
  scripts?: SoA<string>;

  /** Optional interval in milliseconds to wait before allowing another build. */
  debounce?: number;
};

/**
 * Normalizes backslashes in a file path to forward slashes.
 *
 * @param path - File path to normalize.
 *
 * @returns Normalized path string.
 */
const normalizePath = (path: string) => path.replace(/\\/g, '/');

/**
 * Vite plugin providing Hot Module Reloading (HMR) capabilities for external
 * file paths by watching files and executing build scripts on changes.
 *
 * @param props - Configuration properties of type {@linkcode HmrPluginProps}.
 *
 * @returns A Vite plugin object of type {@linkcode Plugin}.
 */
export const hmr = (props?: HmrPluginProps): Plugin => {
  // Lock variable to prevent infinite build loops
  let isBuilding = false;
  const debounce = clamp(props?.debounce ?? 500, 500, 10_000);
  const paths: string[] = [];
  let isDev = false;

  return {
    name: 'hmr-add-on',

    configResolved(config) {
      isDev = !config.isProduction;
      if (!isDev) return;

      // Resolve relative paths based on Vite project root
      const resolvedPaths = toArray(props?.paths)
        .map(p => (isAbsolute(p) ? p : resolve(config.root, p)))
        .map(normalizePath);

      paths.push(...resolvedPaths);
    },

    configEnvironment(name) {
      isDev = name === 'dev';
    },

    configureServer(server) {
      if (!isDev) return;

      server.watcher.add(paths);
    },

    handleHotUpdate(ctx) {
      if (!isDev) return;

      // 1. If a build is already in progress, ignore ALL changes (prevents loops)
      if (isBuilding) return ctx.modules;
      const normalizedFile = normalizePath(ctx.file);
      const checks = paths.some(p => normalizedFile.includes(p));

      if (checks) {
        console.log(
          `\n⚡ External file modified: ${ctx.file}. Starting build...`,
        );

        try {
          // 2. Acquire lock before starting the build
          isBuilding = true;
          const scripts = toArray(props?.scripts);

          scripts.forEach(script => {
            execSync(script, { stdio: 'inherit' });
          });

          // Invalidate module graph so Vite reads fresh built files from disk
          ctx.server.moduleGraph.invalidateAll();
          ctx.server.ws.send({ type: 'full-reload' });
        } catch (error) {
          console.error('❌ Command execution failed during HMR:', error);
        } finally {
          // 3. Once build is complete, wait for the debounce period to allow
          // Vite to ignore generated build files, then release the lock.
          setTimeout(() => {
            isBuilding = false;
            console.log(
              '✅ Build completed. Ready for subsequent changes.',
            );
          }, debounce);
        }
      }

      return ctx.modules;
    },
  };
};
