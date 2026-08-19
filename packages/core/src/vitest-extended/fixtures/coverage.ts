/**
 * Test fixture constant.
 */
export const expected = 'done!';

/**
 * Test fixture returning a constant string.
 *
 * @returns Expected constant string.
 */
export const noArgs = () => expected;

type AddMany = (...params: number[]) => number;

/**
 * Test fixture adding multiple numbers together.
 */
export const addMany: AddMany = (...numbers) =>
  numbers.reduce((acc, value) => acc + value, 0);
