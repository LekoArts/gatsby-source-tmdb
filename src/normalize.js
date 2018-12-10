const { digest, capitalize } = require('./utils')
const { addLocalImage } = require('./add-local-image')

/**
 * @name normalize
 * @description Create a node out of the data that the API gives back. Switches the id and adds image nodes when possible.
 * @param {object} item - Movie/Show
 * @param {string} name - Name of the moviedb-promise function
 * @param {boolean} poster - True/False if poster_path URL should be queried
 * @param {boolean} backdrop - True/False if backdrop_path URL should be queried
 * @param {object} gatsbyFunctions - Gatsby's internal helper functions
 * @returns {Promise<*>} - Created a node with changed id and image nodes
 */

const normalize = async ({ item, name, poster, backdrop, gatsbyFunctions }) => {
  const {
    createNodeId,
    actions: { createNode },
  } = gatsbyFunctions

  item[`${name}Id`] = item.id
  item.id = createNodeId(`TMDB_${name}_${item.id}`)

  const node = {
    ...item,
    parent: null,
    children: [],
    internal: {
      type: `TMDB${capitalize(name)}`, // As "name" begins with a lowercase letter, capitalize it!
    },
  }

  if (backdrop) {
    if (item.backdrop_path) {
      await addLocalImage({ node, fieldName: 'backdrop_path', gatsbyFunctions })
    }
  }

  if (poster) {
    if (item.poster_path) {
      await addLocalImage({ node, fieldName: 'poster_path', gatsbyFunctions })
    }
  }

  if (node.items && node.items.length > 0) {
    const itemNodes = await Promise.all(
      node.items.map(subitem =>
        normalize({ item: subitem, name: subitem.media_type, poster, backdrop, gatsbyFunctions })
      )
    )

    node.items___NODE = itemNodes.filter(p => !!p).map(n => n.id)
  }
  delete node.items

  node.internal.contentDigest = digest(node)
  createNode(node)
  return node
}

exports.normalize = normalize
