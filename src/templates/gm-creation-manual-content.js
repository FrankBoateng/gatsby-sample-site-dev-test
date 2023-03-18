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

import BaseLayout from "../components/chairmans-words-layout"
import Seo from "../components/seo"

const GMCreationManualTemplate = ({ data: { previous, next, post } }) => {
  // const featuredImage = {
  //   data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
  //   alt: post.featuredImage?.node?.alt || ``,
  // }

  return (
    <BaseLayout>
      <Seo title={post.title} description={post.excerpt} />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
          <Grid container sx={{ pt: "-3%", pb: "3%", pl: "3%", pr: "3%" }}>
        <header>
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

export default GMCreationManualTemplate

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: TRACED_SVG
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
