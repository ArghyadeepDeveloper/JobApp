import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputField = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <div className="relative">
        {type === "password" ? (
          <div className="flex w-full mb-1 border-2">
            <InputText
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={onChange}
              name={name}
              placeholder={placeholder}
              className={`w-full focus:outline-none p-1 rounded-[5px] ${
                error ? "p-invalid" : ""
              }`}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        ) : (
          <InputText
            type={type}
            value={value}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
            className={`w-full mb-1 border-2 border-gray-200 focus:outline-none p-1 rounded-[5px] ${
              error ? "p-invalid" : ""
            }`}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputField;
