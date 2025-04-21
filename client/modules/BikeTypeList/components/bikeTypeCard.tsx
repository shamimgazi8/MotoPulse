// components/BikeTypeCard.tsx
import React from "react";

interface BikeTypeCardProps {
  title: string;
  link: string;
  imageUrl: string;
  description: string;
}

const BikeTypeCard: React.FC<BikeTypeCardProps> = ({
  title,
  link,
  imageUrl,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group">
      <a href={link} className="block relative">
        {/* Image with gradient overlay */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>

        {/* Card content */}
        <div className="p-4 relative z-10">
          {/* Title with gradient text effect on hover */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:gradient-text">
            {title}
          </h3>
          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
};

export default BikeTypeCard;
