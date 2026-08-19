import { defineConfig, type UserWorkspaceConfig } from 'vitest/config';

/**
 * Helper function to define a Vitest project configuration with defaults.
 *
 * @param conf - Vitest user workspace configuration of type {@linkcode UserWorkspaceConfig}.
 *
 * @returns Configured Vitest project configuration.
 */
export const defineProject = (conf: UserWorkspaceConfig) => {
  const _env = conf.test?.env ?? {};

  return defineConfig({
    resolve: { tsconfigPaths: true },
    ...conf,
    test: {
      globals: true,
      logHeapUsage: false,
      env: { NODE_ENV: 'test', ..._env },
      ...conf.test,
    },
  });
};
