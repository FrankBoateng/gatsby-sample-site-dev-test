import React, { useState, useEffect } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useAuth } from "../utils/useAuth"
import { Auth } from "aws-amplify"
import GeneralLayout from "../components/general-layout"
import { Helmet } from "react-helmet"

const MyProfile = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // const getUserDetails = async () => {
    //   const name = await Auth.userAttributes(user, 'name')
    //   const familyName = await Auth.userAttributes(user, 'family_name')
    //   const title = await Auth.userAttributes(user, 'custom:Title')
    //   const email = await Auth.userAttributes(user, 'email')
    //   setUserData({ name: `${name.Value} ${familyName.Value}`, title: title.Value, email: email.Value })
    // }

    const getUserDetails = async () => {
      const attributes = await Auth.userAttributes(user)
      const userData = {}
      attributes.forEach(attribute => {
        const { Name, Value } = attribute
        userData[Name] = Value
      })
      setUserData(userData)
    }

    if (user) {
      getUserDetails()
    }
  }, [user])

  if (!user || !userData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    )
  }

  const { name, title, email } = userData

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <GeneralLayout>
        <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h4" mb={3} id="myP-titleText">
              My Profile
            </Typography>
            <Typography variant="body1" mb={1} sx={{ fontWeight: "bold" }}>
              Name:
            </Typography>
            <Typography variant="body1" mb={3}>
              {name}
            </Typography>
            <Typography variant="body1" mb={1} sx={{ fontWeight: "bold" }}>
              Title:
            </Typography>
            <Typography variant="body1" mb={3}>
              {title}
            </Typography>
            <Typography variant="body1" mb={1} sx={{ fontWeight: "bold" }}>
              Email:
            </Typography>
            <Typography variant="body1" mb={3}>
              {email}
            </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Button variant="outlined" href="/" id="myP-homeBtn">
              Home
            </Button>
            <Button variant="outlined" onClick={() => Auth.signOut()}  id="myP-logoutBtn">
              Logout
            </Button>
          </Box>
          </Box>
        </Box>
      </GeneralLayout>
    </>
  )
}

export default MyProfile
