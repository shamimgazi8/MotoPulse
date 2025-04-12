import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { excerpt } from "@/utils/utils";

interface BlogCardProps {
  data?: any;
  classes?: {
    root?: any;
    imageWrapper?: string;
    imageStyle?: string;
    iconWrapper?: string;
    name?: string;
    icon?: string;
    data?: string;
    galleryWrapper?: string;
    icongallery?: string;
    body?: string;
    badge?: string;
    highlight?: string;
    desc?: string;
    date?: string;
    hero?: string;
    overlay?: string;
    imgiconWrapper?: string;
    imgicon?: string;
  };
  type?: string;
}

const BlogCard = ({ data, classes, type }: BlogCardProps) => {
  return (
    <>
      <div
        className={`grid group hover:text-inherit relative cursor-pointer ${
          classes?.root ? classes.root : ""
        }`}
      >
        <div
          key={data?.id}
          className={` ${classes?.imageWrapper ? classes.imageWrapper : ""} product group relative overflow-hidden`}
        >
          <Image
            height={300}
            width={300}
            src={data?.imageUrl}
            alt="placeholder"
            className={`object-cover ${
              classes?.imageStyle ? classes.imageStyle : ""
            } w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110`}
          />
        </div>
        <div className={` ${classes?.body ? classes.body : ""}`}>
          <h3
            className={`group-hover:text-primary transition-all mb-[10px] ${
              classes?.name ? classes.name : ""
            }`}
          >
            {data?.highlight && (
              <span
                className={`inline-flex items-center gap-1 pr-1 ${
                  classes?.highlight ? classes.highlight : ""
                }`}
              >
                <span className="mb-0 text-primary font-medium leading-[25px]">
                  {excerpt(data?.highlight, 12)}
                </span>
                <GoDotFill className="text-primary text-sm" />
              </span>
            )}
            {data?.name}
          </h3>
          {data?.excerpt && (
            <p className={`line-clamp-4 ${classes?.desc ? classes?.desc : ""}`}>
              {data?.excerpt}
            </p>
          )}
          <span
            className={`mb-0 text-[13px] ${classes?.date ? classes?.date : ""}`}
          >
            {data?.publishedAt}
          </span>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
