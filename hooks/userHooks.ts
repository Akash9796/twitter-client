import { graphqlClient } from "@/client/api";
import { getCurrentUser } from "@/graphql/query/userQuery";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: () => graphqlClient.request(getCurrentUser),
  });

  return { ...query, user: query.data?.getCurrentUser };
};
