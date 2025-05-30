"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import CoverImageUpload from "../AddReview/components/UploadCover";
import { FaPen } from "react-icons/fa";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/service/userApi";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  address: string;
  profile_url: string;
};

const DashboardProfile = () => {
  const token = Cookies.get("token");
  const id = Cookies.get("userId");
  if (!token || !id) {
    window.location.href = "/users/login";
    return;
  }

  const { data, error, isLoading, isSuccess } = useGetUserProfileQuery(
    { id, token },
    { skip: !token || !id }
  );

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    profile_url: "",
  });

  useEffect(() => {
    if (isSuccess && data) {
      const profileUrl =
        data.profile_url ||
        "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg";

      setUser({
        id: data.id,
        name: `${data.firstname} ${data.lastname}`,
        email: data.email,
        address: data.address || "No address provided",
        profile_url: profileUrl,
      });

      setFormData((prev) => ({
        ...prev,
        email: data.email,
        address: data.address || "",
        profile_url: profileUrl,
      }));
    }

    if (error) {
      console.error("Profile fetch error:", error);
      Cookies.remove("token");
      window.location.href = "/users/login";
    }
  }, [data, error, isSuccess, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!token || !id) {
      alert("Not authenticated.");
      return;
    }

    if (
      (formData.newPassword ||
        formData.confirmPassword ||
        formData.oldPassword) &&
      (!formData.oldPassword ||
        !formData.newPassword ||
        !formData.confirmPassword)
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    try {
      const updatePayload = {
        address: formData.address,
        profile_url: formData.profile_url,
        ...(formData.oldPassword && { oldPassword: formData.oldPassword }),
        ...(formData.newPassword && { newPassword: formData.newPassword }),
      };

      const response = await updateUserProfile({
        id,
        token,
        data: updatePayload,
      }).unwrap();

      alert("Profile updated successfully!");

      if (formData.oldPassword && formData.newPassword) {
        alert("Password changed. Please log in again.");
        Cookies.remove("token");
        Cookies.remove("userId");
        window.location.href = "/users/login";
        return;
      }

      setUser({
        ...user!,
        address: response.user.address,
        profile_url: response.user.profile_url,
        email: response.user.email,
      });

      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error: any) {
      alert(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg- dark:bg-black/50 rounded-2xl shadow-lg p-6 w-[70%]">
        <h1 className="mb-10 gradient-text text-3xl font-semibold w-[200px]">
          Dashboard
        </h1>
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <img
              src={formData.profile_url}
              alt={`${user.name} profile`}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
            />
            {isEditing && (
              <CoverImageUpload
                profile
                onUploadSuccess={(url) =>
                  setFormData((prev) => ({
                    ...prev,
                    profile_url: url,
                  }))
                }
              />
            )}
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <h2 className="text-2xl font-semibold dark:gradient-text">
              {user.name}
            </h2>
            {!isEditing ? (
              <>
                <p className="text-sm text-gray-500 dark:text-white">
                  {user.email}
                </p>
                <p className="text-sm text-gray-500">{user.address}</p>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="border rounded px-3 py-1 text-sm dark:text-white dark:bg-gray-900 dark:border-black"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border rounded px-3 py-1 text-sm dark:text-white dark:bg-gray-900 dark:border-black"
                />
                <hr className="my-2" />
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Old Password"
                  className="border rounded px-3 py-1 text-sm dark:text-white dark:bg-gray-900 dark:border-black"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="border rounded px-3 py-1 text-sm dark:text-white dark:bg-gray-900 dark:border-black"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="border rounded px-3 py-1 text-sm dark:text-white dark:bg-gray-900 dark:border-black"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex justify-center items-center gap-2"
            >
              <FaPen /> Edit
            </button>
          ) : (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
