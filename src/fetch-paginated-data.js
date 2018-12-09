async function fetchPaginatedData(input) {
  const { page = 1, func, options = {}, pagesCount } = input
  const response = await func({ page, ...options })
  const { results, total_pages: totalPages } = response
  const pageSize = pagesCount || totalPages

  if (page < pageSize) {
    const additionalItems = await fetchPaginatedData({
      ...input,
      page: response.page + 1,
    })

    return [...results, ...additionalItems]
  }

  return results
}

exports.fetchPaginatedData = fetchPaginatedData