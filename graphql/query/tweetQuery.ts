import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
  #graphql
  query GetAllTweets {
    getAllTweets {
      content
      id
      imageUrl
      authorId
      author {
        firstName
        email
        lastName
        profileImageUrl
      }
    }
  }
`);
