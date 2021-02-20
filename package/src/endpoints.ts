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
    url: `movie/now_playing`,
  },
  {
    url: `movie/popular`,
  },
  {
    url: `movie/top_rated`,
  },
  {
    url: `movie/upcoming`,
  },
  // TV
  {
    url: `tv/airing_today`,
  },
  {
    url: `tv/on_the_air`,
  },
  {
    url: `tv/popular`,
  },
  {
    url: `tv/top_rated`,
  },
]
