import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Navigate to={"time-tracker"} /> : children;
};

export default PublicRoute;
