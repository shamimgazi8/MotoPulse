import Marquee from '../@common/marquee';
import Hero from './@components/Hero';
// import HeroGallery from './@components/heroGallery';
import LatestShots from './@components/latestShots';
import LatestBikes from './@components/latest-motorcycle';
import PopulerBike from './@components/populerBikes';
import CreationPurpose from './@components/purpose';
import Uniqueness from './@components/uniqueness/Uniqueness';

const HomePage = () => {
  return (
    <div className=" flex flex-col  gap-0 ">
      <Hero />
      <CreationPurpose />
      <Marquee text="Igniting Your Passion for the Road." />
      {/* <HeroGallery /> */}
      <LatestBikes />
      <PopulerBike />
      <Uniqueness />
      <LatestShots />
    </div>
  );
};
export default HomePage;
