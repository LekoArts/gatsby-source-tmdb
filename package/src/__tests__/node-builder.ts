import { SourceNodesArgs } from "gatsby"
import { createNodeHelpers } from "gatsby-node-helpers"
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

jest.mock(`gatsby-source-filesystem`, () => ({
  createRemoteFileNode: jest.fn().mockResolvedValue({
    id: `local-file-node-id`,
  }),
}))

const gatsbyApi = {
  cache: {
    set: jest.fn(),
    get: jest.fn(),
  },
  actions: {
    createNode: jest.fn(),
  },
  createContentDigest: jest.fn(),
  createNodeId: jest.fn(),
  store: jest.fn(),
  reporter: {
    info: jest.fn(),
    error: jest.fn(),
    panic: jest.fn(),
    activityTimer: (): Record<string, unknown> => ({
      start: jest.fn(),
      end: jest.fn(),
      setStatus: jest.fn(),
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
