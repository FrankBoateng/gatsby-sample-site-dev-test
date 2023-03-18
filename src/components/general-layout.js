import React, { useEffect, useState } from "react"
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  BottomNavigation,
} from "@mui/material"
import Drawer from "./drawer"
import { isLoggedIn } from "../services/auth"
import { navigate } from "gatsby"
import Toolbar from "@mui/material/Toolbar"

const muiTheme = createTheme()

const GeneralLayout = ({ isHomePage, children }) => {

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if(!hasMounted){
    return null;
  }

  return (
    <>
      {isLoggedIn() ? (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Drawer />
            <div className="global-wrapper-parent">
              <div className="global-wrapper" data-is-root-path={isHomePage}>
                <main>{children}</main>
              </div>
            </div>
          </ThemeProvider>
          <BottomNavigation sx={{bgcolor: "#de3163", height:33}}/>
        </StyledEngineProvider>
      ) : (
        navigate(`/login`)
      )}
    </>
  )
}

export default GeneralLayout
