export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
