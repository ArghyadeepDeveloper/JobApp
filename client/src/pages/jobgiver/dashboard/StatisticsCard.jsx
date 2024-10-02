import React from "react";

const StatisticsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
      {Icon && (
        <div className="p-3 bg-teal-100 text-teal-900 rounded-full">
          <Icon size={24} />
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-teal-900">{title}</h3>
        <p className="text-2xl font-bold text-teal-700">{value}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
