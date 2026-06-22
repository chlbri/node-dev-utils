import { sleep } from '@bemedev/dev-utils/utils';
import { todo } from './index';

describe('project1 tests', () => {
  test('#01 => runs dev-utils sleep function', async () => {
    const start = Date.now();
    await sleep(10);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(10);
  });

  test('#02 => todo', () => {
    expect(todo()).toBe('todo');
  });
});
