import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Dashboard({ userData }) {
  const glucoseChartRef = useRef(null);
  const bloodPressureChartRef = useRef(null);
  const weightChartRef = useRef(null);

  useEffect(() => {
    const glucoseData = [0, 450, 89, 95, -600, -5, 80, 700, 600, 40];
    const bloodPressureData = [78, 89, 600, 56, 140, -45, 54, 74, 40];
    const weightData = [0, 155, 136, 165, 10, 175, 80, 65, 34, 76, 80, 40];

    const createChartConfig = (label, data, borderColor, backgroundColor) => {
      return {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: label,
              data: data,
              borderColor: borderColor,
              backgroundColor: backgroundColor,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
    };

    const createChart = (chartRef, chartConfig) => {
      if (chartRef.current && chartRef.current.chart) {
        // Destroy the existing chart instance before creating a new one
        chartRef.current.chart.destroy();
      }

      const chartCtx = chartRef.current.getContext("2d");
      chartRef.current.chart = new Chart(chartCtx, chartConfig);
    };

    // Create and render each chart
    createChart(
      glucoseChartRef,
      createChartConfig(
        "Glucose",
        glucoseData,
        "rgba(75, 192, 192, 1)",
        "rgba(75, 192, 192, 0.2)"
      )
    );
    createChart(
      bloodPressureChartRef,
      createChartConfig(
        "Blood Pressure",
        bloodPressureData,
        "rgba(255, 99, 132, 1)",
        "rgba(255, 99, 132, 0.2)"
      )
    );
    createChart(
      weightChartRef,
      createChartConfig(
        "Weight",
        weightData,
        "rgba(54, 162, 235, 1)",
        "rgba(54, 162, 235, 0.2)"
      )
    );
  }, []);

  return (
    <div className="mx-auto lg:max-w-screen-xl p-2">
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row">
        <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow mb-4 md:mb-0 lg:mr-4">
          <canvas ref={glucoseChartRef}></canvas>
        </div>
        <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow mb-4 md:mb-0 lg:mr-4">
          <canvas ref={bloodPressureChartRef}></canvas>
        </div>
        <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow">
          <canvas ref={weightChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
