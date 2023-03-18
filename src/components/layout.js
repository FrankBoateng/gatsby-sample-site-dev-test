import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material"
import Drawer from "../components/drawer"

const muiTheme = createTheme()


const Layout = ({ isHomePage, children }) => {
  const {
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Drawer />
        <div className="global-wrapper" data-is-root-path={isHomePage}>
          <header className="global-header">
            <link rel="stylesheet" href="https://fontawesome.com/releases/v5.15/css/all.css"/>
            {isHomePage ? (
              <h1 className="main-heading">
                <Link to="/">{parse(title)}</Link>
              </h1>
            ) : (
              <Link className="header-link-home" to="/">
                Back To Articles
              </Link>
            )}
          </header>

          <main>{children}</main>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default Layout
