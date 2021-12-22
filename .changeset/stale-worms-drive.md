---
"gatsby-source-tmdb": major
---

**Description:**

Hello!

With https://github.com/LekoArts/gatsby-source-tmdb/pull/14 merged a new `v3` of `gatsby-source-tmdb` is out.

**Key highlights** of this release:

- Full compatibility with Gatsby 4
- Improved error handling
- Ability to download images specific to an endpoint

**Breaking Changes:**

- By default no images are downloaded anymore and you'll have to specifically opt-in to that. The shape (`localFile` on e.g. `poster_path`) stayed the same but you'll need to either enable image downloading globally or individually for each endpoint

You can read a migration guide here: https://github.com/LekoArts/gatsby-source-tmdb/blob/main/MIGRATING.md
