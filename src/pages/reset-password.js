import React from "react"
import { Auth } from "aws-amplify"
import { useLocation } from "@reach/router"
import {
  Button,
  Box,
  Grid,
  OutlinedInput,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material"
import * as Yup from "yup"
import { Formik } from "formik"
import PageTitle from "../components/PageTitle"
import * as styles from "./ConfirmSignup.module.css"
import { navigate } from "gatsby"
import { useState } from "react"
import { strengthColor, strengthIndicator } from "../utils/password-strength"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Helmet } from 'react-helmet'

const ForgotPassword = () => {
  const location = useLocation()

  let locationState

  if (location.state) {
    locationState = location.state
  }

  const gridStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const responsiveWidth = {
    width: { xs: "80%", md: "30%" },
  }

  const [level, setLevel] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const changePassword = value => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <>
      <Helmet><title>Reset Password</title></Helmet>
      <Formik
        initialValues={{ username: locationState?.username, code: "" }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("ID number is required"),
          password: Yup.string().max(255).required("Password is required"),
          code: Yup.string().required("Password reset code is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, errors }) => {
          try {
            setStatus({ success: false })
            setSubmitting(false)
            const { username, code, password } = values
            await Auth.forgotPasswordSubmit(username, code, password)
              .then(() => navigate("/"))
              .catch(err => setErrors({ submit: err }))
          } catch (err) {
            console.error(err)
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <div className={styles.ConfirmSignup}>
              <Grid
                container
                spacing={4}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 20,
                }}
              >
                <Grid xs={12} sx={{ mb: "5%" }} item>
                  <PageTitle sx={responsiveWidth}>
                    <Typography variant="h5">Reset Password</Typography>
                  </PageTitle>
                </Grid>
                <Grid xs={12} item sx={gridStyling}>
                  <FormControl sx={responsiveWidth}>
                    <InputLabel htmlFor="confirm-signup">
                      Password Reset Code*
                    </InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.code && errors.code)}
                      id="confirm-signup"
                      name="code"
                      type="text"
                      label="Password Reset Code*"
                      value={values.code}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.code && errors.code && (
                      <FormHelperText error id="helper-text-confirm-signup">
                        {errors.code}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid xs={12} item sx={gridStyling}>
                  <FormControl sx={responsiveWidth}>
                    <InputLabel htmlFor="password-signup">
                      New Password*
                    </InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e)
                        changePassword(e.target.value)
                      }}
                      label="Password*"
                      value={values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText error id="helper-text-password-signup">
                        {errors.password}
                      </FormHelperText>
                    )}
                    <Grid
                      container
                      spacing={2}
                      sx={{ pt: 1.5 }}
                      alignItems="center"
                    >
                      <Grid item>
                        <Box
                          sx={{
                            bgcolor: level?.color,
                            width: 85,
                            height: 8,
                            borderRadius: "7px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid xs={12} item sx={gridStyling}>
                  <Button
                    sx={{
                      backgroundColor: "#058FCC",
                      height: "3.5rem",
                      borderRadius: "20px",
                      ...responsiveWidth,
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Confirm
                  </Button>
                  {errors.submit && (
                    <FormHelperText error id="helper-text-submit-form">
                      {errors.submit}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}

export default ForgotPassword
