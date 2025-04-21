"use client";
import React, { useState } from "react";
import BikeFilterSidebar from "./Components/bikeFilterSidebar";

const FilterBar = () => {
  const [filteredBikes, setFilteredBikes] = useState([]);

  const handleFilters = async (filters: any) => {
    console.log("Filters to send:", filters);

    // Example API call
    const res = await fetch("/api/bikes/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    });
    const data = await res.json();
    setFilteredBikes(data);
  };

  return (
    <div className="">
      <BikeFilterSidebar onApplyFilters={handleFilters} />
      <div style={{ flex: 1, padding: 16 }}>
        {/* Render filtered bikes here */}
        {filteredBikes.map((bike: any) => (
          <div key={bike.id}>{bike.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
