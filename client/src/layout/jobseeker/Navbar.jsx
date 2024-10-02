import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Image } from "primereact/image";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaClipboardList,
  FaBuilding,
  FaUserCircle,
  FaSearch,
  FaBookmark,
  FaCalendarAlt,
  FaHandshake,
  FaHeart,
  FaUser,
  FaUserEdit,
  FaCog,
} from "react-icons/fa"; // Ensure all icons are correctly imported

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu); // Toggle menu on click
  };

  return (
    <div className="flex flex-row justify-between items-center px-10 w-full sticky shadow-sm h-[50px] bg-white">
      <Link to="/jobseeker" className="w-[20%] h-full cursor-pointer">
        <Image src={logo} className="h-[50px]" id="logo" />
      </Link>
      <div className="flex justify-between gap-8" id="menu">
        {/* Home */}
        <div className="relative" onClick={() => handleMenuClick("home")}>
          <Link
            to="/"
            className="flex items-center hover:border-b-2 border-teal-600 text-teal-600 pb-1"
          >
            <FaHome className="mr-2" /> Home
          </Link>
        </div>

        {/* Jobs */}
        <div
          className="relative cursor-pointer"
          onClick={() => handleMenuClick("jobs")}
        >
          <div className="flex items-center hover:border-b-2 border-teal-600 text-teal-600 pb-1">
            <FaBriefcase className="mr-2" /> Jobs
          </div>
          {activeMenu === "jobs" && (
            <div className="absolute left-0 text-sm top-full mt-2 w-[200px] bg-white shadow-md rounded-lg p-3">
              <Link
                to="/jobs/search"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaSearch className="mr-2" /> Search Jobs
              </Link>
              <Link
                to="/jobs/saved"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaBookmark className="mr-2" /> Saved Jobs
              </Link>
              <Link
                to="/jobs/applied"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaClipboardList className="mr-2" /> Applied Jobs
              </Link>
            </div>
          )}
        </div>

        {/* Applications */}
        <div
          className="relative cursor-pointer"
          onClick={() => handleMenuClick("applications")}
        >
          <div className="flex items-center hover:border-b-2 border-teal-600 text-teal-600 pb-1">
            <FaClipboardList className="mr-2" /> Applications
          </div>
          {activeMenu === "applications" && (
            <div className="absolute left-0 text-sm top-full mt-2 w-[200px] bg-white shadow-md rounded-lg p-3">
              <Link
                to="/applications/my"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaClipboardList className="mr-2" /> My Applications
              </Link>
              <Link
                to="/applications/interviews"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaCalendarAlt className="mr-2" /> Interviews
              </Link>
              <Link
                to="/applications/offers"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaHandshake className="mr-2" /> Offers
              </Link>
            </div>
          )}
        </div>

        {/* Companies */}
        <div
          className="relative cursor-pointer"
          onClick={() => handleMenuClick("companies")}
        >
          <div className="flex items-center hover:border-b-2 border-teal-600 text-teal-600 pb-1">
            <FaBuilding className="mr-2" /> Companies
          </div>
          {activeMenu === "companies" && (
            <div className="absolute left-0 text-sm top-full mt-2 w-[200px] bg-white shadow-md rounded-lg p-3">
              <Link
                to="/companies/explore"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaBuilding className="mr-2" /> Explore Companies
              </Link>
              <Link
                to="/companies/following"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaHeart className="mr-2" /> Followed Companies
              </Link>
            </div>
          )}
        </div>

        {/* Profile */}
        <div
          className="relative cursor-pointer"
          onClick={() => handleMenuClick("profile")}
        >
          <div className="flex items-center hover:border-b-2 border-teal-600 text-teal-600 pb-1">
            <FaUserCircle className="mr-2" /> Profile
          </div>
          {activeMenu === "profile" && (
            <div className="absolute left-0 text-sm top-full mt-2 w-[200px] bg-white shadow-md rounded-lg p-3">
              <Link
                to="/profile/view"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaUser className="mr-2" /> View Profile
              </Link>
              <Link
                to="/profile/edit"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaUserEdit className="mr-2" /> Edit Profile
              </Link>
              <Link
                to="/profile/settings"
                className="flex items-center p-2 hover:bg-gray-100"
              >
                <FaCog className="mr-2" /> Account Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
