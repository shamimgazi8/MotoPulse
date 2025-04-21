import CarouselNext from "@/modules/@common/Carousle-next";
import Link from "next/link";

const Uniqueness = () => {
  return (
    <section data-aos="fade-left" className=" lg:mx-[100px] my-[50px] mx-5 ">
      <div className="grid lg:grid-cols-3 ">
        <div className=" lg:row-span-2 flex flex-col justify-center lg:items-end gap-2 lg:text-end items-center text-center lg:mr-[50px]">
          <h1 className=" text-[50px]">
            Choose what resonates with your{" "}
            <span className=" gradient-text">Uniqueness</span>
          </h1>
          <p className=" text-[25px] font-normal">
            Organize every space with our timeless furniture collections
          </p>
          <Link href={"unique-bikes"}>
            <button>
              Explore <span className=" border-b-[2px] pb-1 ">Now</span>
            </button>
          </Link>
        </div>
        <div className="  lg:row-span-2 col-span-2">
          {/* <MultiSlider itemsToShow={1} /> */}
          <CarouselNext
            height="400px" // Set a custom height
            images={[
              "https://i.pinimg.com/736x/19/e1/02/19e10290fcf91a711fbccfb40c75aba4.jpg",
              "https://i.redd.it/rbv4tcnazbcd1.jpeg",
              "https://i.pinimg.com/474x/eb/70/d2/eb70d2ef8c1e769cc2ef4db4e01f60b1.jpg",
              "https://motofomo.com/wp-content/uploads/2021/10/2022-KTM-RC-8C-1024x680.jpg",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1jMQ1FlNcIfO08HqunVbO7863IlNudG22g&s",
            ]}
          />
        </div>
      </div>
    </section>
  );
};
export default Uniqueness;
