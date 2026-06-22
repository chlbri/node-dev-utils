export function isFunction(arg: any) {
  const isType = 'function' === typeof arg;
  const isInstance = arg instanceof Function;
  const isArrow =
    Object.prototype.toString.call(arg) === '[object Function]';

  return !!arg && (isType || isInstance || isArrow);
}
