# Migration Guide

If you want to update to a new major version of `gatsby-source-tmdb`, follow the steps below. Please note that once a new major version is out support for the old version has ended (only critical security fixes will be backported).

## Migrating from v1 to v2

The major update from v1 to v2 was a complete overhaul of the plugin (you can find the PR here: https://github.com/LekoArts/gatsby-source-tmdb/pull/9). The codebase was moved to TS, the implementation of custom API endpoints was redone, and underlying libraries were replaced. Thus some breaking changes were necessary to allow for these new features.

If you want to start with a fresh project you can clone [gatsby-starter-tmdb](https://github.com/LekoArts/gatsby-starter-tmdb).

### Updating your dependencies

You need to update your `package.json` to use the latest version of `gatsby-source-tmdb`.

```json
{
  "dependencies": {
    "gatsby-source-tmdb": "^2.0.0"
  }
}
```

### Update Gatsby packages

This plugin also now requires you to use Gatsby v3 (see [Gatsby's migration guide](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/)). Update Gatsby and all related packages.

### Updating your `gatsby-config.js`

v2 features a new [`endpoints`](https://github.com/LekoArts/gatsby-source-tmdb/tree/main/package#endpoints-endpoint) option which will be the biggest change in this update. Below is a comparison between a v1 and v2 config with the differences explained.

**v1**

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
        language: 'en-US',
        region: 'US',
        timezone: 'Europe/London',
        reqPerTenSeconds: 36,
        poster: true,
        backdrop: false,
        modules: {
          account: {
            activate: true,
            endpoints: {
              tvs: ['accountFavoriteTv'],
              movies: ['accountFavoriteMovies'],
              list: 'accountLists',
            },
          },
          misc: {
            activate: true,
            endpoints: [
              ['miscPopularMovies', 2],
              ['miscTopRatedTvs', 1],
            ],
          },
          tv: {
            activate: false,
            endpoints: [['tvAiringToday']],
          },
        },
      },
    },
  ],
}
```

**v2**

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        // <-- SAME OPTIONS BEGIN -->
        // The options apiKey, sessionID, language, region, timezone stay the same
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
        language: 'en-US',
        region: 'US',
        timezone: 'Europe/London',
        // <-- SAME OPTIONS END -->
        //
        // The options reqPerTenSeconds, poster, and backdrop were removed
        //
        // <-- ENDPOINTS BEGIN -->
        // The nested "modules" option was replaced with a flat array "endpoints" option
        // Where you pass in objects with your individual options
        endpoints: [
          {
            // The name of the endpoint (e.g. "accountFavoriteTv") was replaced with the "url" key.
            // The format is explained here: https://github.com/LekoArts/gatsby-source-tmdb/tree/main/package#url-string
            url: `account/:account_id/favorite/tv`,
            // In v1 the plugin automatically fetched more detailed information on specific endpoints
            // In v2 you'll need to explicitly tell the plugin to fetch more information
            // Learn more about the how/why: https://github.com/LekoArts/gatsby-source-tmdb/tree/main/package#extension-object
            extension: {
              url: `tv/:tv_id`,
            },
          },
          {
            url: `account/:account_id/favorite/movies`,
            extension: {
              url: `movie/:movie_id`,
            },
          },
          // In v1 the plugin also fetched more details for the "items" information of the lists endpoint
          // In v2 you'll need to pass the "extension"
          {
            url: `account/:account_id/lists`,
            extension: {
              url: `list/:list_id`,
            },
          },
          // The module ['miscPopularMovies', 2] meant that 2 pages (20 items each) should be pulled for movie/popular
          // You now can use the "countLimit" option to specify the amount of items
          {
            url: `movie/popular`,
            countLimit: 40,
          },
          {
            url: `tv/top_rated`,
            countLimit: 20,
          },
          // The "tvAiringToday" endpoint is missing here as it had "activate: false" in its options
          // Every endpoint you don't include in "endpoints" won't be activated
        ]
        // <-- ENDPOINTS END -->
      },
    },
  ],
}
```

As you can see some options have stayed, some were removed, and `modules` was remodeled to `endpoints`. The [`endpoints`](https://github.com/LekoArts/gatsby-source-tmdb/tree/main/package#endpoints-endpoint) change is certainly the most notable one and will require the most changes. Please see the linked API reference docs to migrate correctly.

### Updating your queries

With the updated names for `endpoints` the root query names will (almost) always change. Inside the query itself mainly the images have changed. In v1 the `poster` and `backdrop` options decided whether the _original_ image was downloaded or served as a CDN path. In v2 all available sizes are available in the query and optionally `localFile` can be used to download the image and use `gatsby-plugin-image`.

**v1**

The `allTmdbAccountFavoriteTv` query gets both the `poster_path` and `backdrop_path`. Since (in this example) the `poster` option was set to `true`, and `backdrop` to `false` they return different shapes.

```graphql
query {
  allTmdbAccountFavoriteTv {
    nodes {
      poster_path {
        childImageSharp {
          fluid(height: 525, quality: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      backdrop_path
      name
      accountFavoriteTvId
      number_of_seasons
    }
  }
}
```

**v2**

You now get every size back and can optionally use `localFile` to download the image and use with `gatsby-plugin-image`. Since the `id` is a reserved field in Gatsby it always needs prefixing. In v1 it was prefixed with the name of the query (e.g. `accountFavoriteTvId` as seen above) -- in v2 it'll be prefixed with the `typePrefix`, e.g. `tmdbId`.

```graphql
query {
  allTmdbAccountFavoriteTv {
    nodes {
      poster_path {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 90, width: 525)
          }
        }
      }
      backdrop_path {
        original
        source
        w1280
        w300
        w780
      }
      name
      tmdbId
      number_of_seasons
    }
  }
}
```
