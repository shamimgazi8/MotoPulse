"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import navData from "@/data/nav-data.json";

const NavBar = () => {
  const pathname = usePathname();

  const isActive = (link: string) => {
    return pathname === link || pathname.startsWith(link + "/");
  };

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center backdrop-blur-md">
        {navData?.map((NavItem, i) => {
          const topLevelActive = isActive(NavItem?.link);

          return (
            <li key={i} className="group/item-1 relative backdrop-blur-md">
              <Link
                href={NavItem?.link}
                className="flex items-center gap-1 p-6 hover:!text-gradient font-normal backdrop-blur-md"
              >
                {NavItem?.title}
                {NavItem.children && <FiChevronDown className="mt-[2px]" />}
              </Link>

              {/* Dropdown menu */}
              {NavItem?.children && (
                <ul className="min-w-[260px] absolute bg-white/90 backdrop-blur-md py-2 pl-4 pr-0 rounded-md shadow-lg opacity-0 invisible top-[100%] left-0 group-hover/item-1:visible group-hover/item-1:opacity-100">
                  {NavItem?.children?.map((NavItemChild: any, i: any) => {
                    const childActive = isActive(NavItemChild?.link);

                    return (
                      <li
                        key={i}
                        className="overflow-hidden group/item-2 w-full"
                      >
                        <Link
                          href={NavItemChild?.link}
                          className={`group/test grid grid-cols-[auto_1fr_auto] p-2 items-center gap-2 transition translate-x-[-30px] hover:translate-x-0
                            ${childActive ? "text-primary font-semibold" : "text-black font-semibold hover:text-gradient"}
                          `}
                        >
                          <span className="block shrink-0 w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                          <span className="group-hover/item-2:text-gradient">
                            {NavItemChild.title}
                          </span>
                          {NavItemChild?.children && (
                            <span className="flex w-[10px] h-[10px] bg-gradient-to-r from-primary to-secondary">
                              <FaLongArrowAltRight />
                            </span>
                          )}
                        </Link>

                        {NavItem?.children?.length - 1 !== i && (
                          <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
                        )}

                        {/* 3rd level dropdown */}
                        {NavItemChild?.children && (
                          <ul className="min-w-[300px] absolute bg-white/90 backdrop-blur-md p-4 pr-0 rounded-md shadow-lg opacity-0 invisible top-0 left-[100%] group-hover/item-2:visible group-hover/item-2:opacity-100">
                            {NavItemChild?.children?.map(
                              (NavItemChildOfChild: any, i: any) => {
                                const isChildOfChildActive = isActive(
                                  NavItemChildOfChild?.link
                                );

                                return (
                                  <li
                                    key={i}
                                    className="overflow-hidden group/item-3"
                                  >
                                    <Link
                                      href={NavItemChildOfChild?.link}
                                      className={`flex p-2 items-center gap-2 transition translate-x-[-30px] hover:translate-x-0
                                        ${isChildOfChildActive ? "text-primary font-medium" : "text-black font-normal hover:text-inherit"}
                                      `}
                                    >
                                      <span className="block shrink-0 w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                                      <span className="group-hover/item-3:text-gradient">
                                        {NavItemChildOfChild.title}
                                      </span>
                                    </Link>

                                    {NavItemChild?.children?.length - 1 !==
                                      i && (
                                      <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
                                    )}

                                    {/* 4th level dropdown */}
                                    {NavItemChildOfChild?.children && (
                                      <ul className="min-w-[200px] absolute bg-white/90 backdrop-blur-md p-4 pr-0 rounded-md shadow-lg opacity-0 invisible top-0 left-[100%] group-hover/item-3:visible group-hover/item-3:opacity-100">
                                        {NavItemChildOfChild?.children?.map(
                                          (item4: any, i: any) => {
                                            const isItem4Active = isActive(
                                              item4?.link
                                            );
                                            return (
                                              <li
                                                key={i}
                                                className="overflow-hidden"
                                              >
                                                <Link
                                                  href={item4?.link}
                                                  className={`flex p-2 items-center gap-2 transition translate-x-[-30px] hover:translate-x-0
                                                  ${isItem4Active ? "text-primary font-medium" : "text-black font-normal hover:text-inherit"}
                                                `}
                                                >
                                                  <span className="block w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                                                  <span className="group-hover/item-3:text-gradient">
                                                    {item4.title}
                                                  </span>
                                                </Link>
                                                {NavItemChildOfChild?.children
                                                  ?.length -
                                                  1 !==
                                                  i && (
                                                  <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
                                                )}
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    )}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
