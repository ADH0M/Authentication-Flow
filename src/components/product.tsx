"use client";
import React, { useState } from "react";
import ProdcutCard from "./ui/ProdcutCard";
import {  ShopIcon } from "./ui/Icons";

const colors = [
  { name: "Red", class: "bg-[#D90202]" },
  { name: "Blue", class: "bg-[#B8CCDA] ring-2 ring-blue-400" },
  { name: "Olive", class: "bg-[#988755]" },
  { name: "Light", class: "bg-[#7198C8]" },
  { name: "Gray", class: "bg-[#5D5D5B]" },
];
export default function ProductPage() {
  const hero = "/img/last.png";
  const mockup = "/img/seond.png";
  const original = "/img/third.png";

  const thumbnails = [mockup, original, hero];

  const [activeThumb, setActiveThumb] = useState(0);
  const [type, setType] = useState("Cotton");
  const [size, setSize] = useState("2XL");
  const [color, setColor] = useState("Blue");
  const [qty, setQty] = useState(1);

  const price = 300.0;

  return (
    <div className="bg-background md:my-8 my-4 mx-auto container ">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 rounded-xl   flex gap-10 flex-wrap ">
        {/* Left: Images */}
        <ProdcutCard
          activeThumb={activeThumb}
          setActiveThumb={setActiveThumb}        />
        {/* Right: Details */}
        <div className="flex-1 w-1/2 flex flex-col justify-between ">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full border font-semibold
              border-pink-btn  text-pink-btn
            text-sm"
            >
              T-Shirt
            </div>

            <h2 className="mt-4 text-2xl font-medium text-[#020202]">
              J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With Blue
            </h2>

            <div className="mt-4 flex items-baseline gap-3">
              <div className="text-2xl font-medium text-[#020202]">
                ${price.toFixed(2)}
              </div>
              <div className="text-sm  line-through text-[#8A8A8A]">
                $360.00
              </div>
            </div>

            <p className="text-[#333333] text-sm">
              This price is exclusive of taxes.
            </p>

            <p className="mt-4 text-[#020202] text-sm">
              Lorem ipsum dolor sit, consectetur adipiscing elit, sed diam
              nonummy Lorem ipsum dolor sit amet, diam nonummy
            </p>

            <hr className="my-6  text-[#E6E6E6]" />

            <div className="  w-1/2 ">
              <div className="relative">
                <span
                  className="absolute text-sm bg-background px-2 select-none
               -top-2.5 left-3 rounded-full text-[#020202]"
                >
                  Type
                </span>

                <div className="text-sm text-[#020202]">
                  <select
                    id="type-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 outline-none border w-full rounded-xl border-progres-select py-3 px-2 "
                  >
                    <option>Cotton</option>
                    <option>Polyester</option>
                    <option>Blend</option>
                  </select>
                </div>
              </div>

              <div className="relative my-6 text-sm">
                <div className="text-sm text-[#020202]">
                  <span
                    className="absolute text-sm bg-background px-2 select-none
               -top-2.5 left-3 rounded-full "
                  >
                    Size
                  </span>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="mt-1 outline-none border text-sm w-full rounded-xl border-progres-select py-3 px-2 "
                  >
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>2XL</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[20px] text-[#020202] font-medium  mb-2">
                Colors
              </div>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <div
                    key={c.name}
                    className={`rounded-full   w-14 h-14 bg-[#F5F5F5] justify-center items-center flex  ${
                      color === c.name ? "scale-105 ring-1 ring-[#020202]" : ""
                    }`}
                  >
                    <button
                      onClick={() => setColor(c.name)}
                      className={`w-9 h-9  cursor-pointer  rounded-full shadow-sm flex items-center justify-center ${c.class}`}
                      aria-label={c.name}
                    />
                  </div>
                ))}

                <div className="text-sm text-gray-500 ml-3">{color}</div>
              </div>
            </div>

            <div className="mt-10 flex justify-between  gap-2  flex-col  md:flex-row  ">
              
              <div className="relative ">
                <div className="text-[20px] text-[#020202] font-medium  mb-2">
                  Quantity{" "}
                  <span className="text-xs text-[#8A8A8A]">
                    (${(price * qty).toFixed(2)} for Piece)
                  </span>
                </div>

                <div className="flex mt-2 gap-3  items-center">
                  <div
                    className=" flex  justify-between items-center  p-3 w-44 rounded-lg  
                    overflow-hidden bg-[#F5F5F5]"
                  >
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="  bg-[#FFFFFF] text-[#B0B0B0]
                        w-10 h-10 rounded-lg text-3xl 
                        cursor-pointer
                      "
                    >
                      -
                    </button>

                    <div className="px-4 py-2 text-[#333333]">
                      {String(qty).padStart(2, "0")}
                    </div>

                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 rounded-lg text-3xl cursor-pointer 
                      bg-[#FFFFFF] text-#000000"
                    >
                      +
                    </button>
                  </div>

                  <div className="md:text-xl text:[24px] font-medium text-[#020202] mx-2">
                    ${(price * qty).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full md:w-1/2  mt-6 flex  gap-4 justify-end items-center py-2">
                <button className="flex-1 flex justify-center items-center gap-2 py-4 
                cursor-pointer md:max-w-[234px] md:w-[234px]  rounded-xl bg-[#BE968E]
                 text-white font-semibold shadow">
                  <span className="text-sm">Add To Cart</span>
                  <ShopIcon />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}
