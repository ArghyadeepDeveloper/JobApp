import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ config, data, heading }) => {
  return (
    <div className="p-4 shadow-md bg-white rounded-md">
      <h3 className="text-lg font-semibold mb-4">{heading}</h3>
      <Pie data={data} options={config} />
    </div>
  );
};

export default PieChartComponent;
