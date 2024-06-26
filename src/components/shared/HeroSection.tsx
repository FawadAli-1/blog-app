"use client";

import Image from "next/image";
import philosopher from "../../../public/images/philosopher.png";
import { Button } from "../ui/button";
import { CircleChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToBlogs = () => {
    const element = document.getElementById("all-blogs");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col-reverse sm:flex-row my-8 sm:w-auto">
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-16 mt-4">
        <h1 className="text-5xl text-center font-bold uppercase text-slate-900 dark:text-slate-100">
          Become <span className="text-primary">Better...</span>
        </h1>
        <p className="text-center w-3/4 text-slate-900 dark:text-slate-100">
          Empower your journey towards self-discipline, personal growth, and
          lasting motivation. Explore insights, stories, and strategies to
          elevate your life and unlock your true potential.
          <br />
          <br />
          This blog is for those who want to do{" "}
          <span className="text-primary font-medium text-xl uppercase">
            something
          </span>{" "}
          with their life, instead of{" "}
          <span className="text-red-600 font-medium text-sm">
            procrastinating
          </span>{" "}
          about doing it.
        </p>
        <Button onClick={scrollToBlogs} className="text-slate-100">
          See All Blogs{" "}
          <CircleChevronDown className="size-5 fill-none stroke-slate-50 ml-1" />
        </Button>
      </div>
      <div className="w-full mb-4 sm:w-1/2 flex items-center justify-center">
        <Image src={philosopher} alt="image" width={600} priority/>
      </div>
    </div>
  );
};

export default HeroSection;
