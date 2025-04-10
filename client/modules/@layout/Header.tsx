"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash"; // Import the debounce function from lodash

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const defaultPaddingY = 4 + 25;
  const scrolledPaddingY = 2 + 5;
  const [paddingY, setPaddingY] = useState(defaultPaddingY);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScroll(isScrolled);
      setPaddingY(isScrolled ? scrolledPaddingY : defaultPaddingY);
    };

    const debouncedHandleScroll = debounce(handleScroll, 50); // Debounce for 50 milliseconds

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [defaultPaddingY, scrolledPaddingY]);

  return (
    <header
      className={`sticky top-0 z-[1000] text-black flex justify-center gap-10 px-6 transition-all duration-300 backdrop-blur-md ${
        scroll ? "bg-white/20 shadow-md" : "bg-white/0 shadow-none"
      }`}
      style={{
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
      }}
    >
      <div className=" font-semibold cursor-pointer">HOME</div>
      <div className=" font-semibold cursor-pointer">MODELS</div>
      <div className=" font-semibold cursor-pointer">STORE</div>
    </header>
  );
};

export default Header;
