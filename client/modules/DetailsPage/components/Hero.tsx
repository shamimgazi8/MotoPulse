"use client";

import { useEffect, useState } from "react";

export default function DetailsPage() {
  const [offsetY, setOffsetY] = useState(0);

  const bike = {
    name: "Yamaha R1",
    type: "Superbike",
    year: 2024,
    imageUrl:
      "https://www.bikesrepublic.com/wp-content/uploads/2024/09/2025-Yamaha-YZF-R1-1024x682.webp",
    description:
      "The Yamaha R1 delivers cutting-edge technology and a refined performance for true track enthusiasts.",
    specs: [
      { label: "Engine", value: "998cc" },
      { label: "Power", value: "200 HP" },
      { label: "Weight", value: "199 kg" },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black text-gray-900 dark:text-white">
      {/* Parallax Hero */}
      <div className="relative h-[80vh] overflow-hidden">
        <img
          src={bike.imageUrl}
          alt={bike.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${offsetY * -0.2}px)` }}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col text-center">
          <h1 className="text-4xl md:text-6xl font-bold">{bike.name}</h1>
          <p className="text-xl mt-2">
            {bike.year} • {bike.type}
          </p>
        </div>
      </div>

      {/* Content Section with scroll motion */}
      <section
        className="relative z-10 mx-auto px-4 pt-16 pb-5"
        style={{
          backgroundImage: `url("/misc/bg.jpg")`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: `center ${offsetY * 0.05}px`, // move with scroll
          backgroundRepeat: "no-repeat",
          transition: "background-position 0.2s ease-out",
        }}
      >
        <div className="bg-white/90 dark:bg-black/80 rounded-xl p-6 max-w-5xl m-auto">
          <h2 className="text-3xl font-semibold mb-4">About the Bike</h2>
          <p className="text-lg text-[#001f1a] dark:text-gray-300 mb-10">
            {bike.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {bike.specs.map((spec, idx) => (
              <div
                key={idx}
                className="bg-gray-100 dark:bg-[#171717] rounded-xl p-6 shadow-md text-center"
              >
                <h4 className="text-xl font-medium">{spec.label}</h4>
                <p className="text-lg mt-1">{spec.value}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">User Reviews</h3>

            <div className="space-y-6">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-gray-50 dark:bg-[#171717] rounded-2xl shadow-md p-6 border dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={`https://i.pravatar.cc/150?img=${id + 10}`}
                        alt="User avatar"
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold">John Doe {id}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>

                      <p className="mt-2 text-gray-700 dark:text-gray-300">
                        Absolutely love this bike! The handling is smooth and
                        the acceleration is wild. A must-ride for any superbike
                        fan.
                      </p>

                      <div className="mt-4 flex items-center gap-4">
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          Like (12)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <button className="backdrop-blur-md py-2 px-2 border-[1px] bg-[#3190e92a] text-[10px] rounded hover:bg-white hover:text-black transition-all">
              See More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
