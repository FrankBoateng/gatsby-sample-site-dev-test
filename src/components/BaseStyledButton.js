import styled from "@mui/styled-engine"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const BaseStyledButton = styled(Button)(
  ({ backgroundColor = "#3875dc"}) => {

    const defaultStyling = {
      cursor: "pointer",
      // fontSize: "14px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#ffffff",
      position: "relative",
      borderRadius: "7px",
      minHeight: { xs: "5vh", md: "6vh" },
      marginTop: "1vh",
      variant: "contained",
      backgroundColor,
      '&:hover': {
        background: "#ef4ad4",
      },
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
  BaseStyledButton,
  BaseStyledContentCardTitle,
  BaseStyledContentCardDescription,
}
