// api/auth.js
export const loginUser = async ({ email, password }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/custom-admin/admin/login/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.data;
};
