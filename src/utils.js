const { createRemoteFileNode } = require('gatsby-source-filesystem')
const crypto = require('crypto')

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

const addLocalImage = async ({ store, cache, createNode, node, fieldName }) => {
  const fileNode = await createRemoteFileNode({
    url: `https://image.tmdb.org/t/p/original/${node[fieldName]}`,
    store,
    cache,
    createNode,
    createNodeId: id => `TMDB-LocalImage-${id}`,
  })

  if (fileNode) {
    node[`${fieldName}___NODE`] = fileNode.id
  }
}

const nodeHelper = async ({ item, name, createNodeId, createNode, store, cache }) => {
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
    await addLocalImage({ store, cache, createNode, node, fieldName: 'backdrop_path' })
  }

  if (item.poster_path) {
    await addLocalImage({ store, cache, createNode, node, fieldName: 'poster_path' })
  }

  /*
  if (item.items && item.items.length > 0) {
    await Promise.all(
      item.items.map(async subitem => {
        const extraDataNode = await nodeHelper({ item: subitem, name: item.name, createNode, createNodeId, store, cache })

        node.items___NODE =
      })
    )
  }
  */

  node.internal.contentDigest = digest(node)
  return createNode(node)
}

exports.nodeHelper = nodeHelper
