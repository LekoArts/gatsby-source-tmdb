import { testPluginOptionsSchema } from "gatsby-plugin-utils"
import { pluginOptionsSchema } from "../plugin-options-schema"

describe(`pluginOptionsSchema`, () => {
  it(`should invalidate incorrect options`, async () => {
    const options = {
      apiKey: undefined,
      sessionID: undefined,
      language: `English`,
      region: `New York`,
      timezone: `ZW`,
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(false)
    expect(errors).toEqual([
      `"apiKey" is required`,
      `"sessionID" is required`,
      `"language" with value "English" fails to match the ISO 639-1 pattern`,
      `"region" with value "New York" fails to match the ISO 3166-1 pattern`,
      `"timezone" with value "ZW" fails to match the Region/City pattern`,
    ])
  })
  it(`should validate correct options`, async () => {
    const options = {
      apiKey: `foo`,
      sessionID: `bar`,
      language: `en-US`,
      region: `US`,
      timezone: `America/New_York`,
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(true)
    expect(errors).toEqual([])
  })
})
