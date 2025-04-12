import HomePage from "@/modules/home/Home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MotoPulse",
  keywords: "motorcyle bike ",
  description: "Bike informmation and review website",
};

const Home = () => {
  return (
    <>
      <HomePage />
    </>
  );
};

export default Home;
