import { style } from "@vanilla-extract/css"
import { themeVars, breakpoints } from "./styles.css"

export const titleStyle = style({
  marginBottom: `6rem`,
})

export const primaryColorStyle = style({
  color: themeVars.color.primary,
})

export const rowStyle = style({
  display: `flex`,
  flexWrap: `wrap`,
  justifyContent: `space-between`,
  paddingTop: `3rem`,
})

export const columnStyle = style({
  display: `flex`,
  flex: `1 1 auto`,
  flexBasis: `100%`,
  maxWidth: `100%`,
  width: `100%`,
  marginBottom: `2.5rem`,
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      flexBasis: `calc(99.9% * 1 / 2 - 0.5rem)`,
      maxWidth: `calc(99.9% * 1 / 2 - 0.5rem)`,
      width: `calc(99.9% * 1 / 2 - 0.5rem)`,
      marginBottom: `1rem`,
    },
    [`screen and (min-width: ${breakpoints.md})`]: {
      flexBasis: `calc(99.9% * 1 / 3 - 1rem)`,
      maxWidth: `calc(99.9% * 1 / 3 - 1rem)`,
      width: `calc(99.9% * 1 / 3 - 1rem)`,
      marginBottom: `2rem`,
    },
    [`screen and (min-width: ${breakpoints.lg})`]: {
      flexBasis: `calc(99.9% * 1 / 3 - 1.5rem)`,
      maxWidth: `calc(99.9% * 1 / 3 - 1.5rem)`,
      width: `calc(99.9% * 1 / 3 - 1.5rem)`,
      marginBottom: `2.5rem`,
    },
  },
})

export const descStyle = style({
  background: `rgba(0, 0, 0, 0.1)`,
  padding: `1rem`,
  borderRadius: themeVars.radii.default,
})
