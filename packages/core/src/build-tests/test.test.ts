import { readFileSync } from 'node:fs';
import { relative } from 'node:path';

import { globSync } from 'glob';
import { parseSync } from 'oxc-parser';

describe('TESTS', () => {
  const dir = import.meta.dirname;
  const files = globSync('**/*.ts', { cwd: dir, absolute: true });
  const TESTS = files
    .filter(file => !file.endsWith('test.test.ts'))
    .map((file, index) => {
      const path = relative(dir, file);
      const _index = (index + 1).toString().padStart(2, '0');
      const invite = `#${_index} parse ${path}`;
      const annotation = `Parsed representation for: ${path}`;
      return [invite, { file, path, annotation }] as const;
    });

  test.for(TESTS)(
    '%s',
    ([, { file, path, annotation }], { annotate, onTestFinished }) => {
      console.log(annotation);
      annotate(annotation);
      const content = readFileSync(file, 'utf8');
      const _out = parseSync(file, content, { range: true });
      const out = Object.assign({ path }, _out);
      console.log(out.path);
      console.log(JSON.stringify(out.program, null, 2));

      onTestFinished(() => {
        console.log();
        console.log('*'.repeat(30));
        console.log(path, 'read,', '✅');
        console.log('*'.repeat(30));
        console.log();
      });
    },
  );
});
