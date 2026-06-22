import { sleep } from '@bemedev/dev-utils/utils';

describe('project1 tests', () => {
  test('runs dev-utils sleep function', async () => {
    const start = Date.now();
    await sleep(10);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(10);
  });
});
