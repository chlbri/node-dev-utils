## CHANGELOG

<br/>

<details>
<summary>

## **[0.5.3] - 13/04/2026** => _00:00_

</summary>

- Add `.husky/commit-msg` hook exécutable : déclenche `npm run ci` à chaque commit sauf si le message contient `_NO_CI`
- Update dépendances : `rollup-plugin-node-externals` `^8.1.2` → `^9.0.1`
- Update dépendances dev : `@size-limit/file` `^12.0.1` → `^12.1.0`, `@types/node` `^25.5.2` → `^25.6.0`, `globals` `^17.4.0` → `^17.5.0`, `jsdom` `^29.0.1` → `^29.0.2`, `oxfmt` `^0.43.0` → `^0.45.0`, `oxlint` `^1.58.0` → `^1.60.0`, `prettier` `^3.8.1` → `^3.8.2`, `rolldown` `1.0.0-rc.13` → `1.0.0-rc.15`, `size-limit` `^12.0.1` → `^12.1.0`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.5.2] - 04/04/2026** => _12:00_

</summary>

- Fix : export `./build-tests` dans `package.json` corrigé — pointait vers
  `cli/index` (binaire CLI) au lieu de `index` (API programmatique)
- Docs : skill `update-docs` restructuré en fichiers `steps/` et `scripts/`
- Docs : `CHANGELOG.md` et `README.md` mis à jour pour la version 0.5.1
- Update dépendances : `lru-cache` `11.2.7` → `11.3.0`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.5.1] - 04/04/2026** => _00:00_

</summary>

- Add `src/build-tests/import.ts` : utilitaire `customImport` pour importer
  dynamiquement le paquet testé avec transformation optionnelle
- Add `src/build-tests/types.ts` : type `IndexImport`
- Add `src/utils/identity.ts` : fonction générique `identity`
- Add export `./utils` dans `package.json`
- Rename `this1` → `THIS1` dans `constants.ts` (convention
  SCREAMING_SNAKE_CASE)
- Fix `buildPackageJson` : gestion du champ `bin` sous forme de `string` en
  plus d'`object`
- Remove `FIXTURES` constant de `constants.ts` (commenté)
- Update `tsconfig.json` : ajout du path alias `#utils` vers
  `src/utils/index.ts`
- Update `rolldown.config.ts` : exclusion de `**/fixtures.ts` et
  `**/*.fixtures.ts`
- Update dépendances : `@types/node` `^25.5.1` → `^25.5.2`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.5.0] - 03/04/2026** => _10:16_

</summary>

- Add `create` function dans `vitest-exclude` : prend `Args[1]` (listes
  d'ignorés) et retourne `{ files, coverage }`
- Add `create.withPattern` : prend les `Args` complets (patterns +
  ignorés), délégation interne pour les deux cas d'usage
- Refactor `exclude.withPattern` pour déléguer à `create.withPattern`

</details>

<br/>

<details>
<summary>

## **[0.4.0] - 03/04/2026** => _09:51_

</summary>

- Refactor `rolldown-config/config.ts` : remplace
  `transform.inject.require` par `esmExternalRequirePlugin()` de
  `rolldown/plugins`
- Remove import `path` from `node:path` (plus nécessaire)
- Update dépendances : `rolldown` rc.12 → rc.13, `oxlint` 1.57 → 1.58,
  `oxfmt` 0.42 → 0.43, `@types/node` 25.5.0 → 25.5.1
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.3.2] - 27/03/2026** => _20:43_

</summary>

- Remove `src/index.ts` root barrel export file
- Remove `main`, `types`, `module` fields from `package.json`
- Remove root `"."` entry from `exports` map in `package.json`
- Update `vitest-exclude` tests to reflect removal of `src/index.ts`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.3.1] - 27/03/2026** => _18:11_

</summary>

- Remove `this-gen-1` temporary local tarball dependency
  (`file:.pack/bemedev-dev-utils-0.2.0.tgz`) used for integration testing
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.3.0] - 27/03/2026** => _18:06_

</summary>

- Refactor CI hooks: move `npm run ci` from `pre-commit` to `commit-msg`
  hook for better hook separation
- Add `this-gen-1` local tarball dependency for integration testing
  (`file:.pack/bemedev-dev-utils-0.2.0.tgz`)
- Refactor `rolldown-config` fixtures: simplify `beforeAll` arrow syntax
  and clean up whitespace
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.2.0] - 27/03/2026** => _17:56_

</summary>

- Refactor `src/index.ts`: remplace les re-exports par modules
  (`export * from './module'`) par des re-exports explicites par fichier
  (`export * from './module/file'`) pour une surface d'API plus précise
- Fix `vitest-alias`: remplace le type `UserConfig` par `ViteUserConfig`
  depuis `vitest/config` (type non déprécié)
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.1.2] - 27/03/2026** => _17:45_

</summary>

- Refactor main entry to flat re-exports (replace namespace exports
  `export * as X` with `export * from`)
- Remove `types` re-exports from `rolldown-config` and `vitest-extended`
- Remove Solid.js testing environment (drop `solid()` plugin, `jsdom`
  environment, `@solidjs/testing-library`, `@testing-library/jest-dom`,
  `@testing-library/user-event`, `vite-plugin-solid`)
- Remove `types` fields from `exports` sub-path entries in `package.json`
- Remove `@testing-library/jest-dom` from `tsconfig.json` types
- Remove obsolete test files (`src/index.test.ts`,
  `src/vitest-exclude/Counter.test.tsx`, `src/vitest-exclude/Counter.tsx`)
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.1.1] - 27/03/2026** => _16:56_

</summary>

- Add `exports` sub-path entries in `package.json` for all modules (`.`,
  `./build-tests`, `./rolldown`, `./vitest-alias`, `./vitest-exclude`,
  `./vitest-extended`)
- Fix import path in rolldown-config fixtures to use new `./rolldown`
  sub-path export
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.1.0] - 27/03/2026** => _13:47_

</summary>

- Add inline @bemedev/\* packages as src subfolders with re-exports
- Add vitest.alias, vitest.exclude, rolldown.config, vitest.extended,
  build-tests modules
- Disable test parallelism and add build-tests CLI to pretest/posttest
  hooks
- Refactor bin entry in package.json to object structure
- Move vitest and rolldown to peer dependencies
- Move glob to production dependencies and add TypeScript peerDependencies
- Rename package to @bemedev/dev-utils
- Clean up obsolete test files and update configurations
- Upgrade dependencies via pnpm up --latest
- <u>Test coverage **_100%_**</u>

</details>

<br/>

## Auteur

chlbri (bri_lvi@icloud.com)

[My github](https://github.com/chlbri?tab=repositories)

[<svg width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/></svg>](https://github.com/chlbri?tab=repositories)

<br/>

## Liens

- [Documentation](https://github.com/chlbri/new-package)
