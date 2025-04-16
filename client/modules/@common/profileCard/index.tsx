import Image from "next/image";
import Link from "next/link";
import React from "react";

import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

interface ProfileCardProps {
  name: string;
  title: string;
  avatarUrl: string;
  description: string;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  avatarUrl,
  description,
  onLogout,
}) => {
  return (
    <div className="max-w-sm mx-auto rounded-xl  overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <Image
          height={20}
          width={150}
          className=" object-cover rounded-full "
          src={
            avatarUrl ??
            "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
          }
          alt="Profile Avatar"
        />

        <div className="p-8">
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            {name}
          </h1>
          <div className="uppercase tracking-wide text-[12px] text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500 max-w-[300px]">{description}</p>
          <div></div>
          <Link href={"/users/dashboard"}>
            <button className="mt-4 px-4 py-2 bg-black text-white hover:text-black hover:border-black border-[2px] rounded hover:bg-white focus:outline-none  flex justify-center items-center gap-2 transition-all">
              <MdDashboard className=" text-xl" />
              DASHBOARD
            </button>
          </Link>
          <button
            onClick={onLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex justify-center items-center gap-2 transition-all"
          >
            <IoIosLogOut className=" text-xl" />
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
