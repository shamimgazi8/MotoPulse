"use client";

import { useState, useRef, useEffect } from "react";
import InfinityScrollCard from "./InfinityScrollCard";
import TrendingBikes from "./TrandingBikes";
import BikeFilterSidebar from "./Filter/bikeFilterSidebar";
import { useGetFilteredReviewsQuery } from "@/service/reviewsApi";

const PAGE_SIZE = 5;

const BikeReviews = () => {
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const filtersChangedRef = useRef(false);

  const { data, isLoading, isFetching, isError } = useGetFilteredReviewsQuery({
    page,
    limit: PAGE_SIZE,
    ...filters,
  });

  const items = data?.result ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hasMore = page < totalPages;

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    filtersChangedRef.current = true;
    setFilters(newFilters);
    setPage(1);
  };

  // Reset cache view on filter change (simulate client-side reset)
  useEffect(() => {
    if (filtersChangedRef.current && page === 1) {
      filtersChangedRef.current = false;
    }
  }, [filters, page]);

  return (
    <div className="max-w-[1440px] m-auto grid grid-cols-[300px_1fr_300px]">
      <div className="sticky top-[60px] self-start h-fit">
        <BikeFilterSidebar onApplyFilters={handleFilterChange} />
      </div>

      <InfinityScrollCard
        items={items}
        hasMore={hasMore}
        loadMore={loadMore}
        loading={isLoading || isFetching}
      />

      <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar sticky top-[60px] self-start">
        <TrendingBikes />
      </div>
    </div>
  );
};

export default BikeReviews;
