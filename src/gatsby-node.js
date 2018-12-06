const MOVIEDB = require('moviedb-promise')
const limits = require('limits.js')
const { fetchPaginatedData, nodeHelper } = require('./utils')

exports.sourceNodes = async (
  { actions, createNodeId, store, cache },
  { apiKey, sessionID, language = 'en-US', region = 'US', endpoints = {}, pages = 3, timezone = 'Europe/London' }
) => {
  const { createNode } = actions
  const { account = true, misc = false, tv = false } = endpoints

  if (!apiKey || !sessionID) {
    throw new Error('You need to define apiKey and sessionID')
  }

  async function chainRequest({ name, first, second }) {
    try {
      const timeStart = process.hrtime()
      const firstList = await fetchPaginatedData({
        func: first,
      })
      const secondRequests = firstList.map(req => second({ id: req.id, language }))
      const secondDetailed = await Promise.all(secondRequests)
      const timeDuration = process.hrtime(timeStart)
      console.log(`Fetching ${name} took ${timeDuration[0]} second(s)`)

      await Promise.all(secondDetailed.map(item => nodeHelper({ item, name, createNodeId, createNode, store, cache })))
    } catch (err) {
      console.error(err)
    }
  }

  async function singleRequest({ name, func, options = {}, paginate = false, pagesCount }) {
    try {
      const timeStart = process.hrtime()
      let data
      if (paginate) {
        data = await fetchPaginatedData({
          func,
          options,
          pagesCount,
        })
      } else {
        data = await func({ language, ...options })
      }
      const timeDuration = process.hrtime(timeStart)
      console.log(`Fetching ${name} took ${timeDuration[0]} second(s)`)
      if (paginate) {
        await Promise.all(data.map(item => nodeHelper({ item, name, createNodeId, createNode, store, cache })))
      } else {
        await nodeHelper({ item: data, name, createNodeId, createNode, store, cache })
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

  if (account) {
    await Promise.all([
      chainRequest({ name: 'AccountLists', first: moviedb.accountLists, second: moviedb.listInfo }),
      chainRequest({
        name: 'AccountFavoriteMovies',
        first: moviedb.accountFavoriteMovies,
        second: moviedb.movieInfo,
      }),
      chainRequest({ name: 'AccountRatedMovies', first: moviedb.accountRatedMovies, second: moviedb.movieInfo }),
      chainRequest({
        name: 'AccountMovieWatchlist',
        first: moviedb.accountMovieWatchlist,
        second: moviedb.movieInfo,
      }),
      chainRequest({
        name: 'AccountFavoriteTv',
        first: moviedb.accountFavoriteTv,
        second: moviedb.tvInfo,
      }),
      chainRequest({ name: 'AccountRatedTv', first: moviedb.accountRatedTv, second: moviedb.tvInfo }),
      chainRequest({ name: 'AccountTvWatchlist', first: moviedb.accountTvWatchlist, second: moviedb.tvInfo }),
    ])
  }

  if (misc) {
    await Promise.all([
      singleRequest({ name: 'MiscUpcomingMovies', func: moviedb.miscUpcomingMovies, options: { region } }),
      singleRequest({
        name: 'MiscNowPlayingMovies',
        func: moviedb.miscNowPlayingMovies,
        options: { region },
        paginate: true,
      }),
      singleRequest({
        name: 'MiscPopularMovies',
        func: moviedb.miscPopularMovies,
        options: { region },
        paginate: true,
        pagesCount: pages,
      }),
      singleRequest({
        name: 'MiscTopRatedMovies',
        func: moviedb.miscTopRatedMovies,
        options: { region },
        paginate: true,
        pagesCount: pages,
      }),
      singleRequest({
        name: 'MiscTopRatedTvs',
        func: moviedb.miscTopRatedTvs,
        paginate: true,
        pagesCount: pages,
      }),
      singleRequest({
        name: 'MiscPopularTvs',
        func: moviedb.miscPopularTvs,
        paginate: true,
        pagesCount: pages,
      }),
    ])
  }

  if (tv) {
    await singleRequest({
      name: 'tvAiringToday',
      func: moviedb.tvAiringToday,
      options: { timezone },
      paginate: true,
    })
  }
}
