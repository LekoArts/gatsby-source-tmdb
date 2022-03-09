# gatsby-source-tmdb

Source from [The Movie Database (TMDb)](https://www.themoviedb.org/) API (v3) in Gatsby. You can leverage any endpoint from the [official documentation](https://developers.themoviedb.org/3/getting-started/introduction) and pull the data directly into Gatsby's GraphQL data layer. Customize the plugin to your needs by providing customized endpoints -- read more about that in the [advanced configuration](https://github.com/LekoArts/gatsby-source-tmdb/tree/main/package/README.md#advanced-configuration) section.

You can see a **live preview** at [tmdb.lekoarts.de](https://tmdb.lekoarts.de) ([Source Code](https://github.com/LekoArts/gatsby-source-tmdb/tree/main/example)).

Create your own website with [gatsby-starter-tmdb](https://github.com/LekoArts/gatsby-starter-tmdb).

<a href="https://github.com/LekoArts/gatsby-source-tmdb/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="gatsby-source-tmdb is released under the MIT license." />
</a>
<a href="https://www.npmjs.org/package/gatsby-source-tmdb">
  <img src="https://img.shields.io/npm/v/gatsby-source-tmdb.svg" alt="Current npm package version." />
</a>
<a href="https://npmcharts.com/compare/gatsby-source-tmdb?minimal=true">
  <img src="https://img.shields.io/npm/dm/gatsby-source-tmdb.svg" alt="Downloads per month on npm." />
</a>
<a href="https://npmcharts.com/compare/gatsby-source-tmdb?minimal=true">
  <img src="https://img.shields.io/npm/dt/gatsby-source-tmdb.svg" alt="Total downloads on npm." />
</a>
<a href="https://www.lekoarts.de?utm_source=gatsby-source-tmdb&utm_medium=Plugin">
  <img alt="Website" src="https://img.shields.io/badge/-website-blue">
</a>
<a href="https://twitter.com/intent/follow?screen_name=lekoarts_de">
  <img src="https://img.shields.io/twitter/follow/lekoarts_de.svg?label=Follow%20@lekoarts_de" alt="Follow @lekoarts_de" />
</a>

## Install

```shell
npm install gatsby-source-tmdb
```

### Prerequisites

You'll need an `API Key` and `Session ID` from TMDb.

1. [Create your API key](https://developers.themoviedb.org/3/getting-started/introduction)
1. [Generate a Session ID](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id)

**Recommendation:** Save both values inside an `.env` file as environment variables. [Read more about env vars in Gatsby](https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/).

You can find all information on the API endpoints in the [official TMDb v3 documentation](https://developers.themoviedb.org/3/getting-started/introduction).

### Configure

Add the plugin to your `gatsby-config.js`

```js:title=gatsby-config.js
require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-tmdb",
      options: {
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
      }
    }
  ]
}
```

The plugin is **not** requesting all available endpoints by default but only a [selected list](https://github.com/LekoArts/gatsby-source-tmdb/blob/main/package/src/endpoints.ts) of endpoints. It always requests the `/account` & `/configuration` endpoint. Please see the [plugin's README](https://github.com/LekoArts/gatsby-source-tmdb/blob/main/package/README.md) for more detailed information, including options & advanced customization.

## Acknowledgements

- [moviedb-promise](https://github.com/grantholle/moviedb-promise) was used for v1 of this plugin and has been really helpful/inspirational when creating v2. Thanks!

## Support Me

Thanks for using this project! I'm always interested in seeing what people do with my projects, so don't hesitate to tag me on [Twitter](https://twitter.com/lekoarts_de) and share the project with me.

Please star this project, share it on Social Media or consider supporting me on [Patreon](https://www.patreon.com/lekoarts) or [GitHub Sponsor](https://github.com/sponsors/LekoArts)!
