import { imageTransformation } from "../node-builder"

const node = {
  id: 1,
  backdrop_path: `/backdrop_image.png`,
  logo_path: `/logo_image.png`,
  poster_path: `/poster_image.png`,
  profile_path: `/profile_image.png`,
  still_path: `/still_image.png`,
}

const deepNode = {
  id: 1,
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
}

describe(`imageTransformation in nodeBuilder`, () => {
  it(`should convert nodes one level deep`, () => {
    expect(imageTransformation({ node })).toMatchInlineSnapshot(`
      Object {
        "backdrop_path": Object {
          "original": "https://image.tmdb.org/t/p/original/backdrop_image.png",
          "source": "/backdrop_image.png",
          "w1280": "https://image.tmdb.org/t/p/w1280/backdrop_image.png",
          "w300": "https://image.tmdb.org/t/p/w300/backdrop_image.png",
          "w780": "https://image.tmdb.org/t/p/w780/backdrop_image.png",
        },
        "id": 1,
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
    expect(imageTransformation({ node: deepNode })).toMatchInlineSnapshot(`
      Object {
        "id": 1,
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
})
