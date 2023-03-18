import React, { useState } from "react"
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
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { isWODIAauthenticated } from "../../services/auth"

const TrainingCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "6vh",
  alignItems: "start",
})

Grid.propTypes = { children: PropTypes.node }

const TrainingMaterialforInternalAffairsWOD = () => {
  const playlists = [
    {
      title: "Year 40 Cell Leader Education",
      path: "year-40-cell-leader-education",
    },
    {
      title: "Year 40 Department Leader Education",
      path: "year-40-department-leader-education",
    },
  ]

  return isWODIAauthenticated() ? (
    <div>
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
        <Seo title="Training material: For WOD of Internall Affairs" />
        <PageTitle borderRadius={"5px"}>
          <Typography
            id="page-title"
            // id="training-material-wod-internal-affairs"
            variant="h5"
            color={"#FFF"}
          >
            Training Material for WOD of Internal Affairs
          </Typography>
        </PageTitle>
        <ol style={{ listStyle: `none` }}>
          {playlists.map(playlist => {
            return (
              <li>
                <TrainingCard xs={12} component={Link} to={`${playlist.path}`}>
                  <BaseStyledContentCardTitle>
                    <span className={"headline"} itemProp="headline">
                      {playlist.title}
                    </span>
                  </BaseStyledContentCardTitle>
                </TrainingCard>
              </li>
            )
          })}
        </ol>
      </GeneralLayout>
    </div>
  ) : (
    navigate("/material-for-wod-of-ia/authenticate")
  )
}

export default TrainingMaterialforInternalAffairsWOD
