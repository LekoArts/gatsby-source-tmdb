import { style } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

export const titleStyle = style({
  marginBottom: `6rem`,
})

export const primaryColorStyle = style({
  color: themeVars.color.primary,
})
