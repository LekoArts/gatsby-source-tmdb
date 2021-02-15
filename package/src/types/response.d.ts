/* eslint-disable camelcase */

export interface Configuration {
  change_keys: string[]
  images: {
    base_url?: string
    secure_base_url?: string
    backdrop_sizes?: string[]
    logo_sizes?: string[]
    poster_sizes?: string[]
    profile_sizes?: string[]
    still_sizes?: string[]
  }
}

export interface AccountInfo {
  id?: number
  avatar?: {
    gravatar?: {
      hash?: string
    }
  }
  iso_639_1?: string
  iso_3166_1?: string
  name?: string
  include_adult?: boolean
  username?: string
}
