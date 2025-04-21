import BikeTypeUi from "@/modules/BikeTypeList/biketypelist";

const BikeTypes = () => {
  return (
    <div className=" w-[1440px] m-auto">
      <h1 className="text-3xl font-bold text-center my-8">
        Explore Bike Types
      </h1>
      <BikeTypeUi />
    </div>
  );
};

export default BikeTypes;
