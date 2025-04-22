// pages/404.tsx
import React from "react";
import Link from "next/link";
import InitialLoader from "@/modules/@common/intialLoader";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[88vh] text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl  mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link className="btn-secondary mt-10" href="/">
        Go Back to Home
      </Link>
    </div>
  );
};

export default Custom404;
