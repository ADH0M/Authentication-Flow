// components/SimilarItemsSection.tsx
import React from "react";
import { HeartIcon, ShopAddIcon, StarIcon } from "./ui/Icons";
import Image from "next/image";

const imsSimilarSection = [
  "/img/similarSection/one.png",
  "/img/similarSection/two.png",
  "/img/similarSection/three.png",
  "/img/similarSection/four.png",
  "/img/similarSection/four.png", // duplicate for demo
];

const SimilarItemsSection: React.FC = () => {
  return (
    <section className="mx-auto container mt-20 font-sans mb-20 ">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 rounded-xl">
        <h2 className="font-semibold text-2xl text-[#020202] mb-8">
          <span className="block">Similar Items</span>
          <span className="w-10 h-1 block bg-[#BE968E] rounded-2xl" />
        </h2>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {imsSimilarSection.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[176px] md:w-[270px] p-3  border
               border-progres-select rounded-lg shadow 
              hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className=" flex flex-col h-60 w-full mb-3 overflow-hidden  rounded-lg">
                {/* Icons Overlay */}
                <div className=" flex p-2 justify-between gap-2 w-full ">
                  <div
                    className=" border border-progres-select text-[#BE968E] 
                text-xs px-2 py-1 rounded-md"
                  >
                    25% OFF
                  </div>

                  <div>
                    <button
                      className="p-1 mx-1 rounded-md shadow-sm border 
                    cursor-pointer border-progres-select hover:opacity-75"
                    >
                      <ShopAddIcon className="w-5 h-5" />
                    </button>

                    <button className="p-1 mx-1 rounded-md shadow-sm border border-progres-select hover:opacity-75 ">
                      <HeartIcon className="w-5 h-5  text-[#BE968E] cursor-pointer " />
                    </button>
                  </div>
                </div>

                <div className=" h-full w-full overflow-hidden">
                  <Image
                    src={src}
                    width={196}
                    height={196}
                    alt={src}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Sale Badge */}
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                <p className=" flex justify-between">
                  <span className="text-xs block text-[#545454]">Dresses</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#BE968E]">
                      <StarIcon />
                    </span>
                    <span className="text-xs text-[#020202]">4.5</span>
                    <span className="text-xs text-[#545454]">(2910)</span>
                  </span>
                </p>

                <h3 className="text-sm text-[#020202] font-medium line-clamp-2">
                  J.VER Women’s Dress Shirts Solid Long Sleeve Stretch
                  Wrinkle-Free With Yello...
                </h3>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-[16px]  text-[#020202]">
                    AED 900
                  </span>
                  <span className="text-xs text-[#8A8A8A] line-through">
                    AED 1200
                  </span>
                  <div className="flex items-center  gap-1">
                    <div className="w-4 h-4 p-1 rounded-full bg-[#BE968E]" />
                    <div className="w-4 h-4 p-1 rounded-full bg-[#545454]" />
                    <div className="w-4 h-4 p-1 rounded-full bg-[#E8EDF2]" />
                    <span className="text-xs text-[#020202]">+2</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="w-8 h-8 bg-gray-200 rounded-full 
          flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>

          <button className="w-8 h-8 bg-[#BE968E] cursor-pointer text-progres-isSelect rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SimilarItemsSection;
