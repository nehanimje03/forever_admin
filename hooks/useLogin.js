"use client";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { loginUser } from "../components/login/api";
import { toast } from "react-toastify";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log("Login success:", data);
      toast.success("Login successfully");
      Cookies.set("token", data.access_token);
    },

    onError: (error) => {
      console.error("Login failed:", error.message);
      toast.error(error.message || "Login failed");
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
};
