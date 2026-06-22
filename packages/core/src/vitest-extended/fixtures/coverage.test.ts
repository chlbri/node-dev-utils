import { describe } from 'vitest';
import { createTests } from '../createTests';
import { addMany, expected, noArgs } from './coverage';

describe('#1 => funcNoArgs - to cov', () => {
  const { success } = createTests(noArgs);

  success(
    { expected, invite: 'No Args' },
    { expected, invite: 'No Args - again' },
  )();
});

describe('#2 => funcNoArgs and transform to "number:4" - to cov', () => {
  const { success } = createTests(noArgs, { transform: () => 4 });

  success(
    { expected: 4, invite: 'No Args' },
    { expected: 4, invite: 'No Args - again' },
  )();
});

describe('#3 => addMany - to cov', () => {
  const { success } = createTests(addMany);

  success(
    { expected: 0, invite: 'No Args' },
    {
      expected: 1,
      invite: '1',
      parameters: 1,
    },
    {
      expected: 10,
      invite: '10',
      parameters: 10,
    },
    {
      expected: 45,
      invite: '1,2,3,4,5,6,7,8,9',
      parameters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      expected: 45,
      invite: '0,1,2,3,4,5,6,7,8,9',
      parameters: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  )();
});
