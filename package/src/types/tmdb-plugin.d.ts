import { PluginOptions as DefaultPluginOptions } from "gatsby"

export interface PluginOptions extends DefaultPluginOptions {
  apiKey: string
  sessionID: string
  language: string
  region: string
  timezone: string
}
