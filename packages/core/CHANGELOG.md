## CHANGELOG

<br/>

<details>
<summary>

## **[1.1.1] - 24/07/2026** => _15:13_

</summary>

- Update: upgrade `oxc-transform` dependency to `^0.141.0`
- Update: upgrade `rolldown` dev and peer dependency to `^1.2.0`
- Update: bump package version to `1.1.1`

</details>

<br/>

<details>
<summary>

## **[1.1.0] - 14/07/2026** => _14:09_

</summary>

- Add: fast compilation plugin `typescriptFast` (key `fast`) that uses
  `oxc-transform` to generate `.d.ts` declaration files quickly without
  using the full TypeScript compiler
- Add: `defineConfig.fast` configuration target to compile packages using
  the fast compile plugin
- Add: `getConfig` utility to dynamically read and parse `tsconfig.json`
  relative to the search path
- Add: `#bemedev/*` path alias mapping in `tsconfig.json` for internal
  utilities
- Refactor: relocate the internal `bemedev/globals` types and utilities
  directory from `vitest-extended` to `utils` workspace under path alias
  `#bemedev/globals/` and rewrite all imports across the codebase
- Refactor: resolve output directories dynamically in `buildOutput` using
  `tsconfig.json`'s `outDir` configuration
- Update: export `esmExternalRequirePlugin` (`esm`) and `typescriptFast`
  (`fast`) builders in `PLUGIN_BUILDERS` for custom pipeline configuration
- Update: bump package version to `1.1.0` and upgrade `oxc-transform` to
  `^0.140.0`

</details>

<br/>

<details>
<summary>

## **[1.0.2] - 14/07/2026** => _12:15_

</summary>

- Fix: resolve Vitest workspace configuration error by removing
  machine-specific hardcoded absolute paths
- Refactor: export `defineProject` wrapper in `vitest-extended` for unified
  workspace test defaults and alias resolution
- Refactor: migrate typescript plugin from `oxc-transform` to
  `@typescript/typescript6` for generating declaration files
- Remove: delete redundant `packages/core/src/build-tests/test.test.ts`
  test file
- Update: remove `rollup-plugin-tsc-alias`, `rollup-plugin-tsconfig-paths`,
  and standard `typescript` dependencies
- Update: add `@typescript/typescript6` and `unplugin-dts` dependencies

</details>

<br/>

<details>
<summary>

## **[1.0.1] - 14/07/2026** => _10:23_

</summary>

- Remove: alias plugin for alias resolution

</details>

<br/>

<details>
<summary>

## **[1.0.0] - 14/07/2026** => _10:17_

</summary>

- Remove: `tsPaths` plugin for import path resolution
- Add: test utility (`test.test.ts`) using `oxc-parser` to parse and
  analyze test files
- Refactor: custom `tsconfig.json` reading logic in Rolldown configuration
  plugins
- Refactor: consolidate utility modules (move `utils.ts` to
  `utils/array.ts`) and remove redundant test suites
  (`declarationMap.built.test.ts`, `default.built.test.ts`,
  `withoutOptions.test.ts`)
- Update: upgrade global TypeScript to version `7.0.2`
- Update: upgrade `vitest` and `@vitest/ui` to version `4.1.10`, and
  `rolldown` to `^1.1.5`
- Update: upgrade `pnpm` package manager to version `11.13.0`
- Update: improve global upgrade script (`up`) using
  `pnpm up --latest && npm-check-updates`

</details>

<br/>

<details>
<summary>

## **[0.8.3] - 25/06/2026** => _10:56_

</summary>

- Enhance: `getTypescriptOutdir` résout désormais `tsconfig.json`
  relativement au répertoire de travail actuel (`process.cwd()`) au lieu du
  chemin absolu du fichier source
- Enhance: ajout d'une valeur par défaut (`./lib`) si `outDir` n'est pas
  défini dans le fichier de configuration TypeScript (`tsconfig.json`)
- Update dépendances dev: `@types/node` `^26.0.0` → `^26.0.1`, `globals`
  `^17.6.0` → `^17.7.0`, `rolldown` `1.1.2` → `1.1.3`

</details>

<br/>

<details>
<summary>

## **[0.8.2] - 22/06/2026** => _19:46_

</summary>

- Remove: `.vscode/tasks.json` supprimé — tâches automatiques `git pull` et
  `pnpm install` à l'ouverture du dossier retirées
- Fix: script `rm:lib` du projet de test `project1` corrigé — cible
  `./dist` au lieu de `./lib`
- Update: `pnpm-workspace.yaml` — ajout de `minimumReleaseAge: 300`
- Update dépendances dev: `oxfmt` `^0.55.0` → `^0.56.0`, `oxlint` `^1.70.0`
  → `^1.71.0`, `pnpm` `11.1.1` → `11.7.0`

