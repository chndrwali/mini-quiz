import { Navbar } from "@/components/layout/navbar";
import ProtectedRoute from "@/components/layout/protectedRoute";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}
