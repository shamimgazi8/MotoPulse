"use client";
import Marquee from "../@common/marquee";
import Hero from "./@components/Hero";
import LatestShots from "./@components/latestShots";
import LatestBikes from "./@components/latest-motorcycle";
import PopulerBike from "./@components/populerBikes";
import CreationPurpose from "./@components/purpose";
import Uniqueness from "./@components/uniqueness/Uniqueness";
import ScrollToTopButton from "./@components/ScrollTopTobutton";
import { useGetAllReviewsQuery } from "@/service/reviewsApi";

const HomePage = () => {
  const { data: reviews = [], isLoading, isError } = useGetAllReviewsQuery();

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <CreationPurpose />
      <Marquee text="Igniting Your Passion for the Road." />

      {!isLoading && !isError && reviews.length > 0 && (
        <LatestBikes data={reviews} />
      )}
      {!isLoading && !isError && reviews.length > 0 && (
        <PopulerBike data={reviews} />
      )}

      <Uniqueness />
      <LatestShots />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
