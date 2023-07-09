import React from "react";
import NavItem from "../navbar";
import Sidebar from "../sidebar";

export default function Layout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <NavItem />
        {children}
      </div>
    </div>
  );
}
