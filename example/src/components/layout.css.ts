import { style, keyframes } from "@vanilla-extract/css"
import { breakpoints, themeVars } from "../styles.css"

const wave = keyframes({
  "0%, 100%": {
    transform: `rotate(0)`,
  },
  "20%, 60%": {
    transform: `rotate(-25deg)`,
  },
  "40%, 80%": {
    transform: `rotate(10deg)`,
  },
})

export const githubCornerStyle = style({})

export const githubCornerSvgStyle = style({
  top: 0,
  border: 0,
  right: 0,
  fill: themeVars.color.primary,
  color: themeVars.color.white,
  position: `absolute`,
  selectors: {
    [`${githubCornerStyle}:focus &`]: {
      outline: `-webkit-focus-ring-color auto 1px`,
    },
  },
})

export const octoArmStyle = style({
  selectors: {
    [`${githubCornerStyle}:hover &`]: {
      animation: `${wave} 560ms ease-in-out`,
    },
  },
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
  padding: `3rem 1rem`,
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      padding: `4rem 2rem`,
    },
  },
})
