import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className=" w-full min-h-screen  ">
      <Navbar />
      <section className="grid place-items-center">
        <Image
          width={500}
          height={100}
          alt=""
          src={"/img/navSection.jpg"}
          className="min-w-full grayscale opacity-5 object-cover   col-start-1 col-end-3 row-start-1 row-end-2
        h-[186px]  z-10"
        />

        <div
          className="col-start-1 col-end-3 row-start-1 row-end-2 justify-center items-center flex z-20
        h-[186px] bg-cover bg-center relative"
        >
          <h2 className="productDetailsBg z-40 select-none ">
            Product Details
          </h2>
          <h4 className="z-50 text-black-text absolute text-2xl">Product Details</h4>
        </div>
      </section>
    </div>
  );
};

export default page;
