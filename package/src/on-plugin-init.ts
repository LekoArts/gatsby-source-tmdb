import { GatsbyNode } from "gatsby"
import { ERROR_CODES } from "./constants"

export const onPluginInit: GatsbyNode["onPluginInit"] = ({ reporter }) => {
  reporter.setErrorMap({
    [ERROR_CODES.initialSourcing]: {
      text: (context) => context.sourceMessage,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
    [ERROR_CODES.individualSourcing]: {
      text: (context) => context.sourceMessage,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
    [ERROR_CODES.extensionSourcing]: {
      text: (context) => context.sourceMessage,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
    [ERROR_CODES.configurationSourcing]: {
      text: (context) => context.sourceMessage,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
    [ERROR_CODES.imageDownloading]: {
      text: (context) => context.sourceMessage,
      level: `ERROR`,
      category: `THIRD_PARTY`,
    },
  })
}
