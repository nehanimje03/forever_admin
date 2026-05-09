import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../components/productList/api";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => deleteProduct(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error("Delete Product Hook Error:", error.message);
    },
  });
};
