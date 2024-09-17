import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineUpload } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {
    data: { author, content, imageUrl },
  } = props;

  return (
    <div className="border-y-2 border-gray-700 p-2 hover:bg-gray-900 cursor-pointer transition-all">
      <div className="grid grid-cols-12">
        <div className="col-span-1 flex items-start p-2 justify-end">
          <Image
            width={50}
            height={50}
            alt=""
            src={author?.profileImageUrl || ""}
            className="rounded-full"
          />
        </div>
        <div className="col-span-11 p-2">
          <h5>{author.firstName + " " + author.lastName}</h5>
          <p className="p-2">{content}</p>
          <Image
            width={100}
            height={100}
            alt=""
            src={
              imageUrl ||
              "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            className="w-[100%]"
          />
          <div className="text-xl p-2 mt-2 flex justify-around  w-full">
            <BiMessageRounded />
            <FaRetweet />
            <AiOutlineHeart />
            <AiOutlineUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
