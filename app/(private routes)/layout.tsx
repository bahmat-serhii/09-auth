// app/(auth routes)/layout.tsx
// або app/(private routes)/layout.tsx

import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
