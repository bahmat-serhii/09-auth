"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetcSession = async () => {
      try {
        await checkSession();
        const user = await getMe();
        if (user) setUser(user);
      } catch (error) {
        clearIsAuthenticated();
        console.log(error);
      }

      // Якщо сесія валідна — отримуємо користувача

      // Якщо сесія невалідна — чистимо стан
    };
    fetcSession();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
