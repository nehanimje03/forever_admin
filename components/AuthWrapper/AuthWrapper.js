"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import Login from "../login/login";

import AdminSidebar from "../sidebar/Sidebar";

import { useAuthStore } from "../../zustand/useAuthStore";

const AuthWrapper = ({ children }) => {
  const { setToken, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    setToken(storedToken || null);
    setMounted(true);
  }, [setToken]);

    if (!mounted) return null;
    if (!token) {
      return <Login />;
    }

  return <AdminSidebar>{children}</AdminSidebar>;
};

export default AuthWrapper;
