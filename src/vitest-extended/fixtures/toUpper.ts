export const _toUpper = <S extends string>(str: S) => {
  const out = str.toUpperCase();
  return out as Uppercase<S>;
};
export const toUpper = <S extends string[]>(...strs: S) => {
  return strs.map(_toUpper);
};
