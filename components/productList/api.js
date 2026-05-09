import Cookies from "js-cookie";

export const getProducts = async (params) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/custom-admin/get-product/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(params),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch products");
    }

    return data;
  } catch (error) {
    console.error("Get Products Error:", error.message);
    throw error;
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/custom-admin/update-product/?product_id=${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to update product");
    }

    return data;
  } catch (error) {
    console.error("Update Product Error:", error.message);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/custom-admin/delete-product/?product_id=${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to delete product");
    }

    return data;
  } catch (error) {
    console.error("Delete Product Error:", error.message);

    throw error;
  }
};
