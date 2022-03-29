import { describe, it, expect, vi } from "vitest"
import { SourceNodesArgs } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
import { createRemoteFileNode } from "gatsby-source-filesystem"
import { defaultOptions } from "../api-utils"
import { imageTransformation } from "../node-builder"

const endpoint = {
  url: `account/:account_id/favorite/movies`,
}

const pluginOptions = defaultOptions({
  apiKey: `api-key`,
  sessionID: `session-id`,
  plugins: [],
})

const nodeHelpers = createNodeHelpers({
  typePrefix: `Tmdb`,
  createNodeId: (input) => input.toString(),
  createContentDigest: (input) => input.toString(),
})

vi.mock(`gatsby-source-filesystem`, () => ({
  createRemoteFileNode: vi.fn().mockResolvedValue({
    id: `local-file-node-id`,
  }),
}))

const gatsbyApi = {
  cache: {
    set: vi.fn(),
    get: vi.fn(),
  },
  actions: {
    createNode: vi.fn(),
  },
  createContentDigest: vi.fn(),
  createNodeId: vi.fn(),
  store: vi.fn(),
  reporter: {
    info: vi.fn(),
    error: vi.fn(),
    panic: vi.fn(),
    activityTimer: (): Record<string, unknown> => ({
      start: vi.fn(),
      end: vi.fn(),
      setStatus: vi.fn(),
    }),
  },
} as unknown as SourceNodesArgs

export const node = {
  id: 1,
  backdrop_path: `/backdrop_image.png`,
  logo_path: `/logo_image.png`,
  poster_path: `/poster_image.png`,
  profile_path: `/profile_image.png`,
  still_path: `/still_image.png`,
}

export const nodeSmall = {
  id: 2,
  backdrop_path: `/backdrop_image.png`,
}

describe(`imageTransformation in nodeBuilder`, () => {
  it(`should convert nodes one level deep`, async () => {
    const nodeCopy = { ...node, title: `one-level` }
    const result = await imageTransformation({
      node: nodeCopy,
      endpoint,
      pluginOptions,
      nodeHelpers,
      gatsbyApi,
    })
    expect(result).toMatchSnapshot()
    const mock = createRemoteFileNode
    expect(mock).not.toHaveBeenCalled()
  })
  it(`should convert nodes two levels deep`, async () => {
    const nodeCopy = {
      id: 3,
      items: [
        {
          backdrop_path: `/backdrop_image.png`,
          logo_path: `/logo_image.png`,
        },
        {
          poster_path: `/poster_image.png`,
          profile_path: `/profile_image.png`,
          still_path: `/still_image.png`,
        },
      ],
      title: `two-level`,
    }
    const result = await imageTransformation({
      node: nodeCopy,
      endpoint,
      pluginOptions,
      nodeHelpers,
      gatsbyApi,
    })
    expect(result).toMatchSnapshot()
  })
  describe(`with downloadImages`, () => {
    it(`set in endpoint should convert nodes one level deep`, async () => {
      const nodeCopy = { ...nodeSmall, title: `img-one-level` }
      const result = await imageTransformation({
        node: nodeCopy,
        endpoint: { ...endpoint, downloadImages: true },
        pluginOptions,
        nodeHelpers,
        gatsbyApi,
      })
      expect(result).toMatchSnapshot()
      const mock = createRemoteFileNode
      expect(mock).toHaveBeenCalled()
    })
    it(`set in endpoint should convert nodes two levels deep`, async () => {
      const nodeCopy = {
        id: 4,
        items: [
          {
            backdrop_path: `/backdrop_image.png`,
          },
        ],
        title: `img-two-level`,
      }
      const result = await imageTransformation({
        node: nodeCopy,
        endpoint: { ...endpoint, downloadImages: true },
        pluginOptions,
        nodeHelpers,
        gatsbyApi,
      })
      expect(result).toMatchSnapshot()
    })
    it(`set in pluginOptions should convert nodes one level deep`, async () => {
      const nodeCopy = { ...nodeSmall, title: `img-options-one-level` }
      const result = await imageTransformation({
        node: nodeCopy,
        endpoint,
        pluginOptions: { ...pluginOptions, downloadImages: true },
        nodeHelpers,
        gatsbyApi,
      })
      expect(result).toMatchSnapshot()
    })
    it(`set in pluginOptions should convert nodes two levels deep`, async () => {
      const nodeCopy = {
        id: 4,
        items: [
          {
            backdrop_path: `/backdrop_image.png`,
          },
        ],
        title: `img-options-two-level`,
      }
      const result = await imageTransformation({
        node: nodeCopy,
        endpoint,
        pluginOptions: { ...pluginOptions, downloadImages: true },
        nodeHelpers,
        gatsbyApi,
      })
      expect(result).toMatchSnapshot()
    })
  })
})
