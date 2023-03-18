import React from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import PageTitle from "../../components/PageTitle"
import { Link } from "gatsby"
import GeneralLayout from "../../components/general-layout"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Seo from "../../components/seo"
import { BaseStyledContentCard, BaseStyledContentCardTitle } from "../../components/BaseStyledContentCard"
import styled from "@mui/styled-engine"
import * as PropTypes from "prop-types"

const TrainingCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "6vh",
  alignItems: "start",
})

Grid.propTypes = { children: PropTypes.node }


const StudyVideoMaterialCategories = (props) => {
  return (
    <>
      <GeneralLayout>
        <Button id="back-button" variant="contained" component={Link} to="/study" startIcon={<KeyboardBackspaceIcon />}>
            Back
        </Button>

        <Seo title="Daily Bread" />
        <PageTitle borderRadius={"5px"}>
          <Typography id="page-title" variant="h5" color={"#FFF"}>
            Video Material
          </Typography>
        </PageTitle>

        <ol style={{ listStyle: `none` }}>
          <li>
            <TrainingCard id="training-card" xs={12}  component={Link} to={`/study/revelation-speech-education-playlist`}>
              <BaseStyledContentCardTitle>
                <span className={"headline"} itemProp="headline">{'Revelation 10 minutes Speech Education'}</span>
              </BaseStyledContentCardTitle>
            </TrainingCard>

            <TrainingCard id="training-card" xs={12}  component={Link} to={`/study/special-education-hq-for-saints-playlist`}>
              <BaseStyledContentCardTitle>
                <span className={"headline"} itemProp="headline">{'Special Education from HQ for all saints'}</span>
              </BaseStyledContentCardTitle>
            </TrainingCard>

            <TrainingCard id="training-card" xs={12}  component={Link} to={`/study/heavenly-culture-education-playlist`}>
              <BaseStyledContentCardTitle>
                <span className={"headline"} itemProp="headline">{'Heavenly Culture Education'}</span>
              </BaseStyledContentCardTitle>
            </TrainingCard>

            {/*<TrainingCard id="training-card" xs={12}  component={Link} to={`/study/bb-training-playlist`}>*/}
            {/*  <BaseStyledContentCardTitle>*/}
            {/*    <span className={"headline"} itemProp="headline">{'BB Training'}</span>*/}
            {/*  </BaseStyledContentCardTitle>*/}
            {/*</TrainingCard>*/}
          </li>
        </ol>

      </GeneralLayout>
    </>
  )
}

export default StudyVideoMaterialCategories
