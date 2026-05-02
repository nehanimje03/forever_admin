"use client";

import React from "react";
import Link from "next/link";
import { PlusSquare, List, ShoppingCart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-300">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l active"
          href="/addProduct"
        >
          <PlusSquare className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </Link>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          href="/productsList"
        >
          <List className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </Link>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
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
