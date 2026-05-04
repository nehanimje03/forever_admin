"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ important
import { PlusSquare, List, ShoppingCart } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname(); // current route

  const linkClass = (path) =>
    `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition ${
      pathname === path
        ? "bg-pink-100 border-pink-400" // ✅ active style
        : "hover:bg-gray-100"
    }`;

  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <Link
          className={linkClass("/addProduct")}
          href="/addProduct"
        >
          <PlusSquare className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </Link>

        <Link
          className={linkClass("/productsList")}
          href="/productsList"
        >
          <List className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </Link>

        <Link
          className={linkClass("/orders")}
          href="/orders"
        >
          <ShoppingCart className="w-5 h-5" />
          <p className="hidden md:block">Orders</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
