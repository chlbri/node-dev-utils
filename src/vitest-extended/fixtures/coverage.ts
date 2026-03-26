export const expected = 'done!';

export const noArgs = () => expected;

type AddMany = (...params: number[]) => number;

export const addMany: AddMany = (...numbers) =>
  numbers.reduce((acc, value) => acc + value, 0);
