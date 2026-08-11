"use client";

import Link from "next/link";
import { useState } from "react";

const menus = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Products",
    href: "/admin/products",
  },
  {
    name: "Add Product",
    href: "/admin/add-product",
  },
  {
    name: "Appointments Details",
    href: "/admin/appointments",
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden w-64 shrink-0 bg-[#0A2E73] text-white md:block md:min-h-screen">
        {/* Logo */}
        <div className="px-6 py-6">
          <h2 className="text-2xl font-bold">
            R.M OPTICAL
          </h2>

          <p className="mt-1 text-sm text-blue-200">
            Admin Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="rounded-lg px-4 py-3 transition hover:bg-white/10"
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* ================= MOBILE MENU ================= */}
      <div className="block w-full bg-[#0A2E73] px-4 py-3 md:hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-white">
              R.M OPTICAL
            </h2>

            <p className="text-xs text-blue-200">
              Admin Panel
            </p>
          </div>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-95"
          >
            <span>Menu</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open
              ? "mt-3 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="rounded-lg border border-white/10 bg-white/5 p-2"
            style={{color:"white", padding:"5px "}}>
              {menus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {menu.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}