const ProgressBar = require('progress')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

const bar = new ProgressBar(`Generating images [:bar] :current/:total :elapsed secs :percent`, {
  total: 0,
  width: 30,
})

let totalJobs = 0

/**
 * @name addLocalImage
 * @description Add image nodes (so that gatsby-plugin-sharp & gatsby-image) can be used.
 * The images will be downloaded and cached. Much quicker!
 * @param store
 * @param cache
 * @param createNode
 * @param createNodeId
 * @param touchNode
 * @param node - The current node
 * @param fieldName - Either poster_path or backdrop_path
 * @returns {Promise<*>} - Returns an image node
 */

const addLocalImage = async ({ store, cache, createNode, createNodeId, touchNode, node, fieldName }) => {
  totalJobs += 1
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
      url: `https://image.tmdb.org/t/p/original/${clone[fieldName]}`, // https://developers.themoviedb.org/3/getting-started/images
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

exports.addLocalImage = addLocalImage
