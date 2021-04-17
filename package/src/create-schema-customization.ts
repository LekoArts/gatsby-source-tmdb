import { GatsbyNode } from "gatsby"
import * as TMDBPlugin from "./types/tmdb-plugin"
import { defaultOptions, generateTypeName, defineImageNode } from "./api-utils"
import { IMAGE_TYPE_NAMES } from "./constants"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = (
  { actions, schema },
  pluginOptions: TMDBPlugin.PluginOptions
): any => {
  const { typePrefix, endpoints } = defaultOptions(pluginOptions)
  const { createTypes } = actions

  // Create types for each image type
  // type BackdropPath {}
  const pathTypes = IMAGE_TYPE_NAMES.map((typeName) =>
    schema.buildObjectType({
      name: typeName,
      fields: {},
    })
  )

  // Create types that use the path types
  // For example:
  // type TmdbAccountFavoriteMovies implements Node {
  //  backdrop_path: BackdropPath
  //  ...other_path_types
  // }
  const imageTypes = endpoints.map((endpoint) => {
    const name = generateTypeName(endpoint, typePrefix)
    return defineImageNode(name, schema)
  })

  const mandatoryTypes = `
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

    type ${typePrefix}AccountListsItems {
      backdrop_path: BackdropPath
      logo_path: LogoPath
      poster_path: PosterPath
      profile_path: ProfilePath
      still_path: StillPath
    }
  `

  createTypes([...pathTypes, ...imageTypes, mandatoryTypes])
}
