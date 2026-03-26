import { subcommands } from 'cmd-ts';
import { posttest } from './post';
import { pretest } from './pre';
import { test } from './test';

export const BIN = 'build-tests';

export const cli = subcommands({
  name: BIN,
  cmds: { posttest, pretest, test },
  description: 'Use it to build your package and testing the results',
  version: '0.1.0',
});
