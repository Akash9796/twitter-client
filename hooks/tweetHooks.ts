import { graphqlClient } from "@/client/api";
import { CreateTweet } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweets.mutation";
import { getAllTweetsQuery } from "@/graphql/query/tweetQuery";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });

  return { ...query, tweets: query.data?.getAllTweets };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-tweets"],
    mutationFn: async (payLoad: CreateTweet) =>
      await graphqlClient.request(createTweetMutation, { payLoad }),
    onMutate: () => toast.loading("Creating Tweet", { id: "1" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        "all-tweets",
      ] as InvalidateQueryFilters);
      toast.success("Tweet Created", { id: "1" });
    },
  });

  return mutation;
};
