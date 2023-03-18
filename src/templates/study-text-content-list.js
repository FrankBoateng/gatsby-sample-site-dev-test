import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import styled from "@mui/styled-engine";
import { BaseStyledContentCard, BaseStyledContentCardTitle } from "../components/BaseStyledContentCard";

import BaseLayout from "../components/study-text-content-layout"
import Seo from "../components/seo"
import * as PropTypes from "prop-types"
import PageTitle from "../components/PageTitle"
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
// import { BaseStyledButton } from "../../components/BaseStyledButton"
import Grid from "@mui/material/Grid";
import { BaseStyledButton } from "../components/BaseStyledButton"
import Button from "@mui/material/Button"

const StudyTextContentCard = styled(BaseStyledContentCard)({
    borderLeftColor: "#026eaa",
    height: {xs: "10vh", md: "8vh"},
    alignItems: "start"
});

Grid.propTypes = { children: PropTypes.node }
const StudyTextContentListPage = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes
  const categoryName = posts[0].categories.nodes[0].name

  if (!posts.length) {
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
      <Button id="back-button" variant="contained" component={Link} to="/study-text-categories"  startIcon={<KeyboardBackspaceIcon />}>
          Back
      </Button>
      <Seo title="study text list" />
        <PageTitle borderRadius={"5px"}>
            <Typography id="page-title"
                        // id="Study-text-content-list"
                        variant="h5">{categoryName}</Typography>
        </PageTitle>
      <ol style={{listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title
          return (
              <li key={post.uri}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  {/*<Grid container sx={{ pt: "3%", pl: "2.5%", pr: "2.5%" }}>*/}
                      <header>
                        <h2>
                            <StudyTextContentCard xs={12} component={Link}to={post.uri} itemProp="url" >
                                <BaseStyledContentCardTitle>
                                    {/* <Link > */}
                                        <span className={"headline"} itemProp="headline">{parse(title)}</span>
                                    {/* </Link> */}
                                </BaseStyledContentCardTitle>
                            </StudyTextContentCard>
                        </h2>
                      </header>
                  {/*</Grid>*/}
                </article>
              </li>
          )
        })}
      </ol>

      
      {previousPagePath && (
        <>
          <Link to={previousPagePath}id="Previous-link">
            <BaseStyledButton>
              Prev
            </BaseStyledButton>
          </Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath} id="next-link">
        <BaseStyledButton>
          Next
        </BaseStyledButton>
      </Link>}
    </BaseLayout>
  )
}

export default StudyTextContentListPage

export const pageQuery = graphql`
query WordPressPostArchive($offset: Int!, $categoryID: String!, $postsPerPage: Int!) {
  allWpPost(sort: {date: DESC}, limit: $postsPerPage, skip: $offset, filter: { categories: { nodes: { elemMatch: { id: { eq: $categoryID } } } } }) {
    nodes {
      excerpt
      uri
      date(formatString: "MMMM DD, YYYY")
      title
      categories {
        nodes {
          name
        }
      }
    }
  }
}
`
