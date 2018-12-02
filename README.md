# gatsby-source-tmdb

Source from [The Movie Database (TMDb)](https://www.themoviedb.org/) API (v3) in Gatsby.

Built with [moviedb-promise](https://github.com/grantholle/moviedb-promise).

***

## Install

```bash
npm install --save gatsby-source-tmdb
```

## How to use

First, you need a way to pass environment variables to the build process, so secrets and other secured data aren't committed to source control. We recommend using [`dotenv`][dotenv] which will then expose environment variables. [Read more about dotenv and using environment variables here][envvars]. Then we can _use_ these environment variables and configure our plugin.

You'll need an `API Key` and `Session ID` from TMDb.

1. [Create your API Key](https://developers.themoviedb.org/3/getting-started/introduction)
2. [Create your Session ID](https://developers.themoviedb.org/3/authentication/how-do-i-generate-a-session-id)
3. Save both to your environment variable file

Minimal `gatsby-config.js`:

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

All options `gatsby-config.js`:

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
        // Default: en-US
        language: 'en-US',

        // Specify a ISO 3166-1 code. Pattern: [A-Z]{2}
        // Will narrow the search to only display results within the specified country
        // Default: US
        region: 'US',

        // You can specify what endpoints to grab data from
        // Source: https://github.com/LekoArts/gatsby-source-tmdb/blob/master/src/gatsby-node.js
        // Default: See below
        endpoints: {
          account: true,
          misc: false,
          tv: false,
        },

        // Specify the amount of pages you want to pull from "Misc" Requests
        // e.g. MiscPopularMovies would give you abou 8000 pages which is just too much
        // Therefore just pull the first 3 pages (20 entries per page)
        // You get the Top 60 of "Popular Movies"
        // Default: 3
        pages: 3,

        // Specify a timezone to offset the day calculation
        // e.g. used in tvAiringToday
        // See all timezones: https://developers.themoviedb.org/3/configuration/get-timezones
        // Default: Europe/London
        timezone: 'Europe/London',
      },
    },
  ],
}
```

[dotenv]: https://github.com/motdotla/dotenv
[envvars]: https://gatsby.app/env-vars
