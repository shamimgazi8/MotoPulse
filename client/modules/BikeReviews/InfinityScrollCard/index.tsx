"use client";
import { useEffect, useRef } from "react";
import LoadingDots from "@/modules/@common/loading";
import BlogCard from "@/modules/@common/universelCard.tsx";
import ScrollToTopButton from "@/modules/home/@components/ScrollTopTobutton";
import SkeletonCard from "@/modules/@common/Skelton/SkeltonCard";
import Image from "next/image";
import Loading from "@/modules/@common/loading";

// InfinityScrollCard component
const InfinityScrollCard = ({
  items,
  hasMore,
  loadMore,
  loading,
}: {
  items: any[];
  hasMore: boolean;
  loadMore: () => void;
  loading: boolean;
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
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
    <div
      data-aos="fade-in"
      className="p-4 w-full max-w-2xl mx-auto flex flex-col gap-5"
    >
      <ScrollToTopButton />

      {/* Show skeletons when loading and no items yet */}
      {loading && items.length === 0
        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        : items.map((item: any) => (
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

      {/* No data found message with animation */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center ">
          <Image
            height={200}
            width={200}
            src="https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-illustration-download-in-svg-png-gif-file-formats--no-found-misplaced-files-privacy-secret-business-pack-illustrations-8062130.png" // Optional: replace with your own image or animated SVG
            alt="No bikes"
            className=" "
          />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No Bike Found!
          </p>
        </div>
      )}

      {/* Bottom loader or no more data message */}
      {!hasMore && items.length > 0 ? (
        <div className="col-span-full flex justify-center py-4 text-sm text-gray-500">
          No more data found
        </div>
      ) : (
        !loading && (
          <div
            ref={loaderRef}
            className="col-span-full flex justify-center py-4 text-sm text-gray-500"
          >
            <Loading />
          </div>
        )
      )}
    </div>
  );
};

export default InfinityScrollCard;
