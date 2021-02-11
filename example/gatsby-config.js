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
      },
    },
  ],
}
