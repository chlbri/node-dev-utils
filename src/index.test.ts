import * as lib from './index';

test('#01 => buildTests is exported', () =>
  expect(lib.buildTests).toBeDefined());
test('#02 => rolldownConfig is exported', () =>
  expect(lib.rolldownConfig).toBeDefined());
test('#03 => vitestAlias is exported', () =>
  expect(lib.vitestAlias).toBeDefined());
test('#04 => vitestExclude is exported', () =>
  expect(lib.vitestExclude).toBeDefined());
test('#05 => vitestExtended is exported', () =>
  expect(lib.vitestExtended).toBeDefined());
