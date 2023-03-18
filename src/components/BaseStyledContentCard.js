import { useTheme } from "@mui/material/styles"
import styled from "@mui/styled-engine"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

const BaseStyledContentCard = styled(Grid)(
  ({ backgroundColor = "#FFF", borderLeftColor }) => {

    const defaultStyling = {
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "start",
      color: "#000",
      position: "relative",
      borderLeft: "3rem solid",
      borderRadius: "7px",
      minHeight: { xs: "5vh", md: "6vh" },
      minWidth: { xs: "333px", md: "666px" },
      marginTop: "1vh",
      backgroundColor,
      borderLeftColor,
    }

    return defaultStyling
  }
)

const BaseStyledContentCardTitle = styled(Typography)({
  variant: "body",
  fontWeight: 500,
  padding: 10,
})

const BaseStyledContentCardDescription = styled(Typography)({
  variant: "body",
  fontWeight: 300,
  padding: 10,
})

export {
  BaseStyledContentCard,
  BaseStyledContentCardTitle,
  BaseStyledContentCardDescription,
}
