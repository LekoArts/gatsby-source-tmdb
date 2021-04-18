import { style } from "@vanilla-extract/css"
import { themeVars } from "./styles.css"

export const titleStyle = style({
  marginBottom: `6rem`,
})

export const primaryColorStyle = style({
  color: themeVars.color.primary,
})

export const descStyle = style({
  background: `rgba(0, 0, 0, 0.1)`,
  padding: `1rem`,
  borderRadius: themeVars.radii.default,
  gridColumn: `1 / -1`,
})

export const spacerStyle = style({
  gridColumn: `1 / -1`,
  height: `2rem`,
  display: `block`,
})
