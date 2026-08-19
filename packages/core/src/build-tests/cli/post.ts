import { command } from 'cmd-ts';

import { cleanup } from '../cleanup';

/**
 * CLI command to clean up generated test packages and restore package.json.
 */
export const posttest = command({
  name: 'posttest',
  aliases: ['post:test', 'post', 'post-test'],
  args: {},
  handler: cleanup,
});
