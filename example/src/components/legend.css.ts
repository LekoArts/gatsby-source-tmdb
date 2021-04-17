import { style } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

export const legendStyle = style({
  marginBottom: `3rem`,
  background: `rgba(0, 0, 0, 0.1)`,
  padding: `1rem`,
  borderRadius: themeVars.radii.default,
  fontSize: `0.8rem`,
})

export const greyLightFillStyle = style({
  fill: themeVars.color.greyLight,
})

export const titleStyle = style({
  marginTop: 0,
  color: themeVars.color.greyLight,
  fontWeight: 500,
  fontSize: `1rem`,
  marginBottom: `1rem`,
})

export const wrapperStyle = style({
  display: `flex`,
  flexWrap: `wrap`,
})

export const legendItemStyle = style({
  display: `flex`,
  alignItems: `center`,
  color: themeVars.color.grey,
  padding: `0.5rem 1.25rem 0.5rem 0`,
})

export const legendIconStyle = style({
  marginRight: `0.4rem`,
  width: `1.25rem`,
  height: `1.25rem`,
})
