import { SourceNodesArgs, NodeInput } from "gatsby"
import { IdentifiableRecord, NodeHelpers } from "gatsby-node-helpers"
import * as TMDBPlugin from "./types/tmdb-plugin"

interface IBuildFromId {
  obj: Record<string, unknown>
  getFactory: (remoteType: string) => (node: IdentifiableRecord) => NodeInput
  gatsbyApi: SourceNodesArgs
  options: TMDBPlugin.PluginOptions
}

const buildFromId = ({ obj, getFactory, gatsbyApi, options }: IBuildFromId) => {}
