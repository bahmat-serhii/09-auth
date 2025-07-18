// lib/store/authStore.ts
import { create } from "zustand";
import type { User } from "@/types/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User) => {
    set(() => {
      return { user, isAuthenticated: true };
    });
  },
  clearIsAuthenticated: () => {
    set(() => {
      return { user: null, isAuthenticated: false };
    });
  },
}));
