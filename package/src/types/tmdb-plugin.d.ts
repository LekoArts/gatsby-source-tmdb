import { PluginOptions as DefaultPluginOptions, SourceNodesArgs } from "gatsby"
import { NodeHelpers } from "gatsby-node-helpers"
import { Got } from "got"
import * as Response from "./response"

export interface PluginOptions extends DefaultPluginOptions {
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
    [key: string]: string
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
  pluginOptions: PluginOptions
  accountId: Response.AccountInfo["id"]
  gatsbyApi: SourceNodesArgs
}

export interface ImageNode {
  source: string
  original?: string
  [key: string]: string
}

export interface ResponseNode extends Response.ResponseItem {}

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
  node: ResponseNode
  endpoint: Endpoint
  pluginOptions: PluginOptions
  gatsbyApi: SourceNodesArgs
  nodeHelpers: NodeHelpers
}
