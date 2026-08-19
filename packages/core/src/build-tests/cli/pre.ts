import { command } from 'cmd-ts';

import { addTarball } from '../addTarball';

/**
 * CLI command to prepare tests by building and installing the local tarball package.
 */
export const pretest = command({
  name: 'pretest',
  aliases: ['pre:test', 'pre', 'pre-test'],
  args: {},
  handler: addTarball,
});
