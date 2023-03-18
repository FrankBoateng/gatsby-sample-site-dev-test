import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

import styled from "@mui/styled-engine"
import {
  BaseStyledContentCard,
  BaseStyledContentCardTitle,
} from "../../components/BaseStyledContentCard"

import GeneralLayout from "../../components/general-layout"
import Seo from "../../components/seo"
import * as PropTypes from "prop-types"
import PageTitle from "../../components/PageTitle"
import Typography from "@mui/material/Typography"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import { BaseStyledButton } from "../../components/BaseStyledButton"
import { isBrowser, isWODTheologyAuthenticated } from "../../services/auth"

const TrainingCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "6vh",
  alignItems: "start",
})

Grid.propTypes = { children: PropTypes.node }

const TrainingMaterialforTheologyWOD = () => {

  return isWODTheologyAuthenticated() ? (
    <GeneralLayout>
      <Button
        id="back-button"
        variant="contained"
        component={Link}
        to="/"
        startIcon={<KeyboardBackspaceIcon />}
      >
        Back
      </Button>
      <Seo title="Training Material for WOD of Theology" />
      <PageTitle borderRadius={"5px"}>
        <Typography
          id="page-title"
          // id="training-material-wod-theology"
          variant="h5"
          color={"#FFF"}
        >
          Training Material for WOD of Theology
        </Typography>
      </PageTitle>
      <ol style={{ listStyle: `none` }}>
        <li>
          <TrainingCard
            id="training-card"
            xs={12}
            component={Link}
            // to="/material-for-wod-of-theology/gm-creation-manual"
            to="/gm-creation-manual"
          >
            <BaseStyledContentCardTitle>
              <span className={"headline"} itemProp="headline">
                GM Creation Manual
              </span>
            </BaseStyledContentCardTitle>
          </TrainingCard>
        </li>
        <li>
          <TrainingCard
            id="training-card"
            xs={12}
            component={Link}
            // to="/material-for-wod-of-theology/review-materials"
            to="/review-materials"
          >
            <BaseStyledContentCardTitle>
              <span className={"headline"} itemProp="headline">
                Review Materials
              </span>
            </BaseStyledContentCardTitle>
          </TrainingCard>
        </li>
        <li>
          <TrainingCard
            id="training-card"
            xs={12}
            component={Link}
            to="/material-for-wod-of-theology/mot-trainings"
          >
            <BaseStyledContentCardTitle>
              <span className={"headline"} itemProp="headline">
                MoT Trainings
              </span>
            </BaseStyledContentCardTitle>
          </TrainingCard>
        </li>
        <li>
          <TrainingCard
            id="training-card"
            xs={12}
            component={Link}
            to="/material-for-wod-of-theology/instructor-training"
          >
            <BaseStyledContentCardTitle>
              <span className={"headline"} itemProp="headline">
                Instructor Training (SCJ Year 39, Steel White Horse Unit
                Education)
              </span>
            </BaseStyledContentCardTitle>
          </TrainingCard>
        </li>
        <li>
          <TrainingCard
            id="training-card"
            xs={12}
            component={Link}
            to="/material-for-wod-of-theology/12-tribes-education"
          >
            <BaseStyledContentCardTitle>
              <span className={"headline"} itemProp="headline">
                12 Tribes Church Head, Instructor, Evangelist Special Education
              </span>
            </BaseStyledContentCardTitle>
          </TrainingCard>
        </li>
      </ol>
    </GeneralLayout>
  ) : (
    navigate("/material-for-wod-of-theology/authenticate")
  )
}

export default TrainingMaterialforTheologyWOD
