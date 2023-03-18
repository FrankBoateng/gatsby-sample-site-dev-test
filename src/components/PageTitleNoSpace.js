import React from "react"
import styled from "@mui/styled-engine"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

const PageTitleGrid = styled(Grid)({
  display: "flex",
})

const PageTitleBox = styled(Box)(({ backgroundColor = "#026eaa" }) => ({
  display: "flex",
  height: "100%",
  color: "white",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  backgroundColor,
}))

const PageTitleNoSpace = ({ children, backgroundColor }) => (
  <PageTitleGrid item xs={12}>
    <PageTitleBox
      sx={{ width: { xs: "100%" }, pt: "1%", pb: "1%", pl: "1%", pr: "1%" }}
      backgroundColor={backgroundColor}
    >
      {children}
    </PageTitleBox>
  </PageTitleGrid>
)

export default PageTitleNoSpace
