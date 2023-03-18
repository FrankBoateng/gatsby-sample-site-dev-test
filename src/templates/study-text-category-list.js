import React from "react"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"

import styled from "@mui/styled-engine"
import { BaseStyledContentCard, BaseStyledContentCardTitle } from "../components/BaseStyledContentCard"

import BaseLayout from "../components/study-text-content-layout"
import Seo from "../components/seo"
import * as PropTypes from "prop-types"
import PageTitle from "../components/PageTitle"
import Typography from "@mui/material/Typography"

import Grid from "@mui/material/Grid"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Button from "@mui/material/Button"

const StudyTextContentCard = styled(BaseStyledContentCard)({
    borderLeftColor: "#026eaa",
    height: "6vh",
    alignItems: "start"
});

Grid.propTypes = { children: PropTypes.node }
const StudyTextCategoryListPage = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const categories = data.allWpCategory.edges

  if (!categories.length) {
    return (
      <BaseLayout isHomePage>
        <Seo title="All posts" />
        <p>
          Coming soon.
        </p>
      </BaseLayout>
    )
  }

  return (

    <BaseLayout isHomePage>
      <Button id="back-button" variant="contained"  component={Link} to="/study" startIcon={<KeyboardBackspaceIcon />}>
          Back
      </Button>
      <Seo title="study text category list" />
        <PageTitle borderRadius={"5px"}>
            <Typography 
              id="page-title"
              // id="Study-text-category-list" 
              variant="h5">Study Text
            </Typography>
        </PageTitle>
      <ol style={{listStyle: `none` }}>
        {categories.map(categoryNode => {
          const category = categoryNode.category
          const catName = category.name
          return (
              <li key={category.id}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  {/*<Grid container sx={{ pt: "3%", pl: "2.5%", pr: "2.5%" }}>*/}
                      <header>
                        <h2>
                            <StudyTextContentCard xs={12} component={Link}to={`/study-text/${category.slug}`} itemProp="url" >
                                <BaseStyledContentCardTitle>
                                        <span className={"headline"} itemProp="headline">{parse(catName)}</span>
                                </BaseStyledContentCardTitle>
                            </StudyTextContentCard>
                        </h2>
                      </header>
                </article>
              </li>
          )
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </BaseLayout>
  )
}

export default StudyTextCategoryListPage

export const pageQuery = graphql`
query WpPosts {
  # Query all WordPress categories belonging to posts with tag slug "study-text-material" sorted by date
  allWpCategory(
    filter: {posts: {nodes: {elemMatch: {tags: {nodes: {elemMatch: {slug: {eq: "study-text-material"}}}}}}}}
    sort: {posts: {nodes: {date: DESC}}}
  ) {
    edges {
      # note: this is a GraphQL alias. It renames "node" to "post" for this query
      # We're doing this because this "node" is a post! It makes our code more readable further down the line.
      category: node {
        id
        slug
        name
      }
    }
  }
}
`
