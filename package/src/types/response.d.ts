/* eslint-disable camelcase */

/**
 (The MIT License)
 Copyright (c) 2017 Grant Holle
 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 'Software'), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export interface PaginatedResponse {
  page: number
  total_results: number
  total_pages: number
  results: Array<unknown>
}

export interface Response {
  id: number
  [key: string]: unknown
}

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
    tmdb?: {
      avatar_path: string
    }
  }
  iso_639_1?: string
  iso_3166_1?: string
  name?: string
  include_adult?: boolean
  username?: string
}

export interface MovieResult {
  poster_path?: string | null | { source: string; [key: string]: string }
  adult?: boolean
  overview?: string
  release_date?: string
  genre_ids?: Array<number>
  id?: number
  media_type?: "movie"
  original_title?: string
  original_language?: string
  title?: string
  backdrop_path?: string | null | { source: string; [key: string]: string }
  popularity?: number
  vote_count?: number
  video?: boolean
  vote_average?: number
  rating?: number
}

export interface TvResult {
  poster_path?: string | null | { source: string; [key: string]: string }
  popularity?: number
  id?: number
  overview?: string
  backdrop_path?: string | null | { source: string; [key: string]: string }
  vote_average?: number
  media_type: "tv"
  first_air_date?: string
  origin_country?: Array<string>
  genre_ids?: Array<number>
  original_language?: string
  vote_count?: number
  name?: string
  original_name?: string
  rating?: number
}

export interface AccountList {
  description?: string
  favorite_count?: number
  id?: number
  item_count?: number
  iso_639_1?: string
  list_type?: string
  name?: string
  items?: MovieResult[] | TvResult[]
}

export interface SimpleEpisode {
  air_date?: string
  episode_number?: number
  id?: number
  name?: string
  overview?: string
  production_code?: string | null
  season_number?: number
  show_id?: number
  still_path?: string | null | { source: string; [key: string]: string }
  vote_average?: number
  vote_count?: number
  rating?: number
  order?: number
}

export interface SimpleSeason {
  air_date?: string
  episode_count?: number
  id?: number
  name?: string
  overview?: string
  poster_path?: string | { source: string; [key: string]: string }
  season_number?: number
}

export interface Network {
  headquarters?: string
  name?: string
  id?: number
  logo_path?: string | { source: string; [key: string]: string }
  origin_country?: string
}

export interface SimplePerson {
  birthday?: string | null
  known_for_department?: string
  deathday?: string | null
  id?: number
  name?: string
  also_known_as?: string[]
  gender?: number
  biography?: string
  popularity?: number
  place_of_birth?: string | null
  profile_path?: string | null | { source: string; [key: string]: string }
  adult?: boolean
  imdb_id?: string
  homepage?: string | null
}

export interface MovieResultResponse extends PaginatedResponse {
  results?: Array<MovieResult>
}

export interface TvResultResponse extends PaginatedResponse {
  results?: Array<TvResult>
}

export interface SimpleEpisodeResponse extends PaginatedResponse {
  results?: Array<SimpleEpisode>
}

export interface AccountListResponse extends PaginatedResponse {
  results?: Array<AccountList>
}

export type PaginationTransformResponse =
  | MovieResultResponse
  | TvResultResponse
  | SimpleEpisodeResponse
  | AccountListResponse
export interface ResponseItem
  extends AccountInfo,
    MovieResult,
    TvResult,
    SimpleEpisode,
    SimpleSeason,
    AccountList,
    Network,
    SimplePerson {}
export type PaginationItems = Array<ResponseItem>
