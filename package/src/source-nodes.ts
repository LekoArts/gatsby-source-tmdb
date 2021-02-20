import { GatsbyNode, SourceNodesArgs } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
import { tmdbGotInstance } from "./tmdb-got"
import * as TMDBPlugin from "./types/tmdb-plugin"
import * as Response from "./types/response"
import { defaultEndpoints } from "./endpoints"
import { nodeBuilder } from "./node-builder"
import { ERROR_CODES } from "./constants"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi: SourceNodesArgs,
  pluginOptions: TMDBPlugin.PluginOptions
): Promise<any> => {
  const { apiKey, sessionID } = pluginOptions
  const { reporter, createNodeId, createContentDigest, actions } = gatsbyApi
  const nodeHelpers = createNodeHelpers({
    typePrefix: `Tmdb`,
    createNodeId,
    createContentDigest,
  })

  try {
    /**
     * Customized got instance that should be used for fetching data.
     * @example
     * endpoint - The endpoint used. Aligns with TMDB API documentation (so can include param), e.g. /account or /movie/:movie_id
     * options - Options for got instance. Pass searchParams directly, pass values for params in endpoints (e.g. /movie/:movie_id) via context
     *
     * await tmdbGot(`movie/:movie_id`, { searchParams: { language: `de-DE` }, context: { movie_id: `475557` } })
     */
    const tmdbGot = tmdbGotInstance({ apiKey, sessionID })

    const configuration: Response.Configuration = await tmdbGot(`configuration`).json()
    const accountInfo: Response.AccountInfo = await tmdbGot(`account`).json()

    const ConfigurationNode = nodeHelpers.createNodeFactory(`Configuration`)
    const AccountNode = nodeHelpers.createNodeFactory(`Account`)

    reporter.info(`Initiating requests to TMDB API`)

    actions.createNode(ConfigurationNode({ ...configuration, id: `tmdb-configuration` }))
    actions.createNode(AccountNode({ ...accountInfo, id: accountInfo.id.toString() }))

    await Promise.all(
      defaultEndpoints.map((endpoint) =>
        nodeBuilder({ endpoint, gatsbyApi, tmdbGot, pluginOptions, accountId: accountInfo.id, nodeHelpers })
      )
    )
  } catch (error) {
    reporter.panicOnBuild({
      id: ERROR_CODES.initialSourcing,
      context: {
        sourceMessage: `Could not source configuration or account from TMDB. Are your credentials correct?`,
      },
      error,
    })
  }
}
