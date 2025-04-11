// src/components/Marquee.jsx
import React from 'react';

const Marquee = ({ text }: any) => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-[100%] ">
      <div className="inline-block animate-marquee text-[200px] font-bold custom-gradient ">
        {text}
      </div>
    </div>
  );
};

export default Marquee;
