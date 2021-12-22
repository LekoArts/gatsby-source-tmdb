import { NodePluginSchema, GatsbyGraphQLObjectType } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
import { modifyURL } from "./api-utils"
import { IMAGE_TYPES, IMAGE_SIZES } from "./constants"
import * as TMDBPlugin from "./types/tmdb-plugin"

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

export const capitalize = (s: string): string => s && s[0].toUpperCase() + s.slice(1)

export const generateImageTypeName = (imageType: typeof IMAGE_TYPES[number]) => `${capitalize(imageType)}Path`

export const definePathNode = (
  imageType: typeof IMAGE_TYPES[number],
  schema: NodePluginSchema
): GatsbyGraphQLObjectType => {
  const name = generateImageTypeName(imageType)
  let fields

  IMAGE_SIZES[`${imageType}_sizes`].forEach((size) => {
    fields = {
      ...fields,
      [size]: `String`,
    }
  })

  return schema.buildObjectType({
    name,
    fields,
  })
}

export const defineLocalFileNode = (
  imageType: typeof IMAGE_TYPES[number],
  schema: NodePluginSchema
): GatsbyGraphQLObjectType => {
  const name = generateImageTypeName(imageType)

  return schema.buildObjectType({
    name,
    fields: {
      localFile: {
        type: `File`,
        extensions: {
          link: {},
        },
      },
    },
  })
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
