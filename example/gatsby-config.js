require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: process.env.TITLE || `The Movie Database - LekoArts`,
    description: process.env.DESC || `Source from The Movie Database (TMDb) API (v3) in Gatsby.`,
    url: process.env.URL || `https://tmdb.lekoarts.de`,
    logo: `/logo.png`,
  },
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
          },
          {
            url: `account/:account_id/favorite/movies`,
            extension: {
              url: `movie/:movie_id`,
            },
          },
          {
            url: `account/:account_id/favorite/tv`,
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
      },
    },
    `gatsby-plugin-react-helmet-async`,
    `gatsby-plugin-gatsby-cloud`,
  ],
}
