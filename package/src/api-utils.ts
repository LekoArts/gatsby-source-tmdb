import { defaultEndpoints } from "./endpoints"
import type * as TMDBPlugin from "./types/tmdb-plugin"
import { TYPE_PREFIX } from "./constants"

/**
 * Compiles the endpoint based on the params
 * @param url
 * @param params
 * @return Modified url
 * @example
 * modifyURL('/tv/:tv_id/season/:season_number', { tv_id: 2, season_number: 3 })
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
 * @example
 * getParam('/tv/:tv_id')
 */
export const getParam = (url: string): string => url.match(getParamRegex)?.[1]

/**
 * Combine the user plugin options with the default options
 * @param pluginOptions
 * @return Merged plugin options (with defaults)
 */
export const defaultOptions = (pluginOptions: TMDBPlugin.TMDBPluginOptions): TMDBPlugin.TMDBPluginOptions => ({
  apiKey: pluginOptions.apiKey,
  sessionID: pluginOptions.sessionID,
  downloadImages: pluginOptions.downloadImages ?? false,
  typePrefix: pluginOptions.typePrefix || TYPE_PREFIX,
  region: pluginOptions.region || `DE`,
  timezone: pluginOptions.timezone || `Europe/London`,
  language: pluginOptions.language || `en-US`,
  endpoints: pluginOptions.endpoints || defaultEndpoints,
  plugins: pluginOptions.plugins || [],
})
