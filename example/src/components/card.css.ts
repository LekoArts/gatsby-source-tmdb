import { style, globalStyle } from "@vanilla-extract/css"
import { breakpoints, themeVars } from "../styles.css"

export const imageStyle = style({
  position: `absolute`,
  top: `0`,
  bottom: `0`,
  left: `0`,
  right: `0`,
  zIndex: -1000,
  height: `100% !important`,
  width: `100% !important`,
})

export const wrapperStyle = style({
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `flex-end`,
  paddingBottom: `150%`,
  boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.3)`,
  transition: `box-shadow 0.5s`,
  willChange: `transform`,
  width: `100%`,
  borderRadius: themeVars.radii.default,
  overflow: `hidden`,
  position: `relative`,
  ":after": {
    content: `''`,
    position: `absolute`,
    display: `block`,
    width: `102%`,
    height: `102%`,
    top: `0`,
    left: `-3px`,
    right: `0`,
    bottom: `0`,
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)`,
    borderRadius: themeVars.radii.default,
    transition: `opacity 0.5s ease-in-out`,
    opacity: 1,
  },
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      ":after": {
        opacity: 0,
      },
    },
  },
  selectors: {
    "&:hover:after": {
      opacity: 1,
    },
  },
})

export const contentStyle = style({
  padding: `0.75rem`,
  position: `absolute`,
  bottom: `0`,
  left: `0`,
  right: `0`,
  top: 0,
  opacity: 1,
  zIndex: 10,
  display: `flex`,
  flexDirection: `column`,
  alignItems: `flex-start`,
  justifyContent: `flex-end`,
  transition: `opacity 0.5s ease-in-out`,
  selectors: {
    [`${wrapperStyle}:hover &`]: {
      opacity: 1,
    },
  },
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      padding: `1rem`,
      opacity: 0,
    },
  },
})

export const titleStyle = style({
  fontSize: `1.15rem`,
})

export const itemStyle = style({
  marginRight: `0.5rem`,
  display: `flex`,
  alignItems: `center`,
  flexDirection: `column`,
  justifyContent: `space-between`,
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      marginRight: `1rem`,
    },
  },
})

export const itemIconStyle = style({
  fill: themeVars.color.primary,
  marginBottom: `0.25rem`,
})

export const itemTextStyle = style({
  fontSize: `0.75rem`,
  textAlign: `center`,
})

export const linkStyle = style({
  position: `absolute`,
  top: `0`,
  right: `0`,
  bottom: `0`,
  left: `0`,
  color: themeVars.color.white,
  ":hover": { color: themeVars.color.white },
})

globalStyle(`${linkStyle} .gatsby-image-wrapper`, {
  height: `100%`,
})
