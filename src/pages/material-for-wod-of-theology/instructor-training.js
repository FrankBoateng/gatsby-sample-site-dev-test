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
import { isWODTheologyAuthenticated } from "../../services/auth"

const TrainingCard = styled(BaseStyledContentCard)({
  borderLeftColor: "#026eaa",
  height: "6vh",
  alignItems: "start",
})

Grid.propTypes = { children: PropTypes.node }

const TrainingMaterialforTheologyWOD = () => {
  const playlistId = "PLOZKPu82muDxN1SbyBfRjb4nH8PnRT6gm"
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

  useEffect(() => {
    if (!isWODTheologyAuthenticated()) navigate("/material-for-wod-of-theology/authenticate")
  }, [isWODTheologyAuthenticated()])
  
  return isWODTheologyAuthenticated() ? (
    <GeneralLayout>
      <Button id="back-button" variant="contained" component={Link} to="/material-for-wod-of-theology" startIcon={<KeyboardBackspaceIcon />}>
        Back
      </Button>
      <Seo title="Training material: For WOD of Theology" />
      <PageTitle borderRadius={"5px"}>
        <Typography
          id="page-title"
          // id="instructor-training-scj-year-39"
          variant="h5"
          color={"#FFF"}
        >
          Instructor Training (SCJ Year 39, Steel White Horse Unit Education)
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
      <div>
        <div id="nextAndPrevBtn">
          <BaseStyledButton onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </BaseStyledButton>
          <BaseStyledButton onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </BaseStyledButton>
        </div>
      </div>
    </GeneralLayout>
  ) : (
    navigate("/material-for-wod-of-theology/authenticate")
  )
}

export default TrainingMaterialforTheologyWOD
