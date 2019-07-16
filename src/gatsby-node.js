const MOVIEDB = require('moviedb-promise')
const limits = require('limits.js')
const { fetchPaginatedData } = require('./fetch-paginated-data')
const { normalize } = require('./normalize')
const { combineModules } = require('./combine-modules')

exports.sourceNodes = async (
  gatsbyFunctions,
  {
    apiKey,
    sessionID,
    language = 'en-US',
    region = 'US',
    modules: userModules,
    timezone = 'Europe/London',
    reqPerTenSeconds = 36,
    poster = true,
    backdrop = false,
  }
) => {
  let modules
  if (userModules) {
    modules = combineModules(userModules)
  } else {
    modules = combineModules({})
  }

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

      await Promise.all(secondDetailed.map(item => normalize({ item, name, poster, backdrop, gatsbyFunctions })))
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
        await Promise.all(data.map(item => normalize({ item, name, poster, backdrop, gatsbyFunctions })))
      } else {
        await normalize({
          item: data,
          name,
          poster,
          backdrop,
          gatsbyFunctions,
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  const moviedb = new MOVIEDB(apiKey, false)
  moviedb.sessionId = sessionID
  moviedb.throttle = limits().within(10 * 1000, reqPerTenSeconds)

  await singleRequest({ name: 'AccountInfo', func: moviedb.accountInfo })
  await singleRequest({ name: 'Configuration', func: moviedb.configuration })

  if (modules.account.activate) {
    let movies = []
    let tvs = []
    let list = null
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

    if (modules.account.endpoints.list) {
      list = chainRequest({
        name: modules.account.endpoints.list,
        first: moviedb[modules.account.endpoints.list],
        second: moviedb.listInfo,
      })
    }

    await Promise.all([list, ...movies, ...tvs])
  }

  if (modules.misc.activate && modules.misc.endpoints.length !== 0 && Array.isArray(modules.misc.endpoints)) {
    const requests = modules.misc.endpoints.map(async ([name, pages = 3]) =>
      singleRequest({
        name,
        func: moviedb[name],
        options: {
          region,
        },
        paginate: true,
        pagesCount: pages,
      })
    )
    await Promise.all(requests)
  }

  if (modules.tv.activate && modules.tv.endpoints.length !== 0 && Array.isArray(modules.tv.endpoints)) {
    const requests = modules.tv.endpoints.map(async ([name, pages = 3]) =>
      singleRequest({
        name,
        func: moviedb[name],
        options: {
          timezone,
        },
        paginate: true,
        pagesCount: pages,
      })
    )
    await Promise.all(requests)
  }
}
