import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineUpload } from "react-icons/ai";

const FeedCard = () => {
  return (
    <div className="border-y-2 border-gray-700 p-2 hover:bg-gray-900 cursor-pointer transition-all">
      <div className="grid grid-cols-12">
        <div className="col-span-1 flex items-start p-2 justify-end">
          <Image
            width={50}
            height={50}
            alt=""
            src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
            className="rounded-full"
          />
        </div>
        <div className="col-span-11 p-2">
          <h5>Akash Shukla</h5>
          <p className="p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            molestiae assumenda, ipsam asperiores excepturi hic consectetur nisi
            repellat expedita a id in inventore libero vero tempora omnis ea
            quod perspiciatis esse amet? Quia, ut ducimus!
          </p>
          <Image
            width={100}
            height={100}
            alt=""
            src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
