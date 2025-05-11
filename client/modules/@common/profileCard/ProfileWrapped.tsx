"use client";
import React from "react";
import Cookies from "js-cookie";
import ProfileCard from ".";
import { useGetUserProfileQuery } from "@/service/userApi";

const ProfileCardWrapper = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  if (!userId || !token) {
    if (typeof window !== "undefined") {
      window.location.href = "/users/login";
    }
    return null;
  }

  const { data, isLoading, error } = useGetUserProfileQuery({
    id: userId,
    token,
  });

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    window.location.href = "/users/login";
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Failed to load profile.</div>;

  const user = {
    name: `${data.firstname} ${data.lastname}`,
    title: data.email,
    avatarUrl:
      data.profile_url ||
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    description: data.address || "No address provided",
  };

  return (
    <ProfileCard
      name={user.name}
      title={user.title}
      avatarUrl={user.avatarUrl}
      description={user.description}
      onLogout={handleLogout}
    />
  );
};

export default ProfileCardWrapper;
