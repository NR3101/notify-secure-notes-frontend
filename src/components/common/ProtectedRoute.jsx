import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

// Protected Route component - authentication aur authorization check karega
const ProtectedRoute = ({ children, adminPage = false }) => {
  // Zustand store se token, isAdmin, currentUser aur fetchUser lenge
  const { token, isAdmin, currentUser, fetchUser } = useAuthStore();

  // Component mount hone par user data fetch karo agar available nahi hai
  useEffect(() => {
    if (token && !currentUser) {
      fetchUser();
    }
  }, [token, currentUser, fetchUser]);

  // Agar token nahi hai toh login page par redirect kar do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar admin page access kar raha hai par admin nahi hai toh access denied
  if (adminPage && !isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  // Sab theek hai toh children render kar do
  return children;
};

export default ProtectedRoute;
