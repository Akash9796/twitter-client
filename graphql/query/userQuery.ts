import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query VerifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUser = graphql(`
  #graphql
  query GetCurrentUser {getCurrentUser {
  id 
  firstName 
  lastName 
  profileImageUrl 
  email}}
`);


