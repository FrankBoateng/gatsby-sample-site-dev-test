import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider"

const clientGenerator = (credentials, region = "eu-west-1") => {
    const client = new CognitoIdentityProviderClient({credentials, region})
    return client
}

export {clientGenerator}