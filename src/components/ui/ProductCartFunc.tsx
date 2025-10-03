import { ProductCardProps } from "@/lib/types";
import Image from "next/image";
import React from "react";
import { RightIcon } from "./Icons";

const ProductCard: React.FC<ProductCardProps> = ({
  activeThumb,
  setActiveThumb,
  thumbnails,
}) => {
  // Ensure activeThumb is within bounds
  const currentImage = thumbnails[activeThumb] || thumbnails[0];

  return (
    <div className="flex-1 w-full md:w-1/2">
      <div className="rounded-xl">
        <div className="rounded-xl bg-mainCard overflow-hidden">
          {/* Progress Indicators (responsive) */}
          <div className="min-w-full rounded-xl bg-[linear-gradient(to_top,#F4F4F433,#0000004D)] p-5 h-20">
            <div className="flex justify-center gap-2 md:gap-5 items-center">
              {thumbnails.slice(0, 4).map((_, idx) => (
                <div
                  key={idx}
                  className={`h-[4px] flex-1 max-w-[120px] rounded-full ${
                    idx === Math.min(activeThumb, 3)
                      ? "bg-progres-isSelect"
                      : "bg-progres-select"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="relative flex justify-center items-center rounded-lg overflow-hidden py-4">
            <Image
              src={currentImage}
              alt="Product main view"
              width={305}
              height={514}
              className="object-contain md:h-[470px] md:w-[305px] h-[381px] w-full max-w-[350px] bg-mainCard"
              priority
            />

            {/* Navigation Arrows */}
            <button
              aria-label="Previous image"
              onClick={() =>
                setActiveThumb((prev: number) =>
                  prev > 0 ? prev - 1 : thumbnails.length - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#C4C4C4] flex justify-center items-center rounded-full shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <span className="rotate-180">
                <RightIcon />
              </span>
            </button>

            <button
              aria-label="Next image"
              onClick={() =>
                setActiveThumb((prev: number) =>
                  prev < thumbnails.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#BE968E] flex justify-center items-center rounded-full shadow text-white focus:outline-none focus:ring-2 focus:ring-[#BE968E]"
            >
              <RightIcon />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-2 md:mt-3 grid grid-cols-4 gap-2">
          {thumbnails.slice(0, 4).map((thumb, i) => (
            <div
              key={i}
              className="relative bg-mainCard rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setActiveThumb(i)}
                aria-label={`View image ${i + 1}`}
                className={`w-full h-full p-1 rounded-xl transition-opacity ${
                  i === activeThumb
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-90"
                }`}
              >
                <Image
                  src={thumb}
                  alt={`Thumbnail ${i + 1}`}
                  width={132}
                  height={140}
                  className="w-full h-24 md:h-32 object-cover rounded-lg"
                />
              </button>

              {/* "+2" badge on last visible thumbnail if more images exist */}
              {i === 3 && thumbnails.length > 4 && (
                <div className="absolute inset-0 bg-black/60 flex justify-center items-center text-white text-sm font-medium rounded-xl">
                  +{thumbnails.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
