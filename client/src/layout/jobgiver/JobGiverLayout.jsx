import React from "react";
import { Outlet } from "react-router-dom";
import JobGiverNavbar from "./navbar/JobGiverNavbar";

export default function JobGiverLayout() {
  return (
    <div className="">
      <JobGiverNavbar />
      <Outlet />
    </div>
  );
}
