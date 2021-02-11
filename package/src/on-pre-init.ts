import { GatsbyNode } from "gatsby"

export const onPreInit: GatsbyNode["onPreInit"] = ({ reporter }) => {
  reporter.info(`gatsby-source-tmdb sucessfully loaded`)
}
