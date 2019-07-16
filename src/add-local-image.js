const { createRemoteFileNode } = require('gatsby-source-filesystem')

/**
 * @name addLocalImage
 * @description Add image nodes (so that gatsby-plugin-sharp & gatsby-image) can be used.
 * The images will be downloaded and cached. Much quicker!
 * @param gatsbyFunctions - Gatsby's internal helper functions
 * @param node - The current node
 * @param fieldName - Either poster_path or backdrop_path
 * @returns {Promise<*>} - Returns an image node
 */

const addLocalImage = async ({ node, fieldName, gatsbyFunctions }) => {
  const {
    createNodeId,
    store,
    cache,
    actions: { createNode, touchNode },
  } = gatsbyFunctions

  const clone = Object.assign({}, node)
  let imageNodeId
  const remoteDataCacheKey = `TMDB-File-${clone.id}-${fieldName}`
  const cacheRemoteData = await cache.get(remoteDataCacheKey)

  if (cacheRemoteData) {
    imageNodeId = cacheRemoteData.imageNodeId // eslint-disable-line prefer-destructuring
    touchNode({ nodeId: cacheRemoteData.imageNodeId })
  }

  if (!imageNodeId) {
    const imageNode = await createRemoteFileNode({
      url: `https://image.tmdb.org/t/p/original/${clone[fieldName]}`, // https://developers.themoviedb.org/3/getting-started/images
      store,
      cache,
      createNode,
      createNodeId,
    })

    if (imageNode) {
      imageNodeId = imageNode.id

      await cache.set(remoteDataCacheKey, { imageNodeId })
    }
  }

  if (imageNodeId) {
    node[`${fieldName}___NODE`] = imageNodeId
  }

  return clone
}

exports.addLocalImage = addLocalImage
