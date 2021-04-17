import { modifyURL, getParam, defaultOptions, generateTypeName } from "../api-utils"

const endpoint01 = `configuration`
const endpoint02 = `movie/:movie_id`
const endpoint03 = `tv/:tv_id/season/:season_number/episode/:episode_number`
const endpoint04 = `account/:account_id/lists`

describe(`api-utils`, () => {
  it(`modifyURL should return input endpoint with empty params`, () => {
    expect(modifyURL(endpoint01)).toBe(endpoint01)
    expect(modifyURL(endpoint03)).toBe(endpoint03)
  })
  it(`modifyURL should return input endpoint with empty params object`, () => {
    expect(modifyURL(endpoint01, {})).toBe(endpoint01)
    expect(modifyURL(endpoint03, {})).toBe(endpoint03)
  })
  it(`modifyURL should replace params in endpoint with input params`, () => {
    expect(modifyURL(endpoint02, { movie_id: `123` })).toBe(`movie/123`)
    expect(
      modifyURL(endpoint03, {
        tv_id: `85271`,
        season_number: `1`,
        episode_number: `7`,
      })
    ).toBe(`tv/85271/season/1/episode/7`)
    expect(modifyURL(endpoint04, { account_id: `123` })).toBe(`account/123/lists`)
  })
  it(`modifyURL should convert integers to strings`, () => {
    expect(modifyURL(endpoint02, { movie_id: 123 })).toBe(`movie/123`)
  })
  it(`modifyURL should not replace params in endpoint with params that don't map to input string`, () => {
    expect(modifyURL(endpoint02, { test: `123` })).toBe(`movie/:movie_id`)
  })
  it(`getParam should capture param`, () => {
    expect(getParam(`/tv/:tv_id`)).toBe(`tv_id`)
    expect(getParam(`/tv/1234`)).toBe(undefined)
  })
  it(`defaultOptions works correctly`, () => {
    expect(defaultOptions({ apiKey: `foo`, sessionID: `bar`, plugins: [] })).toMatchInlineSnapshot(`
      Object {
        "apiKey": "foo",
        "endpoints": Array [
          Object {
            "url": "account/:account_id/lists",
          },
          Object {
            "url": "account/:account_id/favorite/movies",
          },
          Object {
            "url": "account/:account_id/favorite/tv",
          },
          Object {
            "url": "account/:account_id/watchlist/movies",
          },
          Object {
            "url": "account/:account_id/watchlist/tv",
          },
          Object {
            "url": "movie/popular",
          },
          Object {
            "url": "movie/top_rated",
          },
          Object {
            "url": "tv/popular",
          },
          Object {
            "url": "tv/top_rated",
          },
        ],
        "language": "en-US",
        "plugins": Array [],
        "region": "US",
        "sessionID": "bar",
        "timezone": "Europe/London",
        "typePrefix": "Tmdb",
      }
    `)
  })
  it(`generateTypeName works correctly`, () => {
    expect(generateTypeName({ url: `account/:account_id/favorite/movies` }, `Tmdb`)).toBe(`TmdbAccountFavoriteMovies`)
    expect(generateTypeName({ url: `tv/:tv_id`, context: { tv_id: `1234` } }, `Tmdb`)).toBe(`TmdbTv1234`)
    expect(generateTypeName({ url: `tv/:tv_id`, context: { tv_id: `1234` }, typeName: `CustomName` }, `Tmdb`)).toBe(
      `TmdbCustomName`
    )
    expect(generateTypeName({ url: `account/:account_id/favorite/movies`, typeName: `CustomName` }, `Tmdb`)).toBe(
      `TmdbCustomName`
    )
    expect(generateTypeName({ url: `account/:account_id/favorite/movies`, typeName: `CustomName` }, `Naruto`)).toBe(
      `NarutoCustomName`
    )
  })
})
