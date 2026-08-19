import type { RolldownPluginOption } from 'rolldown';
import { nodeExternals } from 'rollup-plugin-node-externals';

/**
 * Options for the node externals plugin.
 */
export type NodeExternalsOptions = Parameters<typeof nodeExternals>[0];

/**
 * Creates a configured node externals plugin instance for Rolldown.
 *
 * @param options - Configuration options of type {@linkcode NodeExternalsOptions}.
 *
 * @returns Rolldown plugin option of type {@linkcode RolldownPluginOption}.
 */
export function externals(
  options: NodeExternalsOptions = {},
): RolldownPluginOption {
  return nodeExternals(options);
}
