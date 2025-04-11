import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import { RiSearchEyeLine } from 'react-icons/ri';

const SearchBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <input
        className=" gradient-border outline-none transition-all p-2 rounded dark:bg-black dark:text-white"
        placeholder="Search"
        type="text "
      />
    </>
  );
};

export default SearchBar;
