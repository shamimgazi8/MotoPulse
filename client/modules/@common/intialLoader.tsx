"use client";

import { useEffect, useState } from "react";
import { Spin } from "antd";
import Image from "next/image";

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); // Adjust the duration for the animation
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-r from-[#0f1f2c] to-[#01160f] animate-blink">
      {/* Logo */}
      <div className="animate-spin-slow mb-6">
        <Image
          src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
          alt="MotoPulse Logo"
          width={200}
          height={200}
        />
      </div>

      {/* Spinner */}
      <Spin />
    </div>
  );
}
