import { GatsbyNode, SourceNodesArgs } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
import { tmdbGotInstance } from "./tmdb-got"
import * as TMDBPlugin from "./types/tmdb-plugin"
import * as Response from "./types/response"
import { nodeBuilder } from "./node-builder"
import { ERROR_CODES } from "./constants"
import { defaultOptions } from "./api-utils"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  gatsbyApi: SourceNodesArgs,
  pluginOptions: TMDBPlugin.PluginOptions
): Promise<void> => {
  const { apiKey, sessionID, typePrefix, endpoints } = defaultOptions(pluginOptions)
  const { reporter, createNodeId, createContentDigest, actions } = gatsbyApi
  const nodeHelpers = createNodeHelpers({
    typePrefix,
    createNodeId,
    createContentDigest,
  })

  try {
    /**
     * Customized got instance that should be used for fetching data.
     * - endpoint: The endpoint used. Aligns with TMDB API documentation (so can include param), e.g. /account or /movie/:movie_id
     * - options: Options for got instance. Pass searchParams directly, pass values for params in endpoints (e.g. /movie/:movie_id) via context
     * @example
     * await tmdbGot(`movie/:movie_id`, { searchParams: { language: `de-DE` }, context: { movie_id: `475557` } })
     */
    const tmdbGot = tmdbGotInstance({ apiKey, sessionID })

    let configuration: Response.Configuration

    try {
      configuration = await tmdbGot(`configuration`).json()
    } catch (error) {
      reporter.panicOnBuild({
        id: ERROR_CODES.configurationSourcing,
        context: {
          sourceMessage: `Could not source configuration or account from TMDB. Are your credentials correct?`,
        },
        error,
      })
    }

    const accountInfo: Response.AccountInfo = await tmdbGot(`account`).json()

    const ConfigurationNode = nodeHelpers.createNodeFactory(`Configuration`)
    const AccountNode = nodeHelpers.createNodeFactory(`Account`)

    reporter.info(`Initiating requests to TMDB API`)

    actions.createNode(ConfigurationNode({ ...configuration, id: createNodeId(`${typePrefix}-tmdb-configuration`) }))
    actions.createNode(AccountNode({ ...accountInfo, id: accountInfo.id.toString() }))

    await Promise.all(
      endpoints.map((endpoint) =>
        nodeBuilder({
          endpoint,
          gatsbyApi,
          tmdbGot,
          pluginOptions,
          accountId: accountInfo.id,
          nodeHelpers,
        })
      )
    )
  } catch (error) {
    reporter.panicOnBuild({
      id: ERROR_CODES.initialSourcing,
      context: {
        sourceMessage: `There was an error during sourcing & node creation. See the detailed error below.`,
      },
      error,
    })
  }
}
