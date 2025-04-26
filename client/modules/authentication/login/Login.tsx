"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Cookies from "js-cookie";
import { Alert } from "antd";
import SignupForm from "../register/SignupForm";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false); // 🔄 New loading state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // ⏳ Show loading

    try {
      if (!formData.email || !formData.password) {
        throw new Error("Please enter both email and password.");
      }

      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed.");
      }

      Cookies.set("token", result.token, { expires: 7 });
      Cookies.set("userId", result.user?.id, { expires: 7 });
      setSuccess(true);

      window.location.href = "/users/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false); // ✅ Hide loading
    }
  };

  return (
    <div className="grid grid-cols-3 min-h-screen transition-all duration-500 overflow-hidden">
      {/* Login Panel */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isLoginView ? "col-span-2" : "col-span-1"
        } flex items-center justify-center`}
      >
        <div className="w-full px-4">
          {isLoginView ? (
            <>
              <h1
                data-aos="fade-right"
                className="text-[42px] font-bold text-center "
              >
                Login to Your Account
              </h1>
              <form
                data-aos="fade-right"
                onSubmit={handleLogin}
                className="w-full p-8 rounded-2xl max-w-[550px] flex flex-col justify-center gap-8 items-center mx-auto"
              >
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="w-full space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium ml-5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-full bg-gray-100 dark:bg-gray-700  focus:outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="w-full space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium ml-5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <IoIosEye className="text-xl" />
                      ) : (
                        <IoIosEyeOff className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
                {success && (
                  <Alert message="Login Successfully" type="success" showIcon />
                )}
                <button
                  type="submit"
                  className="w-[50%] bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full font-semibold transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
                <a className=" underline underline-offset-4" href="/">
                  Browse as a guest User
                </a>
              </form>
            </>
          ) : (
            <div
              data-aos="fade-right"
              className="text-center px-8 overflow-hidden"
            >
              <h3 className="text-3xl font-bold mb-4">Want to login?</h3>
              <p className="mb-6">
                Login and discover a great amount of new opportunities!
              </p>
              <button
                onClick={() => setIsLoginView(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Signup Panel */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isLoginView ? "col-span-1" : "col-span-2"
        } flex items-center justify-center`}
      >
        <div className="h-full w-full bg-gradient-to-br from-teal-400 to-green-500 text-white flex-col px-6 relative flex items-center justify-center transition-all duration-500 ease-in-out">
          <button
            onClick={() => setIsLoginView(true)}
            className="absolute top-4 right-4 text-white text-xl"
          >
            ×
          </button>

          {!isLoginView ? (
            <SignupForm onSwitchToLogin={() => setIsLoginView(true)} />
          ) : (
            <div data-aos="fade-left" className="text-center px-8">
              <h3 className="text-3xl font-bold mb-4">New Here?</h3>
              <p className="mb-6">
                Sign up and discover a great amount of new opportunities!
              </p>
              <button
                onClick={() => setIsLoginView(false)}
                className="bg-white text-teal-600 px-8 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
