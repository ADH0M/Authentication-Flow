"use client";
import Link from "next/link";
import { useState } from "react";

import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  AboutIcon,
  CategoryIcon,
  ContactIcon,
  FaqIcon,
  HeartIcon,
  HomeIcon,
  Logo,
  NotificationIcon,
  ShopIcon,
  UserIcon,
} from "./Icons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Our Category", href: "/category", icon: CategoryIcon },
    { name: "About Us", href: "/about", icon: AboutIcon },
    { name: "Contact Us", href: "/contact", icon: ContactIcon },
    { name: "FAQs", href: "/faqs", icon: FaqIcon },
  ];

  // Icon Section Component
  const IconSection = () => (
    <div className="flex items-center  md:space-x-3 lg:space-x-4">
      <button className="p-1 navIcon rounded-full hover:bg-gray-100 transition-colors">
        <ShopIcon />
      </button>
      <button className="p-1 navIcon rounded-full hover:bg-gray-100 transition-colors">
        <NotificationIcon />
      </button>
      <button className="p-1 navIcon rounded-full hover:bg-gray-100 transition-colors">
        <HeartIcon />
      </button>
      <button className="p-1 navIcon rounded-full hover:bg-gray-100 transition-colors">
        <UserIcon />
      </button>
    </div>
  );

  return (
    <nav className="bg-white  sticky top-0 left-0 z-50 md:px-6 shadow ">
      <div className="w-full  px-4 sm:px-6 lg:px-8 h-[91px] flex justify-center ">
        <div className="flex gap-10 justify-between items-center min-w-full  ">
          {/* Logo Section */}
          <div className="">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className=" hidden md:flex items-center space-x-5 max-h-[21px] ">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="min-h-full hover:text-indigo-600 font-medium transition-colors"
              >
                <div className="navText flex gap-1 items-center text-sm">
                  <item.icon />
                  <span className="navText ">{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Icon Section (Desktop) */}
          <div className="flex-1 hidden md:flex justify-end items-center ">
            <IconSection />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex justify-center px-2">
              <IconSection />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
