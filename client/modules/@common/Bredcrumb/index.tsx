import Link from 'next/link';
import React from 'react';
import { RxDoubleArrowRight } from 'react-icons/rx';

const Breadcrumb = ({ items }: any) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {items?.map((item: any, index: any) => (
          <li className=" flex  justify-center items-center" key={index}>
            {index === items.length ? (
              <span className="text-gray-500">{item.label}</span>
            ) : (
              <Link
                href={item?.link}
                className=" hover:text-blue-800 transition-all"
              >
                {item?.title}
              </Link>
            )}
            {items.length > index + 1 && (
              <span className="mx-2">
                <RxDoubleArrowRight />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
