import React, { useEffect } from "react";
import Chart from "chart.js";
import axios from "axios";
// const labels = ["January", "February", "March", "April", "May", "June"];
let labels = [];
let chartsData = [];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "hsl(252, 82.9%, 67.8%)",
      borderColor: "hsl(252, 82.9%, 67.8%)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const configLineChart = {
  type: "bar",
  data,
  options: {},
};

const Graph = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    console.log(id);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
      )
      .then((chartData) => {
        for (let i = 0; i <= chartData.data.market_caps.length; i++) {
          const market_cap = chartData.data.market_caps[i];

          if (market_cap && market_cap.length >= 2) {
            labels.push(market_cap[0]);
            chartsData.push(market_cap[1]);
          }
        }
        console.log(chartData.data.market_caps);
      });

    var config = {
      type: "line",
      data: {
        // labels: ["day", "February", "March", "April", "May", "June", "July"],
        labels,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: chartsData,
            // data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          // {
          //   label: new Date().getFullYear() - 1,
          //   fill: false,
          //   backgroundColor: "#ed64a6",
          //   borderColor: "#ed64a6",
          //   data: chartsData,
          // },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              {/* <h2 className=" text-xl font-semibold">Sales value</h2> */}
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
