import { generateTypeName } from "../schema-utils"

describe(`schema-utils`, () => {
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
