/**
 * Reducer for function with _**one object**_ parameter which
 *
 * @param f The function to test
 * @param headArgs First arguments for reducing
 * @returns A new function without the **_headArgs**_ provided
 */
export function partialCallO<T extends object, U extends T, R>(
  f: (arg: U) => R,
  headArgs?: T,
) {
  return (remainArgs: Omit<U, keyof T>) =>
    f({ ...remainArgs, ...headArgs } as U);
}
