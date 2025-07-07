"use client";

import { useEffect, useState } from "react";
import { Statistic } from "antd";
import { useGetReviewByBikeIdQuery } from "@/service/api";
import { fetchWikiSummary } from "@/utils/wiki";
import ReviewCard from "./ReviewCard";

interface Review {
  id: number;
  review: string;
  like_count: number;
  createdAt: string;
  User: {
    firstname: string;
    lastname: string;
    profile_url: string;
  };
}

interface Bike {
  name: string;
  type: string;
  year: number;
  imageUrl: string;
  profile_url: string;
  createdAt: any;
  like_count: any;
  description: string;
  specs: { label: string; value: string }[];
  coverPhoto: string;
  review: string;
  slug: string;
  User: {
    firstname: string;
    lastname: string;
    profile_url: string;
  };
  bike: {
    id: number;
    engineCC: number;
    horsePower: number;
    torque: number;
    weight: number;
    brand: {
      id: number;
      brandName: string;
    };
    model: {
      id: number;
      modelName: string;
    };
    type: {
      id: number;
      name: string;
    };
  };
}

interface DetailsPageProps {
  bike?: Bike;
}

export default function DetailsPage({ bike }: DetailsPageProps) {
  const [offsetY, setOffsetY] = useState(0);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [description, setDescription] = useState<string>("");

  // Get reviews using RTK Query
  const {
    data: reviewData,
    isLoading: reviewLoading,
    isError: reviewError,
  } = useGetReviewByBikeIdQuery(bike?.bike?.id!, {
    skip: !bike?.bike?.id,
  });

  const reviews: Review[] = reviewData ?? [];

  useEffect(() => {
    const getDescription = async () => {
      if (bike?.bike?.brand?.brandName && bike?.bike?.model?.modelName) {
        const desc = await fetchWikiSummary(
          bike.bike.brand.brandName,
          bike.bike.model.modelName
        );
        setDescription(desc);
      }
    };
    getDescription();
  }, [bike]);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!bike) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-gray-900 dark:text-white">
      {/* Parallax Hero */}
      <div className="relative h-[80vh] overflow-hidden">
        <img
          src={bike.coverPhoto}
          alt={bike.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${offsetY * -0.2}px)` }}
        />

        <div className="content inset-0 bg-black/60 flex items-center justify-center flex-col text-center min-h-full">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold">
              {bike?.bike?.brand?.brandName} {bike?.bike?.model?.modelName}
            </h2>
          </div>
          <p className="text-2xl mt-2">
            {bike.year || 2025} • {bike?.bike?.type?.name}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <section
        className="relative z-10 mx-auto px-4 pt-16 pb-5"
        style={{
          backgroundImage: `url("/misc/bg.jpg")`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: `center ${offsetY * 0.05}px`,
          backgroundRepeat: "no-repeat",
          transition: "background-position 0.2s ease-out",
        }}
      >
        <div className="backdrop-blur-md bg-black/40 rounded-xl p-6 max-w-5xl m-auto border border-white/20 dark:border-white/10">
          {/* Brand Description */}
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="flex gap-2 mb-4">
              <span className="text-lg font-bold underline underline-offset-4">
                About the
              </span>
              <h2 className="block text-2xl font-bold gradient-text">Brand</h2>
            </div>
            {description || "Loading description..."}
          </div>

          {/* Bike Specs */}
          <div className="bg-white/5 p-4 rounded-lg mt-5">
            <div className="flex gap-2 my-4">
              <span className="text-lg font-bold underline underline-offset-4">
                About the
              </span>
              <h2 className="block text-2xl font-bold gradient-text">Bike</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-[#1f1f1f91] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Engine CC"
                  value={bike.bike.engineCC}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="HorsePower"
                  value={bike.bike.horsePower}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Torque"
                  value={bike.bike.torque}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Weight"
                  value={bike.bike.weight}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Brand"
                  value={bike.bike.brand.brandName}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Type"
                  value={bike.bike.type.name}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-2xl font-semibold my-6">Others Review</h3>
            {reviewLoading ? (
              <p className="text-center text-gray-400">Loading reviews...</p>
            ) : reviewError ? (
              <p className="text-center text-red-400">
                Failed to load reviews.
              </p>
            ) : reviews.length === 0 ? (
              <p className="text-center text-gray-400">No reviews found.</p>
            ) : (
              reviews
                .slice(0, showMoreReviews ? reviews.length : 3)
                .map((item) => (
                  <ReviewCard
                    key={item.id}
                    name={`${item.User.firstname} ${item.User.lastname}`}
                    avatarUrl={item.User.profile_url}
                    review={item.review}
                    create={item.createdAt}
                  />
                ))
            )}
          </div>

          {!reviewLoading && !reviewError && reviews.length > 3 && (
            <div className="flex justify-center items-center mt-5">
              <button
                className="backdrop-blur-md py-2 px-2 border-[1px] bg-[#3190e92a] text-[10px] rounded hover:bg-white hover:text-black transition-all"
                onClick={() => setShowMoreReviews(!showMoreReviews)}
              >
                {showMoreReviews ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
