"use client";
import { useState } from "react";

const ReviewText = ({ review }: { review: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p
        className={`mt-2 text-gray-700 dark:text-gray-300 ${
          !isExpanded ? "line-clamp-3" : ""
        }`}
        style={{
          WebkitLineClamp: isExpanded ? "unset" : 2, // Toggle line clamp
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {review}
      </p>
      <button
        onClick={handleToggle}
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};
export default ReviewText;
