"use client";
import GroupContext from "antd/es/checkbox/GroupContext";
import { useRef } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
const sampleCards = Array(10)
  .fill(0)
  .map((_, i) => ({
    title: `Bike #${i + 1}`,
    description: "Cool bike in this collection.",
    imageUrl: "/misc/bg.jpg",
  }));

const CarouselMulti = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 1.2; // adjust scroll step
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-10 ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Bike Highlights
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {sampleCards.map((item, i) => (
            <div
              key={i}
              className="min-w-[250px] max-w-[250px] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex-shrink-0"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        <div className="space-x-2 mt-5 w-full flex justify-center items-center">
          <button
            onClick={() => scroll("left")}
            className="px-3 py-1  hover:bg-white hover:text-black rounded-full transition-all"
          >
            <GrPrevious />
          </button>
          <button
            onClick={() => scroll("right")}
            className="px-3 py-1  hover:bg-white hover:text-black  rounded-full transition-all"
          >
            {" "}
            <GrNext />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarouselMulti;
