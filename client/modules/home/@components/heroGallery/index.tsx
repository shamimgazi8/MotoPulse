import { Image } from 'antd';

import React from 'react';

const HeroGallery = () => {
  return (
    <div data-aos="fade-right" className=" w-full relative ">
      <div className=" test-3 w-full h-[100%] absolute bottom-0 -z-50 translate-y-[50%] lg:block hidden  "></div>
      <div className="grid  grid-cols-[minmax(50px,_284px)_minmax(50px,_284px)_minmax(50px,_555px)_minmax(50px,_284px)_minmax(50px,_284px)] lg:gap-6 md:gap-4 gap-2 lg:mt-[-20px] mx-auto justify-center items-center    z-100 p-2">
        <div className=" h-[422px] mt-[86px] relative">
          <Image
            height={'100%'}
            className=" object-cover rounded-md"
            src="/furniture/f1.jpg"
            alt="img gallery"
          />
        </div>
        <div className="">
          <div className=" h-[275px] mt-3 relative">
            <Image
              src="/furniture/f2.jpg"
              height={'100%'}
              className=" object-cover rounded-md"
              alt="img gallery"
            />
          </div>
          <div className=" h-[225px] lg:mt-6 mt-2 relative">
            <Image
              src="/furniture/f3.jpg"
              height={'100%'}
              className=" object-cover rounded-md"
              alt="img gallery"
            />
          </div>
        </div>

        <div className=" h-[533px] mt-5 relative">
          <Image
            src="/furniture/f10.jpg"
            height={'100%'}
            className=" object-cover rounded-md"
            alt="img gallery"
          />
        </div>

        <div className=" mt-10">
          <div className=" h-[183px] relative">
            <Image
              src="/furniture/f5.jpg"
              height={'100%'}
              className=" object-cover rounded-md"
              alt="img gallery"
            />
          </div>

          <div className=" h-[274px] lg:mt-6 mt-2 relative">
            <Image
              src="/furniture/f6.jpg"
              height={'100%'}
              className=" object-cover rounded-md"
              alt="img gallery"
            />
          </div>
        </div>
        <div className="  h-[422px] mt-[80px] relative">
          <Image
            src="/furniture/f7.jpg"
            height={'100%'}
            alt="img gallery"
            className=" object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroGallery;
