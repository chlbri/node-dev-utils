/**
 * Default exclude glob patterns for bundling and type generation.
 */
export const DEFAULT_EXCLUDE = [
  '**/node_modules/**/*',
  '**/__tests__/**/*',
  '**/*.test.ts',
  '**/*.test-d.ts',
  '**/*.fixtures.ts',
  '**/fixtures.ts',
  'src/fixtures/**/*.ts',
];

/**
 * Default patterns for type files that may contain circular references.
 */
export const DEFAULT_CIRCULAR_DEPS = [
  '**/types.ts',
  '**/type.ts',
  '**/*.types.ts',
  '**/*.type.ts',
];

/**
 * Combined default exclusions and circular dependency file patterns.
 */
export const IGNORE = DEFAULT_EXCLUDE.concat(DEFAULT_CIRCULAR_DEPS);

/**
 * Default output directory name.
 */
export const DEFAULT_DIR = 'lib';

/**
 * Rolldown log warning codes.
 */
export const WARNING_CODES = {
  EMPTY_BUNDLE: 'EMPTY_BUNDLE',
  CIRCULAR_DEPENDENCY: 'CIRCULAR_DEPENDENCY',
};
