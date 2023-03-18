import React, {useEffect, useState}from "react"
import { graphql } from "gatsby"

import Layout from "../components/chairmans-words-layout"
import Seo from "../components/seo"
import { isLoggedIn } from "../services/auth"

const UnauthorizedPage = ({ data, location }) => {
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
      <Seo title="401: Unauthorized" />
      <h1>401: Unauthorized</h1>
      <p>You just hit a route that you don't have access to... the sadness. If it is a mistake, please contact your SGN.</p>
    </Layout>
  ) : <div/>
}

export default UnauthorizedPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
