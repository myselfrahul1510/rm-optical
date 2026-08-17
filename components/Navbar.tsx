"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    {
      name: "Home",
      link: "#home",
    },
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "Collection",
      link: "#collection",
    },
    {
      name: "Doctors",
      link: "#doctors",
    },
    {
      name: "Contact",
      link: "#contact",
    },
    {
      name: "my Collection",
      link: "/my-collection",
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden bg-[#0A2E73] text-white md:block">
        <div className="container flex h-10 items-center justify-center">
          <p className="text-sm font-medium tracking-wide">
            👁 Computerised Eye Testing &nbsp; | &nbsp; 
            👓 Premium Frames &nbsp; | &nbsp; 
            🕶 Sunglasses &nbsp; | &nbsp; 
            🧿 Contact Lens
          </p>
        </div>
      </div>

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 shadow-lg backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-xl"
        }`}
      >
        <div className="container flex h-24 items-center justify-between gap-1">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col justify-center leading-none"
          >
            <span className="text-[38px] md:text-[38px] font-extrabold tracking-tight text-[#0A2E73] whitespace-nowrap">
              R.M OPTICAL
            </span>

            {/* Subtitle - Increased size and showing full text on mobile */}
            <span className="mt-1 text-[13px] md:text-[13px] text-gray-500">
              আপনার চোখের যত্নে আমরা আছি আপনার পাশে
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-9 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="font-medium text-gray-700 transition duration-300 hover:text-[#0A2E73]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            
            {/* Book Eye Test Button */}
            <Link
              href="/book-eye-test"
              className="group inline-flex items-center justify-center gap-1 md:gap-2 rounded-full px-4 py-2 md:px-8 md:py-3.5 text-[14px] md:text-[15px] font-bold ring-2 ring-[#0A2E73]/30 ring-offset-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 w-auto md:w-[10rem]"
              style={{
                color: "rgb(6, 249, 209)",
                backgroundColor: "rgb(13, 8, 98)",
                height: "2.5rem",
              }}
            >
              {/* Mobile Text */}
              <span className="md:hidden">Book</span>
              {/* Desktop Text */}
              <span className="hidden md:inline">Book Eye Test</span>

              {/* Arrow Icon */}
              <svg
                className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-1.5 transition hover:bg-gray-100 lg:hidden"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t bg-white py-6 lg:hidden shadow-lg">
            {/* Added container and pl-6 to push items to the right and align perfectly */}
            <div className="container flex flex-col">
              <nav className="flex flex-col gap-6 pl-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold text-gray-700 hover:text-[#0A2E73] transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}