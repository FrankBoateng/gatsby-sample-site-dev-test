import React from 'react';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageTitle from "../components/PageTitle";
import GeneralLayout from "../components/general-layout"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Link } from "gatsby"
import Button from "@mui/material/Button"
import styled from "@mui/styled-engine";
import Seo from "../components/seo"
import { Helmet } from 'react-helmet';
import { BaseStyledContentCard, BaseStyledContentCardTitle } from "../components/BaseStyledContentCard";

const DutyGuidelineContentCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "6vh",
  alignItems: "start",
  spacing: "0",
  // padding: '-55px',
});


const DutyGuideline = ({location}) => {
  return (
    <>
    <Helmet><title>Duty Guideline</title></Helmet>
    <GeneralLayout location={location}>
      <Button id="back-button" variant="contained" component={Link} to="/" startIcon={<KeyboardBackspaceIcon />}>
          Back
      </Button>
      {/* <Grid container sx={{ pt: "3%", pb: "5%", pl: "2.5%", pr: "2.5%" }}> */}
      <Seo title="Duty Guideline" />
        <PageTitle borderRadius={"5px"}>
          <Typography id="page-title" variant="h5">Duty Guideline</Typography>
        </PageTitle>
      {/* </Grid> */}
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Grid container sx={{ pt: "-3%", pb: "3%", pl: "3%", pr: "3%" }}>
          <header>
            <h5 itemProp="headline">The Mindset of the worker of duty of Shincheonji</h5>
          </header>
          <section itemProp="articleBody">
            <p>
              The Shincheonji worker of duty thinks and thinks about the appointed work to fulfill the duty faithfully whenever awake, eating, or walking in the street, drawing up scenarios about the work, whether sitting or standing.
            </p>
            <p>
              When I look at Creation, when I look at everything in the world, when I look at the sky and the earth, and when I look at everything on Television, I must gain wisdom about my work.
            </p>
            <p>
              Making it shine, better, newer, is what you believe, and it is to repay God’s grace even if it is ten thousandth of a percent, and it is to honor God. If it goes wrong even a thousand times, it must be corrected.
            </p>
            <p>
              I have to go and see if there’s anything that can help me to do my work better and we must learn from the whole creation. This is because it was created with the bright wisdom of God. If the work of my duty is poor, the light of God becomes dark.
            </p>
            <p>
              My duty must be created such that God will be pleased more than anything, the best. This is my life. I have to make it more precious than my life. If I have ears and a heart, I will do it like this.
            </p>
            <p>
              15th of Nov SCJ 32-Chairman’s special instruction
            </p>
          </section>
        </Grid>
      </article>

      <ol style={{listStyle: `none` }}>
        <li key="/chapter1-the-headquarters-of-the-general-assembly">
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            {/*<Grid container sx={{ pt: "3%", pl: "2.5%", pr: "2.5%" }}>*/}
                <header>
                  <h2>
                      <DutyGuidelineContentCard id="chairman-content" xs={12} component={Link} to="/chapter1-the-headquarters-of-the-general-assembly" itemProp="url" spacing={0} >
                          <BaseStyledContentCardTitle>
                                  <span className={"headline"} itemProp="headline">Chapter 1 The headquarters of the General Assembly</span>
                          </BaseStyledContentCardTitle>
                      </DutyGuidelineContentCard>
                  </h2>
                </header>
            {/*</Grid>*/}
          </article>
        </li>
        <li key="/chapter1-the-12-tribes">
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            {/*<Grid container sx={{ pt: "3%", pl: "2.5%", pr: "2.5%" }}>*/}
                <header>
                  <h2>
                      <DutyGuidelineContentCard id="chairman-content" xs={12} component={Link} to="/chapter2-the-12-tribes" itemProp="url" spacing={0} >
                          <BaseStyledContentCardTitle>
                                  <span className={"headline"} itemProp="headline">Chapter 2 The 12 Tribes</span>
                          </BaseStyledContentCardTitle>
                      </DutyGuidelineContentCard>
                  </h2>
                </header>
            {/*</Grid>*/}
          </article>
        </li>
      </ol>


      </GeneralLayout>
    </>
  );
};

export default DutyGuideline;
