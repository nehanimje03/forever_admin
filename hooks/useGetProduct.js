import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../components/productList/api";

export const useGetProduct = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    select: (res) => res?.data?.results || [],
    keepPreviousData: true,
  });
};
