"use client";

import { useEffect, useState } from "react";
import FilterBar from "./Filter";
import InfinityScrollCard from "./InfinityScrollCard";
import TrendingBikes from "./TrandingBikes";

const PAGE_SIZE = 5;

const BikeReviews = () => {
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (reset = false) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
        ...filters,
      });

      const res = await fetch(
        `http://localhost:4000/reviews?${params.toString()}`
      );
      const data = await res.json();

      setItems((prev) => {
        const newItems = data?.result.filter(
          (item: any) => !prev.some((i) => i.id === item.id)
        );
        const updated = reset ? newItems : [...prev, ...newItems];

        // ✅ Corrected hasMore logic
        setHasMore(page * PAGE_SIZE < data.count);

        return updated;
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Re-fetch when page or filters change
  useEffect(() => {
    fetchData(page === 1); // reset flag ensures full reset if filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  const loadMore = () => setPage((prev) => prev + 1);

  const handleFilterChange = (newFilters: any) => {
    setPage(1);
    setItems([]);
    setFilters(newFilters);
  };

  return (
    <div className="max-w-[1440px] m-auto grid grid-cols-[300px_1fr_300px]">
      <div className="sticky top-[60px] self-start h-fit">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>
      <InfinityScrollCard items={items} hasMore={hasMore} loadMore={loadMore} />
      <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar sticky top-[60px] self-start ">
        <TrendingBikes />
      </div>
    </div>
  );
};

export default BikeReviews;
