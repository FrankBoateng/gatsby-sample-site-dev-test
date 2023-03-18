import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import GeneralLayout from "./general-layout"
import Button from "@mui/material/Button"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

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
    <GeneralLayout>
      <header className="global-header">
        {isHomePage ? (
          <h1 className="main-heading">
            {/*<Link to="/">{parse(title)}</Link>*/}
          </h1>
        ) : (
          <Button id="back-button" variant="contained" component={Link} to="/chairmans-words" startIcon={<KeyboardBackspaceIcon />}>
              Back
          </Button>
        )}
      </header>
      <main>{children}</main>
    </GeneralLayout>
  )
}

export default Layout
