import Marquee from "../@common/marquee";
import Hero from "./@components/Hero";
import LatestShots from "./@components/latestShots";
import LatestBikes from "./@components/latest-motorcycle";
import PopulerBike from "./@components/populerBikes";
import CreationPurpose from "./@components/purpose";
import Uniqueness from "./@components/uniqueness/Uniqueness";
import ScrollToTopButton from "./@components/ScrollTopTobutton";

const HomePage = () => {
  return (
    <div className=" flex flex-col  gap-0 ">
      <Hero />
      <CreationPurpose />
      <Marquee text="Igniting Your Passion for the Road." />
      <LatestBikes />
      <PopulerBike />
      <Uniqueness />
      <LatestShots />
      <ScrollToTopButton />
    </div>
  );
};
export default HomePage;
