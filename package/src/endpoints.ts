import * as TMDBPlugin from "./types/tmdb-plugin"

export const defaultEndpoints: Array<TMDBPlugin.Endpoint> = [
  // Account
  {
    url: `account/:account_id/lists`,
  },
  {
    url: `account/:account_id/favorite/movies`,
  },
  {
    url: `account/:account_id/favorite/tv`,
  },
  {
    url: `account/:account_id/watchlist/movies`,
  },
  {
    url: `account/:account_id/watchlist/tv`,
  },
  // Movies
  {
    url: `movie/popular`,
  },
  {
    url: `movie/top_rated`,
  },
  // TV
  {
    url: `tv/popular`,
  },
  {
    url: `tv/top_rated`,
  },
]
