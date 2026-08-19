/**
 * Creates a partially applied function for a single object parameter function.
 *
 * @template | {@linkcode object} `T` - Partial argument shape.
 * @template `U` - Full argument shape extending `T`.
 * @template `R` - Return type.
 *
 * @param f - Target function.
 * @param headArgs - Initial partial argument values.
 *
 * @returns Function accepting remaining arguments.
 */
export function partialCallO<T extends object, U extends T, R>(
  f: (arg: U) => R,
  headArgs?: T,
) {
  return (remainArgs: Omit<U, keyof T>) =>
    f({ ...remainArgs, ...headArgs } as U);
}
