import { NodePluginSchema, GatsbyGraphQLObjectType } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
import { defaultEndpoints } from "./endpoints"
import * as TMDBPlugin from "./types/tmdb-plugin"
import { TYPE_PREFIX } from "./constants"

/**
 * Compiles the endpoint based on the params
 * @param url
 * @param params
 * @return Modified url
 */
export const modifyURL = (url: string, params?: Record<string, unknown>): string => {
  if (!params) {
    return url
  }

  const arr = Object.entries(params)

  // All parameters should be passed as :param (the API docs denote this as {par_am})
  arr.forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    url = url.replace(`:${key}`, value.toString())
  })

  return url
}

const getParamRegex = /:(.*)/

/**
 * Parse the endpoint URL and get the parameter that is used
 * @param url
 * @return Parameter without colon
 */
export const getParam = (url: string): string => url.match(getParamRegex)?.[1]

/**
 * Combine the user plugin options with the default options
 * @param pluginOptions
 * @return Merged plugin options (with defaults)
 */
export const defaultOptions = (pluginOptions: TMDBPlugin.PluginOptions): TMDBPlugin.PluginOptions => ({
  apiKey: pluginOptions.apiKey,
  sessionID: pluginOptions.sessionID,
  typePrefix: pluginOptions.typePrefix || TYPE_PREFIX,
  region: pluginOptions.region || `US`,
  timezone: pluginOptions.timezone || `Europe/London`,
  language: pluginOptions.language || `en-US`,
  endpoints: pluginOptions.endpoints || defaultEndpoints,
  plugins: pluginOptions.plugins || [],
})

export const generateTypeName = (endpoint: TMDBPlugin.Endpoint, typePrefix: string): string => {
  const nodeHelpers = createNodeHelpers({
    typePrefix,
    createNodeId: (input) => input.toString(),
    createContentDigest: (input) => input.toString(),
  })

  // Clean the URL from the accountId placeholder
  const urlWithoutAccountId = endpoint.url.replace(`/:account_id`, ``)
  // Get the root type name, e.g. when account/:account_id/favorite/movies is requested this is account/favourite/movies
  const extractedTypeName = endpoint.typeName || modifyURL(urlWithoutAccountId, endpoint.context)
  // This gets turned into AccountFavouriteMovies
  return nodeHelpers.createTypeName(extractedTypeName)
}

export const defineImageNode = (name: string, schema: NodePluginSchema): GatsbyGraphQLObjectType =>
  schema.buildObjectType({
    name,
    fields: {
      backdrop_path: `BackdropPath`,
      logo_path: `LogoPath`,
      poster_path: `PosterPath`,
      profile_path: `ProfilePath`,
      still_path: `StillPath`,
    },
    interfaces: [`Node`],
  })
