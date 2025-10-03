import React from "react";
import { ChatIcon } from "./ui/Icons"; // keep your existing icon import
import { Review } from "@/lib/types";
import StarRating from "./ui/StartRating";
import RatingBar from "./ui/RatingBar";

const RatingReviewsPage: React.FC = () => {
  const reviews: Review[] = [
    {
      id: "ale832",
      name: "Alex Daewn",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed",
      date: "4 months ago",
    },
    {
      id: "akldfl",
      name: "Alex Daewn",
      rating: 4,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed",
      date: "4 months ago",
    },
    {
      id: "ad838k",
      name: "Alex Daewn",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed",
      date: "4 months ago",
    },
    {
      id: "ald2k.89",
      name: "Alex Daewn",
      rating: 2,
      comment:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed",
      date: "4 months ago",
    },
  ];

  const distribution = [67, 15, 6, 3, 9];

  return (
    <section className="mx-auto container mt-18 font-sans">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 rounded-xl">
        <h2 className="font-semibold text-2xl text-[#020202] mb-8">
          <span className="block">Rating & Reviews</span>
          <span className="w-10 h-1 block bg-[#BE968E] rounded-2xl" />
        </h2>

        <header className="grid grid-cols-1 xl:grid-cols-4 items-center gap-6">
          <div className="w-full col-span-1 flex justify-center lg:justify-start items-end space-x-4 mb-4 md:mb-8">
            <div className="text-6xl font-medium text-[#020202] text-[120px] p-1">
              4,5
            </div>
            <div className="text-2xl text-[#B0B0B0]">/5</div>
          </div>

          <div className="col-span-1 lg:col-span-2 w-full mb-4 md:mb-8">
            {distribution.map((p, idx) => {
              const star = 5 - idx;
              return <RatingBar key={star} star={star} percentage={p} />;
            })}
          </div>

          <div className="col-span-1 w-full flex justify-center items-center flex-col mb-4 md:mb-8">
            <div className="flex justify-center w-full items-center space-x-2 mb-2 flex-col">
              <span className="text-[16px] text-[#545454] p-2">
                Total Reviews
              </span>
              <span className="text-[60px] font-semibold text-[#020202]">
                3.0K
              </span>
            </div>

            <button
              className="flex-1 flex justify-center items-center gap-2 py-4 cursor-pointer w-full max-w-xs md:max-w-[234px] rounded-xl bg-[#BE968E] text-white font-semibold shadow hover:opacity-90"
              type="button"
            >
              <span className="text-[16px]">Add Comment</span>
              <ChatIcon />
            </button>
          </div>
        </header>

        <div className="space-y-6 mt-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        <div className="w-ful flex justify-center items-center mt-10 ">
          <button className="bg-[#F5F5F5] px-8 py-4 rounded-xl text-[#BE968E] hover:opacity-65 cursor-pointer">
            View More Comments
          </button>
        </div>
      </div>
    </section>
  );
};

const ReviewCard: React.FC<{ review: Review; index: number }> = ({
  review,
  index,
}) => {
  return (
    <div
      className={`p-4 rounded-lg ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      } border border-gray-100`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className="font-semibold text-gray-800 mr-3">{review.name}</div>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} reviewId={review.id} size={16} />
          </div>
        </div>
        <div className="text-xs text-gray-500">{review.date}</div>
      </div>
      <p className="text-gray-600 leading-relaxed mt-2">{review.comment}</p>
    </div>
  );
};

export default RatingReviewsPage;
