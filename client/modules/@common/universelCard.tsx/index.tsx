import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoDotFill } from 'react-icons/go';
import { excerpt } from '@/utils/utils';
import { FaCartPlus } from 'react-icons/fa';
import { MdOutlineViewInAr } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './../../../appstore/reducers/cartReducer';

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
  const dispatch = useDispatch();
  const addcartBtnShow = useSelector((state: any) => state.cart.addcartBtnShow);

  const [isAdded, setIsAdded] = useState(false);

  // Get current cart items from localStorage
  const cartItemsRTK = useSelector((state: any) => state.cart.items);
  // Check if item is already in cart (localStorage)
  useEffect(() => {
    const cartItems =
      typeof window !== 'undefined' && localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems') || '[]')
        : [];

    const itemInCart = cartItems.find((item: any) => item.id === data?.id);
    if (itemInCart) {
      setIsAdded(true);
    }
  }, [data?.id]);

  const handleAddItem = (item: any) => {
    if (!isAdded) {
      // Add item to redux state
      dispatch(addItem(item));

      // Check if the item is already in the cart
      const itemExists = cartItemsRTK.some(
        (cartItem: any) => cartItem.id === item.id
      );

      // Only add the item if it doesn't already exist
      if (!itemExists) {
        // Add new item to the cart
        const updatedCartItems = [...cartItemsRTK, item];

        // Save updated cart to localStorage
        typeof window !== 'undefined' &&
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        console.log('Item added to cart:', updatedCartItems);
      }

      setIsAdded(true); // Update button to reflect item was added
    }
  };
  let backupId: any;

  const handleRemoveItem = (item: any) => {
    // Remove item from Redux state
    dispatch(removeItem(item.id));
    backupId = item.id;
    // Filter out the removed item
    const updatedCartItems = cartItemsRTK.filter(
      (cartItem: any) => cartItem.id !== item.id
    );

    // Save updated cart to localStorage
    typeof window !== 'undefined' &&
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    console.log('Item removed from cart:', updatedCartItems);
    setIsAdded(false); // Update button to reflect item was removed
  };
  // useEffect(() => {
  //   const updatedCartItems = cartItemsRTK.filter(
  //     (cartItem: any) => cartItem.id !== backupId
  //   );

  //   // Save updated cart to localStorage
  //   typeof window !== 'undefined' &&
  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //   console.log('Item removed from cart:', updatedCartItems);
  //   setIsAdded(false); // Update button to reflect item was removed
  // }, [cartItemsRTK?.length]);

  return (
    <>
      <div
        className={`grid group hover:text-inherit relative cursor-pointer ${
          classes?.root ? classes.root : ''
        }`}
      >
        <div
          key={data?.id}
          className={` ${classes?.imageWrapper ? classes.imageWrapper : ''} product group relative overflow-hidden`}
        >
          <Image
            height={300}
            width={300}
            src={data?.imageUrl}
            alt="Modern Sofa"
            className={`object-cover ${
              classes?.imageStyle ? classes.imageStyle : ''
            } w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <div className="text-white text-lg line-clamp-1 flex gap-2 flex-col justify-center items-center">
              <button
                onClick={() =>
                  isAdded ? handleRemoveItem(data) : handleAddItem(data)
                }
                className={`${
                  isAdded ? 'bg-gray-400 py-1 px-2' : 'btn-secondary'
                } flex items-center justify-center gap-2 rounded-full text-[12px]`}
              >
                <FaCartPlus className="" />{' '}
                {isAdded ? 'REMOVE FROM CART' : 'ADD TO CART'}
              </button>
              <Link href={`/${'product'}/${data?.slug}`}>
                <button className="btn-primary flex items-center justify-center gap-2 rounded-full text-[12px]">
                  <MdOutlineViewInAr className="" />
                  VIEW PRODUCT
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className={` ${classes?.body ? classes.body : ''}`}>
          <h3
            className={`group-hover:text-primary transition-all mb-[10px] ${
              classes?.name ? classes.name : ''
            }`}
          >
            {data?.highlight && (
              <span
                className={`inline-flex items-center gap-1 pr-1 ${
                  classes?.highlight ? classes.highlight : ''
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
            <p className={`line-clamp-4 ${classes?.desc ? classes?.desc : ''}`}>
              {data?.excerpt}
            </p>
          )}
          <span
            className={`mb-0 text-[13px] ${classes?.date ? classes?.date : ''}`}
          >
            {data?.publishedAt}
          </span>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
