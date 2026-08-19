import sh from 'shelljs';

import { TEARDOWN_COMMAND } from './constants';

/**
 * Removes temporary packed directory and uninstalls temporary dependencies.
 */
export const cleanup = () => {
  sh.rm('-Rf', '.pack');
  sh.exec(TEARDOWN_COMMAND);
  console.log('Cleanup done');
};
