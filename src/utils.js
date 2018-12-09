const { createRemoteFileNode } = require('gatsby-source-filesystem')
const crypto = require('crypto')
const ProgressBar = require('progress')

const bar = new ProgressBar(`Generating images [:bar] :current/:total :elapsed secs :percent`, {
  total: 0,
  width: 25,
})

const digest = input =>
  crypto
    .createHash('md5')
    .update(JSON.stringify(input))
    .digest('hex')

exports.digest = digest

const capitalize = input => input[0].toUpperCase() + input.slice(1)

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

let totalJobs = 0

const addLocalImage = async ({ store, cache, createNode, createNodeId, touchNode, node, fieldName }) => {
  bar.total = totalJobs

  const clone = Object.assign({}, node)
  let imageNodeId
  const remoteDataCacheKey = `TMDB-File-${clone.id}`
  const cacheRemoteData = await cache.get(remoteDataCacheKey)

  if (cacheRemoteData) {
    imageNodeId = cacheRemoteData.imageNodeId // eslint-disable-line prefer-destructuring
    touchNode({ nodeId: cacheRemoteData.imageNodeId })
  }

  if (!imageNodeId) {
    const imageNode = await createRemoteFileNode({
      url: `https://image.tmdb.org/t/p/original/${clone[fieldName]}`,
      store,
      cache,
      createNode,
      createNodeId,
    })

    if (imageNode) {
      bar.tick()
      imageNodeId = imageNode.id

      await cache.set(remoteDataCacheKey, { imageNodeId })
    }
  }

  if (imageNodeId) {
    node[`${fieldName}___NODE`] = imageNodeId
  }

  return clone
}

const nodeHelper = async ({ item, name, createNodeId, createNode, touchNode, store, cache }) => {
  item[`${name}Id`] = item.id
  item.id = createNodeId(`TMDB_${name}_${item.id}`)

  const node = {
    ...item,
    parent: null,
    children: [],
    internal: {
      type: `TMDB${capitalize(name)}`,
    },
  }

  if (item.backdrop_path) {
    totalJobs += 1
    await addLocalImage({ store, cache, createNode, createNodeId, touchNode, node, fieldName: 'backdrop_path' })
  }

  if (item.poster_path) {
    totalJobs += 1
    await addLocalImage({ store, cache, createNode, createNodeId, touchNode, node, fieldName: 'poster_path' })
  }

  node.internal.contentDigest = digest(node)
  return createNode(node)
}

exports.nodeHelper = nodeHelper
