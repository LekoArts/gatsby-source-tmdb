import { defaultOptions } from "../api-utils"
import { imageTransformation } from "../node-builder"

const node = {
  id: `1`,
  backdrop_path: `/backdrop_image.png`,
  logo_path: `/logo_image.png`,
  poster_path: `/poster_image.png`,
  profile_path: `/profile_image.png`,
  still_path: `/still_image.png`,
  internal: {
    type: `Tmdb`,
    contentDigest: `123`,
  },
}

const nodeSmall = {
  id: `2`,
  backdrop_path: `/backdrop_image.png`,
  internal: {
    type: `Tmdb`,
    contentDigest: `123`,
  },
}

const deepNode = {
  id: `3`,
  items: [
    {
      id: 2,
      backdrop_path: `/backdrop_image.png`,
      logo_path: `/logo_image.png`,
    },
    {
      id: 3,
      poster_path: `/poster_image.png`,
      profile_path: `/profile_image.png`,
      still_path: `/still_image.png`,
    },
  ],
  internal: {
    type: `Tmdb`,
    contentDigest: `123`,
  },
}

const endpoint = {
  url: `account/:account_id/favorite/movies`,
}

const pluginOptions = defaultOptions({
  apiKey: `123`,
  sessionID: `123`,
  plugins: [],
})

