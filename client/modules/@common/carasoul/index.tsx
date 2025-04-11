// src/components/Marquee.jsx
import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

const Cerasoul = (imgObject: any) => {
  return (
    <div className="">
      <Carousel arrows infinite={true} autoplay={true}>
        <div className=" lg:h-[100vh] ">
          <Image
            src="/cover/1.jpg"
            height={1000}
            width={2000}
            alt="hero-one"
            className=" object-cover rounded-lg"
          />
        </div>
        <div className=" lg:h-[100vh] ">
          <Image
            src="/cover/2.jpg"
            height={1000}
            width={2000}
            alt="hero-one"
            className=" object-cover rounded-lg"
          />
        </div>{' '}
        <div className="lg:h-[100vh] ">
          <Image
            src="/cover/3.jpg"
            height={1000}
            width={2000}
            alt="hero-one"
            className=" object-cover rounded-lg"
          />
        </div>
        <div className="lg:h-[100vh] ">
          <Image
            src="/cover/5.jpg"
            height={1000}
            width={2000}
            alt="hero-one"
            className=" object-cover rounded-lg"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Cerasoul;
