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
          url: `/with-leading-slash`,
          searchParams: {
            language: 123,
          },
          extension: {
            url: `/with-leading-slash`,
          },
        },
        {
          no_url: `foobar`,
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
      `"endpoints[0].url" with value "/with-leading-slash" fails to match the No leading slash pattern`,
      `"endpoints[0].searchParams.language" must be a string`,
      `"endpoints[0].countLimit" must be a number`,
      `"endpoints[0].extension.url" with value "/with-leading-slash" fails to match the No leading slash pattern`,
      `"endpoints[1].url" is required`,
      `"endpoints[1].no_url" is not allowed`,
      `"typePrefix" with value "invalid 2" fails to match the Valid GraphQL typePrefix pattern`,
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
          url: `account/:account_id/lists`,
          searchParams: {
            language: `de-DE`,
            foo: `bar`,
          },
          context: {
            foo: `bar`,
          },
          countLimit: 60,
          extension: {
            url: `movie/:movie_id`,
          },
        },
      ],
      typePrefix: `Leko`,
    }

    const { isValid, errors } = await testPluginOptionsSchema(pluginOptionsSchema, options)

    expect(isValid).toBe(true)
    expect(errors).toEqual([])
  })
})
