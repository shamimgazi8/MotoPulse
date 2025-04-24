import Image from "next/image";
import Link from "next/link";

const HoverCart = ({ data }: any) => {
  return (
    <>
      <Link href={`/${data?.slug}`}>
        <div
          key={data?.id}
          className="product group relative w-68 h-52 overflow-hidden "
        >
          <Image
            height={300}
            width={300}
            src={data?.imageUrl}
            alt="Modern Sofa"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <span className="text-white text-lg">{data?.name} </span>
          </div>
        </div>
      </Link>
    </>
  );
};
export default HoverCart;
