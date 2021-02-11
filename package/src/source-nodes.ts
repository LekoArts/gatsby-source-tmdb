import { GatsbyNode, PluginOptions } from "gatsby"
import got from "got"
import { BASE_URL } from "./constants"

interface ICustomPluginOptions extends PluginOptions {
  apiKey: string
  sessionID: string
}

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  sourceNodeArgs,
  { apiKey, sessionID }: ICustomPluginOptions
): Promise<any> => {
  const tmdbGot = got.extend({
    prefixUrl: BASE_URL,
    method: `GET`,
    responseType: `json`,
    searchParams: {
      api_key: apiKey,
      session_id: sessionID,
    },
    headers: {
      "user-agent": `gatsby-source-tmdb (https://github.com/LekoArts/gatsby-source-tmdb)`,
    },
  })

  const { request } = await tmdbGot(`account`)
  console.log(request)
}
