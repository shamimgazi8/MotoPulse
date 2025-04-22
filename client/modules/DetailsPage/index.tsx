"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BikeHero from "./components/Hero";
import { Spin } from "antd";

const DetailsPage = () => {
  const [bikeData, setBikeData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const { DetailsSlug } = params;
  console.log(DetailsSlug);
  useEffect(() => {
    if (DetailsSlug) {
      const fetchBikeDetails = async () => {
        try {
          // Fetch bike details using the slug
          const response = await fetch(
            `http://localhost:4000/reviews/${DetailsSlug}`
          );
          if (response.status === 404) {
            // Redirect to the 404 page
            window.location.href = "/not-found";
            return;
          }
          const data = await response.json();
          setBikeData(data);

          setLoading(false);
        } catch (err) {
          setError("Failed to fetch bike data.");
          setLoading(false);
        }
      };

      fetchBikeDetails();
    }
  }, [DetailsSlug]); // Re-fetch when slug changes

  if (loading)
    return (
      <div className=" flex justify-center items-center">
        <Spin />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-black text-gray-900 dark:text-white">
      {/* Parallax Hero */}
      <BikeHero bike={bikeData} />
    </div>
  );
};

export default DetailsPage;
