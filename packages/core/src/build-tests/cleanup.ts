import sh from 'shelljs';

import { TEARDOWN_COMMAND } from './constants';

/**
 * Removes the temporary packed directory and uninstalls temporary
 * dependencies declared through {@linkcode TEARDOWN_COMMAND}.
 *
 * @returns Nothing.
 */
export const cleanup = () => {
  sh.rm('-Rf', '.pack');
  sh.exec(TEARDOWN_COMMAND);
  console.log('Cleanup done');
};
