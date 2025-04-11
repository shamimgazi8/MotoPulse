import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { BsSearch } from 'react-icons/bs';

const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Found {query}

            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const SearchAnt: React.FC = () => {
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <div className=" relative w-full">
      <input
        placeholder="Search"
        className=" rounded-full w-[100%] dark:bg-transparent dark:text-white bg-transparent outline-none border-black border-[1px] dark:border-white px-2 py-1 transition-all placeholder:dark:text-white placeholder:text-black"
      />
      <BsSearch className=" absolute right-3 top-[9px]   transition-all hover:text-purple-500 cursor-pointer " />
    </div>

  );
};

export default SearchAnt;
