import { modifyURL, getParam, defaultOptions } from "../api-utils"

const endpoint01 = `configuration`
const endpoint02 = `movie/:movie_id`
const endpoint03 = `tv/:tv_id/season/:season_number/episode/:episode_number`
const endpoint04 = `account/:account_id/lists`

describe(`api-utils`, () => {
  describe(`modifyURL`, () => {
    it(`should return input endpoint with empty params`, () => {
      expect(modifyURL(endpoint01)).toBe(endpoint01)
      expect(modifyURL(endpoint03)).toBe(endpoint03)
    })
    it(`should return input endpoint with empty params object`, () => {
      expect(modifyURL(endpoint01, {})).toBe(endpoint01)
      expect(modifyURL(endpoint03, {})).toBe(endpoint03)
    })
    it(`should replace params in endpoint with input params`, () => {
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
    it(`should convert integers to strings`, () => {
      expect(modifyURL(endpoint02, { movie_id: 123 })).toBe(`movie/123`)
    })
    it(`should not replace params in endpoint with params that don't map to input string`, () => {
      expect(modifyURL(endpoint02, { test: `123` })).toBe(`movie/:movie_id`)
    })
  })
  describe(`getParam`, () => {
    it(`getParam should capture param`, () => {
      expect(getParam(`/tv/:tv_id`)).toBe(`tv_id`)
    })
    it(`getParam should return undefined when no param exists`, () => {
      expect(getParam(`/tv/1234`)).toBe(undefined)
    })
  })
  describe(`defaultOptions`, () => {
    it(`should return defaults with no additional input`, () => {
      expect(defaultOptions({ apiKey: `foo`, sessionID: `bar`, plugins: [] })).toMatchInlineSnapshot(`
        Object {
          "apiKey": "foo",
          "downloadImages": false,
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
          "language": undefined,
          "plugins": Array [],
          "region": undefined,
          "sessionID": "bar",
          "timezone": undefined,
          "typePrefix": undefined,
        }
      `)
    })
    it(`should allow options everywhere`, () => {
      expect(
        defaultOptions({
          apiKey: `foo`,
          sessionID: `bar`,
          plugins: [],
          downloadImages: true,
          typePrefix: `Arrakis`,
          region: `GB`,
          timezone: `Europe/Berlin`,
          language: `en-GB`,
          endpoints: [{ url: `/tv/:tv_id`, downloadImages: true }],
        })
      ).toMatchInlineSnapshot(`
        Object {
          "apiKey": "foo",
          "downloadImages": true,
          "endpoints": Array [
            Object {
              "downloadImages": true,
              "url": "/tv/:tv_id",
            },
          ],
          "language": "en-GB",
          "plugins": Array [],
          "region": "GB",
          "sessionID": "bar",
          "timezone": "Europe/Berlin",
          "typePrefix": "Arrakis",
        }
      `)
    })
  })
})
