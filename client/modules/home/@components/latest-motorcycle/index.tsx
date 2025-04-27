"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LatestBikes = ({ data }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <section data-aos="fade-bottom" className="lg:px-0 px-5 py-15 mt-[20px]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Motorcycles
        </h2>
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
            : data.slice(0, 8).map((item: any, i: any) => (
                <Link key={i} href={`/${item.slug || item.bike?.slug}`}>
                  <div data-aos="zoom-out">
                    <div className="parallax-card p-6 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                        <Image
                          width={400}
                          height={300}
                          src={item.coverPhoto || item.bike?.imgUrl || ""}
                          alt={item.bike?.brand?.brandName}
                          className="w-full h-full object-cover transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.bike?.brand?.brandName}{" "}
                        {item.bike?.model?.modelName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {item.review || item.bike?.description}
                      </p>
                      <button className="btn-outline text-[12px] hover:bg-white hover:text-black py-1 px-2">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBikes;
