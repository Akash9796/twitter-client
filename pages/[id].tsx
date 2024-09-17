import { graphqlClient } from "@/client/api";
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { getUserById } from "@/graphql/query/userQuery";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const { userInfo: user } = props;

  // const queryClient = useQueryClient();
  //   const { user: currentUser } = useCurrentUser();

  // const amIFollowing = useMemo(() => {
  //   if (!user) return false;
  //   return (
  //     (currentUser?.following?.findIndex((el) => el?.id === user.id) ?? -1) >= 0
  //   );
  // }, [currentUser?.following, user]);

  // const handleFollow = async () => {
  //   if (!user?.id) return;
  //   await graphqlClient.request(followUserMutation, { to: user?.id });
  //   await queryClient.invalidateQueries([
  //     "current-user",
  //   ] as InvalidateQueryFilters);
  // };

  // const handleunFollow = async () => {
  //   if (!user?.id) return;
  //   await graphqlClient.request(unfollowUserMutation, { to: user?.id });
  //   await queryClient.invalidateQueries([
  //     "current-user",
  //   ] as InvalidateQueryFilters);
  // };

  return (
    <div>
      <TwitterLayout>
        <div className="m-2  h-full overflow-y-auto scrollbar-width-none">
          <nav className="flex items-center gap-3">
            <FaArrowLeftLong className="text-xl" />
            <div>
              <h1 className="text-xl font-bold">Jack Sully</h1>
              <h1 className="text-slate-500 text-sm">
                {user?.tweets?.length} tweets
              </h1>
            </div>
          </nav>
          <div className="py-2 border-b border-slate-500">
            {user?.profileImageUrl && (
              <div className="p-2 size-20">
                <Image
                  src={user?.profileImageUrl}
                  alt={""}
                  className="rounded-full"
                  width={200}
                  height={200}
                />
              </div>
            )}
            <h1 className="text-xl font-bold">
              {user?.firstName || "Jack"} {user?.lastName || "Sully"}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex gap-4 mt-2 text-sm text-green-700">
                {/* <span>{user?.followers?.length ?? 0} followers</span>
                  <span>{user?.following?.length ?? 0} followings</span> */}
              </div>
              {/* {currentUser?.id != user?.id &&
                  (!amIFollowing ? (
                    <button
                      onClick={handleFollow}
                      className=" bg-[#32a55e] text-sm  p-2 rounded-full w-16"
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={handleunFollow}
                      className=" text-black bg-[#e1f1e7] text-sm  p-2 rounded-full w-20"
                    >
                      Unfollow
                    </button>
                  ))} */}
            </div>
          </div>
          <div>
            {user?.tweets?.map((item) => (
              <FeedCard data={item as Tweet} key={item?.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string;
  if (!id) return { notFound: true, props: { userInfo: undefined } };

  const userInfo = graphqlClient.request(getUserById, { id });
  if (!(await userInfo).getUserById) return { notFound: true };
  return { props: { userInfo: (await userInfo).getUserById as User } };
};

export default UserProfilePage;
