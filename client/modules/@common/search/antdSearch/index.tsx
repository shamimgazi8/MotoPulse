import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";
import ApiService from "@/service/apiService";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

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

  const handleClear = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery.trim()) {
        setFilteredResults([]);
        return;
      }
      setLoading(true);
      try {
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
            className="rounded-full placeholder:text-white w-full text-white dark:bg-white/30 dark:text-white bg-transparent outline-none border-gray-400 border-[1px] dark:border-white px-2 py-1 transition-all placeholder:dark:text-white"
          />
          {/* <BsSearch className="absolute right-10 top-[9px] text-white translate-x-[25px]" /> */}
          {searchQuery && (
            <RxCross2
              onClick={handleClear}
              className={`absolute top-[9px] text-white cursor-pointer transition-all  text-center text-lg hover:text-[#ff5d5d] mt-[-2px] ${
                searchQuery ? "right-3 opacity-100" : "right-[-30px] opacity-0"
              }`}
              style={{
                transition: "right 0.3s ease-in-out, opacity 0.3s ease-in-out ",
              }}
            />
          )}
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
                <div className="p-4 mb-2 border text-white rounded dark:border-white border-gray-300 flex gap-5">
                  <div className="relative w-[600px] h-40">
                    {" "}
                    {/* Increased width and adjusted height */}
                    <Image
                      height={160}
                      width={320}
                      alt="cover"
                      src={item?.coverPhoto}
                      className="rounded object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold gradient-text">
                      {item.bike.brand.brandName} {item.bike.model.modelName}
                    </p>
                    <p className="italic text-sm">
                      Type: {item.bike.type.name}
                    </p>
                    <p>{item.review.slice(0, 100)}...</p>
                    <p className="text-xs mt-1">
                      By {item.User.firstname} {item.User.lastname}
                    </p>
                  </div>
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
