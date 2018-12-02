const crypto = require('crypto')

const digest = input =>
  crypto
    .createHash('md5')
    .update(JSON.stringify(input))
    .digest('hex')

exports.digest = digest

async function fetchPaginatedData(pluginOptions) {
  const { pageSize, language, page, func } = pluginOptions
  const response = await func({ language, page })
  const { results } = response

  if (page < pageSize) {
    const additionalItems = await fetchPaginatedData({
      ...pluginOptions,
      page: response.page + 1,
    })

    return [...results, ...additionalItems]
  }

  return results
}

exports.fetchPaginatedData = fetchPaginatedData
