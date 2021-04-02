import { Options } from "got"
import * as TMDBPlugin from "./types/tmdb-plugin"
import * as Response from "./types/response"
import { modifyURL } from "./api-utils"
import { ERROR_CODES } from "./constants"

const imageTransformation = ({ node, configuration }: TMDBPlugin.ImageTransformation) => {
  const baseUrl = configuration.images.secure_base_url
  const imageSizes = configuration.images
  const imageTypes = [`backdrop`, `logo`, `poster`, `profile`, `still`]
  const modifiedNode = node

  // For each imageType, e.g. "backdrop_path" extend the string to an object
  // With the "source" as the original path and then all available sizes as new keys
  imageTypes.forEach((type) => {
    if (node[`${type}_path`]) {
      modifiedNode[`${type}_path`] = imageSizes[`${type}_sizes`].reduce(
        (o, key) => ({ ...o, [key]: `${baseUrl}${key}${node[`${type}_path`]}` }),
        { source: node[`${type}_path`] as string }
      )
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
  const urlWithoutAccountId = endpoint.url.replace(`/:account_id`, ``)
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

  try {
    items = await tmdbGot.paginate.all(endpoint.url, {
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
  } catch (error) {
    gatsbyApi.reporter.panicOnBuild(
      {
        id: ERROR_CODES.individualSourcing,
        context: {
          sourceMessage: `Error during the sourcing from the API`,
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
