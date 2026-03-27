import { describe } from 'vitest';
import { useEach, useEachAsync } from '../each/pass';
import { transformZTF, transformZTFAsync, type Any } from './zod';
import { _useTFA, useWorkflow } from './zod.fixtures';

describe('transformZTF', () => {
  _useTFA(transformZTF);

  describe('#2 => Workflows', () => {
    const create = (zod: Any) => {
      const func = transformZTF(zod);

      const useTest = useEach(func);
      return useTest;
    };

    useWorkflow(create);
  });
});

describe('transformZTFAsync', () => {
  _useTFA(transformZTFAsync);

  describe('#2 => Workflows', () => {
    const create = (zod: Any) => {
      const func = transformZTFAsync(zod);
      const useTest = useEachAsync(func);

      return useTest;
    };

    useWorkflow(create);
  });
});
