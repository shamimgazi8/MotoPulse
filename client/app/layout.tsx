"use client";
import { Inter } from "next/font/google";
import "./../styles/main.scss";
const inter = Inter({ subsets: ["latin"] });
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import store from "./../appstore/store";

import { useEffect } from "react";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
    });
  }, []);
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${inter.className}`}>{children}</body>
      </html>
    </Provider>
  );
}
