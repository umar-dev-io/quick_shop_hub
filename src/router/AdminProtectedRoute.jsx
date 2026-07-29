import React from "react";
import { Navigate, Outlet } from "react-router";

const AdminProtectedRoute = () => {
  // Check admin status from localStorage or session
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // If not admin, redirect to login page
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default AdminProtectedRoute;