import { _unknown } from './bemedev/globals/utils/_unknown';
import { maxLength, minLength, multiChar } from '@bemedev/basifun';
import { describe } from 'vitest';
import { createTests } from './createTests';

describe('CreateTests - Coverage', () => {
  type Add_F = (numb1: number, numb2: number) => number;
  const add: Add_F = (numb1, numb2) => numb1 + numb2;
  const addTest = _unknown<Add_F>();

  describe('#2 => CreateTests, funcTest is initialazed', () => {
    const { success, acceptation } = createTests.withImplementation(
      addTest,
      {
        instanciation: () => add,
        name: 'add',
        transform: async x => x,
      },
    );

    describe('#0 => Acceptation', acceptation);

    describe(
      'Success',
      success(
        {
          invite: '0 + 0 = 0',
          parameters: [0, 0],
          expected: 0,
        },
        {
          invite: '99 + 1 = 0',
          parameters: [99, 1],
          expected: 100,
        },
        {
          invite: '1 + 1 = 0',
          parameters: [1, 1],
          expected: 2,
        },
      ),
    );
  });

  describe('#3 => Test errors', () => {
    describe('#1 => minLength', () => {
      const { fails, success, acceptation } =
        createTests.withoutImplementation(minLength, {
          toError: (min, value) => {
            return `"${value}" is shorter or equal than ${min}`;
          },
        });

      describe('#0 => Acceptation', acceptation);

      describe(
        '#1 => Errors',
        fails(
          {
            invite: 'Equals',
            parameters: [2, 're'],
            error: '"re" is shorter or equal than 2',
          },
          { invite: 'Less -1', parameters: [2, 'r'] },
          { invite: 'Less -2', parameters: [2, ''] },
        ),
      );

      describe(
        '#2 => Success',
        success(
          {
            invite: '3 min and 4 chars',
            parameters: [3, multiChar('n', 4)],
            expected: multiChar('n', 4),
          },
          {
            invite: '6 min and 10 chars',
            parameters: [6, multiChar('n', 10)],
            expected: multiChar('n', 10),
          },
        ),
      );
    });

    describe('#2 => maxLength', () => {
      const maxL = (min: number, val: string): string =>
        maxLength(min, val as never);

      const { fails, success } = createTests(maxL);

      describe(
        '#1 => Errors',
        fails(
          { invite: 'Equals', parameters: [2, 're'] },
          { invite: 'More +1', parameters: [2, 'rer'] },
          {
            invite: 'Less +6',
            parameters: [4, multiChar('d', 10)],
          },
        ),
      );

      describe(
        '#2 => Success',
        success(
          {
            invite: '3 max and 2 chars',
            parameters: [3, multiChar('n', 2)],
            expected: multiChar('n', 2),
          },
          {
            invite: '10 max and 6 chars',
            parameters: [10, multiChar('n', 6)],
            expected: multiChar('n', 6),
          },
        ),
      );
    });

    describe('#3 => Promise rejects', () => {
      describe('#1 => Promise rejects "ARGS1"', () => {
        const error = 'ARGS';
        const func = async () => await Promise.reject(error);

        const { fails } = createTests(func, { toError: () => error });

        describe(
          '#1 => fails',
          fails(
            {
              invite: 'With provided error',
              error,
            },
            {
              invite: 'Without provided error',
            },
          ),
        );
      });

      describe('#1 => Promise rejects "ARGS2"', () => {
        const error = 'ARGS';
        const func = () => Promise.reject(error);

        const { fails } = createTests(func);

        describe(
          '#1 => fails',
          fails(
            {
              invite: 'With provided error',
              error,
            },
            {
              invite: 'Without provided error',
            },
          ),
        );
      });
    });

    describe('#4 => The function has no errors, but transform throw error', () => {
      const { fails } = createTests(() => 0, {
        transform: () => {
          throw new Error('Cov');
        },
      });

      describe(
        '#1 => Fails',
        fails(
          {
            invite: 'Cov',
            error: 'Cov',
          },
          {
            invite: 'Cov - again',
            error: 'Cov',
          },
        ),
      );
    });

    describe('#5 => transform', () => {
      const add = (a: number, b: number) => a + b;
      const { success } = createTests(add, {
        transform: x => `Result is ${x}`,
      });

      describe(
        '#1 => Success',
        success(
          {
            invite: '1 + 2 = 3',
            parameters: [1, 2],
            expected: 'Result is 3',
          },
          {
            invite: '5 + 5 = 10',
            parameters: [5, 5],
            expected: 'Result is 10',
          },
        ),
      );
    });
  });
});
