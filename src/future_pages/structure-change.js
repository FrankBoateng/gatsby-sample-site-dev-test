import React, { useState } from "react"
import GeneralLayout from "../components/general-layout"
import Seo from "../components/seo"
import * as PropTypes from "prop-types"
import PageTitle from "../components/PageTitle"
import { Formik } from "formik"
import { Auth } from "aws-amplify"
import * as Yup from "yup"
import {
  Button,
  Grid,
  OutlinedInput,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Box,
  Tabs,
  Tab,
} from "@mui/material"
import {Check} from "@mui/icons-material"
import TabPanel from "../components/TabPanel"
import { clientGenerator } from "../services/aws-provider"
import {
  AdminUpdateUserAttributesCommand,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { isLoggedIn } from "../services/auth"

Grid.propTypes = { children: PropTypes.node }

const StructureChange = () => {
  const responsiveWidth = {
    width: { xs: "80%", md: "30%" },
  }

  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }

  const duties = [
    "SMN",
    "HJN",
    "HGN",
    "SGN",
    "IWN",
    "JYJN",
    "GGN",
    "GYJN",
    "BGYJN",
    "HYJN",
    "JMN",
  ]

  const [duty, setDuty] = useState([])

  const handleSelectChange = event => {
    const {
      target: { value },
    } = event
    setDuty(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const getUserAttribute = attributeToReturn => {
    return attribute => {
      if (attribute.Name === attributeToReturn) return attribute.Value
    }
  }

  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    }
  }

  let preparedCognitoClient

  if (isLoggedIn() && typeof window !== "undefined") {
    preparedCognitoClient = clientGenerator(Auth.currentUserCredentials())
  }

  const [resultName, setResultName] = useState("")
  const [resultTitle, setResultTitle] = useState("")
  const [resultEmail, setEmail] = useState("")
  const [memberDetailsSuccess, setMemberDetailsSuccess] = useState(false)

  return (
    <div>
      <GeneralLayout>
        <Seo title="Structure Change" />
        <PageTitle borderRadius={"5px"}>
          <Typography id="structure-change" variant="h5" color={"#FFF"}>
            Structure Change
          </Typography>
        </PageTitle>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#FFF",
            }}
          >
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Get member details" {...a11yProps(0)} />
              <Tab label="Set member details" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={currentTab} index={0}>
            <Formik
              initialValues={{ username: "", duty: [] }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .max(255)
                  .required("ID number is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  setSubmitting(true)
                  const { username } = values
                  const listUsersInput = new ListUsersCommand({
                    Filter: `username=\"${username}\"`,
                    Limit: 1,
                    UserPoolId: "eu-west-1_9OYR5Fzak",
                  })
                  await (
                    await preparedCognitoClient
                  )
                    .send(listUsersInput)
                    .then(data => {
                      if (data?.Users[0]) {
                        const user = data?.Users[0]
                        setEmail(
                          user.Attributes.find(getUserAttribute("email"))[
                            "Value"
                          ]
                        )
                        setResultName(
                          user.Attributes.find(getUserAttribute("name"))[
                            "Value"
                          ]
                        )
                        setResultTitle(
                          user.Attributes.find(
                            getUserAttribute("custom:Title")
                          )["Value"]
                        )
                        setStatus("Success")
                      }
                    })
                    .catch(err => console.log(err))
                } catch (err) {
                  console.error(err)
                  setStatus({ success: false })
                  setErrors({ username: err.message })
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
                status,
              }) => (
                <>
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container align="center">
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ mt: 5 }}>
                          <InputLabel htmlFor="username-signup">
                            SCJ ID Number*
                          </InputLabel>
                          <OutlinedInput
                            error={Boolean(touched.username && errors.username)}
                            id="username-signup"
                            name="username"
                            type="text"
                            label="SCJ ID Number*"
                            value={values.username}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                            fullWidth
                            sx={{ backgroundColor: "white" }}
                          />
                          {touched.username && errors.username && (
                            <FormHelperText
                              error
                              id="helper-text-username-signup"
                            >
                              {errors.username}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          display: { md: "flex" },
                          justifyContent: { xs: "center", md: "flex-end" },
                          alignSelf: { md: "flex-end" },
                          alignItems: { xs: "center" },
                          mt: { xs: 5 },
                          flexDirection: { xs: "row" },
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "#058FCC",
                            height: "3.5rem",
                            borderRadius: "20px",
                            width: { xs: "80%", md: "65%" },
                          }}
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          Get Member Details
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  {status == "Success" && (
                    <Box
                      sx={{
                        bgcolor: "background.paper",
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 1,
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="body1"
                        mb={1}
                        sx={{ fontWeight: "bold" }}
                      >
                        Member's Name:
                      </Typography>
                      <Typography variant="body1" mb={3}>
                        {resultName}
                      </Typography>
                      <Typography
                        variant="body1"
                        mb={1}
                        sx={{ fontWeight: "bold" }}
                      >
                        Title(s):
                      </Typography>
                      <Typography variant="body1" mb={3}>
                        {resultTitle}
                      </Typography>
                      <Typography
                        variant="body1"
                        mb={1}
                        sx={{ fontWeight: "bold" }}
                      >
                        Email:
                      </Typography>
                      <Typography variant="body1" mb={3}>
                        {resultEmail}
                      </Typography>
                    </Box>
                  )}
                </>
              )}
            </Formik>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <Formik
              initialValues={{ username: "", duty: [] }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .max(255)
                  .required("SCJ ID number is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  setSubmitting(true)
                  const { username } = values
                  const updateCommand = new AdminUpdateUserAttributesCommand({
                    Username: username,
                    UserAttributes: [
                      { Name: "custom:Title", Value: duty.toString() },
                    ],
                    UserPoolId: "eu-west-1_9OYR5Fzak",
                  })
                  await (
                    await preparedCognitoClient
                  )
                    .send(updateCommand)
                    .then(() => {
                      setDuty([])
                      setStatus({ success: true })
                      setMemberDetailsSuccess(true)
                      setTimeout(()=>setMemberDetailsSuccess(false), 2000)
                    })
                    .catch(err => {
                      setErrors({ username: err.message })
                    })
                } catch (err) {
                  console.error(err)
                  setStatus({ success: false })
                  setErrors({ username: err.message })
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
                  <Grid
                    container
                    rowSpacing={4}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Grid xs={12} item>
                      <FormControl fullWidth sx={{ mt: 5 }}>
                        <InputLabel htmlFor="username-signup">
                          SCJ ID Number*
                        </InputLabel>
                        <OutlinedInput
                          error={Boolean(touched.username && errors.username)}
                          id="username-signup"
                          name="username"
                          type="text"
                          label="SCJ ID Number*"
                          value={values.username}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          inputProps={{}}
                          fullWidth
                          sx={{ backgroundColor: "white" }}
                        />
                        {touched.username && errors.username && (
                          <FormHelperText
                            error
                            id="helper-text-username-signup"
                          >
                            {errors.username}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} item>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel htmlFor="duty">Duty</InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="duty"
                          multiple
                          value={duty}
                          onChange={handleSelectChange}
                          input={<OutlinedInput label="Duty" />}
                          MenuProps={MenuProps}
                          sx={{ backgroundColor: "white" }}
                        >
                          {duties.map(name => (
                            <MenuItem key={name} value={name}>
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.duty && errors.duty && (
                          <FormHelperText error id="helper-text-duty-signup">
                            {errors.duty}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid
                      container
                      alignItems="center"
                      justify="center"
                      direction="row"
                      sx={{ mt: 5 }}
                    >
                      <Grid
                        xs={12}
                        item
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          sx={{
                            backgroundColor: memberDetailsSuccess ? "success" : "#058FCC",
                            height: "3.5rem",
                            borderRadius: "20px",
                            ...responsiveWidth,
                          }}
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          { !memberDetailsSuccess && "Save"}
                          { memberDetailsSuccess && <Check/> }
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </TabPanel>
        </Box>
      </GeneralLayout>
    </div>
  )
}

export default StructureChange
