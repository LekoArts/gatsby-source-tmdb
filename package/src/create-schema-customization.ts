import { GatsbyNode } from "gatsby"
import * as TMDBPlugin from "./types/tmdb-plugin"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = (
  { actions },
  pluginOptions: TMDBPlugin.PluginOptions
): any => {
  const { typePrefix = `Tmdb` } = pluginOptions
  const { createTypes } = actions

  createTypes(`
    type ${typePrefix}Account implements Node {
      tmdbId: String
      username: String
      include_adult: Boolean
      name: String
      iso_3166_1: String
      iso_639_1: String
      avatar: ${typePrefix}AccountAvatar
    }

    type ${typePrefix}AccountAvatar {
      gravatar: ${typePrefix}AccountAvatarGravatar
      tmdb: ${typePrefix}AccountAvatarTmdb
    }

    type ${typePrefix}AccountAvatarGravatar {
      hash: String
    }

    type ${typePrefix}AccountAvatarTmdb {
      avatar_path: String
    }

    type ${typePrefix}Configuration implements Node {
      change_keys: [String]
      tmdbId: String
      images: ${typePrefix}ConfigurationImages
    }

    type ${typePrefix}ConfigurationImages {
      base_url: String
      secure_base_url: String
      backdrop_sizes: [String]
      logo_sizes: [String]
      poster_sizes: [String]
      profile_sizes: [String]
      still_sizes: [String]
    }
  `)
}
