"use client";

import ApiService from "@/service/apiService";
import { Statistic } from "antd";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { fetchWikiSummary } from "@/utils/wiki";

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
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const [description, setDescription] = useState<string>("");

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
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (bike?.bike?.id) {
        try {
          const response = await ApiService.getReviewByBikeId(bike.bike.id);
          setReviews(response);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        }
      }
    };

    fetchReviews();
  }, [bike?.bike?.id]);

  // Handle case where bike might be undefined
  if (!bike) {
    return <div>Loading...</div>; // Or handle in any other way
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
        {/* <div className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            {bike?.bike?.brand?.brandName} {bike?.bike?.model?.modelName}
          </h1>
          <p className="text-xl mt-2">
            {bike.year || 2025} • {bike?.bike?.type?.name}
          </p>
        </div> */}

        <div className="content inset-0 bg-black/60 flex items-center justify-center flex-col text-center min-h-full">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold">
              {bike?.bike?.brand?.brandName} {bike?.bike?.model?.modelName}
            </h2>
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
          <div className=" bg-white/5 p-4 rounded-lg">
            <div className=" flex gap-2 mb-4">
              <span className="  text-lg font-bold underline underline-offset-4  ">
                {" "}
                About the{" "}
              </span>
              <h2 className=" block text-2xl font-bold gradient-text">Brand</h2>
            </div>
            {description || "Loading description..."}
          </div>
          <div className="bg-white/5 p-4 rounded-lg mt-5">
            <div className=" flex gap-2 my-4">
              <span className="  text-lg font-bold underline underline-offset-4  ">
                {" "}
                About the{" "}
              </span>
              <h2 className=" block text-2xl font-bold gradient-text">Bike</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {/* Engine CC */}
              <div className="bg-white dark:bg-[#1f1f1f91] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Engine CC"
                  value={bike.bike?.engineCC}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>

              {/* HorsePower */}
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="HorsePower"
                  value={bike.bike?.horsePower}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>

              {/* Torque */}
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Torque"
                  value={bike.bike?.torque}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>

              {/* Weight */}
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Weight"
                  value={bike.bike?.weight}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              {/* brand */}
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Brand"
                  value={bike.bike?.brand?.brandName}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
              {/* type */}
              <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-2 shadow text-center">
                <Statistic
                  title="Type"
                  value={bike.bike?.type?.name}
                  valueStyle={{ fontSize: "1.5rem", color: "#1890ff" }}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Others Review</h3>
            {reviews
              .slice(0, showMoreReviews ? reviews.length : 3)
              .map((item, key) => (
                <ReviewCard
                  name={`${item.User.firstname} ${item.User.lastname}`}
                  avatarUrl={item.User.profile_url}
                  review={item?.review}
                  create={item.createdAt}
                />
                // <div key={key} className="space-y-6 mb-5">
                //   <div className="bg-gray-50 dark:bg-[#171717] rounded-2xl shadow-md p-6 border dark:border-gray-700">
                //     <div className="flex items-start gap-4">
                //       <div className="flex-shrink-0">
                //         <img
                //           src={item.User.profile_url}
                //           alt="User avatar"
                //           className="w-14 h-14 rounded-full object-cover"
                //         />
                //       </div>
                //       <div className="flex-1">
                //         <div className="flex justify-between items-center">
                //           <h4 className="text-lg font-semibold">
                //             {item.User.firstname} {item.User.lastname}
                //           </h4>
                //           <span className="text-sm text-gray-500 dark:text-gray-400">
                //             {new Date(item.createdAt).toLocaleDateString()}
                //           </span>
                //         </div>
                //         <ReviewText review={item.review} />
                //         <div className="mt-4 flex items-center gap-4">
                //           <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                //             Like ({item.like_count || 0})
                //           </button>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              ))}
          </div>

          <div className="flex justify-center items-center mt-5">
            {reviews.length > 3 && (
              <button
                className="backdrop-blur-md py-2 px-2 border-[1px] bg-[#3190e92a] text-[10px] rounded hover:bg-white hover:text-black transition-all"
                onClick={() => setShowMoreReviews(!showMoreReviews)}
              >
                {showMoreReviews ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
