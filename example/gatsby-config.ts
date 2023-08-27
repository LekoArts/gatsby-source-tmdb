import type { GatsbyConfig, PluginRef } from "gatsby"
import type { TMDBPluginOptions } from "gatsby-source-tmdb"
import "dotenv/config"

const config: GatsbyConfig = {
  siteMetadata: {
    title: process.env.TITLE || `The Movie Database - LekoArts`,
    description: process.env.DESC || `Source from The Movie Database (TMDb) API (v3) in Gatsby.`,
    siteUrl: process.env.URL || `https://tmdb.lekoarts.de`,
    logo: `/logo.png`,
  },
  trailingSlash: `always`,
  plugins: [
    {
      resolve: `gatsby-source-tmdb`,
      options: {
        apiKey: process.env.API_KEY,
        sessionID: process.env.SESSION_ID,
        timezone: `Europe/Berlin`,
        region: `DE`,
        endpoints: [
          {
            url: `account/:account_id/lists`,
            downloadImages: true,
            extension: {
              url: `list/:list_id`,
            },
          },
          {
            url: `account/:account_id/favorite/movies`,
            extension: {
              url: `movie/:movie_id`,
            },
          },
          {
            url: `account/:account_id/favorite/tv`,
            downloadImages: true,
            extension: {
              url: `tv/:tv_id`,
            },
          },
          {
            url: `account/:account_id/watchlist/movies`,
            extension: {
              url: `movie/:movie_id`,
            },
          },
          {
            url: `account/:account_id/watchlist/tv`,
            extension: {
              url: `tv/:tv_id`,
            },
          },
        ],
      } as TMDBPluginOptions,
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-vanilla-extract`,
  ] as PluginRef[],
}

export default config
