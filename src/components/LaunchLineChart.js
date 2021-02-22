import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

/**
 * Renders analysis chart for home page
 * @component
 * @param {{data: Object}} props
 * @returns {React.ReactElement}
 */
const LaunchLineChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: data.years,
        datasets: [
          {
            label: "Successful Launches",
            data: Object.values(data.successfulLaunchesByYear),
            fill: false,
            borderColor: "#3d4ec7",
            lineTension: 0.3,
            borderWidth: 1,
            pointBorderWidth: 5,
          },
          {
            label: "Failed Launches",
            data: Object.values(data.failedLaunchesByYear),
            fill: false,
            borderColor: "#f66916",
            lineTension: 0.3,
            borderWidth: 1,
            pointBorderWidth: 5,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "#47415c",
            fontFamily: "Manrope, sans-serif",
          },
          align: "end",
          fullWidth: false,
        },
        tooltips: {
          titleFontFamily: "Manrope, sans-serif",
          titleFontColor: "#fafafa",
          titleSpacing: 3,
          titleMarginBottom: 10,
          bodyFontFamily: "Manrope, sans-serif",
          bodyFontColor: "#fafafa",
          bodySpacing: 3,
          footerFontFamily: "Manrope, sans-serif",
          footerFontColor: "#fafafa",
          backgroundColor: "#47415c",
          cornerRadius: 3,
          xPadding: 15,
          yPadding: 15,
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                zeroLineWidth: 1,
                zeroLineColor: "#47415c",
                lineWidth: 1,
                color: "rgba(71, 65, 92, 0.1)",
              },
              ticks: {
                fontColor: "#47415c",
                fontFamily: "Manrope, sans-serif",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                zeroLineWidth: 1,
                zeroLineColor: "#47415c",
                lineWidth: 1,
                color: "rgba(71, 65, 92, 0.1)",
              },
              ticks: {
                fontColor: "#47415c",
                fontFamily: "Manrope, sans-serif",
              },
            },
          ],
        },
      },
    });
  }, [
    data.failedLaunchesByYear,
    data.successfulLaunchesByYear,
    data.years,
    chartRef,
  ]);

  return (
    <div>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default LaunchLineChart;
