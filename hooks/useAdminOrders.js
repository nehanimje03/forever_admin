import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { fetchAdminOrders } from "../components/order/api";

export const useAdminOrders = (status) => {
  const token = Cookies.get("token");

  return useQuery({
    queryKey: ["admin-orders", status],
    queryFn: () => fetchAdminOrders(token, status),
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
  });
};
