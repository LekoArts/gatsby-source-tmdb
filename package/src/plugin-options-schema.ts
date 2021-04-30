import { GatsbyNode } from "gatsby"
import { ObjectSchema } from "gatsby-plugin-utils"

// Changes in the schema here also require updates in __tests__/plugin-options-schema.ts
export const pluginOptionsSchema: GatsbyNode["pluginOptionsSchema"] = ({ Joi }): ObjectSchema => {
  const EndpointKeys = Joi.object().keys({
    url: Joi.string()
      .required()
      .lowercase()
      .pattern(/^[^/].*$/, `No leading slash`)
      .description(
        `This is the endpoint that you want to get (without a leading slash). So e.g. account/:account_id/lists or movie/:movie_id. Replace the {some-key} with :some-key in the URL. The parameter also needs to be passed with the same name in context then.`
      ),
    typeName: Joi.string().description(`You can overwrite the automatically generated typeName with this option.`),
    searchParams: Joi.object()
      .keys({
        language: Joi.string()
          .pattern(/^[a-z]{2}-[A-Z]{2}$/, `ISO 639-1`)
          .description(`Specify the language of titles, descriptions etc. Applies to all results.`),
        page: Joi.number().description(`When the endpoint has multiple pages, you can set the beginning page here.`),
        append_to_response: Joi.string().description(`This is the Append To Response option from TMDB's API.`),
        region: Joi.string()
          .pattern(/^[A-Z]{2}$/, `ISO 3166-1`)
          .description(`Will narrow the search to only display results within the specified country.`),
      })
      .unknown(true)
      .description(`Custom searchParams you want to use in the request.`),
    context: Joi.object()
      .unknown(true)
      .description(
        `Pass information that is necessary for the URL, e.g. when requesting movie/:movie_id pass movie_id here through context.`
      ),
    countLimit: Joi.number().description(`Number of how many items to fetch from this endpoint.`),
    extension: Joi.object({
      url: Joi.string()
        .required()
        .lowercase()
        .pattern(/^[^/].*$/, `No leading slash`)
        .description(
          `The individual endpoint that should be used to get more information. The "id" from the previous/root endpoint will be used for the ":param" in this extension endpoint`
        ),
    }),
  })

  return Joi.object({
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
      .default(`Europe/London`),
    endpoints: Joi.array().description(`Specify the TMDB endpoints that the plugin should access.`).items(EndpointKeys),
    typePrefix: Joi.string()
      .pattern(/^[a-zA-Z_][A-Za-z0-9_]*$/, `Valid GraphQL typePrefix`)
      .description(
        `Specify the prefix for all created nodes, e.g. allTmdbAccount. It must follow this spec: https://spec.graphql.org/draft/#sec-Names`
      )
      .default(`Tmdb`),
  })
}
