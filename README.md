# gatsby-source-tmdb

Source from [The Movie Database (TMDb)](https://www.themoviedb.org/) API (v3) in Gatsby.

You can see a **live example** at [tmdb.lekoarts.de](https://tmdb.lekoarts.de/) ([Source Code](https://github.com/LekoArts/gatsby-source-tmdb/tree/master/example)).

Built with [moviedb-promise](https://github.com/grantholle/moviedb-promise).

---

## Install

```bash
npm install --save gatsby-source-tmdb
```

## How to use

### Prerequisites

First, you need a way to pass environment variables to the build process, so secrets and other secured data aren't committed to source control. I recommend using [`dotenv`][dotenv] which will then expose environment variables. [Read more about dotenv and using environment variables here][envvars]. Then you can _use_ these environment variables and configure your plugin.

You'll need an `API Key` and `Session ID` from TMDb.

1. [Create your API Key](https://developers.themoviedb.org/3/getting-started/introduction)
2. [Create your Session ID](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id)
3. Save both to your environment variable file

It should look something like this:

```
API_KEY=your-api-key-here
SESSION_ID=your-session-id-here
```

You can find all information on the API endpoints in the [official The Movie Database API v3 documentation][documentation].

### gatsby-config

#### Minimal

The plugin sets some defaults for the endpoints and options. Hence you can use it only with the two **mandatory** entries `apiKey` and `sessionID`. You can see the default values in the "All options" overview.

```JS
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        // apiKey and sessionID are mandatory
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
      },
    },
  ],
}
```

#### All options

The plugin exposes some TMDb API options you can modify, e.g. [language][lang], [region][region] and [timezone][time].

The `modules` option gives your control over the querying of data from the TMDb API. The names are the function names of [moviedb-promise][moviedb]. By **default** all endpoints (which make sense) are inserted into the arrays. **Note:** Therefore the `modules` option can be used to minimize the data requested.

The following `gatsby-config` shows all available options with their default values.

```JS
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-tmdb',
      options: {
        // apiKey and sessionID are mandatory

        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,

        // Pass a ISO 639-1 value. Pattern: ([a-z]{2})-([A-Z]{2})
        // Specify the language of titles, descriptions etc.
        // Applied to all results

        language: 'en-US',

        // Specify a ISO 3166-1 code. Pattern: [A-Z]{2}
        // Will narrow the search to only display results within the specified country

        region: 'US',

        // You can specify what modules to use and which endpoints to grab data from
        // If you want to use the default endpoints but deactivate modules,
        // set the value of "activate" to true or false.

        modules: {
          account: {
            activate: true,
            endpoints: {
              tvs: ['accountFavoriteTv', 'accountRatedTv', 'accountTvWatchlist'],
              movies: ['accountFavoriteMovies', 'accountRatedMovies', 'accountMovieWatchlist'],
              list: 'accountLists',
            },
          },
          misc: {
            activate: false,
            // The number behind the name specifies the amount of pages you want to pull
            // By default it's set to 3 pages as otherwise, e.g. the endpoint "MiscPopularMovies
            // would pull ~8000 pages (probably all movies)
            // Each page contains 20 items

            endpoints: [
              ['miscUpcomingMovies'],
              ['miscNowPlayingMovies'],
              ['miscPopularMovies', 2],
              ['miscTopRatedMovies', 2],
              ['miscTopRatedTvs', 1],
              ['miscPopularTvs', 1],
            ],
          },
          tv: {
            activate: false,
            endpoints: [['tvAiringToday'], ['tvOnTheAir', 2]],
          },
        },

        // Specify a timezone to offset the day calculation
        // e.g. used in tvAiringToday
        // See all timezones: https://developers.themoviedb.org/3/configuration/get-timezones

        timezone: 'Europe/London',

        // TMDb allows 40 Requests per 10 seconds
        // If you pull a lot of data you could have an error
        // telling you that you're over that limit. With this
        // option you can do less requests per 10 seconds

        reqPerTenSeconds: 36,

        // Decide whether you want to download images from
        // poster_path and backdrop_path URLs or not.
        // This can save you a lot of time if you're not using one/both
        // of them anyway

        poster: true,
        backdrop: false,
      },
    },
  ],
}
```

### Examples

**Example 1: You only want `accountFavoriteTv`**

```JS
modules: {
  account: {
    activate: true,
    endpoints: {
      tvs: ['accountFavoriteTv'],
    },
  },
}
```

**Example 2: You only want `accountFavoriteTv`, `accountRatedMovies` and `accountMovieWatchlist`**

```JS
modules: {
  account: {
    activate: true,
    endpoints: {
      tvs: ['accountFavoriteTv'],
      movies: ['accountRatedMovies', 'accountMovieWatchlist'],
    },
  },
}
```

**Example 3: You only want `miscPopularMovies` with 5 pages of results and `miscUpcomingMovies` with 3 pages of results (3 pages is the default)**

_5 pages x 20 result per page = 100 items_

```JS
modules: {
  misc: {
    activate: true,
    endpoints: [
      ['miscUpcomingMovies'],
      ['miscPopularMovies', 5],
    ],
  },
}
```

**Example 4: You only want `accountFavoriteTv` and `tvAiringToday`**

```JS
modules: {
  account: {
    activate: true,
    endpoints: {
      tvs: ['accountFavoriteTv'],
    },
  },
  tv: {
    activate: true,
    endpoints: [['tvAiringToday']],
  },
}
```

**Example 5: You don't want `account` but all endpoints from `misc` and `tv`**

```JS
modules: {
  account: {
    activate: false,
  },
  misc: {
    activate: true,
  },
  tv: {
    activate: true,
  },
}
```

[dotenv]: https://github.com/motdotla/dotenv
[envvars]: https://gatsby.app/env-vars
[lang]: https://developers.themoviedb.org/3/getting-started/languages
[region]: https://developers.themoviedb.org/3/getting-started/regions
[time]: https://developers.themoviedb.org/3/configuration/get-timezones
[moviedb]: https://github.com/grantholle/moviedb-promise#complete-list
[documentation]: https://developers.themoviedb.org/3/getting-started/introduction
