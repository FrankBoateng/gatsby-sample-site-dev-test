import React from "react"
import { Link } from "gatsby"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import YouTube from "react-youtube"
import Grid from "@mui/material/Grid"

const YouTubePlayer = ({ videoId, prevPath }) => {
  const opts = {
    height: "360",
    width: "640",
  }

  return (
    <>
      <Button id="back-button" variant="contained" component={Link} to={prevPath} startIcon={<KeyboardBackspaceIcon />}>
        Back
      </Button>
      <Grid container sx={{ pt: "5%" }}>
        <YouTube id="video-iframe" videoId={videoId} opts={opts} />
      </Grid>
    </>
  )
}

export default YouTubePlayer
