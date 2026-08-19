import type { Fn, FnBasic } from '../types';

/**
 * Augments a function with additional object properties.
 *
 * @template | {@linkcode Fn} `Main` - Base function type.
 * @template | {@linkcode object} `Tr` - Extension properties shape.
 *
 * @param main - Base function to extend of type {@linkcode Fn}.
 * @param extensions - Optional extension properties object.
 *
 * @returns Extended function of type {@linkcode FnBasic}.
 */
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
