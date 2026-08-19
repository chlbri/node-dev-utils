import { subcommands } from 'cmd-ts';

import { posttest } from './post';
import { pretest } from './pre';
import { test } from './test';

/**
 * Binary command name for build tests.
 */
export const BIN = 'build-tests';

/**
 * CLI definition for package building and test execution.
 */
export const cli = subcommands({
  name: BIN,
  cmds: { posttest, pretest, test },
  description: 'Use it to build your package and testing the results',
  version: '0.1.0',
});
