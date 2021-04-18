import { style, keyframes } from "@vanilla-extract/css"
import { breakpoints, themeVars } from "../styles.css"

export const tabsStyle = style({
  padding: `0.5rem 0 2rem 0`,
})

export const tabListStyle = style({
  display: `flex`,
  justifyContent: `flex-start`,
  flexWrap: `wrap`,
  padding: 0,
  margin: `0 0 0.5rem 0`,
})

export const tabStyle = style({
  listStyle: `none`,
  cursor: `pointer`,
  background: `none`,
  padding: `0.5rem 2rem`,
  color: themeVars.color.primary,
  borderRadius: themeVars.radii.default,
  transition: `all 0.3s ease-in-out`,
  selectors: {
    "&:not(.selected):hover": {
      background: `rgba(0, 0, 0, 0.1)`,
    },
    "&.selected": {
      background: themeVars.color.primary,
      color: themeVars.color.black,
    },
  },
})

export const tabBigStyle = style({
  listStyle: `none`,
  cursor: `pointer`,
  background: `none`,
  padding: `0.3rem 1rem`,
  color: themeVars.color.grey,
  fontWeight: 500,
  fontSize: `1.3rem`,
  borderRadius: themeVars.radii.default,
  transition: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s`,
  selectors: {
    "&:not(.selected):hover": {
      background: `rgba(0, 0, 0, 0.1)`,
    },
    "&.selected": {
      background: `rgba(0, 0, 0, 0.1)`,
      color: themeVars.color.white,
    },
  },
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      fontSize: `1.5rem`,
    },
  },
})

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
})

export const tabPanelNavigationStyle = style({
  display: `none`,
  selectors: {
    "&.selected": {
      display: `block`,
      animationName: fadeIn,
      animationDuration: `0.2s`,
      animationTimingFunction: `linear`,
    },
  },
})

export const tabPanelGridStyle = style({
  display: `none`,
  selectors: {
    "&.selected": {
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gap: `1rem`,
      animationName: fadeIn,
      animationDuration: `0.2s`,
      animationTimingFunction: `linear`,
      "@media": {
        [`screen and (min-width: ${breakpoints.sm})`]: {
          gridTemplateColumns: `repeat(2, 1fr)`,
          gap: `1.5rem`,
        },
        [`screen and (min-width: ${breakpoints.lg})`]: {
          gridTemplateColumns: `repeat(3, 1fr)`,
          gap: `2.5rem`,
        },
      },
    },
  },
})
