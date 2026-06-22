import { getTypescriptOutdir } from './getTypescriptOutdir';

test('Get TS outDir', () => {
  const actual = getTypescriptOutdir();
  const expected = 'lib';
  expect(actual).toBe(expected);
});
