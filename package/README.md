# gatsby-source-tmdb

Source from [The Movie Database (TMDb)](https://www.themoviedb.org/) API (v3) in Gatsby. You can leverage any endpoint from the [official documentation](https://developers.themoviedb.org/3/getting-started/introduction) and pull the data directly into Gatsby's GraphQL data layer. Customize the plugin to your needs by providing customized endpoints -- read more about that in the [advanced configuration](#advanced-configuration) section.

You can see a **live preview** at [tmdb.lekoarts.de](https://tmdb.lekoarts.de) ([Source Code](https://github.com/LekoArts/gatsby-source-tmdb/tree/main/example)).

Create your own website with [gatsby-starter-tmdb](https://github.com/LekoArts/gatsby-starter-tmdb).

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

The plugin is **not** requesting all available endpoints by default but only a [selected list](https://github.com/LekoArts/gatsby-source-tmdb/blob/main/package/src/endpoints.ts) of endpoints. It always requests the `/account` & `/configuration` endpoint. Please see the documentation below if you want to change the endpoints.

## Options

### `apiKey: string`

**Required option**

The API key you got from TMDb.

### `sessionID: string`

**Required option**

The Session ID you generated with your API key via the TMDb API.

### `language: string`

According to the [language documentation](https://developers.themoviedb.org/3/getting-started/languages) you can pass a `string` code in the format of ISO-639-1 or ISO-3166-1 into this option. If set, `language` will be passed as a query parameter to all requests.

### `region: string`

According to the [region documentation](https://developers.themoviedb.org/3/getting-started/regions) you can pass a `string` code in the format of ISO-3166-1. If set, `region` will be passed as a query parameter to all requests.

### `timezone: string`

You can offset the day calculation, defaulting to EST. You can [query the list of timezones](https://developers.themoviedb.org/3/configuration/get-timezones). If set, `timezone` will be passed as a query parameter to all requests.

### `typePrefix: string`

By default, all types created by this plugin are prefixed with `TMDb`. So if you query `/account/{account_id}/favorite/tv` the resulting type will be `TmdbAccountFavoriteTv`. This is helpful when you use multiple instances of this plugin in the same site (by using different API keys & session IDs) and want to have multiple instances of e.g. `/account/{account_id}/favorite/tv`. You'd then set a `typePrefix: "Second"` and the result would be `SecondAccountFavoriteTv`.

### `endpoints: Endpoint[]`

With `Endpoint` being:

```ts
interface Endpoint {
  url: string
  typeName?: string
  searchParams?: {
    language?: string
    page?: number
    append_to_response?: string
    region?: string
    [key: string]: string
  }
  context?: {
    [key: string]: string
  }
  countLimit?: number
  extension?: {
    url: string
  }
}
```

This option allows you to configure the endpoints that the plugin is requesting from the TMDb API. The plugin defines some [sensible defaults](https://github.com/LekoArts/gatsby-source-tmdb/blob/main/package/src/endpoints.ts).

The plugin uses [`got`](https://github.com/sindresorhus/got) under the hood, so some options directly come from its API design. Here are the options in detail:

#### `url: string`

**Required option**

The `GET` route from the TMDb API. You need to remove the leading slash from the URL and replace `{}` (curly braces) with `:` (colon). Examples:

- `/account` => `account`
- `/account/{account_id}/favorite/tv` => `account/:account_id/favorite/tv`
- `/movie/{movie_id}` => `movie/:movie_id`

#### `typeName: string`

Similar to the `typePrefix` option you can modify the name of the type here. In this case you can completely override the name though. Example:

```js
[{
  url: "account/:account_id/favorite/tv",
  typeName: "FavTv",
}]
```

Normally this would result in `TmdbAccountFavoriteTv` but in this case it would be `FavTv`.

#### `searchParams: object`

You can pass any option to the endpoint here that it offers (described in the TMDb docs) via the query parameters. You can also override the defaults for a specific endpoint here that are set in the general options, e.g. `language`. The [Append To Response](https://developers.themoviedb.org/3/getting-started/append-to-response) is also available.

#### `context: object`

This user data is used to modify the URL before a request. By default, the `account_id` is passed to every request inside the `context`. This is why you can query endpoints that use the `:account_id` parameter without providing it yourself. Example:

```js
[{
  url: "tv/:tv_id",
  context: {
    tv_id: "66732"
  }
}]
```

#### `countLimit: number`

Refers to [`got`'s `pagination.countLimit`](https://github.com/sindresorhus/got#paginationcountlimit) option. By default `60` items are fetched.

#### `extension: object`

Unfortunately endpoints like `/account/{account_id}/favorite/tv` only return shallow results for their items. You can see this difference by comparing the "Responses" of [the account endpoint](https://developers.themoviedb.org/3/account/get-favorite-tv-shows) and [the individual tv endpoint](https://developers.themoviedb.org/3/tv/get-tv-details). The `extension` option mitigates this issue by allowing you to define a second request that should come after the first endpoint. Example:

```js
[{
  url: "account/:account_id/favorite/tv",
  extension: {
    url: "tv/:tv_id",
  }
}]
```

So during the first request to `account/:account_id/favorite/tv` a list of items (each with an `id`) is fetched. In a second step for each item the `tv/:tv_id` endpoint is called -- the `:tv_id` is defined by the respective `id` from the first request.

This way the `TmdbAccountFavoriteTv` type returns a list of _detailed_ TV responses.

## Advanced Configuration

Being able to customize the `endpoints` option is a powerful option of this plugin. The examples below are only a subset of things as the sky is the limit!

```js
require("dotenv").config()

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-tmdb",
      options: {
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
        endpoints: [
          // Query the /discover/movie endpoint for 50 movies that were released in 2021
          // Sort it by popularity and name it "Top2021Movies"
          {
            url: `discover/movie`,
            searchParams: {
              language: `en-US`,
              sort_by: `popularity.desc`,
              year: `2021`,
            },
            typeName: `Top2021Movies`,
            countLimit: 50,
          },
          // Get the information from "Stranger Things" and more details like videos & similar tv shows
          {
            url: "tv/:tv_id",
            context: {
              tv_id: "66732"
            },
            searchParams: {
              append_to_response: "videos,similar"
            }
          },
          // Use the search to find TV shows with "Naruto" and use the extension to get more details
          // Than the search endpoint would provide. Also name it "NarutoSearch"
          {
            url: "search/tv",
            searchParams: {
              language: "en-US",
              query: "Naruto"
            },
            typeName: "NarutoSearch",
            extension: {
              url: "tv/:tv_id",
            }
          }
        ]
      }
    }
  ]
}
```

## Migration

You want to migrate to a new major version? You can read all migration guides here: https://github.com/LekoArts/gatsby-source-tmdb/blob/main/MIGRATING.md
