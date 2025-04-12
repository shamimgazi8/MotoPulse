import Image from "next/image";
import React from "react";

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
];

const LatestBikes = () => {
  return (
    <section data-aos="fade-bottom" className=" lg:px-0 px-5 py-15 mt-[20px]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Motorcycles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((product: any, i: any) => {
            const animation = i % 2;
            return (
              <div
                data-aos={`${animation === 0 ? "fade-right" : "fade-left"}`}
                key={product.id}
                className=" shadow-3xl rounded-lg overflow-hidden border-[1px]"
              >
                <Image
                  height={400}
                  width={300}
                  src={`${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 dark:text-white mb-4">
                    {product.description}
                  </p>

                  <button className="btn-secondary mt-5">View Details</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestBikes;
