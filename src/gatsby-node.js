const MOVIEDB = require('moviedb-promise')
const limits = require('limits.js')
const { digest, fetchPaginatedData } = require('./utils')

exports.sourceNodes = async (
  { actions, createNodeId },
  { apiKey, sessionID, language = 'en-US', region = 'US', endpoints = {}, pages = 3, timezone = 'Europe/London' }
) => {
  const { createNode } = actions
  const { account = true, misc = false, tv = false } = endpoints

  if (!apiKey || !sessionID) {
    throw new Error('You need to define apiKey and sessionID')
  }

  const nodeHelper = (input, name) => {
    input[`${name}Id`] = input.id
    input.id = createNodeId(`TMDB_${name}_${input.id}`)

    const node = {
      ...input,
      parent: null,
      children: [],
      internal: {
        type: `TMDB${name}`,
      },
    }

    node.internal.contentDigest = digest(node)
    createNode(node)
  }

  async function chainRequest({ name, first, second }) {
    try {
      console.log(`Start fetching ${name}`)
      const timeStart = process.hrtime()
      const firstList = await fetchPaginatedData({
        func: first,
      })
      const secondRequests = firstList.map(req => second({ id: req.id, language }))
      const secondDetailed = await Promise.all(secondRequests)
      const timeDuration = process.hrtime(timeStart)
      console.log(`Fetching ${name} took ${timeDuration[0]} second(s)`)

      secondDetailed.forEach(item => {
        nodeHelper(item, name)
      })
    } catch (err) {
      console.error(err)
    }
  }

  async function singleRequest({ name, func, options = {}, paginate = false, pagesCount }) {
    try {
      console.log(`Start fetching ${name}`)
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
        data.forEach(item => {
          nodeHelper(item, name)
        })
      } else {
        nodeHelper(data, name)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const moviedb = new MOVIEDB(apiKey, false)
  moviedb.sessionId = sessionID
  moviedb.throttle = limits().within(10 * 1000, 35)

  await singleRequest({ name: 'AccountInfo', func: moviedb.accountInfo })
  await singleRequest({ name: 'Configuration', func: moviedb.configuration })

  if (account) {
    await chainRequest({ name: 'AccountLists', first: moviedb.accountLists, second: moviedb.listInfo })
    await chainRequest({
      name: 'AccountFavoriteMovies',
      first: moviedb.accountFavoriteMovies,
      second: moviedb.movieInfo,
    })
    await chainRequest({ name: 'AccountRatedMovies', first: moviedb.accountRatedMovies, second: moviedb.movieInfo })
    await chainRequest({
      name: 'AccountFavoriteTv',
      first: moviedb.accountFavoriteTv,
      second: moviedb.tvInfo,
    })
    await chainRequest({ name: 'AccountRatedTv', first: moviedb.accountRatedTv, second: moviedb.tvInfo })
    await chainRequest({ name: 'AccountTvWatchlist', first: moviedb.accountTvWatchlist, second: moviedb.tvInfo })
    await chainRequest({
      name: 'AccountMovieWatchlist',
      first: moviedb.accountMovieWatchlist,
      second: moviedb.movieInfo,
    })
  }

  if (misc) {
    await singleRequest({ name: 'MiscUpcomingMovies', func: moviedb.miscUpcomingMovies, options: { region } })
    await singleRequest({
      name: 'MiscNowPlayingMovies',
      func: moviedb.miscNowPlayingMovies,
      options: { region },
      paginate: true,
    })
    await singleRequest({
      name: 'MiscPopularMovies',
      func: moviedb.miscPopularMovies,
      options: { region },
      paginate: true,
      pagesCount: pages,
    })
    await singleRequest({
      name: 'MiscTopRatedMovies',
      func: moviedb.miscTopRatedMovies,
      options: { region },
      paginate: true,
      pagesCount: pages,
    })
    await singleRequest({
      name: 'MiscTopRatedTvs',
      func: moviedb.miscTopRatedTvs,
      paginate: true,
      pagesCount: pages,
    })
    await singleRequest({
      name: 'MiscPopularTvs',
      func: moviedb.miscPopularTvs,
      paginate: true,
      pagesCount: pages,
    })
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
