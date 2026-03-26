import sh from 'shelljs';
import { TEARDOWN_COMMAND } from './constants';

export const cleanup = () => {
  sh.rm('-Rf', '.pack');
  sh.exec(TEARDOWN_COMMAND);
};
