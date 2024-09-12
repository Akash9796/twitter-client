import { graphqlClient } from "@/client/api";
import FeedCard from "@/components/FeedCard";
import { verifyUserGoogleToken } from "@/graphql/query/userQuery";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
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

const handleLoginWithGoogle = async (cred: CredentialResponse) => {
  const googleToken = cred.credential;
  if (!googleToken) return toast.error(`Google token not found`);

  const { verifyGoogleToken } = await graphqlClient.request(
    verifyUserGoogleToken,
    { token: googleToken }
  );
  toast.success("Varified Success");
  console.log(verifyGoogleToken);

  if (verifyGoogleToken)
    window.localStorage.setItem("_twitter_token", verifyGoogleToken);
};

export default function Home() {
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
        </div>
      </div>
      <div className="no-scrollbar col-span-6 border-r-[1px] border-l-[1px] border-slate-600 h-screen overflow-scroll">
        <FeedCard />
        <FeedCard />
      </div>
      <div className="col-span-3 p-5 ">
        <div className="bg-slate-700 rounded-lg p-3 flex flex-col w-fit h-fit items-center justify-center">
          <h1>New to twitter?</h1>
          <GoogleLogin onSuccess={(cred) => handleLoginWithGoogle(cred)} />
        </div>
      </div>
    </div>
  );
}
