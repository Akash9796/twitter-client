import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query VerifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);
