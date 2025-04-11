import React, { useState } from 'react';
import { Pagination } from 'antd';

const PaginatedList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    console.log('Current page:', page); // This will log the current page number
  };

  return (
    <div className=" mt-5">
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={50} // Total number of items, for example
        pageSize={10} // Number of items per page
      />
    </div>
  );
};

export default PaginatedList;
