"use client";
import {
  BarElement,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Doanh số bán hàng",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#93c5fd",
    },
  ],
};

const AdminDashboard = () => {
  return (
    <div className="bg-slate-300/20 h-[150vh]">
      <div className="flex">
        <div className="flex-1 grid grid-cols-2 gap-2">
          <div className="bg-blue-400 rounded-2xl">Total: 34.000.000vnd</div>
          <div className="bg-green-400 rounded-2xl">Total: 34.000.000vnd</div>
          <div className="bg-orange-400 rounded-2xl">Total: 34.000.000vnd</div>
          <div className="bg-purple-400 rounded-2xl">Total: 34.000.000vnd</div>
        </div>

        <div className="bg-white w-[60%]  shadow-sm p-4 m-2 rounded-3xl">
          <div>
            <div className="text-[1.5rem] font-[700]">Revenue Chart</div>{" "}
          </div>
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
