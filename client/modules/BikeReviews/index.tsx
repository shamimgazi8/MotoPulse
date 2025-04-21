import FilterBar from "./Filter";
import InfinityScrollCard from "./InfinityScrollCard";
import TrendingBikes from "./TrandingBikes";

const BikeReviews = () => {
  return (
    <div className=" max-w-[1440px] m-auto grid grid-cols-[300px_1fr_300px]">
      <div className="sticky top-[60px] self-start h-fit">
        <FilterBar />
      </div>
      <InfinityScrollCard />
      <div className="h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
        <TrendingBikes />
      </div>
    </div>
  );
};
export default BikeReviews;
