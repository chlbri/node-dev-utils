import { castings } from '@bemedev/types';
import { command, flag } from 'cmd-ts';
import sh from 'shelljs';
import { addTarball } from '../addTarball';
import { cleanup } from '../cleanup';

export const test = command({
  name: 'test',

  args: {
    pretest: flag({
      description: 'The hook pretest',
      short: 'b',
      long: 'pretest',
    }),

    posttest: flag({
      description: 'The hook posttest',
      short: 'a',
      long: 'posttest',
    }),

    pre: flag({
      description: 'The hook pretest',
      long: 'pre',
    }),

    post: flag({
      description: 'The hook posttest',
      long: 'post',
    }),
  },

  // Ignores coverage because of recursivity
  /* v8 ignore next 11 */
  handler: async ({ pretest, posttest, pre, post }) => {
    if (pretest || pre) await addTarball();

    // #region Test
    const { stderr } = sh.exec('pnpm run test');
    if (castings.commons.isDefined(stderr) && stderr.trim() !== '')
      console.warn(stderr);
    // #endregion

    if (posttest || post) cleanup();
  },
});
