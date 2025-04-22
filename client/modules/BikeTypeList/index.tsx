"use client";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "../../utils/utils";
import PaginatedList from "../@common/pagination";
import Bredcrumb from "../@common/Bredcrumb";
import Filters from "../@common/Filters";
import { useState, useEffect } from "react";
import bikeData from "../../data/bikeType.json";
import CarouselMulti from "../@common/multiCarousle";

const BikeCategoryList = () => {
  useEffect(() => {
    const hero = document.getElementById("parallaxHero");
    let latestScrollY = 0;
    let ticking = false;

    const updateParallax = () => {
      if (hero) {
        hero.style.backgroundPositionY = `${latestScrollY * 0.5}px`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const bikeCategories = pathSegments[0];
  const bikeTypes = pathSegments[1];

  const decodedSlug = capitalizeFirstLetter(bikeCategories);
  const decodedSlug1 = capitalizeFirstLetter(bikeTypes);

  const bredcums = [
    { title: "Home", link: "/" },
    { title: decodedSlug, link: `/${bikeCategories}` },
    { title: decodedSlug1, link: `/${bikeCategories}/${bikeTypes}` },
  ];

  const dataArray = bikeData?.data || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <section>
      {/* Parallax Hero Background */}
      <div
        id="parallaxHero"
        className="relative  flex items-center flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/misc/dt1.jpg')",
          backgroundSize: "cover",
          backgroundAttachment: "sticky", // important: allow JS to control scroll
          backgroundPosition: "center right",
        }}
      >
        <h1 className="text-white text-4xl font-bold z-10 my-[70px]  style">
          Explore Bikes
        </h1>
        <div className="container mx-auto">
          <div className="my-5">
            <Bredcrumb items={bredcums} />
          </div>

          <div className="my-[30px]">
            <h2 className="text-3xl font-bold text-gray-900    gradient-text inline-block">
              All {capitalizeFirstLetter(decodedSlug1)} Collections
            </h2>
          </div>
          <Filters />
          <div className="mt-6">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="p-4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse shadow-lg"
                      >
                        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                      </div>
                    ))
                : dataArray.map((item, i) => (
                    <div
                      key={i}
                      className="parallax-card p-6   backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                    >
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 "
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 poiret-one-regular">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {item.description}
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                        View Details
                      </button>
                    </div>
                  ))}
            </div>
          </div>
          <div className="my-5 w-full flex justify-center items-end">
            <PaginatedList />
          </div>
          <CarouselMulti />
        </div>
      </div>
    </section>
  );
};

export default BikeCategoryList;
