'use client';

import { useState } from 'react';
import { CiHeart, CiShare1 } from 'react-icons/ci';
import { FaBeer } from 'react-icons/fa';

import { FiEye, FiShare2 } from 'react-icons/fi';
import { IoIosList } from 'react-icons/io';
const imageUrls = ['/1.png', '/2.png', '/5.png', '/3.png', '/4.png'];

const customData = ['Erc721', 'View on Polygon Scan', 'Open original on IPFS'];
const data = [
  [
    'Minted',
    'Data 1, Col 2',
    'Data 1, Col 3',
    'Data 1, Col 4',
    'Data 1, Col 5',
    'Data 1, Col 6',
  ],
  [
    'Listed',
    'Data 2, Col 2',
    'Data 2, Col 3',
    'Data 2, Col 4',
    'Data 2, Col 5',
    'Data 2, Col 6',
  ],
  [
    'Unlisted',
    'Data 2, Col 2',
    'Data 2, Col 3',
    'Data 2, Col 4',
    'Data 2, Col 5',
    'Data 2, Col 6',
  ],
  // Add more rows as needed
];
const columnNames = ['Event', 'Price', 'From', 'To ', 'Date', 'Time '];
const TestDevelopment = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" h-full w-full bg-[#161616]">
      <div className="w-[80%] m-auto py-[50px]">
        <div className="grid lg:grid-cols-2  text-white mb-[20px] rounded-lg shadow-lg space-y-6 md:space-y-0 md:space-x-6 ">
          {/* Left Section: Image and Info */}
          <div className="w-full md:w-full">
            <div className="relative h-full w-full">
              {/* Set a specific height and width */}
              <video
                src="/demo" // Replace this with the path to your video file
                className="rounded-lg h-full w-full object-cover" // Make video cover the full div
                loop // Optional: Make the video loop
                autoPlay // Optional: Automatically start playing the video
                muted // Optional: Mute the video (useful if auto-playing)
              />

              <div className="absolute top-2 right-2    text-xs flex gap-1 justify-center items-center">
                <svg
                  className="w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="38"
                  viewBox="0 0 42 38"
                  fill="none"
                >
                  <g filter="url(#filter0_b_0_147)">
                    <circle
                      cx="23"
                      cy="19"
                      r="19"
                      fill="black"
                      fill-opacity="0.2"
                    />
                  </g>
                  <path
                    d="M22.9826 28.585C28.515 28.585 33 24.1078 33 18.585C33 13.0621 28.515 8.58496 22.9826 8.58496C17.7337 8.58496 13.4277 12.6149 13 17.7444H26.2408V19.4255H13C13.4277 24.555 17.7337 28.585 22.9826 28.585Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_b_0_147"
                      x="-1.84615"
                      y="-5.84615"
                      width="49.6923"
                      height="49.6923"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur
                        in="BackgroundImageFix"
                        stdDeviation="2.92308"
                      />
                      <feComposite
                        in2="SourceAlpha"
                        operator="in"
                        result="effect1_backgroundBlur_0_147"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_backgroundBlur_0_147"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
                <div className="flex gap-1 justify-center items-center backdrop-blur-lg rounded-full px-3 py-1">
                  10
                  <span className="mr-1">
                    <CiHeart className="text-lg" />
                  </span>{' '}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: NFT Info */}
          <div className=" text-white rounded-lg shadow-lg w-[96%] mx-auto">
            {/* Title */}
            <div className="text-2xl font-bold flex justify-between items-center">
              <span>Themesflat #0270</span>
              <FiShare2 className=" opacity-70" />
            </div>

            {/* Owners */}
            <div className="flex justify-between items-sart my-4 text-[12px]">
              <div className="grid grid-cols-[40px_1fr] items-center justify-center font-mono">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                  alt="Owner"
                  className="w-6 h-6 rounded-full row-span-2"
                />
                <span className="text-[12px] text-gray-400">Owned by:</span>
                <span className="font-medium text-[12px]">Marvin McKinney</span>
              </div>
              <div className="grid grid-cols-[40px_1fr] items-center justify-center font-mono">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
                  alt="Owner"
                  className="w-6 h-6 rounded-full row-span-2"
                />
                <span className="text-[12px] text-gray-400">Owned by:</span>
                <span className="font-medium text-[12px]">Marvin McKinney</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-start items-center space-x-4 mb-[30px] text-sm">
              <button className=" border-[1px] border-white/20 px-3 py-[10px] rounded-[12px] flex justify-center items-center gap-1">
                <FiEye /> 208 View
              </button>
              <button className=" border-[1px] border-white/20 px-3 py-[10px] rounded-[12px]">
                Collectibles
              </button>
            </div>

            {/* Price Section */}
            <div className="p-4 bg-[#232323] rounded-[20px] grid grid-cols-[2fr_1fr] gap-2 mb-[20px]">
              <div className="text-sm text-gray-400 font-mono">
                Current price
              </div>
              <button className=" border-[1px] border-white/20 px-2 py-[6px] rounded-[8px] mt-0 h-[30px] w-full text-[12px] flex justify-center items-center gap-1 hover:bg-white hover:text-black transition-all">
                <CiShare1 className=" text-lg" />
                Check ETH Quotes
              </button>
              <div className="text-4xl font-bold">$1,000</div>
              <button className="w-full bg-[#DDF247] text-black p-[10px] rounded-lg font-semibold hover:bg-yellow-500 transition-all">
                Put on sale
              </button>
            </div>

            {/* Overview Section */}
            <div className=" p-4 rounded-lg bg-[#232323] ">
              <div className="text-lg font-semibold">Overview</div>
              <div className="w-full h-[1px] bg-white opacity-20 my-[16px]"></div>
              <div className="grid lg:grid-cols-[2fr_1fr] gap-4">
                <div className=" w-full h-full flex flex-col justify-center items-center gap-2">
                  <div className="flex justify-between items-center bg-[#302f2f] rounded-[11px] border-[1px] border-white/20  text-[14px] w-full py-3 px-2">
                    <span className="text-sm text-white">Artist</span>
                    <span className="font-mono text-gray-400">Dhruv Swami</span>
                  </div>{' '}
                  <div className="flex justify-between items-center bg-[#302f2f] rounded-[11px] border-[1px] border-white/20  text-[14px] w-full py-3 px-2">
                    <span className="text-sm text-white">Shipping Country</span>
                    <span className="font-mono text-gray-400">India</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#302f2f] rounded-[11px] border-[1px] border-white/20  text-[14px] w-full py-3 px-2">
                    <span className="text-sm text-white">Royalties</span>
                    <span className="font-mono text-gray-400">13%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 bg-[#302f2f] rounded-[11px] border-[1px] border-white/20 py-1 px-2">
                  <span className="text-sm text-gray-400">Size</span>
                  <div className=" flex gap-1 flex-col text-gray-400 font-mono ">
                    <p>Length: 20cm</p>
                    <p>Height: 20cm</p>
                    <p>Width: 20cm</p>
                    <p>Weight: 10kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Thumbnails */}
        <div className="w-full mt-6 md:mt-0 flex flex-wrap gap-2 justify-center items-center">
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="flex-1 w-[calc(20%-8px)] h-auto object-cover rounded-lg" // Adjust for any gap/margin
            />
          ))}
        </div>
        <div className="mt-6 p-4 rounded-lg bg-[#232323]">
          <div className="text-lg font-semibold text-white flex items-center gap-1">
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            Description
          </div>
          <div className="w-full h-[1px] bg-white/20 my-[10px]"></div>
          <div className="text-gray-400 font-mono">
            {isExpanded ? (
              <>
                8,888 NFTs of beautiful, Asian women painstakingly-crafted where
                even the most intricate details are steeped in historical
                significance. We envision 8SIAN being a global, inclusive
                community see more 8,888 NFTs of beautiful, Asian women
                painstakingly-crafted where even the most intricate details are
                steeped in historical significance. We envision 8SIAN being a
                global, inclusive community see more 8,888 NFTs of beautiful,
                Asian women painstakingly-crafted where even the most intricate
                details are steeped in historical significance. We envision
                8SIAN being a global, inclusive community see more
                <button
                  className="text-[#DDF247] hover:underline ml-1 font-mono"
                  onClick={toggleDescription}
                >
                  See Less
                </button>
              </>
            ) : (
              <>
                8,888 NFTs of beautiful, Asian women painstakingly-crafted where
                even the most intricate details are steeped in historical
                significance. We envision 8SIAN being a global, Asian women
                painstakingly-crafted where even...
                <button
                  className="text-[#DDF247] hover:underline ml-1"
                  onClick={toggleDescription}
                >
                  See More
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-6 p-4 rounded-lg bg-[#232323] overflow-x-auto">
          <div className="text-lg font-semibold text-white ml-[15px] flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
              />
            </svg>
            Item activity
          </div>
          <div className="w-full h-[1px] bg-white/20 my-[10px]"></div>
          <table className="min-w-full border-collapse sm:table-fixed md:table-auto lg:table-fixed">
            <thead>
              <tr>
                {columnNames.map((columnName, index) => (
                  <th key={index} className="text-white px-4 py-2 text-left">
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => {
                const isLastRow = rowIndex === data.length - 1;
                const rowClass = isLastRow ? '' : 'border-b border-gray-700';

                return (
                  <tr key={rowIndex} className={rowClass}>
                    {row.map((cell, colIndex) => {
                      const fontMono = colIndex === 0 ? 'font-mono' : '';
                      const textColor =
                        colIndex === 2 || colIndex === 3
                          ? 'text-[#DDF247]'
                          : 'text-white';

                      return (
                        <td
                          key={colIndex}
                          className={`${textColor} ${fontMono} px-4 py-2`}
                        >
                          {colIndex === 0 ? (
                            <IoIosList className="inline-block mr-2" />
                          ) : null}
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#232323]">
          <div className="text-lg font-semibold text-white ml-[15px] flex justify-start items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            Details
          </div>
          <div className="w-full h-[1px] bg-white/20 my-[10px]"></div>
          <table className="min-w-full border-collapse">
            <tbody>
              {customData.map((data, index) => (
                <tr
                  key={index}
                  className={
                    index !== customData.length - 1
                      ? 'border-b border-gray-700'
                      : ''
                  }
                >
                  <td className="text-white px-4 py-2">{data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <img className=" w-full object-cover mt-[20px]" src="/cover.png" />
        </div>
      </div>
    </div>
  );
};
export default TestDevelopment;
