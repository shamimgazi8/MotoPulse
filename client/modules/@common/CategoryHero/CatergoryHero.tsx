import { capitalizeFirstLetter, excerpt } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '../Bredcrumb';
import { useParams } from 'next/navigation';

interface propTypes {
  data?: any;
  slug?: any;
}

const CategoryHero = ({ data, slug }: propTypes) => {
  const { productList } = useParams();
  return (
    <section>
      <div className=" bg-red-400 h-[400px] w-full relative mb-5">
        <Image
          layout="fill"
          objectFit="cover"
          alt="feature imga"
          src={data?.featureImage}
        />
        <div className=" absolute backdrop-blur-md  text-3xl top-[100px] left-[100px] p-[20px] text-center">
          <h1 className="  text-white  flex flex-col">
            Find Out All{' '}
            <span className="gradient-text text-5xl py-3">
              {capitalizeFirstLetter(slug)}
            </span>
            {productList ? 'Collections' : 'Furnitures'}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
