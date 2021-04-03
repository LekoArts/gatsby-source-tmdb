import { mapToStyles } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

const defaultStyles = {
  width: `1.25rem`,
  height: `1.25rem`,
  fill: themeVars.color.black,
}

export const iconStyles = mapToStyles({
  next: defaultStyles,
  first: defaultStyles,
  star: defaultStyles,
  running: {
    width: `1.15rem`,
    height: `1.15rem`,
    fill: themeVars.color.primary,
  },
  ended: {
    width: `1.15rem`,
    height: `1.15rem`,
    fill: themeVars.color.white,
  },
  episodes: {
    width: `1rem`,
    height: `1rem`,
    fill: themeVars.color.white,
  },
  seasons: {
    width: `1rem`,
    height: `1rem`,
    fill: themeVars.color.white,
  },
})
