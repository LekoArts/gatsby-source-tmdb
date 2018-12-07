const MOVIEDB = require('moviedb-promise')
const limits = require('limits.js')
const { fetchPaginatedData, nodeHelper } = require('./utils')

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
      ['miscNowPlayingMovies', true, 1],
      ['miscPopularMovies', true, 1],
      ['miscTopRatedMovies', true, 1],
      ['miscTopRatedTvs', true, 1],
      ['miscPopularTvs', true, 1],
    ],
  },
  tv: {
    activate: false,
  },
}

exports.sourceNodes = async (
  { actions, createNodeId, store, cache },
  { apiKey, sessionID, language = 'en-US', region = 'US', modules = defaultModules, timezone = 'Europe/London' }
) => {
  const { createNode } = actions

  if (!apiKey || !sessionID) {
    throw new Error('You need to define apiKey and sessionID')
  }

  async function chainRequest({ name, first, second }) {
    try {
      console.log(`Fetching ${name}`)
      const firstList = await fetchPaginatedData({
        func: first,
      })
      const secondRequests = firstList.map(req => second({ id: req.id, language }))
      const secondDetailed = await Promise.all(secondRequests)

      await Promise.all(secondDetailed.map(item => nodeHelper({ item, name, createNodeId, createNode, store, cache })))
    } catch (err) {
      console.error(err)
    }
  }

  async function singleRequest({ name, func, options = {}, paginate = false, pagesCount }) {
    try {
      let data
      console.log(`Fetching ${name}`)

      if (paginate) {
        data = await fetchPaginatedData({
          func,
          options,
          pagesCount,
        })
      } else {
        data = await func({ language, ...options })
      }

      if (paginate) {
        await Promise.all(data.map(item => nodeHelper({ item, name, createNodeId, createNode, store, cache })))
      } else {
        await nodeHelper({
          item: data,
          name,
          createNodeId,
          createNode,
          store,
          cache,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const moviedb = new MOVIEDB(apiKey, false)
  moviedb.sessionId = sessionID
  moviedb.throttle = limits().within(10 * 1000, 36)

  await singleRequest({ name: 'AccountInfo', func: moviedb.accountInfo })
  await singleRequest({ name: 'Configuration', func: moviedb.configuration })

  if (modules.account.activate) {
    let movies = []
    let tvs = []
    if (Array.isArray(modules.account.endpoints.movies) && modules.account.endpoints.movies.length !== 0) {
      movies = modules.account.endpoints.movies.map(async name =>
        chainRequest({ name, first: moviedb[name], second: moviedb.movieInfo })
      )
    }
    if (Array.isArray(modules.account.endpoints.tvs) && modules.account.endpoints.tvs.length !== 0) {
      tvs = modules.account.endpoints.tvs.map(async name =>
        chainRequest({ name, first: moviedb[name], second: moviedb.tvInfo })
      )
    }

    await Promise.all([
      chainRequest({
        name: modules.account.endpoints.list,
        first: moviedb[modules.account.endpoints.list],
        second: moviedb.listInfo,
      }),
      ...movies,
      ...tvs,
    ])
  }

  if (modules.misc.activate && modules.misc.endpoints.length !== 0 && Array.isArray(modules.misc.endpoints)) {
    const requests = modules.misc.endpoints.map(async ([name, usePagination = false, pages = 3]) =>
      singleRequest({
        name,
        func: moviedb[name],
        options: {
          region,
        },
        /* eslint-disable indent */
        ...(usePagination
          ? {
            paginate: true,
            pagesCount: pages,
          }
          : {}),
        /* eslint-enable indent */
      })
    )
    await Promise.all([...requests])
  }

  if (modules.tv.activate) {
    await singleRequest({
      name: 'tvAiringToday',
      func: moviedb.tvAiringToday,
      options: { timezone },
      paginate: true,
    })
  }
}
