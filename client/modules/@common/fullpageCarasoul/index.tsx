'use client';
import React, { useState, useEffect } from 'react';

function FullPageCarousel({ slides }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide: any, index: any) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ transform: `translateX(${index * -100}%)` }}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      {/* Navigation controls (optional) */}
      {/* Indicators (optional) */}
    </div>
  );
}

export default FullPageCarousel;
