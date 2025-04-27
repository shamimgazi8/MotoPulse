import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FullPagePopupProps {
  isOpen: boolean;
}

const FullPagePopup: React.FC<FullPagePopupProps> = ({ isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show popup when isOpen is true
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  // Handle internal close
  const handleClose = () => {
    setIsVisible(false);
    window.location.href = "./bike-reviews";
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-500  ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-[#d2ffe1] text-green-500 rounded-2xl shadow-xl p-10 w-full h-full max-w-full max-h-full flex flex-col items-center justify-center transform transition-transform duration-500 ease-in-out ${
          isVisible ? "scale-100" : "scale-105"
        }`}
      >
        <Image
          height={200}
          width={200}
          alt="success"
          unoptimized
          src="https://cdn.dribbble.com/userupload/15097592/file/original-11af0dab65a0913fe4ea1d71d9d48f4a.gif"
        />
        <h2 className="text-4xl font-bold mb-6 text-center">
          You've helped millions of others with your review
        </h2>
        <p>Thanks for helping us find your best Wheels</p>
        <button onClick={handleClose} className="btn-secondary mt-5 rounded">
          Done
        </button>
      </div>
    </div>
  );
};

export default FullPagePopup;
