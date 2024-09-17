import React, { useCallback } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { graphqlClient } from "@/client/api";
import { verifyUserGoogleToken } from "@/graphql/query/userQuery";
import toast from "react-hot-toast";
import { useCurrentUser } from "@/hooks/userHooks";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { IoIosHome, IoIosNotifications } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  url: string;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = ({ children }) => {
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

  const SidebarMenuItems: TwitterSidebarButton[] = [
    {
      title: "Home",
      icon: <IoIosHome />,
      url: "/",
    },
    {
      title: "Explore",
      icon: <MdExplore />,
      url: "",
    },
    {
      title: "Notifications",
      icon: <IoIosNotifications />,
      url: "",
    },
    {
      title: "Message",
      icon: <AiFillMessage />,
      url: "",
    },
    {
      title: "Profile",
      icon: <CgProfile />,
      url: `${currentUser?.id}`,
    },
  ];

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
                <Link
                  href={ele.url}
                  className=" flex items-center justify-start gap-4 rounded-3xl  w-fit hover:bg-slate-700 p-2 cursor-pointer"
                  key={ele.title}
                >
                  <span>{ele.icon}</span>
                  <span>{ele.title}</span>
                </Link>
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
      <div className="col-span-6 border-r-[1px] border-l-[1px] border-slate-600 h-screen overflow-scroll">
        {children}
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
};

export default TwitterLayout;