</details>

<br/>

<details>
<summary>

## **[0.8.1] - 22/06/2026** => _18:00_

</summary>

- Remove: export `./vitest-alias` supprimé — la résolution des alias est
  désormais prise en charge nativement par Vite via `resolve.tsConfigPaths`
- Refactor: migration vers une architecture pnpm monorepo (séparation du
  core et des projets de test)

</details>

<br/>

<details>
<summary>

## **[0.8.0] - 06/06/2026** => _20:34_

</summary>

- Enhance: vitest-alias supports loading tsconfig.json automatically and
  custom config paths
- Add: export types Undefiny, Fn, and RuA from vitest-extended
- Update: guide against single-test describe blocks in test organization
  guidelines
- Refactor: rename .claude configuration directory to .agents
- Refactor: replace pre-commit hook with verifying background loop in
  commit-msg hook
- Update: development dependencies (vitest, rolldown, oxlint, oxfmt, tsx,
  @types/node)
- <u>Test coverage **_89.49%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.7.0] - 13/05/2026** => _21:10_

</summary>

- Refactor: unified publish workflows (beta, canary, latest) into a single
  `publish-NPM.yml` with conditional type selection — removed
  `publish-beta.yml` and `publish-canary.yml`
- Update: devcontainer now uses `pnpm@latest` and adds
  `anthropic.claude-code` VS Code extension
- Update: vitest, @vitest/coverage-v8 and @vitest/ui bumped to 4.1.6
- Update: oxfmt bumped to 0.49.0, oxlint to 1.64.0, @types/node to 25.7.0
- Update: pnpm package manager updated to 11.1.1
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.6.11] - 08/05/2026** => _10:17_

</summary>

- Better github actions
- <u>Test coverage **_100%_**</u>

</details>

<details>
<summary>

## **[0.6.10] - 08/05/2026** => _09:47_

</summary>

- Better github actions
- <u>Test coverage **_100%_**</u>

</details>

<details>
<summary>

## **[0.6.9] - 08/05/2026** => _09:46_

</summary>

- Better github actions
- <u>Test coverage **_100%_**</u>

</details>

<details>
<summary>

## **[0.6.8] - 08/05/2026** => _09:36_

</summary>

- Better github actions
- <u>Test coverage **_100%_**</u>

</details>

  <details>
<summary>

## **[0.6.7] - 08/05/2026** => _09:13_

</summary>

- Add : tests de fonctions d'import améliorés avec cas d'erreur
  additionnels
- Fix : compilation TypeScript — initialisation améliorée du compilateur
  avec gestion correcte de la localisation des lib TypeScript
- Fix : configuration du compilateur TypeScript — utilisation de
  `configFile.options` pour les options du compilateur
- Refactor : réordonnancement du plugin TypeScript dans `producePlugins`,
  amélioration de la configuration TypeScript et du traitement des tests
- Refactor : types améliorés et gestion asynchrone optimisée dans
  `vitest-exclude` et `vitest-extended`
- Update dépendances dev : `oxfmt` `^0.47.0` → `^0.48.0`, `oxlint`
  `^1.62.0` → `^1.63.0`, `typescript` `^6.0.2` → `^6.0.3`
- <u>Test coverage **_100%_**</u>

</details>

<details>
<summary>

## **[0.6.6] - 03/05/2026** => _12:06_

</summary>

- Fix : `createImportFnTests` support optionnel `FAILS` et
  `describe.skipIf` pour éviter les sections vides
- Update : tests `Built package exports` enrichis avec de nouveaux cas
  d'import
- Update dépendances dev : `@bemedev/app-ts` `3.0.1` → `3.0.2`, `globals`
  `^17.5.0` → `^17.6.0`, `oxfmt` `^0.46.0` → `^0.47.0`, `oxlint` `^1.61.0`
  → `^1.62.0`, `rolldown` `1.0.0-rc.17` → `1.0.0-rc.18`, `zod` `^4.3.6` →
  `^4.4.2`, `tsc-alias` `^1.8.16` → `^1.8.17`

</details>

<details>
<summary>

## **[0.6.5] - 24/04/2026** => _12:24_

</summary>

- Fix : `build-tests` export mis à jour pour utiliser `./imports` au lieu
  de l'ancien `types`
- Update : `customImport()` accepte maintenant un `path` optionnel et
  résout dynamiquement le module cible
- Fix : tests `vitest-exclude` enrichis avec les nouveaux chemins de
  `src/__tests__/package-exports.test.ts` et `src/build-tests/imports/*`
