import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    if (role && decodedToken.role !== role) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error("❌ Error al decodificar el token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
