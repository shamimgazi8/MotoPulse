"use client";
import { useParams } from "next/navigation";
import { capitalizeFirstLetter } from "../../utils/utils";
import BlogCard from "../@common/universelCard.tsx";
import data from "../../data/bedroom.json";
import PaginatedList from "../@common/pagination";
import Breadcrumb from "../@common/Bredcrumb/index";
import Filters from "../@common/Filters";
import CategoryHero from "../@common/CategoryHero/CatergoryHero";

const BikeCategories = () => {
  const { categorySlug } = useParams();

  const breadcrumbs = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: categorySlug,
      link: "",
    },
  ];
  const dataArray = data?.data || [];

  return (
    <section>
      <CategoryHero data={data} slug={categorySlug} />
      <div className="container mx-auto">
        <div className="mb-5">
          <Breadcrumb items={breadcrumbs} />
        </div>

        <div className=" gap-5">
          <Filters />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {dataArray.map((item: any, i: any) => {
              return (
                <BlogCard
                  key={i}
                  data={item}
                  classes={{
                    root: `border-[1px] border-white/50 items-center gap-[17px] shadow-lg rounded`,
                    imageWrapper: "!mb-0 lg:!h-[190px] h-[210px] self-start",
                    imageStyle: "!mb-0 !h-full object-cover self-start",
                    name: "lg:!text-lg font-semibold text-[22px] !mb-3 self-start pl-5 !line-clamp-1",
                    desc: "hidden",
                    date: "hidden",
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="my-5 w-full flex justify-center items-end">
          <PaginatedList />
        </div>
      </div>
    </section>
  );
};

export default BikeCategories;
