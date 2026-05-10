"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../zustand/useAuthStore";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const { mutate, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data) {
            console.log(data);
            setToken(data.access_token);
            setUser(data.user);
            router.push("/");
          }
        },

        onError: (error) => {
          console.error("Login failed:", error.message);
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-sm">
        {" "}
        <h1 className="text-2xl font-bold mb-4 ">Admin Panel</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="text-sm font-medium mb-2">Email Address</p>
            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium mb-2">Password</p>
            <input
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
