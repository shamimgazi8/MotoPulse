// components/BikeTypeList.tsx
import React from "react";
import BikeTypeCard from "./components/bikeTypeCard";

interface BikeType {
  title: string;
  link: string;
  imageUrl: string;
  description: string; // Added description to the BikeType interface
}

const bikeTypes: BikeType[] = [
  {
    title: "Adventure Touring",
    link: "/types/adventure-touring",
    imageUrl: "/images/adventure-touring.jpg",
    description: "Built for long-distance travel on rugged terrains.", // Added description
  },
  {
    title: "Cruiser",
    link: "/types/cruiser",
    imageUrl: "/images/cruiser.jpg",
    description: "Classic bikes designed for comfortable cruising.", // Added description
  },
  {
    title: "Electric",
    link: "/types/electric",
    imageUrl: "/images/electric.jpg",
    description: "The future of motorcycles with electric powertrains.", // Added description
  },
  {
    title: "Off-Road",
    link: "/types/off-road",
    imageUrl: "/images/off-road.jpg",
    description: "Made for exploring off the beaten path.", // Added description
  },
  {
    title: "On-Off-Road",
    link: "/types/on-off-road",
    imageUrl: "/images/on-off-road.jpg",
    description: "Versatile bikes suited for both roads and trails.", // Added description
  },
  {
    title: "Other",
    link: "/types/other",
    imageUrl: "/images/other.jpg",
    description: "Other unique and special motorcycle types.", // Added description
  },
  {
    title: "Scooter",
    link: "/types/scooter",
    imageUrl: "/images/scooter.jpg",
    description: "Compact, city-friendly motorcycles perfect for commuting.", // Added description
  },
  {
    title: "Sport-Touring",
    link: "/types/sport-touring",
    imageUrl: "/images/sport-touring.jpg",
    description: "Combines performance and comfort for long rides.", // Added description
  },
  {
    title: "Sportbikes",
    link: "/types/sportbikes",
    imageUrl: "/images/sportbikes.jpg",
    description: "High-performance bikes for speed and agility.", // Added description
  },
  {
    title: "Standard",
    link: "/types/standard",
    imageUrl: "/images/standard.jpg",
    description: "Simple, all-purpose motorcycles with a comfortable ride.", // Added description
  },
  {
    title: "Touring",
    link: "/types/touring",
    imageUrl: "/images/touring.jpg",
    description:
      "Long-distance motorcycles designed for comfort and luggage capacity.", // Added description
  },
  {
    title: "Touring Scooter",
    link: "/types/touring-scooter",
    imageUrl: "/images/touring-scooter.jpg",
    description: "Compact touring bikes with larger features for comfort.", // Added description
  },
  {
    title: "Track",
    link: "/types/track",
    imageUrl: "/images/track.jpg",
    description: "High-performance motorcycles built for the race track.", // Added description
  },
  {
    title: "Youth",
    link: "/types/youth",
    imageUrl: "/images/youth.jpg",
    description: "Small-sized motorcycles designed for young riders.", // Added description
  },
];

const BikeTypeUi: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {bikeTypes.map((bikeType, index) => (
        <BikeTypeCard
          key={index}
          title={bikeType.title}
          link={bikeType.link}
          imageUrl={bikeType.imageUrl}
          description={bikeType.description} // Passing description prop
        />
      ))}
    </div>
  );
};

export default BikeTypeUi;
