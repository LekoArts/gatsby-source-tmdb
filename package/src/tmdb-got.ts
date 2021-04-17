import got, { BeforeRequestHook, Got } from "got"
import { BASE_URL } from "./constants"
import { modifyURL } from "./api-utils"

export const tmdbGotInstance = ({ apiKey, sessionID }: { apiKey: string; sessionID: string }): Got => {
  const setup: BeforeRequestHook = (options) => {
    options.url.href = modifyURL(options.url.href, options.context)
  }

  return got.extend({
    mutableDefaults: true,
    prefixUrl: BASE_URL,
    method: `GET`,
    headers: {
      "user-agent": `gatsby-source-tmdb (https://github.com/LekoArts/gatsby-source-tmdb)`,
    },
    searchParams: {
      api_key: apiKey,
      session_id: sessionID,
    },
    hooks: {
      beforeRequest: [setup],
    },
  })
}
