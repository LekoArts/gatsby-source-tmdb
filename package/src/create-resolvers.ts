import { GatsbyNode } from "gatsby"
import * as GatsbyFS from "gatsby-source-filesystem"
import * as TMDBPlugin from "./types/tmdb-plugin"
import { IMAGE_TYPE_NAMES } from "./constants"

export const createResolvers: GatsbyNode["createResolvers"] = ({
  actions,
  cache,
  createNodeId,
  store,
  reporter,
  createResolvers: resolvers,
}): any => {
  const { createNode } = actions

  const imageResolvers = IMAGE_TYPE_NAMES.reduce(
    (r, nodeType) => ({
      ...r,
      [`${nodeType}`]: {
        localFile: {
          type: `File`,
          resolve: async (source: TMDBPlugin.ImageNode): Promise<GatsbyFS.FileSystemNode> =>
            GatsbyFS.createRemoteFileNode({
              url: source.original,
              store,
              cache,
              createNode,
              createNodeId,
              reporter,
            }),
        },
      },
    }),
    {}
  )

  resolvers(imageResolvers)
}
