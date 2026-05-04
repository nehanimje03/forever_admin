import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addProduct } from "../components/addProduct/api";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      toast.success("Product added successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
};
