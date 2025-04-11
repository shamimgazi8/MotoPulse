"use client";
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

const Header = () => {
  const [open, setOpen] = useState(false);

  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const [scroll, setScroll] = useState(false);
  const [selected, setSelected] = useState(null);
  // Scroll Efect

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const toggle = (i: any) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <>
      <header
        className={` backdrop-blur-md bg-header sticky top-0 z-[1000] flex justify-center ${scroll ? "header" : ""}`}
      >
        <div className="container">
          <div className=" grid grid-cols-[1fr_2fr_1fr] items-center  px-4 py-4 lg:py-0">
            <div onClick={() => setOpen(true)} className="block lg:hidden">
              <BiMenuAltLeft className="text-2xl" />
            </div>
            <div>
              <Link href="/">
                <Image
                  src={"/logo/moto.jpg"}
                  width={450}
                  height={50}
                  alt="logo"
                  className=" lg:h-[40px] lg:w-[120px] w-[120px] mt-1"
                />
              </Link>
            </div>
            <NavBar />
            <div className="flex items-center justify-end gap-2 lg:gap-4 rounded">
              <div className="flex items-center gap-3 justify-center">
                <div className="hidden lg:flex">
                  <SearchAnt />
                </div>
                <ProfileAvater />

                <ThemeToggleButton />
              </div>
            </div>
          </div>
          <div className="flex lg:hidden mb-[20px] justify-center w-full items-center">
            <SearchAnt />
          </div>
        </div>
      </header>

      <Drawer
        title="Menu"
        placement={placement}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="h-[100vh] overflow-auto">
          {/* body */}
          <div
            className="flex flex-col overflow-auto"
            style={{ height: "calc(100vh - 60px" }}
          >
            <div>
              <>
                {navData && navData?.length > 0 ? (
                  <div className="flex flex-col">
                    {navData?.map((item: any, i: any) => {
                      return (
                        <Fragment key={i}>
                          <div key={i} className="relative">
                            {item?.children && item?.children?.length > 0 ? (
                              <>
                                {item?.isHidden ? null : (
                                  <div
                                    onClick={() => toggle(i)}
                                    className="flex items-center justify-between w-full py-2 z-10 gap-1"
                                  >
                                    <span className="text-left">
                                      {item.title}
                                    </span>
                                    {item?.children && (
                                      <>
                                        {selected == i ? (
                                          <FiChevronUp className="shrink-0" />
                                        ) : (
                                          <FiChevronDown className="shrink-0" />
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <Link
                                  href={item?.link || "#"}
                                  onClick={() => setOpen(false)}
                                  className="flex items-center justify-between w-full py-2 z-10 gap-1"
                                >
                                  <span className="text-left">
                                    {item.title}
                                  </span>
                                </Link>
                              </>
                            )}

                            <div>
                              {selected == i && (
                                <ul>
                                  {item.children?.map((cldn: any, i: any) => {
                                    return (
                                      <li
                                        key={i}
                                        onClick={() => setOpen(false)}
                                      >
                                        <Link
                                          href={cldn?.link || "#"}
                                          className="flex p-2"
                                        >
                                          {cldn?.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                ) : null}
              </>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
