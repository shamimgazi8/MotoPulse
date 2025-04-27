"use client";
import { useEffect, useState } from "react";
import Marquee from "../@common/marquee";
import Hero from "./@components/Hero";
import LatestShots from "./@components/latestShots";
import LatestBikes from "./@components/latest-motorcycle";
import PopulerBike from "./@components/populerBikes";
import CreationPurpose from "./@components/purpose";
import Uniqueness from "./@components/uniqueness/Uniqueness";
import ScrollToTopButton from "./@components/ScrollTopTobutton";

const HomePage = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:4000/reviews");
        const data = await response.json();
        if (data.result) {
          setReviews(data.result); // Set the response data to state
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <CreationPurpose />
      <Marquee text="Igniting Your Passion for the Road." />

      {reviews.length > 0 && <LatestBikes data={reviews} />}
      {reviews.length > 0 && <PopulerBike data={reviews} />}

      <Uniqueness />
      <LatestShots />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
