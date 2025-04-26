"use client";
import { usePathname } from "next/navigation"; // ✅ import pathname hook
import navData from "@/data/nav-data.json";
import { Drawer, DrawerProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ThemeToggleButton from "../@common/darkmode";
import SearchAnt from "../@common/search/antdSearch";
import ProfileAvater from "../@common/ProfileAvater";
import NavBar from "./Navbar";
import { FaPen } from "react-icons/fa";

const Header = () => {
  const pathname = usePathname(); // ✅ get current route
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const [scroll, setScroll] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const toggle = (i: any) => {
    setSelected(selected === i ? null : i);
  };

  // Define the routes where the header should be hidden
  const hideHeaderRoutes = ["/users/login"];

  // Check if the current pathname matches any of the hideHeaderRoutes
  const hideHeader = hideHeaderRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the current route should hide the header, return null (nothing will be rendered)
  if (hideHeader) return null;

  return (
    <header
      className={`backdrop-blur-md bg-header sticky top-0 z-[1000] flex justify-center ${scroll ? "header" : ""}`}
    >
      <div className="">
        <div className="flex justify-between items-center px-4 py-4 lg:py-0 min-w-[1460px] m-auto">
          <div onClick={() => setOpen(true)} className="block lg:hidden">
            <BiMenuAltLeft className="text-2xl" />
          </div>
          <div>
            <Link href="/">
              <Image
                src={"/logo/moto.png"}
                width={450}
                height={50}
                alt="logo"
                priority
                className="lg:h-[40px] lg:w-[120px] w-[120px] mt-1"
              />
            </Link>
          </div>
          <NavBar />
          <div className="flex items-center justify-center gap-2 lg:gap-4 rounded">
            <div className="flex items-center gap-3 justify-center">
              <ProfileAvater />
              <ThemeToggleButton />
              {pathname === "/add-review" ? (
                <button className="text-[12px] mb-0 bg-white dark:bg-black text-black px-3 py-1.5 dark:text-white font-medium rounded-lg shadow-xl relative overflow-hidden min-w-[150px] ">
                  <span
                    className="fade-text inline-block overflow-hidden whitespace-nowrap translate-y-[2px]"
                    style={{ maxWidth: "100%" }}
                  >
                    {"Happy To See You Writing"}
                  </span>

                  <style jsx>{`
                    @keyframes fadeInOut {
                      0% {
                        opacity: 0;
                      }
                      50% {
                        opacity: 1;
                      }
                      100% {
                        opacity: 0;
                      }
                    }

                    .fade-text {
                      animation: fadeInOut 4s ease-in-out infinite;
                    }
                  `}</style>
                </button>
              ) : (
                <Link href={"/add-review"}>
                  <button className="px-3 py-[5px] bg-black text-white hover:text-black hover:border-black rounded hover:bg-white focus:outline-none flex justify-center items-center gap-2 transition-all text-sm dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:hover:border-white border-[1px] ">
                    <FaPen /> Write a Review
                  </button>
                </Link>
              )}

              <SearchAnt />
            </div>
          </div>
        </div>
        <div className="flex lg:hidden mb-[20px] justify-center w-full items-center">
          <SearchAnt />
        </div>
      </div>
    </header>
  );
};

export default Header;
