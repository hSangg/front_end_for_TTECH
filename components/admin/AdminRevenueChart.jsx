"use client";
import { faker } from "@faker-js/faker";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { CiWavePulse1 } from "react-icons/ci";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

function getWeekLabels() {
  const labels_week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date();
  const currentDayIndex = today.getDay();
  console.log(currentDayIndex);
  if (currentDayIndex === 0) return labels_week;

  return labels_week.slice(0, currentDayIndex);
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const labels_year = [
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

const labels_month = [1, 2, 3, 4];
const labels_week = getWeekLabels();

const optionStyle = "focus:border-none focus:outline-none";

export const data_year = {
  labels: labels_year,
  datasets: [
    {
      label: "Doanh thu",
      data: labels_year.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#93c5fd",
    },
  ],
};

export const data_month = {
  labels: labels_month,
  datasets: [
    {
      label: "",
      data: labels_month.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "#93c5fd",
    },
  ],
};

export const data_week = {
  labels: labels_week,
  datasets: [
    {
      label: "",
      data: labels_week.map(() => faker.number.int({ min: 10, max: 1000 })),
      backgroundColor: "#93c5fd",
    },
  ],
};

const AdminRevenueChart = () => {
  const [choose, setChoose] = useState("Y");
  const [data, setData] = useState(data_year);
  useEffect(() => {
    if (choose === "Y") {
      setData(data_year);
    } else if (choose === "M") {
      setData(data_month);
    } else {
      console.log("data week");
      setData(data_week);
    }
  }, [choose]);

  return (
    <>
      <div className="flex justify-between">
        <div className="text-[1.5rem] font-[700] flex gap-2 items-center">
          <CiWavePulse1 size={25} /> <h1>Revenue Chart</h1>
        </div>
        <div className="">
          <select
            id="countries"
            class="bg-white focus:outline-none focus:border-none 
             border text-[1.1rem] text-black rounded-lg 
              block w-full p-2.5 "
            onChange={(e) => {
              setChoose(e.target.value);
            }}
          >
            <option className={optionStyle} value="Y">
              Year
            </option>
            <option className={optionStyle} value="M">
              Month
            </option>
            <option className={optionStyle} value="W">
              Week
            </option>
          </select>
        </div>
      </div>
      <Line options={options} data={data} />
    </>
  );
};

export default AdminRevenueChart;
