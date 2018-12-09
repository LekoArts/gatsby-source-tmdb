const { digest, capitalize } = require('./utils')
const { addLocalImage } = require('./add-local-image')

/**
 * @name normalize
 * @description Create a node out of the data that the API gives back. Switches the id and adds image nodes when possible.
 * @param item - Movie/Show
 * @param name - Name of the moviedb-promise function
 * @param gatsbyFunctions - Gatsby's internal helper functions
 * @returns {Promise<*>} - Created a node with changed it and image nodes
 */

const normalize = async ({ item, name, gatsbyFunctions }) => {
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

  if (item.backdrop_path) {
    await addLocalImage({ node, fieldName: 'backdrop_path', gatsbyFunctions })
  }

  if (item.poster_path) {
    await addLocalImage({ node, fieldName: 'poster_path', gatsbyFunctions })
  }

  node.internal.contentDigest = digest(node)
  return createNode(node)
}

exports.normalize = normalize
