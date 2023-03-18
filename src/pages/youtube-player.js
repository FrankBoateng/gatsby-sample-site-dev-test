import React from "react"
import Grid from "@mui/material/Grid";
import GeneralLayout from "../components/general-layout"
import YouTubePlayer from "../components/YouTubePlayer"
import { useQuery } from "../utils/hooks"

const YouTubeVideoPage = (props) => {
  const Id = useQuery("video")
  const pathName = props?.location?.state?.prevPath ?? null;
  return (
    <GeneralLayout>
      <Grid container>
        <Grid item xs={12} sx={{mt: 5}}>
          <YouTubePlayer videoId={Id}  prevPath={pathName}/>
        </Grid>
      </Grid>
    </GeneralLayout>
  )
}

export default YouTubeVideoPage
