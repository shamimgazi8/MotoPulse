"use client";
import React, { useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  address: string;
  profileImage: string;
};

const initialUser: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main Street, Springfield",
  profileImage:
    "https://images.ctfassets.net/ihx0a8chifpc/gPyHKDGI0md4NkRDjs4k8/36be1e73008a0181c1980f727f29d002/avatar-placeholder-generator-500x500.jpg",
};

const DashboardProfile = () => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email,
    address: user.address,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Basic client-side validation
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

      // You would send oldPassword and newPassword to backend here
      console.log("Updating password...");
    }

    // Update email and address
    setUser({
      ...user,
      email: formData.email,
      address: formData.address,
    });

    setIsEditing(false);
    setFormData((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-[100px]">
      <div className="  bg-white rounded-2xl shadow-lg p-6 w-[70%]">
        <h1 className=" mb-10 gradient-text text-3xl font-semibold">
          Dashboard
        </h1>
        <div className="flex items-start gap-4">
          <img
            src={user.profileImage}
            alt={`${user.name} profile`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
          />
          <div className=" flex flex-col gap-3 ">
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
