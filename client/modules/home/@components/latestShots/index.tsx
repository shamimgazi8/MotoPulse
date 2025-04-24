import Accordion from "@/modules/@common/Accoradtion";
import Link from "next/link";

const LatestShots = () => {
  return (
    <div
      data-aos="fade-right"
      className=" lg:grid lg:grid-cols-[2fr_1fr]  my-5  container"
    >
      <div className="">
        <Accordion auto={false} />
      </div>
      <div className=" flex flex-col justify-center items-start text-start gap-4 ml-[20px]">
        <h1 className=" text-[50px]">
          Latest
          <span className=" gradient-text font-semibold"> shots </span>
          Modern Bikes
        </h1>
        <p className=" text-[25px] font-normal">
          Take a glance and grab ideas from the artistic frames of MOTOPULSE.
        </p>
        <Link href={"/ideas"}>
          <button>
            Explore to view more{" "}
            <span className=" border-b-[2px] pb-1 ">Ideas</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestShots;
