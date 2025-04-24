import React from "react";
import { Tabs } from "antd";

// Import your components
import DashboardProfile from "./Dashboard";
import { FaHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const MainDashboard: React.FC = () => {
  const tabItems = [
    {
      label: (
        <span className=" flex justify-center items-center gap-2">
          <MdDashboard /> Dashboard
        </span>
      ),
      key: "1",
      children: <DashboardProfile />,
    },
    {
      label: (
        <span className=" flex justify-center items-center gap-2">
          <FaHeart /> Liked Reviews
        </span>
      ),
      key: "2",
      children: "<UserSettings />",
    },
    {
      label: (
        <span className=" flex justify-center items-center gap-2">
          <FaHeart /> Dashboard
        </span>
      ),
      key: "3",
      children: " <Notifications />",
    },
  ];

  return (
    <div className="w-[80%] m-auto mt-10 h-screen">
      <Tabs tabPosition="left" items={tabItems} />
    </div>
  );
};

export default MainDashboard;
