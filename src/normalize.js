const { digest, capitalize } = require('./utils')
const { addLocalImage } = require('./add-local-image')

/**
 * @name normalize
 * @description Create a node out of the data that the API gives back. Switches the id and adds image nodes when possible.
 * @param item - Movie/Show
 * @param name - Name of the moviedb-promise function
 * @param createNodeId
 * @param createNode
 * @param touchNode
 * @param store
 * @param cache
 * @returns {Promise<*>}
 */

const normalize = async ({ item, name, createNodeId, createNode, touchNode, store, cache }) => {
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
    await addLocalImage({ store, cache, createNode, createNodeId, touchNode, node, fieldName: 'backdrop_path' })
  }

  if (item.poster_path) {
    await addLocalImage({ store, cache, createNode, createNodeId, touchNode, node, fieldName: 'poster_path' })
  }

  node.internal.contentDigest = digest(node)
  return createNode(node)
}

exports.normalize = normalize
