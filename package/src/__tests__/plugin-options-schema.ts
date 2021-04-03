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
      endpoints: [
        {
          countLimit: `foobar`,
          no_url: `foobar`,
          searchParams: {
            language: 123,
          },
        },
      ],
      typePrefix: `invalid 2`,
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(false)
    expect(errors).toEqual([
      `"apiKey" is required`,
      `"sessionID" is required`,
      `"language" with value "English" fails to match the ISO 639-1 pattern`,
      `"region" with value "New York" fails to match the ISO 3166-1 pattern`,
      `"timezone" with value "ZW" fails to match the Region/City pattern`,
      `"endpoints[0].url" is required`,
      `"endpoints[0].searchParams.language" must be a string`,
      `"endpoints[0].countLimit" must be a number`,
      `"endpoints[0].no_url" is not allowed`,
      `"typePrefix" with value "invalid 2" fails to match the required pattern: /^[a-zA-Z_][A-Za-z0-9_]*$/`,
    ])
  })
  it(`should validate correct options`, async () => {
    const options = {
      apiKey: `foo`,
      sessionID: `bar`,
      language: `en-US`,
      region: `US`,
      timezone: `America/New_York`,
      endpoints: [
        {
          url: `foobar`,
          searchParams: {
            language: `de-DE`,
            foo: `bar`,
          },
          context: {
            foo: `bar`,
          },
          countLimit: 60,
        },
      ],
      typePrefix: `Leko`,
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(true)
    expect(errors).toEqual([])
  })
})
