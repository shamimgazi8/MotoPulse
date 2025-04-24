"use client";
import { Review } from "@/types/review"; // <- import the type
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "../../utils/utils";
import PaginatedList from "../@common/pagination";
import Bredcrumb from "../@common/Bredcrumb";
import { useState, useEffect } from "react";
import CarouselMulti from "../@common/multiCarousle";
import Link from "next/link";
import ApiService from "@/service/apiService";
import Image from "next/image";
const BikeCategoryList = () => {
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

  const [dataArray, setDataArray] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (bikeCategories === "brands") {
          response = await ApiService.getReviewBybyBrand(decodedSlug1);
        } else if (bikeCategories === "type") {
          response = await ApiService.getReviewBybyType(decodedSlug1);
        }
        setDataArray(response?.result || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bikeCategories, bikeTypes, decodedSlug1]);

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

  return (
    <section>
      <div
        id="parallaxHero"
        className="relative parallaxHero flex items-center flex-col justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/misc/dt1.webp')",
          backgroundSize: "cover",
          backgroundAttachment: "sticky",
          backgroundPosition: "center right",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <h1 className="text-white text-4xl font-bold z-10 my-[70px] style">
          Explore Bikes
        </h1>
        <div className="container mx-auto z-10">
          <div className="my-5">
            <Bredcrumb items={bredcums} />
          </div>

          <div className="my-[30px]">
            <h2 className="text-3xl font-bold text-gray-900 gradient-text inline-block">
              All {capitalizeFirstLetter(decodedSlug1)} Reviews
            </h2>
          </div>

          <div className="mt-6">
            {dataArray?.length === 0 && (
              <div className=" text-red-300 text-lg font-semibold text-center">
                {`${decodedSlug1} is Not Found! Please try again later...`}
              </div>
            )}
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
                    <Link href={`/${item.slug}`} key={i}>
                      <div
                        data-aos="fade-up"
                        data-aos-anchor-placement="top-bottom"
                        className="p-6 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 h-[480px] flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                            <Image
                              height={100}
                              width={100}
                              src={item.coverPhoto}
                              alt="Review Cover"
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 poiret-one-regular">
                            {item.bike.brand.brandName}{" "}
                            {item.bike.model.modelName}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 underline underline-offset-4">
                            {item.bike.type.name} Bike
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 h-[60px]">
                            {item.review}
                          </p>
                        </div>
                        <div className=" flex flex-col gap-1">
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={item.User.profile_url}
                              alt={`${item.User.firstname}'s profile`}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className=" text-[10px]">Posted By :</p>
                              <p className="text-sm text-gray-900 dark:text-white font-medium">
                                {item.User.firstname} {item.User.lastname}
                              </p>
                            </div>
                          </div>
                          <button className="bg-[#1b1b1bc9] text-[12px] py-2  hover:bg-white hover:text-black transition-all px-2">
                            View Review
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>

          <div className="my-5 w-full flex justify-center items-end">
            {dataArray?.length > 6 && <PaginatedList />}
          </div>
          <CarouselMulti />
        </div>
      </div>
    </section>
  );
};

export default BikeCategoryList;
