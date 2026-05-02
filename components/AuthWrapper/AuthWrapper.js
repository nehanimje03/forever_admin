"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Login from "../login/login";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import { useAuthStore } from "../../zustand/useAuthStore";

const AuthWrapper = ({ children }) => {
  const { setToken, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");

    setToken(storedToken || null);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!token) {
    return <Login />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <hr className="border-gray-300" />

      <div className="flex w-full">
        <Sidebar />
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
