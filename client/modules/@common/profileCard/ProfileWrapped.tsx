"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProfileCard from ".";

const ProfileCardWrapper = () => {
  const [user, setUser] = useState<{
    name: string;
    title: string;
    avatarUrl: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const id = Cookies.get("userId");

    if (!token || !id) {
      window.location.href = "/users/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/profile/${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser({
            name: `${data.firstname} ${data.lastname}`,
            title: data.email,
            avatarUrl:
              data.profile_url ||
              "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
            description: data.address || "No address provided",
          });
        } else {
          Cookies.remove("token");
          window.location.href = "/users/login";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    window.location.href = "/users/login";
  };

  return (
    <>
      {user && (
        <ProfileCard
          name={user.name}
          title={user.title}
          avatarUrl={user.avatarUrl}
          description={user.description}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default ProfileCardWrapper;
