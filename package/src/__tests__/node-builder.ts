import { imageTransformation } from "../node-builder"

const configuration = {
  images: {
    secure_base_url: `https://www.example.com/`,
    backdrop_sizes: [`w100`, `w200`],
    logo_sizes: [`w100`, `w200`],
    poster_sizes: [`w100`, `w200`],
    profile_sizes: [`w100`, `w200`],
    still_sizes: [`w100`, `w200`],
  },
  change_keys: [`foobar`],
}

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
    expect(imageTransformation({ node, configuration })).toStrictEqual({
      id: 1,
      backdrop_path: {
        source: `/backdrop_image.png`,
        w100: `https://www.example.com/w100/backdrop_image.png`,
        w200: `https://www.example.com/w200/backdrop_image.png`,
      },
      logo_path: {
        source: `/logo_image.png`,
        w100: `https://www.example.com/w100/logo_image.png`,
        w200: `https://www.example.com/w200/logo_image.png`,
      },
      poster_path: {
        source: `/poster_image.png`,
        w100: `https://www.example.com/w100/poster_image.png`,
        w200: `https://www.example.com/w200/poster_image.png`,
      },
      profile_path: {
        source: `/profile_image.png`,
        w100: `https://www.example.com/w100/profile_image.png`,
        w200: `https://www.example.com/w200/profile_image.png`,
      },
      still_path: {
        source: `/still_image.png`,
        w100: `https://www.example.com/w100/still_image.png`,
        w200: `https://www.example.com/w200/still_image.png`,
      },
    })
  })
  it(`should convert nodes two levels deep (in items like in lists)`, () => {
    expect(imageTransformation({ node: deepNode, configuration })).toStrictEqual({
      id: 1,
      items: [
        {
          id: 2,
          backdrop_path: {
            source: `/backdrop_image.png`,
            w100: `https://www.example.com/w100/backdrop_image.png`,
            w200: `https://www.example.com/w200/backdrop_image.png`,
          },
          logo_path: {
            source: `/logo_image.png`,
            w100: `https://www.example.com/w100/logo_image.png`,
            w200: `https://www.example.com/w200/logo_image.png`,
          },
        },
        {
          id: 3,
          poster_path: {
            source: `/poster_image.png`,
            w100: `https://www.example.com/w100/poster_image.png`,
            w200: `https://www.example.com/w200/poster_image.png`,
          },
          profile_path: {
            source: `/profile_image.png`,
            w100: `https://www.example.com/w100/profile_image.png`,
            w200: `https://www.example.com/w200/profile_image.png`,
          },
          still_path: {
            source: `/still_image.png`,
            w100: `https://www.example.com/w100/still_image.png`,
            w200: `https://www.example.com/w200/still_image.png`,
          },
        },
      ],
    })
  })
})
