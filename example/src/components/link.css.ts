import { style } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

export const linkStyle = style({
  color: themeVars.color.primary,
  transition: `all 0.5s ease-in-out`,
  textDecoration: `none`,
  ":hover": {
    color: themeVars.color.primary,
    textDecoration: `underline`,
  },
  ":focus": {
    color: themeVars.color.primary,
    textDecoration: `underline`,
  },
})
