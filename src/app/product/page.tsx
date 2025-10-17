'use client';
import Banner from "@/components/Banner";
import FooterSection from "@/components/Footer";
import ProductDetails from "@/components/product";
import RatingReviewsPage from "@/components/Rating";
import SimilarItemsSection from "@/components/SimilarSection";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import React from "react";


const page = () => {
  return (
    <div className="  ">
      <Navbar />
      <section className="grid place-items-center">

        <div className="relative col-start-1 col-end-3 row-start-1 row-end-2 h-[186px] w-full">
          <Image
            fill
            alt="Main product showcase"
            src="/img/navSection.jpg"
            className="min-w-full grayscale opacity-5 object-cover z-10"
            quality={75}
            sizes="(max-width: 768px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..." // Your blur hash
          />
        </div>

        <div
          className="col-start-1 col-end-3 row-start-1 row-end-2 justify-center items-center flex z-20
        h-[186px] bg-cover bg-center relative"
        >
          <h2 className="productDetailsBg z-40 select-none ">
            Product Details
          </h2>
          <h4 className="z-50 text-black-text absolute text-2xl">
            Product Details
          </h4>
        </div>
      </section>
      <Banner />
      <ProductDetails />
      <RatingReviewsPage />
      <SimilarItemsSection />
      <FooterSection />
    </div>
  );
};

export default page;
