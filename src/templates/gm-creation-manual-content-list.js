import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import styled from "@mui/styled-engine";
import { BaseStyledContentCard, BaseStyledContentCardTitle } from "../components/BaseStyledContentCard";

import BaseLayout from "../components/chairmans-words-layout"
import Seo from "../components/seo"
import * as PropTypes from "prop-types"
import PageTitle from "../components/PageTitle"
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { BaseStyledButton } from "../components/BaseStyledButton"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Button from "@mui/material/Button"

const ChairmansContentCard = styled(BaseStyledContentCard)({
    borderLeftColor: "#026eaa",
    height: "6vh",
    alignItems: "start",
    spacing: "0",
    // padding: '-55px',
});

Grid.propTypes = { children: PropTypes.node }
const GMCreationManualContentList = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes

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
      <Button id="back-button" variant="contained" component={Link} to="/" startIcon={<KeyboardBackspaceIcon />}>
        Back
      </Button>

      <Seo title="gm creation manual" />
        <PageTitle borderRadius={"5px"}>
            <Typography 
            id="page-title"
                        // id="Chairmans-words-list"
                        variant="h5" color={"#FFF"}>
              GM Creation Manual</Typography>
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
                            <ChairmansContentCard id="chairman-content" xs={12} component={Link} to={post.uri} itemProp="url" spacing={0} >
                                <BaseStyledContentCardTitle>
                                        <span className={"headline"} itemProp="headline">{parse(title)}</span>
                                </BaseStyledContentCardTitle>
                            </ChairmansContentCard>
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
          <Link to={previousPagePath} id="Previous-link"><BaseStyledButton>
            Prev
          </BaseStyledButton></Link>
        </>
      )}
      {nextPagePath && <Link to={nextPagePath} id="next-link">
      <BaseStyledButton>
        Next
      </BaseStyledButton>
      </Link>
      }
    </BaseLayout>
  )
}

export default GMCreationManualContentList

export const pageQuery = graphql`
query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
  allWpPost(sort: {date: DESC}, limit: $postsPerPage, skip: $offset, filter: { categories: { nodes: { elemMatch: { slug: { eq: "jss-article" } } } } }) {
    nodes {
      excerpt
      uri
      date(formatString: "MMMM DD, YYYY")
      title
      excerpt
    }
  }
}
`
