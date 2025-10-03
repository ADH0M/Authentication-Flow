import { ProductCardProps } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { RightIcon } from "./Icons";

const ProductCard: React.FC<ProductCardProps> = ({
  activeThumb,
  setActiveThumb,
  thumbnails,
}) => {
  return (
    <div className="flex-1 w-1/2 ">
      <div className="rounded-xl ">
        <div className="rounded-xl bg-mainCard  ">
          <div
            className=" min-w-full  rounded-xl bg-[linear-gradient(to_top,#F4F4F433,#0000004D)] p-5
         h-20 "
          >
            <div className=" flex justify-center gap-5 items-center ">
              <div className="bg-progres-select h-[4px] w-[492px]  rounded-full" />
              <div className="bg-progres-select h-[4px] w-[492px]  rounded-full" />
              <div className="bg-progres-select h-[4px] w-[492px]  rounded-full" />
              <div className="bg-progres-isSelect h-[4px] w-[492px]  rounded-full" />
            </div>
          </div>

          <div className="relative flex justify-center items-center rounded-lg overflow-hidden">
            <Image
              src={thumbnails[activeThumb]}
              alt="product"
              width={305}
              height={514}
              className="object-contain md:h-[470px] md:w-[305px] h-[381px] w-[350px]  bg-mainCard"
            />

            {/* Nav arrows (visual only) */}
            <button
              className="absolute left-3 top-1/2 md:w-10 md:h-10  lg:w-12 lg:h-12 w-8 h-8
          -translate-y-1/2 bg-[#C4C4C4] p-1 flex justify-center 
          items-center rounded-full shadow"
            >
              <span className=" rotate-180">
                <RightIcon />
              </span>
            </button>

            <button
              className="absolute text-lg text-progres-isSelect right-3 top-1/2 md:w-10 md:h-10  lg:w-12 lg:h-12 w-8 h-8 -translate-y-1/2
           bg-[#BE968E] p-2 rounded-full justify-center items-center flex shadow"
            >
              <RightIcon />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="  mt-1 md:mt-2 rounded-2xl grid grid-cols-3  ">
          {thumbnails.map((t, i) => (
            <div
              key={i}
              className="relative  bg-mainCard flex justify-center items-center mx-1 rounded-xl "
            >
              <button
                onClick={() => setActiveThumb(i)}
                className={`block rounded-lg    ${
                  i === activeThumb ? "" : "border-transparent "
                }`}
              >
                <Image
                  src={t}
                  alt={`thumb-${i}`}
                  width={132}
                  height={140}
                  className="w-28 max-h-40 h-40 object-cover rounded-xl bg-mainCard"
                />
              </button>
              {i === thumbnails.length - 1 && (
                <p className="absolute inset-0 flex justify-center items-center text-center bg-black/60
                 text-white text-sm px-2 py-1 rounded-2xl">
                    <span className="block">+2</span>
                </p>
              )}
            </div>
          ))}

          <div />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
