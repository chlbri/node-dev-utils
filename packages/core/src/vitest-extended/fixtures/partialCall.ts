/**
 * Reducer for function with ***one object*** parameter which
 *
 * @param f The function to test
 * @param headArgs First arguments for reducing
 * @returns A new function without the ***headArgs*** provided
 */
export function partialCallO<T extends object, U extends T, R>(
  f: (arg: U) => R,
  headArgs?: T,
) {
  return (remainArgs: Omit<U, keyof T>) =>
    f({ ...remainArgs, ...headArgs } as U);
}
