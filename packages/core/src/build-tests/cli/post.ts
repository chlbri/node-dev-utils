import { command } from 'cmd-ts';
import { cleanup } from '../cleanup';

export const posttest = command({
  name: 'posttest',
  aliases: ['post:test', 'post', 'post-test'],
  args: {},
  handler: cleanup,
});
