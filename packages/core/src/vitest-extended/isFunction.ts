/**
 * Determines whether the given value is a function.
 *
 * @param arg - The value to check.
 *
 * @returns `true` if `arg` is a function, otherwise `false`.
 */
export function isFunction(arg: any) {
  const isType = 'function' === typeof arg;
  const isInstance = arg instanceof Function;
  const isArrow =
    Object.prototype.toString.call(arg) === '[object Function]';

  return !!arg && (isType || isInstance || isArrow);
}
