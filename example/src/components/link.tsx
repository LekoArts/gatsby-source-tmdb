import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { linkStyle } from "./link.css"

const Link: React.FC<{ to: string }> = ({ to, children, ...rest }) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink className={linkStyle} to={to} {...rest}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} className={linkStyle} {...rest}>
      {children}
    </a>
  )
}

export default Link
