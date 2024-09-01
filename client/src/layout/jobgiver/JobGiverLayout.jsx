import React from "react";
import { Outlet } from "react-router-dom";

export default function JobGiverLayout() {
  return (
    <div className="">
      <div>JobGiverLayout</div>
      <Outlet />
    </div>
  );
}
