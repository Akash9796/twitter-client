import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/FeedCard/Layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweetHooks";
import { useCurrentUser } from "@/hooks/userHooks";
import Image from "next/image";
import { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";

export default function Home() {
  const { user: currentUser } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();
  const [content, setContent] = useState("");

  const handleCreateTweet = () => {
    mutate({ content, imageUrl: "" });
  };

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  return (
    <TwitterLayout>
      <div>
        <div className="border-y-2 border-gray-700 p-4 hover:bg-gray-900 cursor-pointer transition-all">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
              {currentUser?.profileImageUrl && (
                <Image
                  width={50}
                  height={50}
                  alt=""
                  src={currentUser.profileImageUrl}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="col-span-11">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className=" border-b border-slate-700  w-full bg-transparent text-xl p-3  focus:outline-none"
                placeholder="What's Happening?"
                rows={3}
              ></textarea>
              <div className="text-3xl flex justify-between ">
                <div className="flex gap-x-16">
                  <BiImageAlt onClick={handleSelectImage} />
                </div>
                <button
                  onClick={handleCreateTweet}
                  className="bg-green-700 font-semibold text-sm h-fit py-2 px-4 rounded-full"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {tweets?.map((item, i) => {
          return <FeedCard key={i} data={item as Tweet} />;
        })}
      </div>
    </TwitterLayout>
  );
}
