import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import GeneralLayout from "./general-layout"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Button from "@mui/material/Button"

const Layout = ({ isHomePage, children, categorySlug }) => {

  const previousPage = categorySlug ? `/study-text/${categorySlug}` : "/study-text"
  return (
    <GeneralLayout>
      <header className="global-header">
        {isHomePage ? (
          <h1 className="main-heading">
            {/*<Link to="/">{parse(title)}</Link>*/}
          </h1>
        ) : (
          <Button id="back-button" variant="contained" component={Link} to={previousPage} startIcon={<KeyboardBackspaceIcon />}>
            Back
          </Button>
        )}
      </header>
      <main>{children}</main>
    </GeneralLayout>
  )
}

export default Layout
