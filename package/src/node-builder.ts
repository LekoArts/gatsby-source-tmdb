import { Options } from "got"
import * as TMDBPlugin from "./types/tmdb-plugin"
import * as Response from "./types/response"
import { getParam, modifyURL } from "./api-utils"
import { ERROR_CODES, IMAGE_TYPES } from "./constants"

export const imageTransformation = ({ node, configuration }: TMDBPlugin.ImageTransformation) => {
  const baseUrl = configuration.images.secure_base_url
  const imageSizes = configuration.images
  const modifiedNode = node

  // For each imageType, e.g. "backdrop_path" extend the string to an object
  // With the "source" as the original path and then all available sizes as new keys
  IMAGE_TYPES.forEach((type) => {
    if (node[`${type}_path`]) {
      modifiedNode[`${type}_path`] = imageSizes[`${type}_sizes`].reduce(
        (o, key) => ({ ...o, [key]: `${baseUrl}${key}${node[`${type}_path`]}` }),
        { source: node[`${type}_path`] as string }
      )
    }
    // When a list is queried it has all its items in "items"
    // These nodes also need to be adjusted
    if (node.items) {
      node.items.forEach((item, index) => {
        if (item[`${type}_path`]) {
          modifiedNode.items[index][`${type}_path`] = imageSizes[`${type}_sizes`].reduce(
            (o, key) => ({ ...o, [key]: `${baseUrl}${key}${item[`${type}_path`]}` }),
            { source: item[`${type}_path`] as string }
          )
        }
      })
    }
  })

  return modifiedNode
}

export const nodeBuilder = async ({
  endpoint,
  tmdbGot,
  nodeHelpers,
  pluginOptions,
  accountId,
  gatsbyApi,
  configuration,
}: TMDBPlugin.NodeBuilder) => {
  // The account_id shouldn't be in the typeName
  const urlWithoutAccountId = endpoint.url.replace(`/:account_id`, ``)
  // endpoint.context is a free-form field that people can pass in, e.g. for tv/:tv_id/season/:season_number/episode/:episode_number
  // They can pass in tv_id etc.
  const typeName = endpoint.typeName || modifyURL(urlWithoutAccountId, endpoint.context)
  const Node = nodeHelpers.createNodeFactory(typeName)

  const itemTimer = gatsbyApi.reporter.activityTimer(`Source from TMDB API for ${typeName}`)
  itemTimer.start()

  const defaults: Options = {
    searchParams: {
      language: pluginOptions.language,
      region: pluginOptions.region,
      timezone: pluginOptions.timezone,
      page: 1,
      ...endpoint.searchParams,
    },
    context: {
      account_id: accountId,
      ...endpoint.context,
    },
    pagination: {
      countLimit: endpoint.countLimit || 60,
    },
  }

  let items: Response.PaginationItems = []

  const fetchPaginatedData = async (): Promise<Response.PaginationItems> =>
    tmdbGot.paginate.all(endpoint.url, {
      responseType: `json`,
      context: defaults.context,
      searchParams: defaults.searchParams,
      pagination: {
        countLimit: defaults.pagination.countLimit,
        // @ts-ignore
        transform: (response) => {
          const { results } = response.body as Response.PaginationTransformResponse

          if (!results) {
            return [response.body]
          }

          return results
        },
        shouldContinue: (item, allItems) => {
          const hasNoPagination = allItems.length > 0 && allItems.every((entry) => entry.id === item.id)
          return !hasNoPagination
        },
        paginate: (response) => {
          const prevSearchParams = response.request.options.searchParams
          const prevPage = Number(prevSearchParams.get(`page`))
          const { total_pages: totalPages } = response.body as Response.PaginatedResponse

          if (prevPage > totalPages) {
            return false
          }

          itemTimer.setStatus(`Getting page ${prevPage}`)

          return {
            searchParams: {
              ...prevSearchParams,
              page: prevPage + 1,
            },
          }
        },
      },
    })

  const fetchData = async ({ url, context }): Promise<Response.ResponseItem> => tmdbGot(url, { context }).json()

  try {
    items = await fetchPaginatedData()

    // The endpoint can also have an "extension" to get additional information from an initial request
    // e.g. getting /account/{account_id}/favorite/tv each TV item only has limited information
    // An additional request for each item against the /tv/:tv_id endpoint is necessary to get all details
    if (endpoint.extension) {
      try {
        const param = getParam(endpoint.extension.url)

        if (!param) {
          gatsbyApi.reporter.panicOnBuild({
            id: ERROR_CODES.getParamUndefined,
            context: {
              sourceMessage: `Couldn't find a parameter for ${endpoint.extension.url} - make sure it uses the format :your_parameter`,
            },
          })
          itemTimer.end()
        }

        const detailedItems = items.map((item) =>
          fetchData({ url: endpoint.extension.url, context: { [param]: item.id } })
        )

        // This replaces the fetched items with the full version
        items = await Promise.all(detailedItems)
      } catch (error) {
        gatsbyApi.reporter.panicOnBuild(
          {
            id: ERROR_CODES.extensionSourcing,
            context: {
              sourceMessage: `Error during sourcing the detailed information (extension) from ${endpoint.url}`,
            },
          },
          error
        )
        itemTimer.end()
      }
    }
  } catch (error) {
    gatsbyApi.reporter.panicOnBuild(
      {
        id: ERROR_CODES.individualSourcing,
        context: {
          sourceMessage: `Error during the sourcing from the API of ${endpoint.url}`,
        },
      },
      error
    )
    itemTimer.end()
  }

  itemTimer.setStatus(`Processing ${items.length} results`)

  items.forEach((item) => {
    const transformedItem = imageTransformation({ node: item, configuration })
    const node = Node({ ...transformedItem, id: item.id.toString() })
    gatsbyApi.actions.createNode(node)
  })

  itemTimer.end()
}
