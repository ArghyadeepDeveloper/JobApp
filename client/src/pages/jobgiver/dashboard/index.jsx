import { User } from "lucide-react";
import BarChartComponent from "../../../components/charts/BarChartComponent";
import LineChartComponent from "../../../components/charts/LineChartComponent";
import PieChartComponent from "../../../components/charts/PieChartComponent";
import StatisticsCard from "./StatisticsCard";

// Sample configuration and data for charts
const barChartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Job Applications",
      data: [50, 100, 150, 200, 250],
      backgroundColor: "#4FD1C5", // Teal shade
    },
    {
      label: "Jobs Posted",
      data: [30, 120, 180, 240, 300],
      backgroundColor: "#38B2AC", // Darker teal
    },
  ],
};

const barChartConfig = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Job Activity Over Time" },
  },
};

const lineChartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Applications Accepted",
      data: [5, 15, 30, 50, 70],
      borderColor: "#319795", // Teal
      backgroundColor: "#319795",
      fill: false,
    },
  ],
};

const lineChartConfig = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Accepted Applications Trend" },
  },
};

const pieChartData = {
  labels: ["Marketing", "Development", "Design", "Sales"],
  datasets: [
    {
      data: [120, 200, 150, 80],
      backgroundColor: ["#38B2AC", "#4FD1C5", "#2C7A7B", "#285E61"], // Various teal shades
    },
  ],
};

const pieChartConfig = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Job Applications by Department" },
  },
};

export default function JobGiverDashboard() {
  return (
    <div className="p-4 space-y-8 bg-gray-100 min-h-screen">
      <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold text-teal-900 mb-4">
          Job Giver Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatisticsCard title="Total Jobs" value="50" icon={User} />
          <StatisticsCard title="Total Applicants" value="120" icon={User} />
          <StatisticsCard title="Job Views" value="500" icon={User} />
        </div>
      </div>
      <div className="grid grid-cols-1">
        {/* Bar Chart */}
        <BarChartComponent
          data={barChartData}
          config={barChartConfig}
          heading="Job Posting & Applications"
        />

        {/* Line Chart */}
        <LineChartComponent
          data={lineChartData}
          config={lineChartConfig}
          heading="Accepted Applications Trend"
        />

        {/* Pie Chart */}
        <PieChartComponent
          data={pieChartData}
          config={pieChartConfig}
          heading="Applications by Department"
        />
      </div>
    </div>
  );
}
