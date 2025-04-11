import Link from "next/link";
import { BsCashStack } from "react-icons/bs";

import { IoIosArrowRoundForward, IoMdMail } from "react-icons/io";

import SocialLinks from "../@common/SocialLinks";
import { IoCall } from "react-icons/io5";
import { FaCcVisa } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import Image from "next/image";
const mailtoLink = `mailto:${"motopulse@gmail.com"}?subject=${encodeURIComponent("furniture")}&body=${encodeURIComponent("")}`;

const data = [
  {
    children: [
      {
        title: "About",
        link: "/about-us",
      },
      {
        title: "Contact",
        link: "/contact-us",
      },
      {
        title: "Privacy",
        link: "/privacy-policy",
      },
      {
        title: "Users",
        link: "/study-abroad/oceania/new-zeland",
      },
      {
        title: "Cookies",
        link: "/study-abroad/north-america/new-zeland",
      },
      {
        title: "Data Copyright",
        link: "/study-abroad/europe/germany",
      },
      {
        title: "Terms & Conditions",
        link: "/terms-and-conditions",
      },
    ],
  },

  {
    title: "Contact Info",
  },
];

const Footer = () => {
  return (
    <footer className="dark:bg-gray-800 bg-gray-200 mt-auto  bg-footer text-footertext lg:pt-[30px] py-[40px] ">
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className=" lg:w-[30%] container mb-10 lg:px-0 px-10"
      >
        <Link href="/" className=" w-full flex justify-center items-start h-16">
          <Image
            src="/logo/moto.png"
            width={450}
            height={50}
            alt="logo"
            className=" lg:h-[40px] lg:w-[120px] w-[120px] mt-1"
          />
        </Link>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className=" relative group"
        >
          <input
            type="text"
            name=""
            id=""
            className="w-full py-3 px-5 focus:outline-none text-black"
            placeholder="Enter your email"
          />
          <IoIosArrowRoundForward className=" text-[32px] absolute right-0 top-2 text-purple-400 mr-3 group-hover:scale-125 transition-all" />
        </div>
      </div>
      <div className="container flex lg:flex-row flex-col gap-5  items-center justify-around  ">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" flex justify-center items-center gap-4 flex-col"
        >
          <h1 className="text-xl font-semibold gradient-text ">About Us</h1>
          <div className="text-sm flex flex-col gap-2 justify-center items-center">
            <Link href={"/"}>Contact Us</Link>
            <Link href={"/"}>Our Story</Link>
            <Link href={"/"}>Company Profile</Link>
            <Link href={"/"}>License & CertificatedS</Link>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" flex justify-center items-center gap-4 flex-col"
        >
          <h1 className="text-xl font-semibold gradient-text ">OUR COMPANY</h1>
          <div className="text-sm flex flex-col gap-2 justify-center items-center">
            <Link href={"/"}>Product Catalog</Link>
            <Link href={"/"}>Our Showroom</Link>
            <Link href={"/"}>Career</Link>
            <Link href={"/"}>Press</Link>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" flex justify-center items-center gap-4 flex-col"
        >
          <h1 className="text-xl font-semibold gradient-text ">
            CUSTOMER SERVICE
          </h1>
          <div className="text-sm flex flex-col gap-2 justify-center items-center">
            <Link href={"/"}>Terms & Conditions</Link>
            <Link href={"/"}>Privacy & Policy</Link>
            <Link href={"/"}>Return & Refund Policy</Link>
            <Link href={"/"}>Delivery and Shipping Information</Link>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" flex justify-center items-center gap-4 flex-col"
        >
          <h1 className="text-xl font-semibold gradient-text ">Follow Us</h1>
          <SocialLinks classes={{ root: "!mb-0" }} />
          <div className=" flex gap-2 items-center">
            {" "}
            <IoCall />
            <a href={`tel:${"+880 1960475783"}`}>{"+880 1960475783"}</a>
          </div>
          <div className=" flex gap-2 items-center">
            {" "}
            <IoMdMail />
            <a href={mailtoLink}>{"motopulse@gmail.com"}</a>
          </div>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className=" flex justify-center items-center gap-4 flex-col"
        >
          <h1 className="text-xl font-semibold gradient-text ">We Accept</h1>
          <div className=" flex gap-2 items-center text-3xl">
            {" "}
            <FaCcVisa />
            <SiMastercard />
            <BsCashStack />
          </div>
          <Image
            height={20}
            width={120}
            alt="bkash"
            src={
              "https://i0.wp.com/milvikbd.com/wp-content/uploads/2024/05/Bkash-1.png?w=1080"
            }
          />
          <Image
            height={20}
            width={120}
            alt="bkash"
            src={"https://sslcommerz.com/wp-content/uploads/2021/11/logo.png"}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
