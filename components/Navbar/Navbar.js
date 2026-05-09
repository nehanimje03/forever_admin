"use client";

import React, { useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import LogoutModal from "./LogoutModel";
import { useAuthStore } from "../../zustand/useAuthStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success("Logout successfully");
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center py-2 px-[4%] justify-between">
        <div>
          <Image
            className="w-25"
            alt="logo"
            src={logo}
          />
          <p className="text-[#C77B94] font-medium">ADMIN PANEL</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-lg text-xs sm:text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>

      <LogoutModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
