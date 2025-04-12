"use client";
import { useParams } from "next/navigation";
import { capitalizeFirstLetter } from "./../../utils/utils";
import BlogCard from "../@common/universelCard.tsx";
import data from "./../../data/bedroom.json";
import PaginatedList from "../@common/pagination";
import Bredcrumb from "../@common/Bredcrumb";
import { Select, Slider } from "antd";
import Filters from "../@common/Filters";
import CategoryHero from "../@common/CategoryHero/CatergoryHero";

const ProductList = () => {
  const { BikeTypesSlug } = useParams();
  const { SpecificTypeSlug } = useParams();
  const decodedSlug = capitalizeFirstLetter(BikeTypesSlug);
  const decodedSlug1 = capitalizeFirstLetter(SpecificTypeSlug);
  const bredcums = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: decodedSlug,
      link: `/${BikeTypesSlug}`,
    },
    {
      title: decodedSlug1,
      link: "",
    },
  ];
  const dataArray: any = data?.data;
  return (
    <section>
      <CategoryHero data={data} slug={SpecificTypeSlug} />

      <div className=" container mx-auto ">
        <div className=" my-5">
          <Bredcrumb items={bredcums} />
        </div>
        <div className=" my-[30px]">
          <h1 className=" text-2xl">
            All {capitalizeFirstLetter(decodedSlug1)} Collections
          </h1>
        </div>
        <Filters />
        <div className=" ">
          <div>
            <div className=" grid md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {dataArray?.slice().map((item: any, i: any) => {
                return (
                  <>
                    <BlogCard
                      key={i}
                      data={item}
                      classes={{
                        root: ` border-[1px] border-white/50 items-center  gap-[17px] shadow-lg rounded ${
                          i < 9 ? "" : ""
                        } self-start`,
                        imageWrapper:
                          "!mb-0 lg:!h-[190px] h-[210px] self-start",
                        imageStyle: "!mb-0 !h-full object-cover self-start",
                        name: "lg:!text-lg font-semibold text-[22px] !mb-3 self-start pl-5 line-clamp-1 ",
                        desc: " hidden",
                        date: "hidden ",
                      }}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>

        <div className="my-5 w-full flex justify-center items-end ">
          <PaginatedList />
        </div>
      </div>
    </section>
  );
};
export default ProductList;
