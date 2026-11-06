import { defineProject as project, type UserWorkspaceConfig } from 'vite-plus';

/**
 * Helper function to define a Vitest project configuration with defaults.
 *
 * @param conf - Vitest user workspace configuration of type {@linkcode UserWorkspaceConfig}.
 *
 * @returns Configured Vitest project configuration.
 */
export const defineProject = (conf: UserWorkspaceConfig) => {
  const _env = conf.test?.env ?? {};

  return project({
    ...conf,
    resolve: { ...conf.resolve, tsconfigPaths: true },

    test: {
      ...conf.test,
      globals: true,
      logHeapUsage: false,
      env: { NODE_ENV: 'test', ..._env },
    },
  });
};
