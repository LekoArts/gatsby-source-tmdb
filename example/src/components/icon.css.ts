import { mapToStyles } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

const defaultMedia = {
  "screen and (max-width: 400px)": {
    width: `0.9rem`,
    height: `0.9rem`,
  },
}

const defaultStyles = {
  width: `1.25rem`,
  height: `1.25rem`,
  fill: themeVars.color.black,
  "@media": defaultMedia,
}

export const iconStyles = mapToStyles({
  next: defaultStyles,
  first: defaultStyles,
  star: defaultStyles,
  running: {
    width: `1.15rem`,
    height: `1.15rem`,
    fill: themeVars.color.primary,
    "@media": defaultMedia,
  },
  ended: {
    width: `1.15rem`,
    height: `1.15rem`,
    fill: themeVars.color.white,
    "@media": defaultMedia,
  },
  episodes: {
    width: `1rem`,
    height: `1rem`,
    fill: themeVars.color.white,
    "@media": defaultMedia,
  },
  seasons: {
    width: `1rem`,
    height: `1rem`,
    fill: themeVars.color.white,
    "@media": defaultMedia,
  },
})
