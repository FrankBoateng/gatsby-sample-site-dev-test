import React from "react"
import { Router } from "@reach/router"
import ConfirmSignup from "./ConfirmSignup"
import LogIn from "./login"
import Register from "./Register"

const App = () => (
    <>
        <Router>
            <ConfirmSignup path="/app/confirm-signup"/>
            <LogIn path="/app/login"/>
            <Register path="/app/register"/>
        </Router>
    </>
)

export default App