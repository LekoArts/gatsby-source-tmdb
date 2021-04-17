import { style, globalStyle } from "@vanilla-extract/css"
import { breakpoints, themeVars } from "../styles.css"

export const detailViewWrapperStyle = style({
  padding: `5rem 0`,
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      padding: `6rem 0`,
    },
  },
})

export const informationStyle = style({
  display: `flex`,
  flexDirection: `column`,
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      flexDirection: `row`,
    },
  },
})

export const posterWrapperStyle = style({
  position: `relative`,
  "@media": {
    [`screen and (max-width: ${breakpoints.sm})`]: {
      marginBottom: `2rem`,
    },
  },
})

export const posterImageStyle = style({
  borderRadius: themeVars.radii.big,
  maxWidth: `100%`,
  boxShadow: `0 12px 40px -5px rgba(0, 0, 0, 0.4)`,
})

export const mainWrapper = style({
  marginLeft: 0,
  maxWidth: `100%`,
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      marginLeft: `3rem`,
      maxWidth: `50%`,
    },
  },
})

export const h1Style = style({
  marginTop: `0`,
  marginBottom: `0.75rem`,
  textShadow: `0 6px 18px rgba(0, 0, 0, 0.25)`,
})

export const h2Style = style({
  fontSize: `1.4rem`,
  textShadow: `0 6px 18px rgba(0, 0, 0, 0.25)`,
  color: themeVars.color.white,
})

export const originalNameStyle = style({
  fontStyle: `italic`,
  fontWeight: 400,
  color: themeVars.color.grey,
})

export const statistics1Style = style({
  fontSize: `1.5rem`,
  lineHeight: `2rem`,
  margin: `1rem 0`,
  color: themeVars.color.greyLight,
})

globalStyle(`${statistics1Style} svg`, {
  verticalAlign: `bottom`,
  width: `2rem`,
  height: `2rem`,
})

export const primaryFillStyle = style({
  fill: themeVars.color.primary,
})

export const whiteFillStyle = style({
  fill: themeVars.color.white,
})

export const totalRuntimeStyle = style({
  marginTop: `1rem`,
  fontSize: `0.9rem`,
  color: themeVars.color.grey,
})

export const statistics2Style = style({
  marginTop: `2rem`,
  display: `flex`,
  alignItems: `center`,
  color: themeVars.color.greyLight,
})

globalStyle(`${statistics2Style} div`, {
  marginRight: `1.25rem`,
  fontSize: `1.15rem`,
})

globalStyle(`${statistics2Style} svg`, {
  verticalAlign: `baseline`,
})

export const genresStyle = style({
  marginTop: `1rem`,
  display: `flex`,
  flexWrap: `wrap`,
})

export const genreStyle = style({
  fontSize: `0.8rem`,
  marginRight: `0.5rem`,
  padding: `0.35rem 0.65rem`,
  background: `rgba(0, 0, 0, 0.1)`,
  borderRadius: themeVars.radii.default,
})

export const overviewStyle = style({
  marginTop: `2rem`,
  color: themeVars.color.greyLight,
})

export const paragraphStyle = style({
  letterSpacing: `-0.003em`,
  lineHeight: 1.58,
  fontSize: `1rem`,
})

export const secondaryInformationStyle = style({
  marginTop: `4rem`,
})

export const castOverviewStyle = style({
  display: `flex`,
  flexWrap: `wrap`,
  flexDirection: `row`,
  justifyContent: `flex-start`,
  gap: `1rem`,
})

export const castStyle = style({
  display: `flex`,
  flexDirection: `column`,
  flexWrap: `nowrap`,
  width: `185px`,
  marginBottom: `2rem`,
})

export const castImageWrapperStyle = style({
  maxWidth: `185px`,
  height: `225px`,
})

export const castImageStyle = style({
  width: `100%`,
  height: `100%`,
  objectFit: `cover`,
  borderRadius: themeVars.radii.default,
  boxShadow: `0 6px 16px rgba(0, 0, 0, 0.3)`,
})

export const castNamesStyle = style({
  marginTop: `1rem`,
  display: `flex`,
  flexDirection: `column`,
  flexWrap: `nowrap`,
  fontSize: `1rem`,
  color: themeVars.color.grey,
})

export const castNamesDetailStyle = style({
  fontWeight: 700,
  color: themeVars.color.greyLight,
})

export const trailerStyle = style({
  position: `relative`,
  overflow: `hidden`,
  paddingTop: `56.25%`,
  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
  marginBottom: `3rem`,
})

export const iframeStyle = style({
  position: `absolute`,
  top: `0`,
  left: `0`,
  width: `100%`,
  height: `100%`,
  border: `0`,
})

export const similarStyle = style({
  display: `flex`,
  flexDirection: `row`,
  flexWrap: `wrap`,
  marginBottom: `2rem`,
})

export const similarLinkStyle = style({
  marginRight: `0.5rem`,
  marginBottom: `0.5rem`,
  padding: `0.4rem 0.75rem`,
  background: `rgba(0, 0, 0, 0.2)`,
  borderRadius: themeVars.radii.default,
  color: themeVars.color.greyLight,
  textDecoration: `none`,
  transition: `all 0.3s ease-in-out`,
  ":hover": {
    color: themeVars.color.black,
    background: themeVars.color.primary,
  },
})
