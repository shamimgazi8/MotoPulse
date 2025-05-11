"use client";

import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "@/utils/useDebounce";
import { useSearchReviewsQuery } from "@/service/reviewsApi";

const SearchAnt: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const { data, isFetching } = useSearchReviewsQuery(debouncedSearch, {
    skip: !debouncedSearch.trim(),
  });

  const filteredResults = data?.result || [];

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchQuery("");
  };
  const handleClear = () => setSearchQuery("");

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
          {searchQuery && (
            <RxCross2
              onClick={handleClear}
              className={`absolute top-[9px] text-white cursor-pointer text-lg hover:text-[#ff5d5d] right-3`}
            />
          )}
        </div>

        <div>
          {isFetching ? (
            <div className="text-center my-4">
              <Spin />
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <Link
                onClick={() => setIsModalOpen(false)}
                key={item.id}
                href={`/${item.slug}`}
              >
                <div className="p-4 mb-2 border text-white rounded dark:border-white border-gray-300 flex gap-5">
                  <div className="relative w-[600px] h-40">
                    <Image
                      height={160}
                      width={320}
                      alt="cover"
                      src={item.coverPhoto}
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
          ) : debouncedSearch ? (
            <p className="text-gray-500 dark:text-white">No results found.</p>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default SearchAnt;
