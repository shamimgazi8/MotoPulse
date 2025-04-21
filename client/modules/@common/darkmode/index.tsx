"use client";
import React, { useState, useEffect } from "react";
import { BiSolidSun } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";

const themeDark = "dark";
const themeLight = "light";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background-color", isDarkMode ? "#000" : "#fff");
    root.style.setProperty("--text-color", isDarkMode ? "#fff" : "#000");
    // Get the saved theme from local storage
    const savedTheme = localStorage.getItem("theme");
    console.log("Saved theme:", savedTheme);
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Toggle the theme
    if (isDarkMode) {
      document.documentElement.classList.remove(themeDark);
      localStorage.setItem("theme", themeLight);

      setIsDarkMode(!isDarkMode);
    } else {
      document.documentElement.classList.add(themeDark);
      localStorage.setItem("theme", themeDark);
      setIsDarkMode(!isDarkMode);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className=" text-[15px]  lg:p-[6px] p-[6px] bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition duration-300"
    >
      {isDarkMode ? <BiSolidSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
