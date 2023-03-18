import React, { useState } from "react"
import { navigate } from "gatsby"
import GeneralLayout from "../../components/general-layout"
import { Formik } from "formik"
import PageTitleNoSpace from "../../components/PageTitleNoSpace"
import {
  Grid,
  OutlinedInput,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import * as Yup from "yup"
import { Helmet } from "react-helmet"
import { isBrowser } from "../../services/auth"

const AuthenticateMaterialWODforIA = () => {
  const [isLoading, setLoading] = useState(false)
  return (
    <GeneralLayout>
      <Helmet>
        <title>Enter WOD Password</title>
      </Helmet>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          setLoading(true)
          setStatus({ success: false })
          setSubmitting(true)
          if(values.password == 922018){
            if(isBrowser()){
              window.localStorage.setItem("iaaccess", "granted")
              navigate("/material-for-wod-of-ia")
            }
          } else{
            setErrors({password: "Incorrect password"})
          }
          setLoading(false)
          setSubmitting(false)
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
            <div>
              <PageTitleNoSpace>
                <Typography variant="h5" color="white" fontSize="10">
                  Enter Password for WOD of IA Page
                </Typography>
              </PageTitleNoSpace>
              <Grid
                container
                spacing={4}
                sx={{ justifyContent: "center", alignItems: "center", mt: 10 }}
                align="center"
              >
                <Grid xs={12} item>
                  <FormControl sx={{ width: { xs: "80%" } }}>
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
                <Grid xs={12} item>
                  <LoadingButton
                    sx={{
                      backgroundColor: "#e02f65",
                      height: "3.5rem",
                      borderRadius: "20px",
                      width: { xs: "80%", md: "30%" },
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    loading={isLoading}
                  >
                    Authenticate
                  </LoadingButton>
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    </GeneralLayout>
  )
}

export default AuthenticateMaterialWODforIA
