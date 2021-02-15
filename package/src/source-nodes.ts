import { GatsbyNode } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
import { tmdbGotInstance } from "./tmdb-got"
import * as TMDBPlugin from "./types/tmdb-plugin"
import * as Response from "./types/response"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi,
  { apiKey, sessionID }: TMDBPlugin.PluginOptions
): Promise<any> => {
  const nodeHelpers = createNodeHelpers({
    typePrefix: `Tmdb`,
    createNodeId: gatsbyApi.createNodeId,
    createContentDigest: gatsbyApi.createContentDigest,
  })

  const lastBuildTime = await gatsbyApi.cache.get(`LAST_BUILD_TIME`)

  if (lastBuildTime) {
    console.log(lastBuildTime)
  }

  /**
   * Customized got instance that should be used for fetching data.
   * @example
   * endpoint - The endpoint used. Aligns with TMDB API documentation (so can include param), e.g. /account or /movie/:id
   * options - Options for got instance. Pass searchParams directly, pass values for params in endpoints (e.g. /movie/:id) via context
   *
   * await tmdbGot(`movie/:id`, { searchParams: { language: `de-DE` }, context: { id: `475557` } })
   */
  const tmdbGot = tmdbGotInstance({ apiKey, sessionID })

  const configuration: Response.Configuration = await tmdbGot(`configuration`).json()
  const account: Response.AccountInfo = await tmdbGot(`account`).json()

  // const { body } = await tmdbGot(`movie/:id`, { searchParams: { language: `de-DE` }, context: { id: `475557` } })
  console.log(configuration, account)

  await gatsbyApi.cache.set(`LAST_BUILD_TIME`, Date.now())
}
