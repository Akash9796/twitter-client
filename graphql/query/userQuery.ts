import { graphql } from "../../gql";

export const verifyUserGoogleToken = graphql(`
  #graphql
  query VerifyGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUser = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      profileImageUrl
      email
      tweets {
        id
        imageUrl
        content
        author {
          firstName
          lastName
          profileImageUrl
        }
      }
    }
  }
`);

export const getUserById = graphql(`
  #graphql
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      firstName
      lastName
      profileImageUrl
      tweets {
        author {
          firstName
          lastName
          profileImageUrl
        }
        authorId
      }
    }
  }
`);
