import React from "react";
import { DownIcon } from "./ui/Icons";

const Banner = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-[56px] mt-4 mx-auto container  ">
      <div
        className="bg-banner flex px-6 rounded-2xl justify-between items-center
       w-full h-full  gap-2 "
      >
        <div className="banner  flex justify-center items-center gap-2">
          {" "}
          <span>Home</span> <DownIcon className="-rotate-90 w-6" />
        </div>
        <div className="banner flex justify-center items-center gap-2">
          <span>our category</span> <DownIcon className="-rotate-90 w-6" />
        </div>
        <div className="banner flex-1 text-[#8A8A8A]">product details</div>

        <div></div>
      </div>
    </section>
  );
};

export default Banner;
