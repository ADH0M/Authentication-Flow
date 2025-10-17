import { ProductCardProps } from "@/lib/types";
import Image from "next/image";
import React, { useState } from "react";
import { RightIcon } from "./Icons";
import { wrap, motion, AnimatePresence } from "motion/react";

const thumbnails = [
  "/img/main.png",
  "/img/seond.png",
  "/img/last.png",
  "/img/third.png",
];

const ProductCard: React.FC<ProductCardProps> = ({
  activeThumb,
  setActiveThumb,
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const ind = wrap(0, thumbnails.length, page);
  const paginate = function (dirc: 1 | -1) {
    setPage([page + dirc, dirc]);
    return 0;
  };

  const handleNext = () => {
    paginate(1);
    return 0;
  };

  const handlePrev = () => {
    paginate(-1);
    return 0;
  };

  return (
    <div className="flex-1 w-1/2 ">
      <div className="rounded-xl ">
        <div
          className=" min-w-full  max-w-full rounded-xl bg-[linear-gradient(to_top,#F4F4F433,#0000004D)]
           p-5 h-20 "
        >
          <div className=" flex justify-center gap-5 items-center ">
            {thumbnails.map((im, indx) => (
              <div
                className={`${
                  indx === ind ? "bg-progres-isSelect" : "bg-progres-select"
                } h-[4px] w-[492px]  rounded-full`}
                key={indx}
              />
            ))}
          </div>
        </div>
        <div
          className="rounded-xl relative bg-mainCard md:h-[470px]  
              h-[381px]  max-h-[381px]   overflow-hidden"
        >
          <AnimatePresence custom={direction}>
            <motion.div
              className=" rounded-lg md:h-[470px] md:w-[305px] 
              h-[381px] w-[350px] max-h-[381px] max-w-[350px]"
              custom={direction}
              initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
              key={ind}
              drag="x"
              onDragEnd={(e , {offset , velocity})=>{
                  const swap = offset.x * velocity.x
                  if(swap < 300){
                    paginate(1)
                  }else{paginate(-1)}
              }}
              dragElastic={200}
            >
              <Image
                src={thumbnails[ind]}
                alt="product"
                fill
                className="object-cover bg-mainCard pointer-events-none"
               
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows (visual only) */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 md:w-10 md:h-10  lg:w-12 lg:h-12 w-8 h-8
          -translate-y-1/2 bg-[#C4C4C4] p-1 flex justify-center 
          items-center rounded-full shadow"
          >
            <span className=" rotate-180">
              <RightIcon />
            </span>
          </button>

          <button
            onClick={handleNext}
            className="absolute text-lg text-progres-isSelect right-3 top-1/2 md:w-10 md:h-10  lg:w-12 lg:h-12 w-8 h-8 -translate-y-1/2
           bg-[#BE968E] p-2 rounded-full justify-center items-center flex shadow"
          >
            <RightIcon />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="  mt-1 md:mt-2 rounded-2xl grid grid-cols-3  ">
          {thumbnails.map((t, i) => {
            return (
              i !== ind && (
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
                    <p
                      className="absolute inset-0 flex justify-center items-center text-center bg-black/60
                 text-white text-sm px-2 py-1 rounded-2xl"
                    >
                      <span className="block">+2</span>
                    </p>
                  )}
                </div>
              )
            );
          })}

          <div />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
