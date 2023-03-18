import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

const ProtectedPage = ({ children }) => {
  useEffect(() => {
    if(!isLoggedIn())
      return navigate(`/login`)
  }, [isLoggedIn()])

  return (isLoggedIn() ? {children} : navigate(`/login`))

}

export default ProtectedPage;