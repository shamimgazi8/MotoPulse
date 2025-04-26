"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Cookies from "js-cookie";
// Import your components
import DashboardProfile from "./Dashboard";
import { FaHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsFillFilePostFill } from "react-icons/bs";
import MyReviews from "./MyReviews";
import LikedReviews from "./LikedReviews";
import { getUserIdFromToken } from "@/utils/utils";
import { CiBookmarkCheck } from "react-icons/ci";

const id = getUserIdFromToken();

const MainDashboard: React.FC = () => {
  const [reviewDataById, setReviewDataById] = useState();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      window.location.href = "/users/login";
      return;
    }

    const FetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:4000/reviews/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setReviewDataById(data);
        if (!res.ok) {
          alert("something is wrong");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        Cookies.remove("token");
        window.location.href = "/users/login";
      }
    };

    FetchReview();
  }, []);

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
          <CiBookmarkCheck className=" text-lg" /> Bookmarks
        </span>
      ),
      key: "2",
      children: <LikedReviews />,
    },
    {
      label: (
        <span className=" flex justify-center items-center gap-2">
          <BsFillFilePostFill /> My Reviews
        </span>
      ),
      key: "3",
      children: (
        <MyReviews
          reviewData={reviewDataById}
          setReviewData={setReviewDataById}
        />
      ),
    },
  ];

  return (
    <div className="w-[80%] m-auto mt-10 h-[80vh]">
      <Tabs tabPosition="left" items={tabItems} />
    </div>
  );
};

export default MainDashboard;
