import { GatsbyNode } from "gatsby"
import { ObjectSchema } from "gatsby-plugin-utils"

// Changes in the schema here also require updates in __tests__/plugin-options-schema.ts

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({ Joi }): ObjectSchema =>
  Joi.object({
    apiKey: Joi.string()
      .required()
      .description(`Your API Key (v3 auth). See the README instructions in how to generate this.`),
    sessionID: Joi.string()
      .required()
      .description(`The generated session ID. See the README instructions in how to generate this.`),
    language: Joi.string()
      .pattern(/^[a-z]{2}-[A-Z]{2}$/, `ISO 639-1`)
      .description(`Specify the language of titles, descriptions etc. Applies to all results.`)
      .default(`en-US`),
    region: Joi.string()
      .pattern(/^[A-Z]{2}$/, `ISO 3166-1`)
      .description(`Will narrow the search to only display results within the specified country.`)
      .default(`US`),
    timezone: Joi.string()
      .pattern(/^[A-Za-z_]*\/[A-Za-z_]*$/, `Region/City`)
      .description(`Specify a timezone to offset the day calculation.`)
      .default(`America/New_York`),
  })
