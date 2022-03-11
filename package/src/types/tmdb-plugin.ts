import { PluginOptions, SourceNodesArgs } from "gatsby"
import { NodeHelpers } from "gatsby-node-helpers"
import { Got } from "got"
import * as Response from "./response"

export interface TMDBPluginOptions extends PluginOptions {
  apiKey: string
  sessionID: string
  language?: string
  region?: string
  timezone?: string
  typePrefix?: string
  downloadImages?: boolean
  endpoints?: Endpoint[]
}

export interface Endpoint {
  url: string
  typeName?: string
  downloadImages?: boolean
  searchParams?: {
    language?: string
    page?: number
    append_to_response?: string // eslint-disable-line
    region?: string
    [key: string]: string | number
  }
  context?: {
    [key: string]: string
  }
  countLimit?: number
  extension?: {
    url: string
  }
}

export interface NodeBuilder {
  endpoint: Endpoint
  tmdbGot: Got
  nodeHelpers: NodeHelpers
  pluginOptions: TMDBPluginOptions
  accountId: Response.AccountInfo["id"]
  gatsbyApi: SourceNodesArgs
}

export interface ImageNode {
  source: string
  original?: string
  [key: string]: string
}

interface ImagePaths {
  poster_path?: ImageNode
  backdrop_path?: ImageNode
  still_path?: ImageNode
  logo_path?: ImageNode
  profile_path?: ImageNode
}

export interface ImageTransformationReponse extends ImagePaths {
  id: number
  items?: ImagePaths[]
}
export interface ImageTransformation {
  node: Response.ResponseItem
  endpoint: Endpoint
  pluginOptions: TMDBPluginOptions
  gatsbyApi: SourceNodesArgs
  nodeHelpers: NodeHelpers
}
