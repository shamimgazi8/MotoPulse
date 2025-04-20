import Cerasoul from "@/modules/@common/carasoul";
import FullPageCarousel from "@/modules/@common/fullpageCarasoul";
import data from "../../../../data/dinningroom.json";
const Hero = () => {
  return (
    <div className=" z-50 ">
      <div className=" absolute lg:w-[300px] w-[200px]  backdrop-blur-md z-50 lg:top-[30%] top-[140px] lg:right-[10%] right-[40px] rounded-md p-[40px] ">
        <div className=" lg:w-[110px] ">
          <h3 className="text-white p-2">New Arrival</h3>
        </div>
        <h1 className="lg:text-[50px] font-semibold leading-[52px] my-5 text-white dark:text-black">
          <span className="gradient-text">Discover</span> New Bikes
        </h1>
        <p className=" mb-3 line-clamp-2 lg:line-clamp-6 text-[14px]">
          Find the perfect partner to fuel your passion and explore the world on
          two wheels.
        </p>
        <div className=" w-[200px]">
          <button className=" btn-secondary  font-normal">Explore Now</button>
        </div>
      </div>
      {/* <FullPageCarousel slides={data} /> */}
      <Cerasoul />
    </div>
  );
};
export default Hero;
