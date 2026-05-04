import Cookies from "js-cookie";

export const addProduct = async (formData) => {
  try {
    const token = Cookies.get("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/custom-admin/create-product/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend Error:", data);
      throw new Error(data.message || "Failed to add product");
    }

    return data;
  } catch (error) {
    console.error("Add Product Error:", error.message);
    return null;
  }
};
