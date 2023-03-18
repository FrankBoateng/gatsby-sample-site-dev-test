import React from "react"
import { Button, Grid } from "@mui/material"
import GeneralLayout from "../components/general-layout"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"

const Home = ({ location }) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <GeneralLayout location={location}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 10, md: 20 },
          }}
        >
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeServiceVideoBtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/service-videos-list"
            >
              SERVICE VIDEO
            </Button>
          </Grid>
          <Grid item xs={12} md={6}display="flex" justifyContent="center">
          <Button
            id="homeMaterialForIABtn" sx={{ width: 295 }}
            variant="contained"
            color="primary"
            component={Link}
            to="/daily-bread-list"
          >
            DAILY BREAD
          </Button>
        </Grid>
          {/* <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeMaterialForIABtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/material-for-wod-of-ia"
            >
              TRAINING MATERIAL: <br></br> FOR WOD OF INTERNAL AFFAIRS
            </Button>
          </Grid> */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeDutyGuidelineBtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/duty-guideline"
            >
              DUTY GUIDELINE
            </Button>
          </Grid>
          {/* <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeMaterialForMoTBtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/material-for-wod-of-theology"
            >
              TRAINING MATERIAL: <br></br> FOR WOD OF THEOLOGY
            </Button>
          </Grid> */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeChairmansWordsBtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/chairmans-words"
            >
              CHAIRMAN'S LIFEGIVING WORDS
            </Button>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeStudyBtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/study"
            >
              STUDY MATERIAL
            </Button>
          </Grid>
          {/* <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Button
              id="homeStudyBtn"
              sx={{ width: 295 }}
              variant="contained"
              color="primary"
              component={Link}
              to="/structure-change"
            >
              STRUCTURE CHANGE
            </Button>
          </Grid> */}
        </Grid>
    </GeneralLayout>
    </>
  )
}

export default Home
