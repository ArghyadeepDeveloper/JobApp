import React from "react";
import { Menu } from "lucide-react";
import AvatarComponent from "../../../components/AvatarComponent";
import NavMenuList from "./NavMenuList";

function JobGiverNavbar() {
  return (
    <nav className="sticky flex justify-between bg-teal-500 m-5 w-[98vw] p-3 rounded-[20px] shadow-md">
      <NavMenuList />
      <div className="flex gap-1 items-center">
        <AvatarComponent
          name={"Aspiring Dev"}
          size="8"
          url="/jobgiver/profile"
        />
        <Menu className="xs:block sm:hidden text-white cursor-pointer" />{" "}
      </div>
    </nav>
  );
}

export default JobGiverNavbar;
