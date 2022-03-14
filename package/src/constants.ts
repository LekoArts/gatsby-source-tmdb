export const BASE_URL = `https://api.themoviedb.org/3/`
export const ERROR_CODES = {
  initialSourcing: `30000`,
  individualSourcing: `30001`,
  extensionSourcing: `30002`,
  getParamUndefined: `30003`,
  configurationSourcing: `30004`,
  imageDownloading: `30005`,
} as const
export const IMAGE_TYPES = [`backdrop`, `logo`, `poster`, `profile`, `still`] as const
export const IMAGE_SIZES = {
  backdrop_sizes: [`w300`, `w780`, `w1280`, `original`],
  logo_sizes: [`w45`, `w92`, `w154`, `w185`, `w300`, `w500`, `original`],
  poster_sizes: [`w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`],
  profile_sizes: [`w45`, `w185`, `h632`, `original`],
  still_sizes: [`w92`, `w185`, `w300`, `original`],
}
export const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/`
export const TYPE_PREFIX = `Tmdb`
export const DEFAULT_OPTIONS = {
  region: `US`,
  timezone: `Europe/London`,
  language: `en-US`,
} as const
