"use client";

import { useEffect, useState, useRef } from "react";
import InfinityScrollCard from "./InfinityScrollCard";
import TrendingBikes from "./TrandingBikes";
import BikeFilterSidebar from "./Filter/bikeFilterSidebar";

const PAGE_SIZE = 5;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const BikeReviews = () => {
  const [filters, setFilters] = useState<any>({});
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Ref to track when filter has changed
  const filtersChangedRef = useRef(false);

  const fetchData = async (
    queryObj: Record<string, any>,
    currentPage: number
  ) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(PAGE_SIZE),
      });

      // Dynamic filters
      if (queryObj.ccRange && Array.isArray(queryObj.ccRange)) {
        params.append("ccMin", String(queryObj.ccRange[0]));
        params.append("ccMax", String(queryObj.ccRange[1]));
      }
      if (queryObj.brand) {
        params.append("brandName", queryObj.brand);
      }
      if (queryObj.bikeType) {
        params.append("type", queryObj.bikeType);
      }
      if (queryObj.sortby) {
        params.append("sortby", queryObj.sortby);
      }

      const queryString = params.toString();
      const url = `${API_URL}/reviews?${queryString}`;

      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (currentPage === 1) {
        setItems(data?.result || []);
      } else {
        setItems((prev) => [...prev, ...(data?.result || [])]);
      }

      const totalCount = data?.count || 0;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);
      setHasMore(currentPage < totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setHasMore(false);
      alert(
        "Unable to fetch data. Please check your server or internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters, page);
  }, [filters, page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleFilterChange = (newFilters: any) => {
    filtersChangedRef.current = true;
    setFilters(newFilters);
    setPage(1);
  };

  // Ensure we only clear items when filters are changed and page is reset
  useEffect(() => {
    if (filtersChangedRef.current && page === 1) {
      setItems([]);
      setHasMore(true);
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
        loading={loading}
      />

      <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar sticky top-[60px] self-start">
        <TrendingBikes />
      </div>
    </div>
  );
};

export default BikeReviews;
