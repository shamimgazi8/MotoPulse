"use client";
import React from "react";
import { Tabs } from "antd";
import DashboardProfile from "./Dashboard";
import { MdDashboard } from "react-icons/md";
import { BsFillFilePostFill } from "react-icons/bs";
import { CiBookmarkCheck } from "react-icons/ci";
import MyReviews from "./MyReviews";
import BookmarkReviews from "./BookmarkedRevies";

const MainDashboard: React.FC = () => {
  const tabItems = [
    {
      label: (
        <span className="flex justify-center items-center gap-2">
          <MdDashboard /> Dashboard
        </span>
      ),
      key: "1",
      children: <DashboardProfile />,
    },
    {
      label: (
        <span className="flex justify-center items-center gap-2">
          <BsFillFilePostFill /> My Reviews
        </span>
      ),
      key: "2",
      children: <MyReviews />,
    },
    {
      label: (
        <span className="flex justify-center items-center gap-2">
          <CiBookmarkCheck className="text-lg ml-[-4px]" /> Bookmarks
        </span>
      ),
      key: "3",
      children: <BookmarkReviews />,
    },
  ];

  return (
    <div className="w-[80%] m-auto mt-10 h-[80vh]">
      <Tabs tabPosition="left" items={tabItems} />
    </div>
  );
};

export default MainDashboard;
