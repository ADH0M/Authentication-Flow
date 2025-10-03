import React from "react";
import Image from "next/image";
import { FooterIcon } from "./ui/Icons";

const footerImage = "/img/kids.jpg";

const FooterSection: React.FC = () => {
  return (
    <footer className="relative pt-10 pb-6 bg-gray-800 text-white ">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 rounded-xl min-h-[323px]">
        {/* Background Image with Overlay */}

        <div className="absolute inset-0 overflow-hidden ">
          <Image
            src={footerImage}
            alt="Footer background"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-amber-900/10"></div>
        </div>

        <div className=" mx-auto px-10 pt-5  container relative z-10 ">
          <div className="grid grid-cols-1 justify-center items-center md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <span className="block mb-4">
                <FooterIcon />
              </span>

              <p className="text-sm text-[#FFFFFFB2]  leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>

            {/* Let Us Help */}
            <div>
              <h3 className="font-semibold mb-4 text-2xl">Let Us Help</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    All Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cancellation Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Send Email & Social */}
            <div>
              <h3 className="font-semibold mb-4">Send Email</h3>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 bg-gray-700 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BE968E]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#BE968E] text-white rounded-md font-medium hover:bg-[#BE968E]/90 transition-colors"
                >
                  Send
                </button>
              </form>

              <div className="mt-6">
                <h4 className="text-sm mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.916 7.346 6.763 7.907V12.9c0-1.867-1.467-3.33-3.33-3.33-1.425 0-2.65 1.035-3.01 2.456h-3.01v-2.9c0-3.33 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6-1.867 0-3.33-1.467-3.33-3.33V8.049c0-2.65 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6 0 1.867 1.467 3.33 3.33 3.33 2.65 0 6-2.65 6-6 0-2.65-2.65-6-6-6z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.916 7.346 6.763 7.907V12.9c0-1.867-1.467-3.33-3.33-3.33-1.425 0-2.65 1.035-3.01 2.456h-3.01v-2.9c0-3.33 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6-1.867 0-3.33-1.467-3.33-3.33V8.049c0-2.65 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6 0 1.867 1.467 3.33 3.33 3.33 2.65 0 6-2.65 6-6 0-2.65-2.65-6-6-6z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.916 7.346 6.763 7.907V12.9c0-1.867-1.467-3.33-3.33-3.33-1.425 0-2.65 1.035-3.01 2.456h-3.01v-2.9c0-3.33 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6-1.867 0-3.33-1.467-3.33-3.33V8.049c0-2.65 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6 0 1.867 1.467 3.33 3.33 3.33 2.65 0 6-2.65 6-6 0-2.65-2.65-6-6-6z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.916 7.346 6.763 7.907V12.9c0-1.867-1.467-3.33-3.33-3.33-1.425 0-2.65 1.035-3.01 2.456h-3.01v-2.9c0-3.33 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6-1.867 0-3.33-1.467-3.33-3.33V8.049c0-2.65 2.65-6 6-6 2.65 0 6 2.65 6 6 0 2.65-2.65 6-6 6 0 1.867 1.467 3.33 3.33 3.33 2.65 0 6-2.65 6-6 0-2.65-2.65-6-6-6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
