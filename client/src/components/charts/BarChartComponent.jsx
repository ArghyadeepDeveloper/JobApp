import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartComponent = ({ config, data, heading }) => {
  return (
    <div className="p-4 shadow-md bg-white rounded-md">
      <h3 className="text-lg font-semibold mb-4">{heading}</h3>
      <Bar data={data} options={config} />
    </div>
  );
};

export default BarChartComponent;
