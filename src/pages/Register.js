import React from "react"
import { useState, useEffect } from "react"
import {
  Button,
  Box,
  Grid,
  OutlinedInput,
  Typography,
  InputAdornment,
  InputLabel,
  IconButton,
  FormControl,
  FormHelperText,
  MenuItem,
  Select
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import * as styles from "./Register.module.css"
import PageTitleNoSpace from "../components/PageTitleNoSpace"
import { strengthColor, strengthIndicator } from "../utils/password-strength"
import { navigate } from "gatsby"
import { Auth } from "aws-amplify"
import * as Yup from "yup"
import { Formik } from "formik"
import { Helmet } from "react-helmet"
import body from "../../code.json"
import sha256 from 'crypto-js/sha256';

const Register = () => {
  const [level, setLevel] = useState()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const changePassword = value => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  useEffect(() => {
    changePassword("")
  }, [])

  const responsiveWidth = {
    width: { xs: "80%", md: "30%" },
  }

  const [region, setRegion] = useState("")

  const handleSelectRegionChange = event => {
    const {
      target: { value },
    } = event
    setRegion(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const [group, setGroup] = useState("")

  const handleSelectGroupChange = event => {
    const {
      target: { value },
    } = event
    setGroup(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  return (
    <div className={styles.register} id="register-page">
      <Helmet>
        <title>Registration Page</title>
      </Helmet>
      <PageTitleNoSpace sx={responsiveWidth}>
        <Typography variant="h5" color="white">
          Register
        </Typography>
      </PageTitleNoSpace>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          name: "",
          family_name: "",
          group: "",
          region: ""
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          family_name: Yup.string()
            .max(255)
            .required("Last/ family name is required"),
          username: Yup.string().max(255).required("ID number is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Must Contain 8 Characters")
            .max(255)
            .required("Password is required")
            .matches(/^(?=.*[a-z])/, " Must Contain One Lowercase Character")
            .matches(/^(?=.*[A-Z])/, "  Must Contain One Uppercase Character")
            .matches(/^(?=.*[0-9])/, "  Must Contain One Number Character"),
          region: Yup.string().max(255).required("Region is required"),
          group: Yup.string().max(255).required("Group is required"),
          // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false })
            setSubmitting(true)
            const {
              username,
              email,
              password,
              name,
              family_name,
              region,
              group,
            } = values

            const hash = sha256(username).toString()
            if(body.includes(hash)){
              await Auth.signUp({
                username,
                password,
                attributes: {
                  email,
                  name,
                  family_name,
                  "custom:Region": region,
                  "custom:Group": group,
                },
              })
                .then(() => navigate("/confirm-signup", { state: { username } }))
                .catch((error) => {
                  setStatus({ success: false })
                  setErrors({ username: error.message })
                  setSubmitting(false)
                }) 
            }
            else{
              setErrors({username: "Invalid ID"})
            }
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
          <>
            <div>
              <form noValidate onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={4}
                  sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 20,
                    mb: 20
                  }}
                >
                  <Grid xs={12} item>
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
                    <FormControl sx={responsiveWidth}>
                      <InputLabel htmlFor="name-signup">First Name*</InputLabel>
                      <OutlinedInput
                        error={Boolean(touched.name && errors.name)}
                        id="name-signup"
                        name="name"
                        type="text"
                        label="First Name*"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                        }}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText error id="helper-text-name-signup">
                          {errors.name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} item>
                    <FormControl sx={responsiveWidth}>
                      <InputLabel htmlFor="family-name-signup">
                        Last Name*
                      </InputLabel>
                      <OutlinedInput
                        error={Boolean(
                          touched.family_name && errors.family_name
                        )}
                        id="family-name-signup"
                        name="family_name"
                        type="text"
                        label="Last Name*"
                        value={values.family_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                        }}
                      />
                      {touched.family_name && errors.family_name && (
                        <FormHelperText
                          error
                          id="helper-text-family-name-signup"
                        >
                          {errors.family_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} item>
                    <FormControl sx={responsiveWidth} variant="outlined">
                      <InputLabel htmlFor="email-signup">Email*</InputLabel>
                      <OutlinedInput
                        error={Boolean(touched.email && errors.email)}
                        id="email-signup"
                        name="email"
                        type="email"
                        label="Email*"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                        }}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="helper-text-email-signup">
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} item>
                    <FormControl sx={responsiveWidth}>
                      <InputLabel htmlFor="region">Region*</InputLabel>
                      <Select
                        labelId="region-label"
                        name="region"
                        id="region"
                        value={values.region}
                        onChange={handleChange}
                        input={<OutlinedInput label="Region" />}
                        sx={{ backgroundColor: "white", width: "100%", textAlign: "left" }}
                      >
                        <MenuItem value="Cape Town">Cape Town</MenuItem>
                        <MenuItem value="Port Elizabeth">Port Elizabeth</MenuItem>
                        <MenuItem value="Johannesburg">Johannesburg</MenuItem>
                        <MenuItem value="Durban">Durban</MenuItem>
                        <MenuItem value="Pietermaritzburg">Pietermaritzburg</MenuItem>
                        <MenuItem value="Namibia">Namibia</MenuItem>
                        <MenuItem value="Zimbabwe">Zimbabwe</MenuItem>
                      </Select>
                      {touched.region && errors.region && (
                        <FormHelperText error id="helper-text-region-signup">
                          {errors.region}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} item>
                    <FormControl sx={responsiveWidth}>
                      <InputLabel htmlFor="duty">Group*</InputLabel>
                      <Select
                        labelId="group-label"
                        id="group"
                        name="group"
                        value={values.group}
                        onChange={handleChange}
                        input={<OutlinedInput label="Group*" />}
                        sx={{ backgroundColor: "white", textAlign: "left" }}
                      >
                        <MenuItem value="MG">MG</MenuItem>
                        <MenuItem value="WG">WG</MenuItem>
                        <MenuItem value="YG">YG</MenuItem>
                        <MenuItem value="Seniors">Seniors</MenuItem>
                      </Select>
                      {touched.group && errors.group && (
                        <FormHelperText error id="helper-text-group-signup">
                          {errors.group}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid xs={12} item>
                    <FormControl sx={responsiveWidth}>
                      <InputLabel htmlFor="password-signup">
                        Password*
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
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
                  {/* <Grid xs={12} item>
                    <FormControl sx={responsiveWidth}>
                      <InputLabel htmlFor="confirm-password-signup">
                        Confirm Password*
                      </InputLabel>
                      <OutlinedInput
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        id="confirm-password-signup"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        onChange={e => {
                          handleChange(e)
                          changePassword(e.target.value)
                        }}
                        label="Confirm Password*"
                        value={values.confirmPassword}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                        }}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormHelperText error id="helper-text-confirm-password-signup">
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid> */}
                  <Grid xs={12} item>
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
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Register
