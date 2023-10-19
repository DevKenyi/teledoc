import React from "react";
import { Pie } from "react-chartjs-2";

const NetIncomePieChart = ({ doctorName, income, expenses }) => {
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#3498db", "#e74c3c"], // Customize colors
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: "bottom", // Display the legend at the bottom
    },
    title: {
      display: true,
      text: `Net Income for ${doctorName}`,
    },
  };

  // Add CSS styles to ensure proper display
  const chartStyles = {
    height: "300px",
    width: "auto",
  };

  return (
    <div style={chartStyles}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default NetIncomePieChart;
