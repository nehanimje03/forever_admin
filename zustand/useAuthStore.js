import { create } from "zustand";

import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,

  token: null,

  setUser: (user) => {
    set({ user });
  },

  setToken: (token) => {
    if (token) {
      Cookies.set("token", token);
    }

    set({ token });
  },

  clearToken: () => {
    Cookies.remove("token");

    set({ token: null });
  },

  logout: () => {
    Cookies.remove("token");

    set({
      user: null,
      token: null,
    });
  },
}));
