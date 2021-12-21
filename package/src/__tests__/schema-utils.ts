import { NodePluginSchema } from "gatsby"
import {
  generateTypeName,
  capitalize,
  generateImageTypeName,
  definePathNode,
  defineLocalFileNode,
  defineImageNode,
} from "../schema-utils"

const schema = {
  buildObjectType: jest.fn().mockImplementation(({ name, fields }) => ({
    name,
    fields,
  })),
} as unknown as NodePluginSchema

describe(`schema-utils`, () => {
  describe(`generateTypeName`, () => {
    it(`should work with minimal config`, () => {
      expect(generateTypeName({ url: `account/:account_id/favorite/movies` }, `Tmdb`)).toBe(`TmdbAccountFavoriteMovies`)
    })
    it(`should work with context`, () => {
      expect(generateTypeName({ url: `tv/:tv_id`, context: { tv_id: `1234` } }, `Tmdb`)).toBe(`TmdbTv1234`)
    })
    it(`should work with typeName`, () => {
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
  describe(`capitalize`, () => {
    it(`should work`, () => {
      expect(capitalize(`backdrop`)).toBe(`Backdrop`)
    })
  })
  describe(`generateImageTypeName`, () => {
    it(`should work`, () => {
      expect(generateImageTypeName(`backdrop`)).toBe(`BackdropPath`)
    })
  })
  describe(`definePathNode`, () => {
    it(`should return correct backdrop`, () => {
      expect(definePathNode(`backdrop`, schema)).toEqual({
        fields: { original: `String`, w1280: `String`, w300: `String`, w780: `String` },
        name: `BackdropPath`,
      })
    })
  })
  describe(`defineLocalFileNode`, () => {
    it(`should return correct shape`, () => {
      expect(defineLocalFileNode(`backdrop`, schema)).toEqual({
        fields: { localFile: { extensions: { link: {} }, type: `File` } },
        name: `BackdropPath`,
      })
    })
  })
  describe(`defineImageNode`, () => {
    it(`should return correct shape`, () => {
      expect(defineImageNode(`TmdbMovieResult`, schema)).toEqual({
        fields: {
          backdrop_path: `BackdropPath`,
          logo_path: `LogoPath`,
          poster_path: `PosterPath`,
          profile_path: `ProfilePath`,
          still_path: `StillPath`,
        },
        name: `TmdbMovieResult`,
      })
    })
  })
})
