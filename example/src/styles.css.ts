import { globalStyle, createGlobalTheme } from "@vanilla-extract/css"

export const themeVars = createGlobalTheme(`:root`, {
  color: {
    bgDark: `#172742`,
    bgLight: `#47524f`,
    primary: `#00de7b`,
    black: `#0c111f`,
    blue: `#00d6dd`,
    white: `#f6fffa`,
    grey: `#9fb7c7`,
    greyLight: `#cae5f5`,
  },
  font: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  radii: {
    default: `5px`,
    big: `10px`,
  },
})

globalStyle(`html, body`, {
  fontFamily: themeVars.font.body,
  textRendering: `optimizeLegibility`,
  boxSizing: `border-box`,
  fontSize: `16px`,
  "@media": {
    "screen and (min-width: 600px)": {
      fontSize: `18px`,
    },
  },
  background: `linear-gradient(to top, ${themeVars.color.bgDark} 0%, ${themeVars.color.bgLight} 100%) no-repeat`,
  color: themeVars.color.white,
  margin: 0,
  padding: 0,
  minHeight: `100vh`,
})
