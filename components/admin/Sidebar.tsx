"use client";

import Link from "next/link";

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
    name: "Categories",
    href: "/admin/categories",
  },
  {
    name: "Settings",
    href: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#0A2E73] text-white">
      <div className="border-b border-white/20 p-6">
        <h2 className="text-2xl font-bold">
          R.M OPTICAL
        </h2>

        <p className="mt-1 text-sm text-blue-200">
          Admin Panel
        </p>
      </div>

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
  );
}