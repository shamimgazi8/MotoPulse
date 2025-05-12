"use client";

import { useState, useEffect } from "react";
import InfinityScrollCard from "./InfinityScrollCard";
import TrendingBikes from "./TrandingBikes";
import BikeFilterSidebar from "./Filter/bikeFilterSidebar";

const PAGE_SIZE = 5;

const BikeReviews = () => {
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ result: any[]; count: number }>({
    result: [],
    count: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PAGE_SIZE),
      });

      if (filters.brand) params.append("brandName", filters.brand);
      if (filters.bikeType) params.append("type", filters.bikeType);
      if (filters.sortby) params.append("sortby", filters.sortby);
      if (filters.ccRange) {
        params.append("ccMin", String(filters.ccRange[0]));
        params.append("ccMax", String(filters.ccRange[1]));
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?${params.toString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const json = await res.json();

      setData((prev) => ({
        result: page === 1 ? json.result : [...prev.result, ...json.result],
        count: json.count,
      }));
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1); // Reset page on filter change
  };

  const totalPages = Math.ceil(data.count / PAGE_SIZE);
  const hasMore = page < totalPages;

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-[1440px] m-auto grid grid-cols-[300px_1fr_300px]">
      <div className="sticky top-[60px] self-start h-fit">
        <BikeFilterSidebar onApplyFilters={handleFilterChange} />
      </div>

      <InfinityScrollCard
        items={data.result}
        hasMore={hasMore}
        loadMore={loadMore}
        loading={loading}
      />

      <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar sticky top-[60px] self-start">
        <TrendingBikes />
      </div>
    </div>
  );
};

export default BikeReviews;
