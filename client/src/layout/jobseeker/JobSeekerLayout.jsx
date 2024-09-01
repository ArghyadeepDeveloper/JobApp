import React from "react";
import { Outlet } from "react-router-dom";

export default function JobSeekerLayout() {
  return (
    <div className="">
      <div>JobSeekerLayout</div>
      <Outlet />
    </div>
  );
}
