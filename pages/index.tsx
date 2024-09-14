import { graphqlClient } from "@/client/api";
import FeedCard from "@/components/FeedCard";
import { verifyUserGoogleToken } from "@/graphql/query/userQuery";
import { useCurrentUser } from "@/hooks/userHooks";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { AiFillMessage } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { MdExplore } from "react-icons/md";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const SidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <IoIosHome />,
  },
  {
    title: "Explore",
    icon: <MdExplore />,
  },
  {
    title: "Notifications",
    icon: <IoIosNotifications />,
  },
  {
    title: "Message",
    icon: <AiFillMessage />,
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
];

export default function Home() {
  const queryClient = useQueryClient();

  const { user: currentUser } = useCurrentUser();

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleToken,
        { token: googleToken }
      );
      console.log("verifyGoogleToken", verifyGoogleToken);
      toast.success("Varified Success");

      if (verifyGoogleToken)
        window.localStorage.setItem("_twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries([
        "current-user",
      ] as InvalidateQueryFilters);
    },
    [queryClient]
  );

  return (
    <div className="grid grid-cols-12 px-48">
      <div className=" col-span-3 pl-4 pt-8 ">
        <div className="text-6xl hover:bg-slate-700 p-2 h-fit w-fit rounded-full cursor-pointer">
          <BsTwitter />
        </div>
        <div className="text-2xl mt-2 mx-2 font-bold">
          <ul>
            {SidebarMenuItems.map((ele) => {
              return (
                <li
                  className=" flex items-center justify-start gap-4 rounded-3xl  w-fit hover:bg-slate-700 p-2 cursor-pointer"
                  key={ele.title}
                >
                  <span>{ele.icon}</span>
                  <span>{ele.title}</span>
                </li>
              );
            })}
          </ul>
          <button className="text-2xl mt-4 w-[80%] bg-green-700 py-2 content-center rounded-3xl font-semibold">
            Tweet
          </button>
          {currentUser && (
            <div className="text-xl absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {currentUser && currentUser.profileImageUrl && (
                <Image
                  className="rounded-full"
                  src={currentUser?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {currentUser.firstName || "Jack"}{" "}
                  {currentUser.lastName || "Sully"}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="no-scrollbar col-span-6 border-r-[1px] border-l-[1px] border-slate-600 h-screen overflow-scroll">
        <FeedCard />
        <FeedCard />
      </div>
      <div className="col-span-3 p-5 ">
        {!currentUser && (
          <div className="bg-slate-700 rounded-lg p-3 flex flex-col w-fit h-fit items-center justify-center">
            <h1>New to twitter?</h1>
            <GoogleLogin onSuccess={(cred) => handleLoginWithGoogle(cred)} />
          </div>
        )}
      </div>
    </div>
  );
}
