import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router";

export const Signout = () => {
  const { Signout } = useAuth();

  useEffect(() => {
    Signout();
    // toast.success("signed out successfully");
  }, []);

  return <Navigate to="/signin" />;
};