describe(`imageTransformation in nodeBuilder`, () => {
  it(`should convert nodes one level deep`, () => {
    expect(imageTransformation({ node, endpoint, pluginOptions })).toMatchInlineSnapshot(`
      Object {
        "backdrop_path": Object {
          "original": "https://image.tmdb.org/t/p/original/backdrop_image.png",
          "source": "/backdrop_image.png",
          "w1280": "https://image.tmdb.org/t/p/w1280/backdrop_image.png",
          "w300": "https://image.tmdb.org/t/p/w300/backdrop_image.png",
          "w780": "https://image.tmdb.org/t/p/w780/backdrop_image.png",
        },
        "id": "1",
        "internal": Object {
          "contentDigest": "123",
          "type": "Tmdb",
        },
        "logo_path": Object {
          "original": "https://image.tmdb.org/t/p/original/logo_image.png",
          "source": "/logo_image.png",
          "w154": "https://image.tmdb.org/t/p/w154/logo_image.png",
          "w185": "https://image.tmdb.org/t/p/w185/logo_image.png",
          "w300": "https://image.tmdb.org/t/p/w300/logo_image.png",
          "w45": "https://image.tmdb.org/t/p/w45/logo_image.png",
          "w500": "https://image.tmdb.org/t/p/w500/logo_image.png",
          "w92": "https://image.tmdb.org/t/p/w92/logo_image.png",
        },
        "poster_path": Object {
          "original": "https://image.tmdb.org/t/p/original/poster_image.png",
          "source": "/poster_image.png",
          "w154": "https://image.tmdb.org/t/p/w154/poster_image.png",
          "w185": "https://image.tmdb.org/t/p/w185/poster_image.png",
          "w342": "https://image.tmdb.org/t/p/w342/poster_image.png",
          "w500": "https://image.tmdb.org/t/p/w500/poster_image.png",
          "w780": "https://image.tmdb.org/t/p/w780/poster_image.png",
          "w92": "https://image.tmdb.org/t/p/w92/poster_image.png",
        },
        "profile_path": Object {
          "h632": "https://image.tmdb.org/t/p/h632/profile_image.png",
          "original": "https://image.tmdb.org/t/p/original/profile_image.png",
          "source": "/profile_image.png",
          "w185": "https://image.tmdb.org/t/p/w185/profile_image.png",
          "w45": "https://image.tmdb.org/t/p/w45/profile_image.png",
        },
        "still_path": Object {
          "original": "https://image.tmdb.org/t/p/original/still_image.png",
          "source": "/still_image.png",
          "w185": "https://image.tmdb.org/t/p/w185/still_image.png",
          "w300": "https://image.tmdb.org/t/p/w300/still_image.png",
          "w92": "https://image.tmdb.org/t/p/w92/still_image.png",
        },
      }
    `)
  })
  it(`should convert nodes two levels deep (in items like in lists)`, () => {
    expect(imageTransformation({ node: deepNode, endpoint, pluginOptions })).toMatchInlineSnapshot(`
      Object {
        "id": "3",
        "internal": Object {
          "contentDigest": "123",
          "type": "Tmdb",
        },
        "items": Array [
          Object {
            "backdrop_path": Object {
              "original": "https://image.tmdb.org/t/p/original/backdrop_image.png",
              "source": "/backdrop_image.png",
              "w1280": "https://image.tmdb.org/t/p/w1280/backdrop_image.png",
              "w300": "https://image.tmdb.org/t/p/w300/backdrop_image.png",
              "w780": "https://image.tmdb.org/t/p/w780/backdrop_image.png",
            },
            "id": 2,
            "logo_path": Object {
              "original": "https://image.tmdb.org/t/p/original/logo_image.png",
              "source": "/logo_image.png",
              "w154": "https://image.tmdb.org/t/p/w154/logo_image.png",
              "w185": "https://image.tmdb.org/t/p/w185/logo_image.png",
              "w300": "https://image.tmdb.org/t/p/w300/logo_image.png",
              "w45": "https://image.tmdb.org/t/p/w45/logo_image.png",
              "w500": "https://image.tmdb.org/t/p/w500/logo_image.png",
              "w92": "https://image.tmdb.org/t/p/w92/logo_image.png",
            },
          },
          Object {
            "id": 3,
            "poster_path": Object {
              "original": "https://image.tmdb.org/t/p/original/poster_image.png",
              "source": "/poster_image.png",
              "w154": "https://image.tmdb.org/t/p/w154/poster_image.png",
              "w185": "https://image.tmdb.org/t/p/w185/poster_image.png",
              "w342": "https://image.tmdb.org/t/p/w342/poster_image.png",
              "w500": "https://image.tmdb.org/t/p/w500/poster_image.png",
              "w780": "https://image.tmdb.org/t/p/w780/poster_image.png",
              "w92": "https://image.tmdb.org/t/p/w92/poster_image.png",
            },
            "profile_path": Object {
              "h632": "https://image.tmdb.org/t/p/h632/profile_image.png",
              "original": "https://image.tmdb.org/t/p/original/profile_image.png",
              "source": "/profile_image.png",
              "w185": "https://image.tmdb.org/t/p/w185/profile_image.png",
              "w45": "https://image.tmdb.org/t/p/w45/profile_image.png",
            },
            "still_path": Object {
              "original": "https://image.tmdb.org/t/p/original/still_image.png",
              "source": "/still_image.png",
              "w185": "https://image.tmdb.org/t/p/w185/still_image.png",
              "w300": "https://image.tmdb.org/t/p/w300/still_image.png",
              "w92": "https://image.tmdb.org/t/p/w92/still_image.png",
            },
          },
        ],
      }
    `)
  })
  it(`should add downloadImages boolean`, () => {
    expect(
      imageTransformation({
        node: nodeSmall,
        endpoint: { ...endpoint, downloadImages: true },
        pluginOptions,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "backdrop_path": Object {
          "original": "https://image.tmdb.org/t/p/original/backdrop_image.png",
          "source": "/backdrop_image.png",
          "w1280": "https://image.tmdb.org/t/p/w1280/backdrop_image.png",
          "w300": "https://image.tmdb.org/t/p/w300/backdrop_image.png",
          "w780": "https://image.tmdb.org/t/p/w780/backdrop_image.png",
        },
        "downloadImages": true,
        "id": "2",
        "internal": Object {
          "contentDigest": "123",
          "type": "Tmdb",
        },
      }
    `)
  })
})
