import { LogoutButton } from "@/components/auth/logoutButton";
import ProtectedRoute from "@/components/layout/protectedRoute";

const Page = () => {
  return (
    <ProtectedRoute>
      <div>Dashboard Page</div>
      <LogoutButton />
    </ProtectedRoute>
  );
};

export default Page;
