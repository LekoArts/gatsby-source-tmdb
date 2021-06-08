import * as React from "react"
import { Helmet } from "react-helmet-async"
import { graphql, useStaticQuery } from "gatsby"
import { useLocation } from "@reach/router"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
}

type SEOQuery = {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
      logo: string
    }
  }
}

const SEO: React.FC<SEOProps> = ({ title, description, pathname, children }) => {
  const location = useLocation()
  const data = useStaticQuery<SEOQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          logo
        }
      }
    }
  `)
  const {
    site: { siteMetadata },
  } = data

  const seo = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    url: pathname ? `${siteMetadata.siteUrl}${pathname}` : location.href,
    image: `${siteMetadata.siteUrl}${siteMetadata.logo}`,
  }

  return (
    <Helmet title={title} defaultTitle={siteMetadata.title}>
      <html lang="en-US" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:creator" content="@lekoarts_de" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      {children}
    </Helmet>
  )
}

export default SEO
