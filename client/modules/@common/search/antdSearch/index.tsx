import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { IoSearchOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

// Sample data
const bikes = [
  { id: 1, name: "Yamaha R15", model: "R15 V4", type: "Sport" },
  { id: 2, name: "KTM Duke", model: "200", type: "Naked" },
  { id: 3, name: "Royal Enfield Classic", model: "350", type: "Cruiser" },
  { id: 4, name: "Honda CBR", model: "650R", type: "Sport" },
];

const SearchAnt: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBikes, setFilteredBikes] = useState<typeof bikes>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setFilteredBikes([]);
  };

  // Real-time search effect
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const results = bikes.filter(
      (bike) =>
        bike.name.toLowerCase().includes(query) ||
        bike.model.toLowerCase().includes(query) ||
        bike.type.toLowerCase().includes(query)
    );
    setFilteredBikes(results);
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
        title="Search by bike name, model or types"
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
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <div
                key={bike.id}
                className="p-2 mb-2 border text-white rounded dark:border-white border-gray-300"
              >
                <p className="font-semibold">{bike.name}</p>
                <p>Model: {bike.model}</p>
                <p>Type: {bike.type}</p>
              </div>
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
