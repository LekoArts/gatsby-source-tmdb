import { modifyURL } from "../api-utils"

const endpoint01 = `configuration`
const endpoint02 = `collection/:id`

describe(`api-utils`, () => {
  it(`getEndpoint should return input endpoint with empty params`, () => {
    expect(modifyURL(endpoint01)).toBe(endpoint01)
  })
  it(`getEndpoint should return input endpoint with empty params object`, () => {
    expect(modifyURL(endpoint01, {})).toBe(endpoint01)
  })
  it(`getEndpoint should replace params in endpoint with input params`, () => {
    expect(modifyURL(endpoint02, { id: `123` })).toBe(`collection/123`)
  })
  it(`getEndpoint should not replace params in endpoint with params that don't map to input string`, () => {
    expect(modifyURL(endpoint02, { test: `123` })).toBe(`collection/:id`)
  })
})
