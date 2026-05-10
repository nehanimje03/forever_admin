import { create } from "zustand";

import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,

  token: null,

  // SET USER
  setUser: (user) => {
    set({ user });
  },

  // SET TOKEN
  setToken: (token) => {
    if (token) {
      Cookies.set("token", token);
    }

    set({ token });
  },

  // CLEAR TOKEN
  clearToken: () => {
    Cookies.remove("token");

    set({ token: null });
  },

  // LOGOUT
  logout: () => {
    Cookies.remove("token");

    set({
      user: null,
      token: null,
    });
  },
}));
