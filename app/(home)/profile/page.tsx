import { ProfileAccount } from "@/components/profile/profileAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const Page = () => {
  return <ProfileAccount />;
};

export default Page;
