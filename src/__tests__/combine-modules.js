import { defaultModules, combineModules } from '../combine-modules'

describe('combine modules', () => {
  it('should use default modules without user input', () => {
    expect(combineModules({})).toEqual(defaultModules)
  })
  it('should respect change of default movies values', () => {
    expect(
      combineModules({
        account: {
          activate: true,
          endpoints: {
            tvs: ['accountFavoriteTv'],
          },
        },
      })
    ).toMatchSnapshot()
  })
  it('should make use of the activate key', () => {
    expect(
      combineModules({
        account: {
          activate: false,
        },
        misc: {
          activate: true,
        },
        tv: {
          activate: true,
        },
      })
    ).toMatchSnapshot()
  })
  it('should allow changing "misc"', () => {
    expect(
      combineModules({
        account: {
          activate: false,
        },
        misc: {
          activate: true,
          endpoints: [['miscUpcomingMovies'], ['miscPopularMovies', 5]],
        },
      })
    ).toMatchSnapshot()
  })
})
