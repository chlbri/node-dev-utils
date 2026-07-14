import type { Fn, FnBasic } from '../types';

export const expandFn = <
  Main extends Fn,
  const Tr extends object = object,
>(
  main: Main,
  extensions?: Tr,
): FnBasic<Main, Tr> => {
  const out: any = main;

  if (extensions) {
    Object.assign(out, extensions);
  }

  return out;
};
