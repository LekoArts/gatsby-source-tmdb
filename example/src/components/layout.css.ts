import { style } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

export const githubCornerStyle = style({
  top: 0,
  border: 0,
  right: 0,
  fill: themeVars.color.primary,
  color: themeVars.color.white,
  position: `absolute`,
})

export const footerStyle = style({
  textAlign: `center`,
  marginTop: `4rem`,
  marginBottom: `2rem`,
  color: themeVars.color.grey,
})

export const mainStyle = style({
  maxWidth: `1200px`,
  margin: `0 auto`,
  padding: `3rem 2rem`,
  "@media": {
    "screen and (max-width: 600px)": {
      padding: `2rem 1rem`,
    },
  },
})
