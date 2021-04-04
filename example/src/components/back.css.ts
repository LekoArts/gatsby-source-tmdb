import { style } from "@vanilla-extract/css"
import { themeVars } from "../styles.css"

export const backStyle = style({
  color: themeVars.color.white,
  position: `absolute`,
  top: `1rem`,
  left: `1rem`,
  padding: `0.5rem 0.75rem`,
  background: `rgba(0, 0, 0, 0.1)`,
  borderRadius: themeVars.radii.default,
  textDecoration: `none`,
  transition: `all 0.3s ease-in-out`,
  ":hover": {
    background: themeVars.color.primary,
    color: themeVars.color.black,
  },
})
