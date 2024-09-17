import { graphql } from "@/gql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payLoad: CreateTweet!) {
    createTweet(payLoad: $payLoad) {
      id
      content
    }
  }
`);
