import React from "react";
import { Bar } from "react-chartjs-2";

const GenderDemographics = ({ maleCount, femaleCount }) => {
  const title = "Patients by Gender";
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "Male",
        data: [10, 15, 20, 18, 22, 25, 28, 30, 26, 18, 15, 12], // Replace with your male data
        backgroundColor: "#3498db", // Customize color if needed
      },
      {
        label: "Female",
        data: [8, 12, 15, 14, 18, 20, 22, 24, 20, 16, 14, 10], // Replace with your female data
        backgroundColor: "#e74c3c", // Customize color if needed
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GenderDemographics;
