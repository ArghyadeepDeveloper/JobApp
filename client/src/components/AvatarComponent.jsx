import React from "react";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";

const AvatarComponent = ({ src, name, size = "large", url }) => {
  const navigate = useNavigate();
  // Helper function to get initials from the name
  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0] + words[1][0]; // First letter of first name and last name
    }
    return words[0].slice(0, 2); // First two letters of single name
  };

  return (
    <Avatar
      image={src}
      label={!src ? getInitials(name).toUpperCase() : null}
      shape="circle"
      size={size}
      className={
        !src ? "bg-gray-200 text-teal-900 cursor-pointer" : "cursor-pointer"
      }
      onClick={() => navigate(url)}
    />
  );
};

export default AvatarComponent;
