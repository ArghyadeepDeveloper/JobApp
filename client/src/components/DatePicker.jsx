import React from "react";
import { Calendar } from "primereact/calendar";

const DatePicker = ({ label, value, onChange, error, placeholder, name }) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <Calendar
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        dateFormat="mm/dd/yy"
        className={`w-full p-2 mb-1 border-2 border-none bg-gray-100 ${
          error ? "p-invalid" : ""
        }`}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default DatePicker;
