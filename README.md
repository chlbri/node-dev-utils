# @bemedev/dev-utils

A collection of utilities for Node.js development, including build tools,
testing utilities, and configuration management.

## Modules

| Module                              | Description                                   |
| ----------------------------------- | --------------------------------------------- |
| [`vitestAlias`](#vitestalias)       | Vitest plugin to inject tsconfig path aliases |
| [`vitestExclude`](#vitestexclude)   | Vitest plugin for glob-based include/exclude  |
| [`vitestExtended`](#vitestextended) | Extended test helpers for Vitest              |
| [`rolldownConfig`](#rolldownconfig) | Rolldown bundler configuration factory        |
| [`buildTests`](#buildtests)         | CLI tooling to build and test packages        |

<br/>

## Installation

```bash
pnpm add @bemedev/dev-utils
# or
npm install @bemedev/dev-utils
# or
yarn add @bemedev/dev-utils
```

**Peer dependencies:** `typescript ^5 || ^6`

<br/>

## Usage

Each module is available as a dedicated sub-path export — there is no root
barrel export:

```typescript
import { createAlias, aliasTs } from '@bemedev/dev-utils/vitest-alias';
import { exclude } from '@bemedev/dev-utils/vitest-exclude';
import {
  createTests,
  createFakeWaiter,
} from '@bemedev/dev-utils/vitest-extended';
import { defineConfig } from '@bemedev/dev-utils/rolldown';
import { addTarball, cleanup } from '@bemedev/dev-utils/build-tests';
```

---

## `vitestAlias`

Vitest plugin that reads your `tsconfig.json` path mappings and injects
them as Vitest/Vite aliases — no manual duplication needed.

### `createAlias(tsconfig?)`

Converts `compilerOptions.paths` (and optional `baseUrl`) from a tsconfig
object into a Vite-compatible alias map.

```typescript
import tsconfig from './tsconfig.json';
import { createAlias } from '@bemedev/dev-utils/vitest-alias';

// vitest.config.ts
export default defineConfig({
  test: {
    alias: createAlias(tsconfig),
  },
});
```

**Parameters**

| Name       | Type                  | Description                 |
| ---------- | --------------------- | --------------------------- |
| `tsconfig` | `TsConf \| undefined` | Parsed tsconfig JSON object |

**Returns** `Record<string, string>` — alias map ready for `test.alias`.

---

### `aliasTs(tsconfig?)`

A Vitest/Vite plugin that automatically calls `createAlias` and merges the
result into `test.alias`.

> **Note:** Make sure `"resolveJsonModule": true` is set in your
> `compilerOptions`, or pass the parsed JSON directly.

```typescript
import tsconfig from './tsconfig.json';
import { aliasTs } from '@bemedev/dev-utils/vitest-alias';

// vitest.config.ts
export default defineConfig({
  plugins: [aliasTs(tsconfig)],
});
```

**Parameters**

| Name       | Type                  | Description                 |
| ---------- | --------------------- | --------------------------- |
| `tsconfig` | `TsConf \| undefined` | Parsed tsconfig JSON object |

**Returns** a Vitest `Plugin`.

---

## `vitestExclude`

Vitest plugin that uses glob patterns to dynamically build `test.include`
and `coverage.include` lists — no need to maintain `test.exclude` manually.

### `exclude(args?)`

Uses default patterns (`src/**/*.ts` for coverage,
`src/**/*.{test,spec}.{ts,js,tsx,jsx}` for tests) and applies optional
ignore lists.

```typescript
import { exclude } from '@bemedev/dev-utils/vitest-exclude';

// vitest.config.ts
export default defineConfig({
  plugins: [
    exclude({
      ignoreTestFiles: ['src/fixtures/**'],
      ignoreCoverageFiles: ['src/**/*.types.ts'],
    }),
  ],
});
```

**Parameters (`args`)**

| Property              | Type                    | Description                                  |
| --------------------- | ----------------------- | -------------------------------------------- |
| `ignoreTestFiles`     | `string[] \| undefined` | Glob patterns to exclude from test discovery |
| `ignoreCoverageFiles` | `string[] \| undefined` | Glob patterns to exclude from coverage       |

**Returns** a Vitest `Plugin`.

---

### `exclude.withPattern(patterns, args)`

Same as `exclude`, but lets you provide custom glob patterns instead of the
defaults.

```typescript
exclude.withPattern(
  {
    patternTest: 'tests/**/*.test.ts',
    patternCov: 'src/**/*.ts',
  },
  { ignoreTestFiles: ['tests/fixtures/**'] },
);
```

**Parameters**

| Name          | Type                 | Description                         |
| ------------- | -------------------- | ----------------------------------- |
| `patternTest` | `string \| string[]` | Glob(s) for test file discovery     |
| `patternCov`  | `string \| string[]` | Glob(s) for coverage file discovery |
| `args`        | same as `exclude`    | Optional ignore lists               |

**Returns** a Vitest `Plugin`.

---

### `create(args?)`

Plain async function (not a plugin) that resolves glob patterns and returns
`{ files, coverage }` string arrays using the default patterns.

```typescript
import { create } from '@bemedev/dev-utils/vitest-exclude';

const { files, coverage } = await create({
  ignoreTestFiles: ['src/fixtures/**'],
  ignoreCoverageFiles: ['src/**/*.types.ts'],
});
```

**Parameters (`args`)**

| Property              | Type                    | Description                                  |
| --------------------- | ----------------------- | -------------------------------------------- |
| `ignoreTestFiles`     | `string[] \| undefined` | Glob patterns to exclude from test discovery |
| `ignoreCoverageFiles` | `string[] \| undefined` | Glob patterns to exclude from coverage       |

**Returns** `Promise<{ files: string[]; coverage: string[] }>`.

---

### `create.withPattern(patterns, args)`

Same as `create`, but accepts custom glob patterns for both test and
coverage discovery.

```typescript
import { create } from '@bemedev/dev-utils/vitest-exclude';

const { files, coverage } = await create.withPattern(
  {
    patternTest: 'tests/**/*.test.ts',
    patternCov: 'src/**/*.ts',
  },
  { ignoreTestFiles: ['tests/fixtures/**'] },
);
```

**Parameters**

| Name          | Type                 | Description                         |
| ------------- | -------------------- | ----------------------------------- |
| `patternTest` | `string \| string[]` | Glob(s) for test file discovery     |
| `patternCov`  | `string \| string[]` | Glob(s) for coverage file discovery |
| `args`        | same as `create`     | Optional ignore lists               |

**Returns** `Promise<{ files: string[]; coverage: string[] }>`.

---

## `vitestExtended`

Extended helpers for writing structured, type-safe Vitest tests.

### `createTests(func, args?)`

Creates a reusable test suite for a function with `acceptation`, `success`,
and `fails` runners.

```typescript
import { createTests } from '@bemedev/dev-utils/vitest-extended';

// add.ts
export const add = (a: number, b: number) => a + b;

// add.test.ts
const { acceptation, success, fails } = createTests(add);

describe('add', () => {
  describe('acceptation', acceptation());

  describe(
    'success',
    success(
      { invite: '1 + 2 = 3', parameters: [1, 2], expected: 3 },
      { invite: '0 + 0 = 0', parameters: [0, 0], expected: 0 },
    ),
  );
});
```

> **Note:** When the first parameter is an array, wrap it in another array:
> `parameters: [[1, 2, 3]]`.

**Parameters**

| Name             | Type                        | Description                                                     |
| ---------------- | --------------------------- | --------------------------------------------------------------- |
| `func`           | `Fn`                        | The function under test                                         |
| `args.transform` | `NextFn<F> \| undefined`    | Optional transformer applied to the return value                |
| `args.toError`   | `ToError_F<F> \| undefined` | Optional function that derives an expected error from the input |

**Returns** `{ acceptation, success, fails }`:

| Method              | Signature    | Description                                            |
| ------------------- | ------------ | ------------------------------------------------------ |
| `acceptation()`     | `() => void` | Runs two checks: function is defined and is a function |
| `success(...cases)` | `() => void` | Runs `test.concurrent.each` for passing cases          |
| `fails(...cases)`   | `() => void` | Runs `test.concurrent.each` and expects thrown errors  |

---

### `createTests.withImplementation(f, opts)`

Same as `createTests` but replaces the implementation with a `vi.fn()` mock
before the test suite runs.

```typescript
const { acceptation, success } = createTests.withImplementation(myFn, {
  name: 'myFn',
  instanciation: async () => realImpl,
});
```

**`opts` properties**

| Property        | Type                        | Description                                              |
| --------------- | --------------------------- | -------------------------------------------------------- |
| `instanciation` | `() => Promise<F> \| F`     | Factory called in `beforeAll` to set mock implementation |
| `name`          | `string`                    | Display name used in acceptation tests                   |
| `transform`     | `NextFn<F> \| undefined`    | Optional return-value transformer                        |
| `toError`       | `ToError_F<F> \| undefined` | Optional error deriver                                   |

---

### `doneTest(invite, fn, options?)`

Wraps a callback-style (done-based) test into a Vitest `test`. The test
passes only when `done()` is called within the timeout.

```typescript
import { doneTest } from '@bemedev/dev-utils/vitest-extended';

doneTest('fires callback', done => {
  emitter.once('event', done);
  emitter.emit('event');
});
```

**Parameters**

| Name      | Type                         | Default | Description                           |
| --------- | ---------------------------- | ------- | ------------------------------------- |
| `invite`  | `string`                     | —       | Test description                      |
| `fn`      | `(done: () => void) => void` | —       | Test body (sync, receives `done`)     |
| `options` | `number \| TestOptions`      | `100`   | Timeout in ms or Vitest `TestOptions` |

**Variants**

| Variant                                     | Description                |
| ------------------------------------------- | -------------------------- |
| `doneTest.fails(invite, fn, options?)`      | Expects the test to fail   |
| `doneTest.concurrent(invite, fn, options?)` | Runs the test concurrently |

---

### `createFakeWaiter(vi)`

Creates a fake-timer-aware async waiter. If fake timers are active it
advances them; otherwise it uses a real `sleep`.

```typescript
import { createFakeWaiter } from '@bemedev/dev-utils/vitest-extended';

const wait = createFakeWaiter(vi);

test('advances time', async () => {
  vi.useFakeTimers();
  await wait(500); // advances fake timers by 500 ms
});
```

**Parameters**

| Name | Type          | Description        |
| ---- | ------------- | ------------------ |
| `vi` | `VitestUtils` | Vitest `vi` object |

**Returns** `(ms?: number, times?: number) => Promise<void>`

**Variants**

| Variant                                      | Signature                                               | Description                                                       |
| -------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------- |
| `createFakeWaiter.withDefaultDelay(vi, ms?)` | `(index, times?) => [string, () => Promise<void>]`      | Returns a labelled waiter with a fixed delay                      |
| `createFakeWaiter.all(vi)`                   | `(index, ms?, times?) => [string, () => Promise<void>]` | Returns a labelled waiter with configurable delay and repetitions |

---

### `useEach(func, transform?)`

A typed wrapper around `test.concurrent.each` for synchronous functions.

```typescript
import { useEach } from '@bemedev/dev-utils/vitest-extended';

const run = useEach(add);

run(['1+2', [1, 2], 3], ['0+0', [0, 0], 0]);
```

**Parameters**

| Name        | Type                     | Description                       |
| ----------- | ------------------------ | --------------------------------- |
| `func`      | `Fn`                     | Function under test               |
| `transform` | `NextFn<F> \| undefined` | Optional return-value transformer |

**Returns** `(...cases: TestArgs2<F>) => void`

---

### `useEachAsync(func, transform?)`

Same as `useEach` but awaits the function result.

---

### `useErrorAsyncEach(func, transform?, toError?)`

Runs async error cases using `expect(fn).rejects.toThrowError(error)`.

```typescript
const runErrors = vitestExtended.useErrorAsyncEach(
  divide,
  undefined,
  ([_, b]) => (b === 0 ? 'Division by zero' : undefined),
);

runErrors(['divide by 0', [1, 0], undefined]);
```

---

### `useTestFunctionAcceptation(f, name?)` / `useTFA`

Runs two acceptation checks: the function is defined and is actually a
function.

```typescript
vitestExtended.useTFA(myFunction, 'myFunction');
```

---

### Utility helpers

| Export                             | Signature                           | Description                                       |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------- |
| `isDefined(value?)`                | `(value?: T \| null) => value is T` | Type guard — not `undefined` or `null`            |
| `isFunction(arg)`                  | `(arg: any) => boolean`             | Type guard — checks if arg is a callable function |
| `identity(value)`                  | `<T>(value: T) => T`                | Returns the value unchanged                       |
| `defaultEquality(value, expected)` | `(a, b) => void`                    | Strict equality; sorts arrays before comparing    |

---

## `rolldownConfig`

Rolldown bundler configuration factory with built-in plugins for TypeScript
declarations, path aliasing, circular dependency detection, and
tree-shaking externals.

### `defineConfig(additionals?)`

Shorthand for `defineConfig.default`.

### `defineConfig.default(params?)`

Produces a full Rolldown config with the default plugin pipeline:

1. **alias** — resolves tsconfig path aliases (`rollup-plugin-tsc-alias`)
2. **tsPaths** — resolves tsconfig path imports at bundle time
   (`rollup-plugin-tsconfig-paths`)
3. **circulars** — warns on circular dependencies
   (`rollup-plugin-circular-dependency`)
4. **externals** — marks `dependencies` and `peerDependencies` as external
   (`rollup-plugin-node-externals`)
5. **typescript** — emits `.d.ts` declarations via the TypeScript compiler
   API
6. **clean** — removes JS outputs for files that produce empty chunks

```typescript
// rolldown.config.ts
import { defineConfig } from '@bemedev/dev-utils/rolldown';

export default defineConfig.default({
  dir: 'lib',
  sourcemap: true,
  excludesTS: ['src/fixtures/**/*.ts'],
});
```

**`Params` properties**

| Property         | Type                                    | Default       | Description                                             |
| ---------------- | --------------------------------------- | ------------- | ------------------------------------------------------- |
| `dir`            | `string`                                | `'lib'`       | Output directory                                        |
| `sourcemap`      | `boolean`                               | `false`       | Emit sourcemaps                                         |
| `declarationMap` | `boolean`                               | `undefined`   | Emit declaration maps                                   |
| `excludesTS`     | `string \| string[]`                    | `[]`          | Extra TS files to exclude from declaration emit         |
| `circularDeps`   | `string \| string[]`                    | `[]`          | Extra patterns exempt from circular-dep warnings        |
| `ignoresJS`      | `string \| string[]`                    | `[]`          | Patterns whose empty-bundle warnings are suppressed     |
| `externals`      | `string \| string[]`                    | `[]`          | Additional packages to mark as external                 |
| `plugins`        | `(RolldownPluginOption \| PluginKey)[]` | default order | Custom plugin list; string keys select built-in plugins |

**Default excluded files** (always applied):

```
**/node_modules/**/*
**/__tests__/**/*
**/*.test.ts  /  **/*.test-d.ts
**/*.fixtures.ts  /  **/fixtures.ts
src/fixtures/**/*.ts
```

**Output format:** both `esm` (`.js`) and `cjs` (`.cjs`), with
`preserveModules: true`.

---

### `defineConfig.bemedev(params?)`

Opinionated preset that extends `defineConfig.default` with:

- Sourcemaps **enabled by default**
- `DEFAULT_CIRCULAR_DEPS` merged into `circularDeps` (`**/types.ts`,
  `**/*.types.ts`, …)
- `DEFAULT_EXCLUDE` merged into `excludesTS`
- `DEFAULT_CIRCULAR_DEPS` merged into `ignoresJS`

```typescript
export default defineConfig.bemedev({
  excludesTS: ['src/my-fixtures/**'],
});
```

---

### Plugin builders (`PLUGIN_BUILDERS`)

Individual plugin factories are available for custom pipeline assembly:

| Key          | Function               | Wraps                                 |
| ------------ | ---------------------- | ------------------------------------- |
| `alias`      | `alias(options?)`      | `rollup-plugin-tsc-alias`             |
| `tsPaths`    | `tsPaths(options?)`    | `rollup-plugin-tsconfig-paths`        |
| `circulars`  | `circulars(options?)`  | `rollup-plugin-circular-dependency`   |
| `externals`  | `externals(options?)`  | `rollup-plugin-node-externals`        |
| `typescript` | `typescript(options?)` | TypeScript compiler API + `tsc-alias` |
| `clean`      | `clean(options?)`      | Custom post-build JS cleanup          |

Pass plugin keys as strings in the `plugins` array to reorder or subset
them:

```typescript
defineConfig.default({
  plugins: ['alias', 'tsPaths', 'externals', 'typescript'],
});
```

---

## `buildTests`

CLI tooling that packs your built library as a local tarball, installs it
under the alias `this-gen-1`, runs your test suite against the real
distributable, then tears down.

Available as a sub-path export:

```typescript
import {
  addTarball,
  cleanup,
  customImport,
  THIS1,
} from '@bemedev/dev-utils/build-tests';
```

### CLI usage

The binary is `build-tests`. It exposes three subcommands:

```bash
# Install the tarball (pre-test hook)
build-tests pre

# Run tests with pre/post lifecycle
build-tests test [--pretest] [--posttest]

# Clean up tarball + uninstall (post-test hook)
build-tests post
```

`package.json` integration (auto-configured):

```json
{
  "scripts": {
    "pretest": "build && build-tests pre",
    "posttest": "fmt && build-tests post"
  }
}
```

---

### `addTarball()`

Programmatic API for the `pre` step:

1. Builds the `package.json` for the `outDir` (strips `scripts`,
   `devDependencies`, `files`; fixes paths)
2. Runs `pnpm pack` into `.pack/`
3. Installs the resulting `.tgz` as `this-gen-1` in `devDependencies`

```typescript
import { addTarball } from '@bemedev/dev-utils/build-tests';

await addTarball();
```

---

### `cleanup()`

Programmatic API for the `post` step:

1. Removes the `.pack/` folder
2. Runs `pnpm remove this-gen-1`

```typescript
import { cleanup } from '@bemedev/dev-utils/build-tests';

cleanup();
```

---

### `customImport(fn?)`

Dynamically imports the installed package (`this-gen-1`) and optionally
transforms its exports via a mapper function.

```typescript
import { customImport } from '@bemedev/dev-utils/build-tests';

// Import the default export as-is
const out = await customImport();

// Import and pick a specific export
const myFn = await customImport(mod => mod.myFn);
```

**Parameters**

| Name | Type                        | Default      | Description                                             |
| ---- | --------------------------- | ------------ | ------------------------------------------------------- |
| `fn` | `(out: IndexImport) => T`   | `identity`   | Mapper applied to the imported module; defaults to no-op |

**Returns** `Promise<T>` — the mapped module output.

---

### `THIS1`

Constant string `'this-gen-1'` — the package alias used by `addTarball` and
`cleanup` when installing/removing the local tarball.

```typescript
import { THIS1 } from '@bemedev/dev-utils/build-tests';

console.log(THIS1); // 'this-gen-1'
```

---

### Types

| Name          | Description                                                          |
| ------------- | -------------------------------------------------------------------- |
| `IndexImport` | Type of the module returned by a dynamic `import(THIS1)` call (`any`) |

---

<br/>

## Licence

MIT

## CHANGELOG

Read [CHANGELOG.md](CHANGELOG.md) for details about all changes and
versions.

<br/>

## Author

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Links

- [GitHub Repository](https://github.com/chlbri/node-dev-utils)
- [Website](https://bemedev.vercel.app)
