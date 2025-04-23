"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

type Review = {
  id: number;
  like_count: number;
  review: string;
  coverPhoto: string;
  slug: string;
  User: {
    firstname: string;
    lastname: string;
    profile_url: string;
  };
  bike: {
    brand: {
      brandName: string;
    };
    model: {
      modelName: string;
    };
    type: {
      name: string;
    };
  };
};

const CarouselMulti = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:4000/reviews?sortby=popular");
        const data = await res.json();
        setReviews(data.result);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 1.3;
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
    <section className="w-full py-10">
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
          {reviews.map((item, i) => (
            <Link key={i} href={`/${item?.slug}`}>
              <div className="min-w-[310px] max-w-[250px] parallax-card p-6 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex gap-2 flex-col">
                <img
                  src={item.coverPhoto}
                  alt={`Bike ${i + 1}`}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                  {item.bike.brand.brandName} {item.bike.model.modelName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.review}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Type: {item.bike.type.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-x-2 mt-5 w-full flex justify-center items-center">
          <button
            onClick={() => scroll("left")}
            className="px-3 py-1 hover:bg-white hover:text-black rounded-full transition-all"
          >
            <GrPrevious />
          </button>
          <button
            onClick={() => scroll("right")}
            className="px-3 py-1 hover:bg-white hover:text-black rounded-full transition-all"
          >
            <GrNext />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CarouselMulti;
