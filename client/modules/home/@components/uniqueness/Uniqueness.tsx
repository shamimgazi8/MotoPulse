import CarouselNext from "@/modules/@common/Carousle-next";
import { Carousel } from "antd";
import Link from "next/link";

const Uniqueness = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "460px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const images = [
    "/cover/7.jpg",
    "/cover/2.jpg",
    "/cover/3.jpg",
    "/cover/10.jpg",
    "/cover/12.jpg",
    "/cover/13.jpg",
  ];
  return (
    <section data-aos="fade-left" className="my-[50px] m-auto container ">
      <div className="grid lg:grid-cols-3 ">
        <div className=" lg:row-span-2 flex flex-col justify-center lg:items-end gap-2 lg:text-end items-center text-center lg:mr-[50px]">
          <h1 className=" text-[50px]">
            Choose what resonates with your{" "}
            <span className=" gradient-text">Uniqueness</span>
          </h1>
          <p className=" text-[25px] font-normal">
            Organize every space with our timeless furniture collections
          </p>
          <Link href={"/bike-reviews"}>
            <button className=" hover:bg-white hover:text-black transition-all p-2">
              Explore <span className=" border-b-[2px] pb-1 ">Now</span>
            </button>
          </Link>
        </div>
        <div className="  lg:row-span-2 col-span-2">
          <Carousel arrows dotPosition="left" infinite={true} autoplay>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`carousel-image-${index}`}
                  className="w-full h-[460px] object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};
export default Uniqueness;
