// app/(auth routes)/layout.tsx

"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // обов’язкова умова
  }, [router]);

  return <>{children}</>;
}
