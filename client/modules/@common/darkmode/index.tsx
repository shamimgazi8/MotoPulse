"use client";
import React, { useState, useEffect } from "react";
import { BiSolidSun } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";

const themeDark = "dark";
const themeLight = "light";

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null); // <- initially unknown

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      savedTheme === themeDark ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(prefersDark);

    const root = document.documentElement;
    if (prefersDark) {
      root.classList.add(themeDark);
      localStorage.setItem("theme", themeDark);
    } else {
      root.classList.remove(themeDark);
      localStorage.setItem("theme", themeLight);
    }

    // Optional: update custom properties too
    root.style.setProperty("--background-color", prefersDark ? "#000" : "#fff");
    root.style.setProperty("--text-color", prefersDark ? "#fff" : "#000");
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newTheme = isDarkMode ? themeLight : themeDark;

    root.classList.toggle(themeDark, newTheme === themeDark);
    localStorage.setItem("theme", newTheme);
    root.style.setProperty(
      "--background-color",
      newTheme === themeDark ? "#000" : "#fff"
    );
    root.style.setProperty(
      "--text-color",
      newTheme === themeDark ? "#fff" : "#000"
    );

    setIsDarkMode(!isDarkMode);
  };

  if (isDarkMode === null) return null; // ⛔ Avoid rendering button until theme is determined

  return (
    <button
      onClick={toggleTheme}
      className="text-[15px] lg:p-[6px] p-[6px] bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition duration-300"
    >
      {isDarkMode ? <BiSolidSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggleButton;
