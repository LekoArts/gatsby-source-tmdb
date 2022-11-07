# gatsby-source-tmdb

## 3.0.4

### Patch Changes

- [#24](https://github.com/LekoArts/gatsby-source-tmdb/pull/24) [`d54a26f`](https://github.com/LekoArts/gatsby-source-tmdb/commit/d54a26f947a019a2abf7f91511686101d431a4b4) Thanks [@LekoArts](https://github.com/LekoArts)! - Update all dependencies

## 3.0.3

### Patch Changes

- [#21](https://github.com/LekoArts/gatsby-source-tmdb/pull/21) [`3ea4502`](https://github.com/LekoArts/gatsby-source-tmdb/commit/3ea45020400291c2111565d5068deac114895d1f) Thanks [@LekoArts](https://github.com/LekoArts)! - chore: Update Packages

  Also changed the `defaults` handling under the hood, but no changes in behavior.

## 3.0.2

### Patch Changes

- [#19](https://github.com/LekoArts/gatsby-source-tmdb/pull/19) [`609c3db`](https://github.com/LekoArts/gatsby-source-tmdb/commit/609c3dba2a0e9f0365a89d598b852effadda7950) Thanks [@LekoArts](https://github.com/LekoArts)! - chore: Use Parcel for package compilation

## 3.0.1

### Patch Changes

- [#17](https://github.com/LekoArts/gatsby-source-tmdb/pull/17) [`a77ef26`](https://github.com/LekoArts/gatsby-source-tmdb/commit/a77ef26f98939e19b603902b15477179e6619476) Thanks [@LekoArts](https://github.com/LekoArts)! - chore(gatsby-source-tmdb): Update dependencies

  Updates dependencies in monorepo, example, and in package itself.

## 3.0.0

### Major Changes

With https://github.com/LekoArts/gatsby-source-tmdb/pull/14 merged a new `v3` of `gatsby-source-tmdb` is out.

**Key highlights** of this release:

- Full compatibility with Gatsby 4
- Improved error handling
- Ability to download images specific to an endpoint

**Breaking Changes:**

- By default no images are downloaded anymore and you'll have to specifically opt-in to that. The shape (`localFile` on e.g. `poster_path`) stayed the same but you'll need to either enable image downloading globally or individually for each endpoint

You can read a migration guide here: https://github.com/LekoArts/gatsby-source-tmdb/blob/main/MIGRATING.md

## 2.0.3

### Patch Changes

- [#12](https://github.com/LekoArts/gatsby-source-tmdb/pull/12) [`91555a6`](https://github.com/LekoArts/gatsby-source-tmdb/commit/91555a68d5e2ab40fd330bc94bb9592de735c129) Thanks [@LekoArts](https://github.com/LekoArts)!
  - Add a LICENSE
  - Add regex to plugin options so that `url` won't have a leading slash
  - Fix README links + add link to migration guide
  - Update dependencies

## 2.0.2

### Patch Changes

- d64e402: fix: Improve getParam usage with custom error

## 2.0.1

### Patch Changes

- Update description of the npm package and edit npmignore to not commit tsconfig to source code. Also updates links to documentation.

## 2.0.0

### Major Changes

With https://github.com/LekoArts/gatsby-source-tmdb/pull/9 merged a new `v2` of `gatsby-source-tmdb` is out.

**Key highlights** of this release:

- The plugin doesn't download all images upfront anymore, only on demand when you use `localFile`
- Easier handling of endpoints with the new `endpoints` option
- Query any endpoint you can think of and extend requests with the new `extension` option
- You can use multiple instances of the plugin with `typePrefix`
- Custom plugin errors for easier debugging
- Uses `pluginOptionSchema` to validate plugin options
- Better logging & progress bars

You can find all plugin options here: https://github.com/LekoArts/gatsby-source-tmdb/tree/main/package#options

**Breaking Changes:**

- The `modules` option was replaced with `endpoints`
- The image nodes (e.g. `backdrop_path`) have another shape now with `localFile` in them
- The `reqPerTenSeconds` option was removed
- The `poster` & `backdrop` option was removed

You can read a migration guide here: https://github.com/LekoArts/gatsby-source-tmdb/blob/main/MIGRATING.md
