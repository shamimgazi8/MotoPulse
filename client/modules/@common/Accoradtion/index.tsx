"use client";
import React, { useState, useEffect } from "react";

const images = [
  { src: "/cover/1.jpg", title: "Yamaha", desc: "First Position" },
  { src: "/cover/2.jpg", title: "Harley Davidson", desc: "Second Position" },
  { src: "/cover/3.jpg", title: "scooty", desc: "Third Position" },
  { src: "/cover/5.jpg", title: "Ducaty", desc: "Fourth Position" },
  { src: "/cover/6.jpg", title: "KTM", desc: "Fifth Position" },
];

function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatically change photo every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change duration here (ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? 0 : index);
  };

  return (
    <section className="relative flex cursor-pointer w-full h-[90vw] max-h-[500px] overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <button
          key={index}
          className={`relative overflow-hidden transition-all duration-1000 ease-in-out
            ${activeIndex === index ? "w-[60%] opacity-100" : "w-[10%]"}
            h-full flex items-end border-0 background-transparent`}
          onClick={() => handleClick(index)}
        >
          <img
            src={image.src}
            alt={image.title}
            className={`absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-[70vw] object-cover transition-all duration-1000 ease-in-out ${
              activeIndex === index
                ? "grayscale-[10%]"
                : "grayscale-[90%] brightness-50 hover:grayscale-[20%] hover:brightness-75"
            }`}
          />
          <div
            className={`absolute bottom-5 left-5 flex items-center gap-3 p-5 bg-gradient-to-b from-transparent to-black/25 text-white backdrop-blur-sm rounded-lg transition duration-250 ${
              activeIndex === index
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
          >
            <div>
              <h2 className="text-lg font-normal text-white/96">
                {image.title}
              </h2>
              <p className="text-sm text-white/66">{image.desc}</p>
            </div>
          </div>
        </button>
      ))}
    </section>
  );
}

export default Accordion;
