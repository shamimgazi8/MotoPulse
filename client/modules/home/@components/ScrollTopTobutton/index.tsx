"use client";
import { useState, useEffect } from "react";
import { GoMoveToTop } from "react-icons/go";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true); // Show button after 200px scroll
    } else {
      setShowButton(false);
    }
  };

  // Add event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll behavior
    });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 bg-black dark:bg-white dark:text-black text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          showButton
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: "opacity 0.3s ease, visibility 0.3s ease" }}
      >
        <GoMoveToTop />
      </button>
    </>
  );
};

export default ScrollToTopButton;
