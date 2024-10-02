import React, { useState } from "react";
import {
  FiMenu,
  FiChevronDown,
  FiHome,
  FiBriefcase,
  FiPlus,
  FiList,
  FiInbox,
  FiUsers,
  FiUser,
  FiSettings,
  FiCreditCard,
  FiBarChart2,
} from "react-icons/fi";
import AvatarComponent from "../../../components/AvatarComponent";

function NavMenuList() {
  const [isVisible, setIsVisible] = useState({});

  // Function to handle hover over menu items
  const handleHover = (index) => {
    console.log("in ", index);
    setIsVisible((prev) => ({ ...prev, [index]: true }));
  };

  const handleHoverLeave = (index) => {
    console.log("out ", index);
    setIsVisible((prev) => ({ ...prev, [index]: false }));
  };

  const NavbarMenu = [
    {
      label: "Dashboard",
      icon: <FiHome />,
      url: "/dashboard",
    },
    {
      label: "Jobs",
      icon: <FiBriefcase />,
      submenu: [
        { label: "Post a Job", icon: <FiPlus />, url: "/post-job" },
        { label: "Job Postings", icon: <FiList />, url: "/job-postings" },
        {
          label: "Job Applications",
          icon: <FiInbox />,
          url: "/job-applications",
        },
      ],
    },
    {
      label: "Company",
      icon: <FiUsers />,
      submenu: [
        { label: "Company Profile", icon: <FiUser />, url: "/company-profile" },
        {
          label: "Team Management",
          icon: <FiUsers />,
          url: "/team-management",
        },
      ],
    },
    {
      label: "Analytics",
      icon: <FiBarChart2 />,
      submenu: [
        {
          label: "Job Analytics",
          icon: <FiBarChart2 />,
          url: "/job-analytics",
        },
        {
          label: "Candidate Management",
          icon: <FiUser />,
          url: "/candidate-management",
        },
      ],
    },
    {
      label: "Settings",
      icon: <FiSettings />,
      submenu: [
        {
          label: "Account Settings",
          icon: <FiUser />,
          url: "/account-settings",
        },
        {
          label: "Subscription and Billing",
          icon: <FiCreditCard />,
          url: "/subscription-billing",
        },
      ],
    },
  ];

  return (
    <div className="sticky flex justify-between items-center bg-teal-500 w-[98vw] p-1 rounded-lg text-white">
      {/* <div className="flex gap-3 items-center">
        <FiMenu
          className="xs:block sm:hidden text-white cursor-pointer"
          size={24}
        />
      </div> */}

      {/* Navbar Menu */}
      <ul className="hidden sm:flex items-center gap-6">
        {NavbarMenu.map((menu, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => handleHover(index)}
            // onMouseLeave={() => handleHoverLeave(index)}
          >
            <button className="flex items-center space-x-2 hover:text-gray-300">
              {menu.icon}
              <span>{menu.label}</span>
              {menu.submenu && <FiChevronDown className="h-4 w-4" />}
            </button>

            {/* Submenu */}
            {menu.submenu && isVisible[index] && (
              <ul
                className="absolute left-0 top-full mt-2 bg-white text-black shadow-lg rounded-lg p-2 z-10 min-w-[150px]"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHoverLeave(index)}
              >
                {menu.submenu.map((item, subIndex) => (
                  <li key={subIndex} className="w-auto">
                    <a
                      href={item.url}
                      className="flex items-center gap-4 px-1 py-2 hover:bg-gray-200 rounded-md text-xs"
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Right Section with a Button */}
    </div>
  );
}

export default NavMenuList;
