import { circulars } from './circulars';
import { clean } from './clean';
import { externals } from './externals';
import { typescript } from './typescript';

export const PLUGIN_BUILDERS = { typescript, circulars, externals, clean };

export const DEFAULT_PLUGINS_ORDER = [
  'typescript',
  'circulars',
  'externals',
  'clean',
];