- Fix : tests `vitest-extended` — numérotation des cas d'acceptation
  alignée sur le format `#01`, `#02`
- Add : dépendance dev `zx` ajoutée

</details>

<details>
<summary>

## **[0.6.4] - 22/04/2026** => _23:37_

</summary>

- Fix : typage amélioré de `createTests` et
  `createTests.withImplementation` dans `vitest-extended`
- Fix : conversion `transform` prise en charge correctement pour les appels
  asynchrones de `useErrorAsyncEach` et `useEachAsync`
- Fix : export de type `_CreateTests_F` restructuré pour un usage plus
  propre

</details>

<details>
<summary>

## **[0.6.3] - 22/04/2026** => _22:56_

</summary>

- Fix : gestion asynchrone améliorée dans `vitest-extended` — `pass` attend
  maintenant les transformations asynchrones
- Fix : correction des types de plugin dans `vitest-exclude` pour une
  compatibilité Vitest plus simple
- Add : fixture de test de couverture `createTests.cov.test.ts` enrichie
  avec un transformateur asynchrone
- Update dépendances dev : `@vitest/coverage-v8` `4.1.4` → `4.1.5`,
  `@vitest/ui` `4.1.4` → `4.1.5`, `oxfmt` `^0.45.0` → `^0.46.0`, `oxlint`
  `^1.60.0` → `^1.61.0`, `rolldown` `1.0.0-rc.16` → `1.0.0-rc.17`, `vitest`
  `4.1.4` → `4.1.5`

</details>

<details>
<summary>

## **[0.6.2] - 19/04/2026** => _15:57_

</summary>

- Fix : compilateur TypeScript — amélioration de l'initialisation du
  `createCompilerHost()` avec gestion correcte du répertoire des lib de
  TypeScript
- Fix : configuration du compilateur TypeScript — utilisation de
  `configFile.options` pour les options du compilateur avec support des
  paramètres d'émission
- Update : ordre des plugins dans rolldown config — le plugin TypeScript
  s'exécute maintenant après `esmExternalRequirePlugin()` pour une
  meilleure interopérabilité
- Update : vitest-extended — support des opérations asynchrones dans
  `doneTest` avec await sur les appels de service
- Fix : types TypeScript — correction des affectations de type dans
  `createTests.withImplementation()`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.6.1] - 19/04/2026** => _13:16_

</summary>

- Fix : compilateur TypeScript — `createCompilerHost()` utilise maintenant
  `configFile.options` au lieu d'un objet vide pour une meilleure cohérence
  avec les options du compilateur
- Add : plugin TypeScript plugin externe `typescript.config.ts` avec
  support configurable pour les transformations de compiler options
- Update dépendances : `rollup-plugin-node-externals` `^8.1.2` → `^9.0.1`
- Refactor : réorganisation de la structure `.github/skills/` vers
  `.claude/skills/` pour une meilleure intégration des Copilot skills
- Enhance : documentation des skills mise à jour avec instructions
  détaillées pour `update-docs`, `analyze-tests`, `check-spacing`,
  `organize-tests`
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.6.0] - 19/04/2026** => _13:04_

</summary>

- Fix : compilateur TypeScript — `createCompilerHost()` utilise maintenant
  `configFile.options` au lieu d'un objet vide, et active le host
  compilateur pour l'émission de programme
- Update dépendances dev : `prettier` `^3.8.2` → `^3.8.3`, `rolldown`
  `1.0.0-rc.15` → `1.0.0-rc.16`, `typescript` `^6.0.2` → `^6.0.3`
- Update `vitest.config.ts` : réduction des timeouts (`bail` `1000` →
  `100`, `testTimeout` et `hookTimeout` `100000` → `50000`)
- <u>Test coverage **_100%_**</u>

</details>

<br/>

<details>
<summary>

## **[0.5.3] - 13/04/2026** => _00:00_

</summary>

- Add `.husky/commit-msg` hook exécutable : déclenche `npm run ci` à chaque
  commit sauf si le message contient `_NO_CI`
- Update dépendances : `rollup-plugin-node-externals` `^8.1.2` → `^9.0.1`
- Update dépendances dev : `@size-limit/file` `^12.0.1` → `^12.1.0`,
  `@types/node` `^25.5.2` → `^25.6.0`, `globals` `^17.4.0` → `^17.5.0`,
  `jsdom` `^29.0.1` → `^29.0.2`, `oxfmt` `^0.43.0` → `^0.45.0`, `oxlint`
  `^1.58.0` → `^1.60.0`, `prettier` `^3.8.1` → `^3.8.2`, `rolldown`
  `1.0.0-rc.13` → `1.0.0-rc.15`, `size-limit` `^12.0.1` → `^12.1.0`
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
