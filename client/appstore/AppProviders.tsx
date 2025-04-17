"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import store from "../appstore/store";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
