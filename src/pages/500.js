import React, {useEffect, useState} from "react"
import { graphql } from "gatsby"

import Layout from "../components/chairmans-words-layout"
import Seo from "../components/seo"
import { isLoggedIn } from "../services/auth"

const ServerErrorPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }
  
  return isLoggedIn() ? (
    <Layout location={location} title={siteTitle}>
      <Seo title="500: Server Error" />
      <h1>500: Server Error</h1>
      <p>Sorry, something went wrong on our end.... the sadness. Please contact your SGN.</p>
    </Layout>
  ) : <div/>
}

export default ServerErrorPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
