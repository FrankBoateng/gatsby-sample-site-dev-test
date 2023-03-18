import React, { useEffect, useState } from "react"
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
import { isWODIAauthenticated } from "../../services/auth"

const TrainingCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "auto",
  alignItems: "start",
})

Grid.propTypes = { children: PropTypes.node }

const Year40CellLeaderEducation = () => {
  const playlistId = "PLOZKPu82muDwJY3um8i4IXJj0CQf1lhbs"
  const maxResults = 5
  const [videos, setVideos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [nextPageToken, setNextPageToken] = useState("")
  const [prevPageToken, setPrevPageToken] = useState("")

  useEffect(() => {
    // Fetch video IDs from YouTube Data API
    const playlistApi = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=AIzaSyDw_UkHAg_7HW2jtCTCcr4zHZRwqoZnpdI&pageToken=${currentPage > 1 ? nextPageToken : ''}`
    fetch(playlistApi)
      .then(response => response.json())
      .then(data => {
        const videos = data.items.map(video => video.snippet)
        setVideos(videos)
        setCurrentPage(currentPage)
        setNextPageToken(data.nextPageToken)
        setPrevPageToken(data.prevPageToken)
      })
      .catch(error => {
        console.error(error)
      })
  }, [currentPage])

  const totalPages = Math.ceil(videos.length / maxResults)
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const startIndex = (currentPage - 1) * maxResults
  const endIndex = startIndex + maxResults
  const videosToShow = videos.slice(startIndex, endIndex)
  return isWODIAauthenticated() ? (
    <GeneralLayout>
      <Button id="back-button" variant="contained" component={Link} to="/material-for-wod-of-ia" startIcon={<KeyboardBackspaceIcon />}>
        Back
      </Button>
      <Seo title="Training material: For WOD of Internal Affairs" />
      <PageTitle borderRadius={"5px"}>
        <Typography
          id="page-title"
          variant="h5"
          color={"#FFF"}
        >
          Year 40 Cell leaders Education
        </Typography>
      </PageTitle>
      <ol style={{ listStyle: `none` }}>
        {videosToShow.map(video => {
          return (
            <li>
              <TrainingCard id="training-card" xs={12} component={Link} to={`/youtube-player?video=${video?.resourceId?.videoId}`} state={{ prevPath: window.location.pathname }}>
                <BaseStyledContentCardTitle>
                  <span className={"headline"} itemProp="headline">{video.title}</span>
                </BaseStyledContentCardTitle>
              </TrainingCard>
            </li>
          )
        })}
      </ol>
      <div id="nextAndPrevBtn">
        <BaseStyledButton onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </BaseStyledButton>
        <BaseStyledButton onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </BaseStyledButton>
      </div>
    </GeneralLayout> ) : (
    navigate("/material-for-wod-of-ia/authenticate")
  )
}

export default Year40CellLeaderEducation