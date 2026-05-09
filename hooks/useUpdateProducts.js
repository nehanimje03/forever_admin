import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../components/productList/api";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, formData }) => updateProduct(productId, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error("Update Product Hook Error:", error.message);
    },
  });
};
