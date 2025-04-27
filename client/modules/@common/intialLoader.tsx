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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-r from-[#0f1f2c] to-[#01160f] animate-blink gap-[-50px]">
      {/* Logo */}

      <div className="animate-spin-slow mb-6">
        <Image
          src="https://i.pinimg.com/originals/22/94/62/2294623e26b0d9dc73e8d7612792b819.gif"
          alt="MotoPulse Logo"
          width={200}
          height={200}
          priority
        />
      </div>
      <div>
        <img
          src="https://media3.giphy.com/media/zlcIBNopQj8Yx5QgpR/giphy.gif?cid=6c09b952jm6v9osdyn6csuz66ai3grxztt3dfm8qaj9yxaph&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          alt="MotoPulse Logo"
          className="h-[50px] w-[100px]"
        />
      </div>
    </div>
  );
}
