"use client";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "../../utils/utils";
import PaginatedList from "../@common/pagination";
import Bredcrumb from "../@common/Bredcrumb";
import Filters from "../@common/Filters";
import { useState, useEffect } from "react";

// Importing the bikeTypes data
import bikeData from "../../data/bikeType.json";

const BikeTypeList = () => {
  const pathname = usePathname(); // Get the current pathname

  // Extracting bike-categories and bike-types dynamically from the URL path
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const bikeCategories = pathSegments[0]; // First segment
  const bikeTypes = pathSegments[1]; // Second segment

  const decodedSlug = capitalizeFirstLetter(bikeCategories);
  const decodedSlug1 = capitalizeFirstLetter(bikeTypes);

  const bredcums = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: decodedSlug,
      link: `/${bikeCategories}`,
    },
    {
      title: decodedSlug1,
      link: `/${bikeCategories}/${bikeTypes}`,
    },
  ];

  const dataArray = bikeData?.data || [];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <section className="dark:bg-black dark:text-white">
      <div className="container mx-auto">
        <div className="my-5">
          <Bredcrumb items={bredcums} />
        </div>
        <div className="my-[30px]">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All {capitalizeFirstLetter(decodedSlug1)} Collections
          </h1>
        </div>
        <Filters />
        <div className="mt-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading
              ? // Skeleton loader for the card
                Array(8)
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
              : // Displaying actual data
                dataArray.map((item, i) => (
                  <div
                    key={i}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                  >
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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
      </div>
    </section>
  );
};

export default BikeTypeList;
