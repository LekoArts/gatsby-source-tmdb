/**
 * @name fetchPaginatedData
 * @description The TMDb API doesn't give back all data in one response but only 20 items per page.
 * Therefore a pagination is needed to get all results back.
 * First it will make a request to the API to see how many pages are there (total_pages).
 * Then it'll start at page 1 and put the data into an array.
 * It's a recursive function so it'll put the data into the array until pageSize is reached.
 * @param input - It will start at page 1,
 * @returns {Promise<*>} - Array of items (Shows/Movies)
 */

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
