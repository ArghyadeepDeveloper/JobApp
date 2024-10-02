import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function JobSeekerLayout() {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <Outlet />
    </div>
  );
}
