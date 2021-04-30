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
  endpoints?: Endpoint[]
}

export interface Endpoint {
  url: string
  typeName?: string
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
  configuration: Response.Configuration
}

export interface ImageNode {
  source: string
  original: string
  [key: string]: string
}

export interface ImageTransformation {
  node: Response.ResponseItem
  configuration: Response.Configuration
}
