import React from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PageTitle from "../components/PageTitle"
import { Link } from "gatsby"
import GeneralLayout from "../components/general-layout"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { Helmet } from "react-helmet"
import Seo from "../components/seo"
import * as PropTypes from "prop-types"

Grid.propTypes = { children: PropTypes.node }

const study = () => {
  return (
    <>
      <Helmet>
        <title>Study</title>
      </Helmet>
      <GeneralLayout>
        <Button id="back-button" variant="contained" component={Link} to="/" startIcon={<KeyboardBackspaceIcon />}>
          Back
        </Button>

        <Seo title="Study" />
          <PageTitle borderRadius={"5px"}>
              <Typography id="page-title" variant="h5">
                Study
              </Typography>
            </PageTitle>

          <Grid
            sx={{ pt: "3%", pb: "5%" }}
            item
            xs={12}
            display="flex"
            justifyContent="center"
          >
            <Button
              component={Link}
              key="Video Material"
              to="study-video-material-categories"
              sx={{ width: 295, height: "3.5rem", backgroundColor: "#026eaa" }}
              variant="contained"
              color="primary"
            >
              Video Material
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              component={Link}
              key="Study Text"
              to="/study-text-categories"
              sx={{ width: 295, height: "3.5rem", backgroundColor: "#026eaa" }}
              variant="contained"
              color="primary"
            >
              Text Material
            </Button>
          </Grid>
      </GeneralLayout>
    </>
  )
}

export default study
