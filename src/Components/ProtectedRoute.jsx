import { Navigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated)
      toast.error("Please log in to access this page.", { theme: "colored" });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
};
