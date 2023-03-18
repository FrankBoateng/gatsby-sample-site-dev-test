import React from "react"
import { useState } from "react"
import { navigate, Link } from "gatsby"
import {
  Grid,
  OutlinedInput,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
  Button,
  ListItem
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import PageTitleNoSpace from "../components/PageTitleNoSpace"
import * as styles from "./LogIn.module.css"
import { Auth } from "aws-amplify"
import { setUser } from "../services/auth"
import * as Yup from "yup"
import { Formik } from "formik"
import { Helmet } from "react-helmet"
const LogIn = () => {
  const [isLoading, setLoading] = useState(false)

  return (
    <div>
      <Helmet><title>Login</title></Helmet>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setLoading(true)
          setStatus({ success: false })
          setSubmitting(true)
          try {
            await Auth.signIn(values.username, values.password)
            await Auth.currentAuthenticatedUser().then(user => {
              setLoading(false)
              setSubmitting(false)
              setStatus({ success: true })
              setUser(user?.attributes)
              navigate("/")
            })
          } catch (error) {
            setLoading(false)
            console.log("Error signing in")
            setErrors({ username: error.message, password: error.message })
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.logIn} id="Loginpagething">
              <PageTitleNoSpace>
                <Typography variant="h5" color="white">
                  Welcome Log in to your profile
                </Typography>
              </PageTitleNoSpace>
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
                sx={{ justifyContent: "center", alignItems: "center", mt: 20 }}
              >
                <Grid xs={12} item>
                  <FormControl sx={{ width: { xs: "80%", md: "30%" } }}>
                    <InputLabel htmlFor="username-signup">
                      ID Number*
                    </InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.username && errors.username)}
                      id="username-signup"
                      name="username"
                      type="text"
                      label="ID Number*"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id="helper-text-username-signup">
                        {errors.username}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} item>
                  <FormControl sx={{ width: { xs: "80%", md: "30%" } }}>
                    <InputLabel htmlFor="password-signup">Password*</InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      name="password"
                      type="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Password*"
                      value={values.password}
                      inputProps={{}}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "5px",
                      }}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/*<Grid xs={12} item>*/}
                {/*  <LoadingButton*/}
                {/*    sx={{*/}
                {/*      backgroundColor: "#e02f65",*/}
                {/*      height: "3.5rem",*/}
                {/*      borderRadius: "20px",*/}
                {/*      width: { xs: "80%", md: "30%" },*/}
                {/*    }}*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    type="submit"*/}
                {/*    loading={isLoading}*/}
                {/*  >*/}
                {/*    Login*/}
                {/*  </LoadingButton>*/}

                {/*</Grid>*/}

              </Grid>
              <Stack direction="column"
                     justifyContent="center"
                     alignItems="center"
                     paddingTop={2}
                     spacing={2}>
                <LoadingButton
                  sx={{
                    backgroundColor: "#e02f65",
                    height: "2rem",
                    borderRadius: "20px",
                    width: { xs: "50%", md: "20%" },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={isLoading}
                >
                  Login
                </LoadingButton>
                <Button component={Link} to="/Register"
                          sx={{
                            backgroundColor: "#0000ff",
                            height: "2rem",
                            borderRadius: "20px",
                            width: { xs: "50%", md: "20%" },
                          }}
                          variant="contained"
                          color="primary"
                          type="submit"

                >
                  Register
                </Button>
                <Button component={Link} to="/forgot-password"
                        sx={{
                          backgroundColor: "#232929",
                          height: "2rem",
                          borderRadius: "20px",
                          width: { xs: "50%", md: "20%" },
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"

                >
                  Forgot Password
                </Button>
              </Stack>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default LogIn
