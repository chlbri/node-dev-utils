import { type Plugin } from 'vitest/config';

/**
 * Vite plugin to filter out noisy terminal stdout/stderr warnings emitted
 * by Nitro, SSR workers, or third-party dependencies during dev.
 *
 * @param patterns - Array of type {@linkcode string} or type
 *   {@linkcode RegExp} patterns to match against `stderr` chunks to
 *   suppress.
 *
 * @returns A Vite plugin object of type {@linkcode Plugin}.
 */
export function suppressWarnings(
  ...patterns: Array<string | RegExp>
): Plugin {
  let isInitialized = false;

  const shouldSuppress = (chunk: unknown): boolean => {
    const str =
      typeof chunk === 'string'
        ? chunk
        : (chunk as any)?.toString?.() || '';
    return patterns.some(pattern =>
      typeof pattern === 'string'
        ? str.includes(pattern)
        : pattern.test(str),
    );
  };

  const initFilter = () => {
    if (isInitialized) return;
    isInitialized = true;

    const origStderrWrite = process.stderr.write.bind(process.stderr);
    process.stderr.write = ((chunk: any, ...args: any[]) => {
      if (shouldSuppress(chunk)) return true;
      return (origStderrWrite as any)(chunk, ...args);
    }) as any;
  };

  // Initialize immediately on plugin registration
  initFilter();

  return {
    name: 'suppress-logs-plugin',
    apply: 'serve', // Runs only during dev
  };
}
