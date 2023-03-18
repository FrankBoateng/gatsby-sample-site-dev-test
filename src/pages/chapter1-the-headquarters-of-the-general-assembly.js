import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../components/PageTitle";
import GeneralLayout from "../components/general-layout"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import parse from "html-react-parser"
import Button from "@mui/material/Button"

const Chapter1TheHeadquartersOfTheGeneralAssembly = ({location, data:{post}}) => {
  console.log(post)
  return (
    <>
    <GeneralLayout location={location}>
      <Button id="back-button" variant="contained" component={Link} to="/duty-guideline" startIcon={<KeyboardBackspaceIcon />}>
          Back
      </Button>
      {/* <Grid container sx={{ pt: "3%", pb: "5%", pl: "2.5%", pr: "2.5%" }}> */}
      <Seo title="Chapter 1 The headquarters of the General Assembly" />
        <PageTitle borderRadius={"5px"}>
          <Typography id="page-title" variant="h5">Chapter 1 The headquarters of the General Assembly</Typography>
        </PageTitle>
      {/* </Grid> */}
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Grid container sx={{ pt: "-3%", pb: "3%", pl: "3%", pr: "3%" }}>
          <header>
            <h5 itemProp="headline">Chapter 1 The headquarters of the General Assembly</h5>
          </header>
          <section itemProp="articleBody">
            {parse(post.content)}
          </section>
        </Grid>
      </article>


      </GeneralLayout>
    </>
  );
};

export default Chapter1TheHeadquartersOfTheGeneralAssembly;

export const pageQuery = graphql`
  query BlogPostById {
    post: wpPost(id: { eq: "cG9zdDoyNTI=" }) {
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
  }
`
