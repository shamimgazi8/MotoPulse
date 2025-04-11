import React from 'react';
import { IoIosLogOut } from 'react-icons/io';

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
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={avatarUrl}
            alt="Profile Avatar"
          />
        </div>
        <div className="p-8">
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            {name}
          </h1>
          <div className="uppercase tracking-wide text-[12px] text-indigo-500 font-semibold">
            {title}
          </div>
          <p className="mt-2 text-gray-500 max-w-[300px]">{description}</p>
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
