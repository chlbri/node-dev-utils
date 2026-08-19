/**
 * Converts a string to uppercase.
 *
 * @template `S` - String type.
 *
 * @param str - Input string.
 *
 * @returns Uppercase string of type `Uppercase<S>`.
 */
export const _toUpper = <S extends string>(str: S) => {
  const out = str.toUpperCase();
  return out as Uppercase<S>;
};

/**
 * Converts an array of strings to uppercase.
 *
 * @template `S` - String array type.
 *
 * @param strs - Array of strings.
 *
 * @returns Array of uppercase strings.
 */
export const toUpper = <S extends string[]>(...strs: S) => {
  return strs.map(_toUpper);
};
