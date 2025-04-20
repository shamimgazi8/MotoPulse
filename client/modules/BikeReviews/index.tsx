"use client";
import { useEffect, useRef, useState } from "react";
import BlogCard from "../@common/universelCard.tsx";
import ScrollToTopButton from "../home/@components/ScrollTopTobutton";
import LoadingDots from "../@common/loading/index";

const PAGE_SIZE = 5;

const BikeReviews = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/reviews?page=${page}&limit=${PAGE_SIZE}`
        );
        const data = await response.json();

        // Append new reviews
        setItems((prevItems) => {
          const newItems = [...prevItems, ...data?.result];
          // Set hasMore based on the new total length
          setHasMore(newItems.length < data.count);
          return newItems;
        });
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  console.log(items, "items");
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
      <ScrollToTopButton />
      {items.map((item: any, key: any) => (
        <BlogCard
          key={key}
          data={{
            id: item?.id,
            name: `${item?.User?.firstname} ${item?.User?.lastname}`,
            profilePicture: item?.User?.profile_url,
            excerpt: item?.review,
            coverPhoto: item?.coverPhoto,
            highlight: item?.bike?.type?.name,
            bikeDetails: item?.bike,
            like: item?.like_count,
            publishedAt: new Date(item?.createdAt).toLocaleDateString(),
          }}
          link={`/bike-reviews/${item?.id}`}
          classes={{
            body: " flex flex-col gap-2 mt-5 ",
            root: "border border-gray-200 dark:border-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white dark:bg-neutral-900",
            imageWrapper: "rounded-md overflow-hidden h-[300px]",
            imageStyle: "object-cover w-full h-full rounded-md",
            name: "text-lg font-semibold leading-4  ",
            desc: "text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3",
            date: "text-xs text-gray-400",
            highlight:
              "text-xs font-medium uppercase tracking-wide text-primary",
          }}
        />
      ))}

      {!hasMore && items.length > 0 ? (
        <div className="col-span-full flex justify-center py-4 text-sm text-gray-500">
          No more data found
        </div>
      ) : (
        hasMore && (
          <div
            ref={loaderRef}
            className="col-span-full flex justify-center py-4 text-sm text-gray-500"
          >
            <LoadingDots center color="bg-black" />
          </div>
        )
      )}
    </div>
  );
};

export default BikeReviews;
