# gatsby-source-tmdb

## 2.0.2

### Patch Changes

- d64e402: fix: Improve getParam usage with custom error

## 2.0.1

### Patch Changes

- Update description of the npm package and edit npmignore to not commit tsconfig to source code. Also updates links to documentation.

## 2.0.0

### Major Changes

**Description:**

Hello!

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

