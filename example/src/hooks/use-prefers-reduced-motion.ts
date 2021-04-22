import * as React from "react"

const QUERY = `(prefers-reduced-motion: no-preference)`
const isRenderingOnServer = typeof window === `undefined`

const getInitialState = () =>
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  isRenderingOnServer ? true : !window.matchMedia(QUERY).matches

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(getInitialState)

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches)
    }
    mediaQueryList.addListener(listener)
    return () => {
      mediaQueryList.removeListener(listener)
    }
  }, [])

  return prefersReducedMotion
}
