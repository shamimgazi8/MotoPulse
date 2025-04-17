"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Alert } from "antd";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  onSwitchToLogin: () => void;
};

const SignUpForm: React.FC<Props> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Note: Only send the required fields to the API.
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          profile_url: "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full max-w-md p-6 rounded-2xl text-black flex flex-col gap-4"
    >
      <h3 className="text-3xl font-bold text-center mb-2 text-white">
        Create Account
      </h3>

      {error && <Alert message={error} type="error" showIcon />}
      {success && (
        <Alert
          message="Account Created Successfully ! Please Login"
          type="success"
          showIcon
        />
      )}

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="p-3 rounded-full bg-gray-100 focus:outline-none"
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="p-3 rounded-full bg-gray-100 focus:outline-none"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="p-3 rounded-full bg-gray-100 focus:outline-none"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="p-3 rounded-full bg-gray-100 focus:outline-none"
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="p-3 rounded-full bg-gray-100 focus:outline-none"
        required
      />

      <button
        type="submit"
        className="bg-teal-500 text-white py-3 rounded-full font-semibold hover:bg-teal-600 transition"
      >
        Sign Up
      </button>

      <p className="text-white text-sm text-center mt-2">
        Already have an account?{" "}
        <button
          type="button"
          className="underline text-white"
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </p>
    </form>
  );
};

export default SignUpForm;
