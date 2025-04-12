"use client";
import { useEffect, useRef, useState } from "react";
import BlogCard from "../@common/universelCard.tsx";
import Link from "next/link.js";

const PAGE_SIZE = 5;

const generateData = () => {
  const bikes = [];
  const types = ["Sport", "Cruiser", "Adventure", "Naked", "Touring"];
  for (let i = 1; i <= 100; i++) {
    const type = types[i % types.length];
    bikes.push({
      id: i,
      name: `Bike Model ${i}`,
      slug: `bike-model-${i}`,
      description: `A description for Bike Model ${i}, a great ${type} motorcycle.`,
      price: 5000 + i * 50,
      imageUrl: `https://cdni.iconscout.com/illustration/premium/thumb/motorcycle-illustration-download-in-svg-png-gif-file-formats--vehicle-bike-transport-motorbike-pack-illustrations-8372440.png?f=webp`,
      specs: {
        engine: `${300 + i}cc ${type === "Cruiser" ? "V-Twin" : "inline-four"}`,
        horsepower: `${50 + i * 2} HP`,
        topSpeed: `${180 + i} km/h`,
        weight: `${170 + i} kg`,
      },
      type,
      publishedAt: `2024-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}`,
    });
  }
  return bikes;
};

const data = generateData();

const BikeReviews = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(data.slice(0, PAGE_SIZE));
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    setItems(data.slice(0, page * PAGE_SIZE));
    setHasMore(page * PAGE_SIZE < data.length);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader && hasMore) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore]);

  return (
    <div className="grid gap-6 grid-cols-1 p-4 w-full max-w-2xl mx-auto">
      {items.map((item) => (
        <BlogCard
          key={item.id}
          data={{
            ...item,
            highlight: item.type,
            excerpt: item.description,
          }}
          link={`/bike-reviews/${item.id}`}
          classes={{
            root: "border border-gray-200 dark:border-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white dark:bg-neutral-900",
            imageWrapper: "rounded-md overflow-hidden h-[300px]",
            imageStyle: "object-cover w-full h-full rounded-md",
            name: "text-lg font-semibold leading-snug mb-2",
            desc: "text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3",
            date: "text-xs text-gray-400",
            highlight:
              "text-xs font-medium uppercase tracking-wide text-primary",
          }}
        />
      ))}

      {!hasMore && items.length === data.length ? (
        <div className="col-span-full flex justify-center py-4 text-sm text-gray-500">
          No more data found.
        </div>
      ) : (
        hasMore && (
          <div
            ref={loaderRef}
            className="col-span-full flex justify-center py-4 text-sm text-gray-500"
          >
            Loading more...
          </div>
        )
      )}
    </div>
  );
};

export default BikeReviews;
