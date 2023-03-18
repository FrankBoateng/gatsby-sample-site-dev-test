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
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import PageTitle from "./PageTitle"
import { strengthColor, strengthIndicator } from "../utils/password-strength"
import { navigate } from "gatsby"
import { Auth } from "aws-amplify"
import * as Yup from "yup"
import { Formik } from "formik"

const Register = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("");
  }, []);

  const responsiveWidth = {
    width: { xs: "80%", md: "30%" },
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
            const { username, email, password } = values;
            await Auth.signUp({
              username,
              password,
              attributes: {
                email,
              },
            });

            navigate("/app/confirm-signup", {state: {username}});
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
          <div>
            <form noValidate onSubmit={handleSubmit}>
              <Grid
                container
                spacing={4}
                sx={{ justifyContent: "center", alignItems: "center", mt: 20 }}
              >
                <Grid xs={12} sx={{ mb: "5%" }} item>
                  <PageTitle sx={responsiveWidth}>
                    <Typography variant="h5">Register</Typography>
                  </PageTitle>
                </Grid>
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
                    />
                    {touched.username && errors.username && (
                      <FormHelperText error id="helper-text-username-signup">
                        {errors.username}
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
                    <InputLabel htmlFor="password-signup">Password*</InputLabel>
                    <OutlinedInput
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
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
        )}
      </Formik>
    </>
  );
};

export default Register;
