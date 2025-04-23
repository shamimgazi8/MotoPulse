"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function AccessDeniedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const from = searchParams.get("from");
    if (from === "/add-review") {
      setErrorMessage("You must be logged in to write your own review.");
    }
  }, [searchParams]);

  return (
    <div
      data-aos="fade-bottom"
      className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 animate-fade-in"
    >
      <p className="gradient-text font-semibold text-[30px]">
        {errorMessage || "You have to Login!"}
      </p>
      <Image
        priority
        data-aos="fade-top"
        height={500}
        width={500}
        src="/misc/acc.png"
        alt="Access Denied"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-4 animate-fade-in">
        Access Denied
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/users/login")}
          className="btn-primary transition"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/")}
          className="btn-secondary transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default function AccessDenied() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <AccessDeniedContent />
    </Suspense>
  );
}
