// FilterBar.tsx
"use client";
import React from "react";
import BikeFilterSidebar from "./Components/bikeFilterSidebar";

const FilterBar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const handleFilters = (filters: any) => {
    console.log("Filters to send:", filters);
    onFilterChange(filters); // Notify parent (BikeReviews)
  };

  return (
    <div>
      <BikeFilterSidebar onApplyFilters={handleFilters} />
    </div>
  );
};

export default FilterBar;
