import HoverCart from '@/modules/@common/group-hoverCart';
import Link from 'next/link';
import { LuMoveRight } from 'react-icons/lu';
import populerBikeData from '../../../../data/populerbike-data.json';

const PopulerBike = () => {
  return (
    <div data-aos="fade-right" className=" lg:mx-[70px] lg:mt-[60px]">
      <div>
        <Link className="group" href={'/populer-bikes'}>
          <div className=" flex items-center justify-center gap-5 text-2xl mb-5  transition-all  ">
            <span className=" ">Most Popular Bikes </span>
            <span>
              <LuMoveRight className=" text-2xl group-hover:scale-150 transition-all mt-1" />
            </span>
          </div>
        </Link>
      </div>
      <div className=" flex flex-wrap lg:flex-nowrap gap-8 justify-center">
        {populerBikeData.slice(0, 4).map((item: any, i: any) => {
          return <HoverCart key={i} data={item} />;
        })}
      </div>
    </div>
  );
};

export default PopulerBike;
