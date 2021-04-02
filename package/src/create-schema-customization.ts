import { GatsbyNode } from "gatsby"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }): any => {
  const { createTypes } = actions

  createTypes(`
    type TmdbAccount implements Node {
      tmdbId: String
      username: String
      include_adult: Boolean
      name: String
      iso_3166_1: String
      iso_639_1: String
      avatar: TmdbAccountAvatar
    }

    type TmdbAccountAvatar {
      gravatar: TmdbAccountAvatarGravatar
      tmdb: TmdbAccountAvatarTmdb
    }

    type TmdbAccountAvatarGravatar {
      hash: String
    }

    type TmdbAccountAvatarTmdb {
      avatar_path: String
    }

    type TmdbConfiguration implements Node {
      change_keys: [String]
      tmdbId: String
      images: TmdbConfigurationImages
    }

    type TmdbConfigurationImages {
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
