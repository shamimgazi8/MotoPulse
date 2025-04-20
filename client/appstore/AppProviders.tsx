"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import store from "../appstore/store";
import { ConfigProvider, theme as antdTheme } from "antd";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });

    const root = document.documentElement;
    setIsDarkMode(root.classList.contains("dark"));

    // Optional: watch for dark mode class changes (e.g., toggled via button)
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </Provider>
  );
}
