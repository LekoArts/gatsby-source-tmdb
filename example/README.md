# Example

An example project using `gatsby-source-tmdb` to build a dashboard of watchlist/favourite TV/movies and custom lists. You can see a **live preview** at [tmdb.lekoarts.de](https://tmdb.lekoarts.de).

Built with [vanilla-extract](https://github.com/seek-oss/vanilla-extract), [react-query](https://react-query.tanstack.com/).

This example showcases a combination of build-time and client-only usage of the TMDb API. The `/` (homepage) page is built statically with `gatsby-source-tmdb`. The detailed pages (e.g. `/tv/<some-id>`) are fetching their data on the client. [Read more about client-only routes](https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api/#creating-client-only-routes).

## Usage

1. Download this repository as a ZIP and extract the `example` folder to your desired place
1. Go into the `example` folder and run `npm install`
1. Duplicate `.env.example` and rename it to `.env`.
1. Fill out the details required in the newly created `.env` file
1. Adapt any settings in `gatsby-config.js`
1. Adapt image files in `static`
