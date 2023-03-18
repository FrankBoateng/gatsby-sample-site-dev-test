import React from "react"
import { graphql } from "gatsby"
// import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import Grid from "@mui/material/Grid";

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import BaseLayout from "../components/study-text-content-layout"
import Seo from "../components/seo"
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
// import Button from "@mui/material/Button"

const StudyTextContentTemplate = ({ data: { next, post } }) => {
  // const featuredImage = {
  //   data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
  //   alt: post.featuredImage?.node?.alt || ``,
  // }
  const categorySlug = post?.categories?.nodes[0]?.slug ?? null 
  return (
    
    <BaseLayout categorySlug = {categorySlug}
    
    >
      <Seo title={post.title} description={post.excerpt} />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Grid container sx={{pb: "3%", pl: "6%", pr: "5%" }}>
          <header id="titles">
            <h5 itemProp="headline">{parse(post.title)}</h5>

          </header>

          {!!post.content && (

            <section itemProp="articleBody">

              {parse(post.content)}

            </section>

          )}

          <hr/>
        </Grid>
      </article>

    </BaseLayout>
  )
}

export default StudyTextContentTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      categories {
        nodes {
          slug
        }
      }
    }
  }
`
