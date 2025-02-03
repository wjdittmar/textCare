import { AuthProvider } from "@/app/context/AuthContext";

export default function Layout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
