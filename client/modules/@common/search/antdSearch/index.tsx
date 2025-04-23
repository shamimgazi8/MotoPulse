import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import ApiService from "@/service/apiService";
import Link from "next/link";

interface Review {
  id: number;
  review: string;
  coverPhoto: string;
  createdAt: string;
  slug: string;
  bike: {
    brand: { brandName: string };
    model: { modelName: string };
    type: { name: string };
  };
  User: {
    firstname: string;
    lastname: string;
    profile_url: string;
  };
}

const SearchAnt: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setFilteredResults([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery.trim()) {
        setFilteredResults([]);
        return;
      }
      setLoading(true);
      try {
        console.log(searchQuery);
        const response = await ApiService.GetReviewFromSearch(searchQuery); // API call
        setFilteredResults(response.result); // assuming response.data is an array
      } catch (error) {
        console.error("Search error:", error);
        setFilteredResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchData, 400); // debounce API calls
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <>
      <button
        className="flex justify-center items-center gap-2 rounded font-normal btn-secondary"
        onClick={showModal}
      >
        <IoSearchOutline className="text-sm" /> search
      </button>

      <Modal
        title="Search by model, brand or type"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="custom-modal"
        modalRender={(modal) => (
          <div className="backdrop-blur-md bg-black/10 dark:bg-black/50 rounded-xl p-4 transition-all">
            {modal}
          </div>
        )}
      >
        <div className="relative w-full mb-4">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="rounded-full placeholder:text-white w-full text-white dark:bg-white/30 dark:text-white bg-transparent outline-none  border-gray-400 border-[1px] dark:border-white px-2 py-1 transition-all placeholder:dark:text-white "
          />
          <BsSearch className="absolute right-3 top-[9px] text-white" />
        </div>

        <div>
          {loading ? (
            <div className="text-center my-4">
              <Spin />
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <Link
                onClick={() => {
                  setIsModalOpen(false);
                }}
                key={item.id}
                href={`/${item?.slug}`}
              >
                <div className="p-2 mb-2 border text-white rounded dark:border-white border-gray-300">
                  <p className="font-semibold">
                    {item.bike.brand.brandName} {item.bike.model.modelName}
                  </p>
                  <p className="italic text-sm">Type: {item.bike.type.name}</p>
                  <p>{item.review.slice(0, 100)}...</p>
                  <p className="text-xs mt-1">
                    By {item.User.firstname} {item.User.lastname}
                  </p>
                </div>
              </Link>
            ))
          ) : searchQuery ? (
            <p className="text-gray-500 dark:text-white">No results found.</p>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default SearchAnt;
