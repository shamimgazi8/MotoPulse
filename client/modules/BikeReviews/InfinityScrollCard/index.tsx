"use client";
import LoadingDots from "@/modules/@common/loading";
import BlogCard from "@/modules/@common/universelCard.tsx";
import ScrollToTopButton from "@/modules/home/@components/ScrollTopTobutton";
import { useEffect, useRef } from "react";

const InfinityScrollCard = ({
  items,
  hasMore,
  loadMore,
}: {
  items: any[];
  hasMore: boolean;
  loadMore: () => void;
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore(); // Call parent's loadMore only if more data is available
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, loadMore]);

  return (
    <div className="p-4 w-full max-w-2xl mx-auto flex flex-col gap-5">
      <ScrollToTopButton />
      {items.map((item: any) => (
        <BlogCard
          key={item.id}
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
            body: "flex flex-col gap-2 mt-5",
            root: "border border-gray-200 dark:border-white/10 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white dark:bg-neutral-900",
            imageWrapper: "rounded-md overflow-hidden h-[300px]",
            imageStyle: "object-cover w-full h-full rounded-md",
            name: "text-lg font-semibold leading-4",
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
        <div
          ref={loaderRef}
          className="col-span-full flex justify-center py-4 text-sm text-gray-500"
        >
          <LoadingDots center color="bg-black" />
        </div>
      )}
    </div>
  );
};

export default InfinityScrollCard;
