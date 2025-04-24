"use client";
import ApiService from "@/service/apiService";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const NavBar = () => {
  const pathname = usePathname();

  const [bikeTypes, setBikeTypes] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandRes, typeRes] = await Promise.all([
          ApiService.getBrands(),
          ApiService.getBikeTypes(),
        ]);

        // Process brands
        const brands = brandRes.map((brand: any) => ({
          title: brand.brandName,
          link: `/brands/${brand.brandName.toLowerCase().replace(/\s+/g, "-")}`,
        }));

        // Process bike types
        const types = typeRes.result.map((type: any) => ({
          title: type.name,
          link: `/type/${type.name.toLowerCase().replace(/\s+/g, "-")}`,
        }));

        setBrands(brands);
        setBikeTypes(types);
      } catch (err) {
        console.error("Error fetching nav data:", err);
      }
    };

    fetchData();
  }, []);

  const isActive = (link: string) =>
    pathname === link || pathname.startsWith(link + "/");

  const isParentActive = (parentLink: string, children: any[]) =>
    isActive(parentLink) || children?.some((child) => isActive(child?.link));

  const navData = [
    {
      title: "Bike Reviews",
      link: "/bike-reviews",
    },
    {
      title: "Types",
      link: "/type",
      children: bikeTypes,
    },
    {
      title: "Brands",
      link: "/brands",
      children: brands,
    },
  ];

  return (
    <nav className="hidden lg:flex justify-end items-end w-[40%]">
      <ul className="flex items-center justify-center backdrop-blur-md">
        {navData.map((NavItem, i) => {
          const topLevelActive = isParentActive(
            NavItem?.link,
            NavItem?.children || []
          );

          return (
            <li
              key={i}
              className="group/item-1 relative backdrop-blur-md underline-animation"
            >
              <Link
                href={NavItem?.link}
                className={`flex items-center gap-1 p-6 font-normal backdrop-blur-md ${
                  topLevelActive
                    ? "gradient-text font-semibold underline-animation"
                    : "hover:!text-gradient"
                }`}
              >
                {NavItem?.title}
                {NavItem.children && <FiChevronDown className="mt-[2px]" />}
              </Link>

              {/* Dropdown */}
              {NavItem?.children && (
                <ul className="min-w-[260px] absolute bg-[#111111] backdrop-blur-md text-white py-2 pl-4 pr-0 rounded-md shadow-lg opacity-0 invisible top-[100%] left-0 group-hover/item-1:visible group-hover/item-1:opacity-100">
                  {NavItem.children.map((child: any, j: number) => {
                    const childActive = isActive(child?.link);
                    return (
                      <li
                        key={j}
                        className="overflow-hidden group/item-2 w-full"
                      >
                        <Link
                          href={child?.link}
                          className={`group/test grid grid-cols-[auto_1fr_auto] p-2 items-center gap-2 transition translate-x-[-30px] hover:bg-white w-[230px] hover:text-black hover:translate-x-0
                            ${childActive ? "gradient-text font-semibold" : "text-white font-semibold hover:text-gradient"}
                          `}
                        >
                          <span className="block shrink-0 w-[15px] h-[10px] bg-gradient-to-r from-primary to-secondary"></span>
                          <span className="group-hover/item-2:text-gradient">
                            {child.title}
                          </span>
                          {child?.children && (
                            <span className="flex w-[10px] h-[10px] bg-gradient-to-r from-primary to-secondary">
                              <FaLongArrowAltRight />
                            </span>
                          )}
                        </Link>
                        {NavItem?.children?.length - 1 !== j && (
                          <span className="block w-[calc(100%-16px)] h-[1px] bg-[#eee]"></span>
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
