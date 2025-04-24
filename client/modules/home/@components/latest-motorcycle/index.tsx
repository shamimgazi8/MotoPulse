"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    name: "Yamaha YZF-R3",
    slug: "yamaha-yzf-r3-001",
    description: "A lightweight supersport bike built for speed and agility.",
    price: 5500,
    imageUrl:
      "https://global-fs.webike-cdn.net/uiu/mybike/202402/03_124141_65be276f42abb.jpg",
    specs: {
      engine: "321cc parallel twin",
      horsepower: "42 HP",
      topSpeed: "180 km/h",
      weight: "169 kg",
    },
    type: "Sport",
  },
  {
    id: 2,
    name: "Kawasaki Z650",
    slug: "kawasaki-z650-002",
    description: "A powerful and versatile naked bike, perfect for city rides.",
    price: 7600,
    imageUrl:
      "https://bikesguide.bikroy.com/wp-content/uploads/2023/11/kawasaki-z650-abs-feature.jpg",
    specs: {
      engine: "649cc parallel twin",
      horsepower: "67 HP",
      topSpeed: "200 km/h",
      weight: "187 kg",
    },
    type: "Naked",
  },
  {
    id: 3,
    name: "Royal Enfield Classic 350",
    slug: "royal-enfield-classic-350-003",
    description:
      "A retro-styled bike known for its comfort and timeless design.",
    price: 4500,
    imageUrl:
      "https://www.financialexpress.com/wp-content/uploads/2024/08/Royal-Enfield-Classic-350-3.jpg",
    specs: {
      engine: "349cc single-cylinder",
      horsepower: "20 HP",
      topSpeed: "120 km/h",
      weight: "195 kg",
    },
    type: "Cruiser",
  },
  {
    id: 4,
    name: "Honda CB500X",
    slug: "honda-cb500x-004",
    description:
      "A mid-range adventure bike built for comfort and long-distance rides.",
    price: 7200,
    imageUrl:
      "https://www.pautravelmoto.com/wp-content/uploads/2023/01/Honda-CB500X-viaje-por-Alpes-Suizos.jpg",
    specs: {
      engine: "471cc parallel twin",
      horsepower: "47 HP",
      topSpeed: "185 km/h",
      weight: "197 kg",
    },
    type: "Adventure",
  },
  {
    id: 5,
    name: "Ducati Scrambler Icon",
    slug: "ducati-scrambler-icon-005",
    description:
      "A stylish scrambler with iconic design and impressive performance.",
    price: 9200,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaRc3LjHwFlb1BuES8VTT3m-7uIwjE4v_XWg&s",
    specs: {
      engine: "803cc L-Twin",
      horsepower: "73 HP",
      topSpeed: "200 km/h",
      weight: "189 kg",
    },
    type: "Scrambler",
  },
  {
    id: 6,
    name: "Honda CB500X",
    slug: "honda-cb500x-004",
    description:
      "A mid-range adventure bike built for comfort and long-distance rides.",
    price: 7200,
    imageUrl:
      "https://www.pautravelmoto.com/wp-content/uploads/2023/01/Honda-CB500X-viaje-por-Alpes-Suizos.jpg",
    specs: {
      engine: "471cc parallel twin",
      horsepower: "47 HP",
      topSpeed: "185 km/h",
      weight: "197 kg",
    },
    type: "Adventure",
  },
  {
    id: 7,
    name: "Yamaha YZF-R3",
    slug: "yamaha-yzf-r3-001",
    description: "A lightweight supersport bike built for speed and agility.",
    price: 5500,
    imageUrl:
      "https://global-fs.webike-cdn.net/uiu/mybike/202402/03_124141_65be276f42abb.jpg",
    specs: {
      engine: "321cc parallel twin",
      horsepower: "42 HP",
      topSpeed: "180 km/h",
      weight: "169 kg",
    },
    type: "Sport",
  },
  {
    id: 8,
    name: "Kawasaki Z650",
    slug: "kawasaki-z650-002",
    description: "A powerful and versatile naked bike, perfect for city rides.",
    price: 7600,
    imageUrl:
      "https://bikesguide.bikroy.com/wp-content/uploads/2023/11/kawasaki-z650-abs-feature.jpg",
    specs: {
      engine: "649cc parallel twin",
      horsepower: "67 HP",
      topSpeed: "200 km/h",
      weight: "187 kg",
    },
    type: "Naked",
  },
];

const LatestBikes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <section data-aos="fade-bottom" className=" lg:px-0 px-5 py-15 mt-[20px]">
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
            : data.map((item, i) => (
                <Link key={i} href={`/${item?.slug}`}>
                  <div data-aos="zoom-out">
                    <div className="parallax-card p-6 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 ">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4 relative overflow-hidden">
                        <Image
                          width={400}
                          height={300}
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {item.description}
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
