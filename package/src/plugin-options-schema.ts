import { GatsbyNode } from "gatsby"
import { ObjectSchema } from "gatsby-plugin-utils"

export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({ Joi }): ObjectSchema =>
  Joi.object({
    apiKey: Joi.string().required().description(`Your API Key (v3 auth)`),
    sessionID: Joi.string()
      .required()
      .description(`The generated session ID. See the README instructions in how to generate this.`),
  })
