"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Assuming token is stored in cookies
import { cookies } from "next/headers";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  address: string;
  profile_url: string;
};

const DashboardProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = Cookies.get("token"); // Retrieve token from cookies
    const id = Cookies.get("userId");

    if (!token) {
      // If token is missing, redirect to login page
      window.location.href = "/users/login";
      return;
    }
    // If token exists, proceed to fetch user data
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
            id: data.id,
            name: `${data.firstname} ${data.lastname}`,
            email: data.email,
            address: data.address || "No address provided",
            profile_url:
              data.profile_url ||
              "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg",
          });

          setFormData((prev) => ({
            ...prev,
            email: data.email,
            address: data.address || "",
          }));
        } else {
          // Handle error from backend (e.g., invalid token)
          console.error("Failed to load user:", data.message);
          Cookies.remove("token"); // Remove invalid token
          window.location.href = "/users/login"; // Redirect to login
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        Cookies.remove("token"); // Remove invalid token
        window.location.href = "/users/login"; // Redirect to login
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Password validation
    if (
      formData.newPassword ||
      formData.confirmPassword ||
      formData.oldPassword
    ) {
      if (
        !formData.oldPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        alert("Please fill all password fields.");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        alert("New password and confirmation do not match.");
        return;
      }

      console.log("Updating password...");
      // You would send oldPassword and newPassword to backend here
    }

    // Update email and address locally
    if (user) {
      setUser({
        ...user,
        email: formData.email,
        address: formData.address,
      });
    }

    setIsEditing(false);
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-20">User not found. Redirecting...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-[100px]">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[70%]">
        <h1 className="mb-10 gradient-text text-3xl font-semibold">
          Dashboard
        </h1>
        <div className="flex items-start gap-4">
          <img
            src={user.profile_url}
            alt={`${user.name} profile`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            {!isEditing ? (
              <>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.address}</p>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border rounded px-3 py-1 text-sm"
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border rounded px-3 py-1 text-sm"
                />
                <hr className="my-2" />
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Old Password"
                  className="border rounded px-3 py-1 text-sm"
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="border rounded px-3 py-1 text-sm"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="border rounded px-3 py-1 text-sm"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-right">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
            >
              Edit
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
