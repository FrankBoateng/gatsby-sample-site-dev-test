import { Auth } from "aws-amplify"
import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"

export const isWODTheologyAuthenticated = () => {
  if (isBrowser()) {
    if (window.localStorage.getItem("wodaccess") == "granted") return true
    return false
  }
  return true
}

export const isWODIAauthenticated = () =>{
  if (isBrowser()) {
    if (window.localStorage.getItem("iaaccess") == "granted") return true
    return false
  }
  return true
}

export const getUser = () => {
  if (isBrowser()) {
    if (window.localStorage.getItem("lightUser"))
      return JSON.parse(window.localStorage.getItem("lightUser"))
    return {}
  }
  return true
}

export const getUserAttribute = attribute => {
  if (isBrowser()) {
    if (window.localStorage.getItem("lightUser")) {
      const lightUser = JSON.parse(window.localStorage.getItem("lightUser"))
      return lightUser[attribute]
    }
  }
}

export const setUser = user =>
  window.localStorage.setItem("lightUser", JSON.stringify(user))

export const handleLogin = ({ username }) => {
  return setUser({ username })
}

export const isLoggedIn = () => {
  const user = getUser()
  if (user === true) return true
  return !!user.sub
}

export const logout = async () => {
  setUser({})
  window.localStorage.removeItem("lightUser")
  window.localStorage.removeItem("iaaccess")
  window.localStorage.removeItem("wodaccess")
  await Auth.signOut()
  navigate("/login")
}
