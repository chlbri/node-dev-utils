import { describe } from 'vitest';
import { createTests } from './createTests';
import { isFunction } from './isFunction';

describe('isFunction', () => {
  const { success } = createTests(isFunction);

  describe(
    'Success',
    success(
      {
        invite: 'Function type',
        parameters: [function () {}],
        expected: true,
      },
      {
        invite: 'Arrow function',
        parameters: [() => {}],
        expected: true,
      },
      {
        invite: 'Async function',
        parameters: [async function asyncFunction() {}],
        expected: true,
      },
      {
        invite: 'Async Function with return',
        parameters: async function asyncFunction() {},
        expected: true,
      },
      {
        invite: 'Array Class',
        parameters: [Array],
        expected: true,
      },
      {
        invite: 'Symbol Class',
        parameters: [Symbol],
        expected: true,
      },
      {
        invite: 'Empty Object => false',
        parameters: [{}],
        expected: false,
      },
      {
        invite: 'Plain Object => false',
        parameters: [{ a: 3, b: 'b' }],
        expected: false,
      },
      {
        invite: 'true => false',
        parameters: [true],
        expected: false,
      },
      {
        invite: 'false => false',
        parameters: [false],
        expected: false,
      },
      {
        invite: '0 => false',
        parameters: [0],
        expected: false,
      },
      {
        invite: 'ALLO (string) => false',
        parameters: ['ALLO'],
        expected: false,
      },
    ),
  );
});
