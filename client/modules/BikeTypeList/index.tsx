"use client";
import { useParams } from "next/navigation";
import { capitalizeFirstLetter } from "../../utils/utils";

import data from "../../data/bedroom.json";
import PaginatedList from "../@common/pagination";
import Bredcrumb from "../@common/Bredcrumb";

import Filters from "../@common/Filters";

const BikeTypeList = () => {
  const { ["bike-categories"]: bikeCategories } = useParams();
  const { ["bike-type"]: bikeTypes } = useParams();

  const decodedSlug = capitalizeFirstLetter(bikeCategories);
  const decodedSlug1 = capitalizeFirstLetter(bikeTypes);
  const bredcums = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: decodedSlug,
      link: `/${bikeCategories}`,
    },
    {
      title: decodedSlug1,
      link: `/${bikeTypes}`,
    },
  ];
  const dataArray: any = data?.data;
  return (
    <section>
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
                return <div key={i}></div>;
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
export default BikeTypeList;
