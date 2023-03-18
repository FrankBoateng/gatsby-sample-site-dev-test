import React, { useState } from "react";
import { Link } from "gatsby"

import styled from "@mui/styled-engine"
import {
  BaseStyledContentCard,
  BaseStyledContentCardTitle,
} from "../components/BaseStyledContentCard"

import GeneralLayout from "../components/general-layout"
import Seo from "../components/seo"
import * as PropTypes from "prop-types"
import PageTitle from "../components/PageTitle"
import Typography from "@mui/material/Typography"

import Grid from "@mui/material/Grid"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Button from "@mui/material/Button"

const TrainingCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "6vh",
  alignItems: "start",
})

Grid.propTypes = { children: PropTypes.node }


const TrainingMaterialforInternalAffairsWOD = () => {

  const playlists = [
    {
      title: "Year 40 Cell Leaders' Education",
      path: '/year-40-cell-leader-education'
    },
    {
      title: "Year 40 Department Leaders' Education",
      path: '/year-40-department-leader-education'
    },
  ];

  return (
    <div>
      <GeneralLayout>
        <Button id="back-button" variant="contained" startIcon={<KeyboardBackspaceIcon />}>
          <Link id="back-button" className="" to="/">
            Back
          </Link>
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
                <TrainingCard id="training-card" xs={12} component={Link} to={`${playlist.path}`}>
                  <BaseStyledContentCardTitle>
                    <span className={"headline"} itemProp="headline">{playlist.title}</span>
                  </BaseStyledContentCardTitle>
                </TrainingCard>
              </li>
            )
          })}
        </ol>
      </GeneralLayout>
    </div>
  );
};

export default TrainingMaterialforInternalAffairsWOD;
