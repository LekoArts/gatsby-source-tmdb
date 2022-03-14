import type { GatsbyNode } from "gatsby"
import type * as TMDBPlugin from "./types/tmdb-plugin"
import { defaultOptions } from "./api-utils"
import { IMAGE_TYPES } from "./constants"
import { defineImageNode, generateTypeName, definePathNode, defineLocalFileNode } from "./schema-utils"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = (
  { actions, schema },
  pluginOptions: TMDBPlugin.TMDBPluginOptions
): void => {
  const { typePrefix, endpoints } = defaultOptions(pluginOptions)
  const { createTypes } = actions

  /**
   * Create types for each image type
   * @example
   * type BackdropPath {
   *   original: String
   *   w300: String
   * }
   */
  const pathTypes = IMAGE_TYPES.map((imageType) => definePathNode(imageType, schema))

  /**
   * Create localFile entries for each image type
   * @example
   * type BackdropPath {
   *   localFile: File @link
   * }
   */
  const localFileTypes = IMAGE_TYPES.map((imageType) => defineLocalFileNode(imageType, schema))

  /**
   * Create types that use the path types
   * @example
   * type TmdbAccountFavoriteMovies implements Node {
   *   backdrop_path: BackdropPath
   * }
   */
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
      poster_path: PosterPath
    }
  `

  createTypes([...pathTypes, ...localFileTypes, ...imageTypes, mandatoryTypes])
}
