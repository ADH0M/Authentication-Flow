import { RatingBarProps } from "@/lib/types";

const RatingBar: React.FC<RatingBarProps> = ({ star, percentage }) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2 mr-3 min-w-[72px]">
        {/* star icon + number */}
        <svg
          className="w-4 h-4 text-[#BE968E] flex-shrink-0"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M8.03281 1.27141C8.8375 -0.423802 11.1625 -0.423805 11.9672 1.27141L13.3579 4.20118C13.6774 4.87435 14.2951 5.34094 15.0096 5.44888L18.1193 5.91869C19.9187 6.19053 20.6371 8.48954 19.3351 9.80908L17.0849 12.0896C16.5679 12.6136 16.332 13.3685 16.454 14.1084L16.9852 17.3285C17.2926 19.1918 15.4116 20.6126 13.8022 19.7329L11.0208 18.2126C10.3817 17.8633 9.61825 17.8633 8.97917 18.2126L6.19776 19.7329C4.58839 20.6126 2.70742 19.1918 3.01479 17.3286L3.54599 14.1084C3.66804 13.3685 3.43211 12.6136 2.91508 12.0896L0.664875 9.80908C-0.637134 8.48954 0.0813282 6.19053 1.88066 5.91869L4.99037 5.44888C5.70489 5.34094 6.32257 4.87435 6.64211 4.20118L8.03281 1.27141Z"
            fill="#BE968E"
          />
        </svg>

        <span className="text-[#545454] font-medium text-[20px]">{star}</span>
      </div>

      <div className="flex-1 mx-3">
        <div className="w-full bg-[#E6E6E6] rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-[#BE968E]"
            style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
            aria-hidden
          />
        </div>
      </div>

      <div className="ml-3 min-w-[48px] text-[#545454] font-medium text-[20px]">
        {percentage}%
      </div>
    </div>
  );
};


export default RatingBar