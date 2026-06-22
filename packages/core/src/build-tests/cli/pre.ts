import { command } from 'cmd-ts';
import { addTarball } from '../addTarball';

export const pretest = command({
  name: 'pretest',
  aliases: ['pre:test', 'pre', 'pre-test'],
  args: {},
  handler: addTarball,
});
