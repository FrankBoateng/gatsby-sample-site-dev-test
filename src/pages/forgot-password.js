import React from "react"
import { Auth } from "aws-amplify"
import { useLocation } from "@reach/router"
import {
  Button,
  Grid,
  OutlinedInput,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material"
import * as Yup from "yup"
import { Formik } from "formik"
import PageTitle from "../components/PageTitle"
import * as styles from "./ConfirmSignup.module.css"
import { navigate } from "gatsby"
import { Helmet } from "react-helmet"

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

  return (
    <div className="logged-out-background">
      <Helmet><title>Forgot Password</title></Helmet>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("ID number is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false })
            setSubmitting(false)
            const { username } = values
            await Auth.forgotPassword(username)
            navigate("/reset-password", { state: { username } })
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
                    <PageTitle>
                  
                      <Typography variant="h5" color="white" >
                            Forgot Password
                        </Typography>
                  
                    </PageTitle>
                  </Grid>

                <Grid xs={12} item sx={gridStyling}>
                  <FormControl sx={responsiveWidth}>
                    <InputLabel htmlFor="username-signup">
                      ID Number*
                    </InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.username && errors.username)}
                      id="username-signup"
                      name="username"
                      type="text"
                      label="ID Number*"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id="helper-text-username-signup">
                        {errors.username}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* <Grid xs={12} item sx={gridStyling}>
                  <FormControl sx={responsiveWidth}>
                    <InputLabel htmlFor="confirm-signup">
                      Confirmation Code*
                    </InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.code && errors.code)}
                      id="confirm-signup"
                      name="code"
                      type="text"
                      label="Confirmation Code*"
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
                </Grid> */}
                <Grid xs={12} item sx={gridStyling}>
                  <Button
                    sx={{
                      backgroundColor: "#e02f65",
                      height: "3.5rem",
                      borderRadius: "20px",
                      ...responsiveWidth,
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Get reset code
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ForgotPassword
