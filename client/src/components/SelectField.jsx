import React from "react";
import { Dropdown } from "primereact/dropdown";

const SelectField = ({
  label,
  value,
  onChange,
  data,
  helper,
  placeholder,
  error,
  name,
}) => {
  const options = data.map((item) => ({
    label: item[helper.label],
    value: item[helper.value],
  }));

  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <Dropdown
        value={value}
        onChange={(e) => onChange(e.value)}
        options={options}
        placeholder={placeholder}
        className={`w-full p-0 mb-1 border-2 border-gray-200 focus:outline-none rounded-[5px] border-none bg-gray-100 ${
          error ? "p-invalid" : ""
        }`}
        name={name}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default SelectField;
