import FeedCard from "@/components/FeedCard";
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
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-48">
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
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3">Hello3</div>
      </div>
    </div>
  );
}
