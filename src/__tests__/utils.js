import { capitalize } from '../utils'

describe('capitalize', () => {
  it('should change lowercased words', () => {
    expect(capitalize('harry')).toBe('Harry')
  })
  it("shouldn't change correct words", () => {
    expect(capitalize('Harry')).toBe('Harry')
  })
  it('should only change the first letter', () => {
    expect(capitalize('haRRY')).toBe('HaRRY')
  })
})
