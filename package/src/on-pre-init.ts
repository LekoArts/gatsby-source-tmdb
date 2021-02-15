import { GatsbyNode } from "gatsby"
import { ERROR_CODES } from "./constants"

export const onPreInit: GatsbyNode["onPreInit"] = ({ reporter }) => {
  reporter.setErrorMap({
    [ERROR_CODES.generic]: {
      text: (context) => context.sourceMessage,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
  })
}
