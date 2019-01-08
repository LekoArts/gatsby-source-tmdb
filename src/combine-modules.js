const defaultModules = {
  account: {
    activate: true,
    endpoints: {
      tvs: ['accountFavoriteTv', 'accountRatedTv', 'accountTvWatchlist'],
      movies: ['accountFavoriteMovies', 'accountRatedMovies', 'accountMovieWatchlist'],
      list: 'accountLists',
    },
  },
  misc: {
    activate: false,
    endpoints: [
      ['miscUpcomingMovies'],
      ['miscNowPlayingMovies'],
      ['miscPopularMovies', 2],
      ['miscTopRatedMovies', 2],
      ['miscTopRatedTvs', 1],
      ['miscPopularTvs', 1],
    ],
  },
  tv: {
    activate: false,
    endpoints: [['tvAiringToday'], ['tvOnTheAir', 2]],
  },
}

exports.defaultModules = defaultModules

/**
 * @name combineModules
 * @description The user could only put "activate" into an entry and
 * will get all "endpoints".
 * His/her override of the "activate" will be combined with the default "endpoints"
 * @param userModules
 * @returns Object - Combined Object
 */

const combineModules = userModules =>
  Object.assign(
    {},
    {
      account: {
        ...defaultModules.account,
        ...userModules.account,
      },
      misc: {
        ...defaultModules.misc,
        ...userModules.misc,
      },
      tv: {
        ...defaultModules.tv,
        ...userModules.tv,
      },
    }
  )

exports.combineModules = combineModules
