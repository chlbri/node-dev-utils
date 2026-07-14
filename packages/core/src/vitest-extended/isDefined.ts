import type { Undefiny } from '../utils/bemedev/globals/types';
export type { Undefiny };

export const isDefined = <T>(value?: Undefiny<T>): value is T => {
  return value !== undefined && value !== null;
};
