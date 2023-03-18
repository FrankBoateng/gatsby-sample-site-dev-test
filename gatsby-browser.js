// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// normalize CSS across browsers
import "./src/css/normalize.css"

// custom CSS styles
import "./src/css/style.css"

import { Amplify }from "aws-amplify"
import awsConfig from "./src/aws-exports"
Amplify.configure(awsConfig)