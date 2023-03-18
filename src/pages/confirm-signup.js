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

const ConfirmSignup = () => {
  const location = useLocation();

  let locationState;

  if(location.state){
    locationState = location.state;
  }

  const gridStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const responsiveWidth = {
    width: { xs: "80%", md: "30%" },
  };

  return (
    <>
      <Helmet><title>Confirm Registration</title></Helmet>
      <Formik
        initialValues={{ username: locationState?.username, code: "" }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("ID number is required"),
          code: Yup.string().required("The confirmation code is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: false });
            setSubmitting(false);
            const { username, code } = values;
            await Auth.confirmSignUp(username, code);
            navigate("/");
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
                    <Typography variant="h5">Confirm Registration</Typography>
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
                <Grid xs={12} item sx={gridStyling}>
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
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ConfirmSignup;
