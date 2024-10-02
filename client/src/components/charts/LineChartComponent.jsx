import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ config, data, heading }) => {
  return (
    <div className="p-4 shadow-md bg-white rounded-md">
      <h3 className="text-lg font-semibold mb-4">{heading}</h3>
      <Line data={data} options={config} />
    </div>
  );
};

export default LineChartComponent;
