"use client";
import { useParams } from "next/navigation";
import BikeHero from "./components/Hero";
import { Spin } from "antd";
import { useGetReviewBySlugQuery } from "@/service/reviewsApi";

const DetailsPage = () => {
  const params = useParams();
  const { DetailsSlug } = params;

  const {
    data: bikeData,
    isLoading,
    isError,
    error,
  } = useGetReviewBySlugQuery(DetailsSlug as string, {
    skip: !DetailsSlug,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spin />
      </div>
    );
  }

  if (isError) {
    if ((error as any)?.status === 404) {
      if (typeof window !== "undefined") {
        window.location.href = "/not-found";
      }
      return null;
    }

    return <div>Failed to load review details.</div>;
  }

  return (
    <div className="bg-black text-gray-900 dark:text-white">
      <BikeHero bike={bikeData} />
    </div>
  );
};

export default DetailsPage;
