import { Navbar } from "@/components/layout/navbar";
import ProtectedRoute from "@/components/layout/protectedRoute";
import { ProfileAccount } from "@/components/profile/profileAccount";

const Page = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <ProfileAccount />
    </ProtectedRoute>
  );
};

export default Page;
