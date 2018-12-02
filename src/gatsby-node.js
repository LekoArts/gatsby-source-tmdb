const MOVIEDB = require('moviedb-promise')
const { digest, fetchPaginatedData } = require('./utils')

exports.sourceNodes = async ({ actions, createNodeId }, { apiKey, sessionID, language = 'en-US' }) => {
  const { createNode } = actions

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

  async function detailGenerate({ name, first, second }) {
    try {
      console.log(`Start fetching ${name}`)
      const timeStart = process.hrtime()
      const initial = await first()
      const firstList = await fetchPaginatedData({
        pageSize: initial.total_pages,
        language,
        func: first,
        page: 1,
      })
      const secondRequests = firstList.map(req => second({ id: req.id }))
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

  const moviedb = new MOVIEDB(apiKey)
  moviedb.sessionId = sessionID

  const timeStartAccInfo = process.hrtime()
  console.log(`Start fetching AccountInfo`)
  const accountInfo = await moviedb.accountInfo()
  const timeDurationAccInfo = process.hrtime(timeStartAccInfo)
  console.log(`Fetching AccountInfo took ${timeDurationAccInfo[0]} second(s)`)
  nodeHelper(accountInfo, 'AccountInfo')

  const timeStartConfiguration = process.hrtime()
  console.log(`Start fetching Configuration`)
  const Configuration = await moviedb.configuration()
  const timeDurationConfiguration = process.hrtime(timeStartConfiguration)
  console.log(`Fetching Configuration took ${timeDurationConfiguration[0]} second(s)`)
  nodeHelper(Configuration, 'Configuration')

  await detailGenerate({ name: 'AccountLists', first: moviedb.accountLists, second: moviedb.listInfo })
  await detailGenerate({
    name: 'AccountFavoriteMovies',
    first: moviedb.accountFavoriteMovies,
    second: moviedb.movieInfo,
  })
  await detailGenerate({ name: 'AccountRatedMovies', first: moviedb.accountRatedMovies, second: moviedb.movieInfo })
  await detailGenerate({
    name: 'AccountFavoriteTv',
    first: moviedb.accountFavoriteTv,
    second: moviedb.tvInfo,
  })
  await detailGenerate({ name: 'AccountRatedTv', first: moviedb.accountRatedTv, second: moviedb.tvInfo })
  await detailGenerate({ name: 'AccountTvWatchlist', first: moviedb.accountTvWatchlist, second: moviedb.tvInfo })
  await detailGenerate({ name: 'AccountMovieWatchlist', first: moviedb.accountMovieWatchlist, second: moviedb.movieInfo })
}
