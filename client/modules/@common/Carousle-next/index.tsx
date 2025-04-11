'use client';
import React, { useState } from 'react';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface CarouselProps {
  images: string[];
  height?: string;
}

const CarouselNext: React.FC<CarouselProps> = ({ images, height }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className={`relative flex justify-center items-center w-full overflow-hidden rounded-lg mt-5 ${
        height ? '' : 'h-64'
      }`}
      style={height ? { height: height } : {}}
    >
      <div
        className="flex transition-transform ease-out duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          height: '100%',
        }} // Ensure sliding div also tries to fill height
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 px-2 py-2 text-white bg-gray-700 hover:bg-gray-900 transition-all"
      >
        <MdOutlineKeyboardDoubleArrowLeft className=" text-2xl" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 px-2 py-2 text-white bg-gray-700 hover:bg-gray-900 transition-all"
      >
        <MdOutlineKeyboardDoubleArrowRight className=" text-2xl" />
      </button>
    </div>
  );
};

export default CarouselNext;
