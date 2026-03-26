import { describe } from 'vitest';
import { useTestFunctionAcceptation } from '../acceptation';
import { useEach, useEachAsync } from '../each/pass';
import { TestArgs } from '../types';
import { toUpper } from './toUpper';

describe('#0 => Acceptation', () => useTestFunctionAcceptation(toUpper));

describe('#1 => Workflows', () => {
  describe('#1 => toUpper', () => {
    const CASES: TestArgs<typeof toUpper> = [
      {
        invite: '#1 => I have a great test',
        parameters: ['I have a great test'],
        expected: ['I HAVE A GREAT TEST'],
      },
      {
        invite: '#2 => Ich liebe dich',
        parameters: ['Ich liebe dich'],
        expected: ['ICH LIEBE DICH'],
      },
      {
        invite: '#3 => ShoRt Test',
        parameters: ['ShoRt Test'],
        expected: ['SHORT TEST'],
      },
      {
        invite: '#4 => Array of texts',
        parameters: ['ShoRt Test', 'ShoRt Test again'],
        expected: ['SHORT TEST', 'SHORT TEST AGAIN'],
      },
      {
        invite: '#4 => Array of texts, (not sorted)',
        parameters: ['ShoRt Test', 'ShoRt Test again'],
        expected: ['SHORT TEST AGAIN', 'SHORT TEST'],
      },
      {
        invite: '#4 => Array of texts, (not sorted)',
        parameters: ['ShoRt Test', 'ShoRt Test again'],
        expected: ['SHORT TEST AGAIN', 'SHORT TEST'],
      },
    ];

    describe('#1 => Sync', () => {
      useEach(toUpper)(...CASES);
    });

    describe('#2 => Async', () => {
      const f = async (...args: any[]) => toUpper(...args);
      useEachAsync(f)(...CASES);
    });
  });
});
