export const BASE_URL = `https://api.themoviedb.org/3/`
export const ERROR_CODES = {
  initialSourcing: `30000`,
  individualSourcing: `30001`,
  extensionSourcing: `30002`,
  getParamUndefined: `30003`,
}
export const IMAGE_TYPES = [`backdrop`, `logo`, `poster`, `profile`, `still`] as const
export const IMAGE_TYPE_NAMES = [`BackdropPath`, `LogoPath`, `PosterPath`, `ProfilePath`, `StillPath`] as const
export const TYPE_PREFIX = `Tmdb`
