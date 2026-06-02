export const fetchAdminOrders = async (token, status) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/custom-admin/admin-orders/`,
  );

  if (status) {
    url.searchParams.append("status", status);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || "Failed to fetch admin orders");
  }

  return res.json();
};
