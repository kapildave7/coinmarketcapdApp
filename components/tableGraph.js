import React, { useEffect } from "react";
import Chart from "chart.js";
// import axios from "axios";
const labels = ["January", "February", "March", "April", "May", "June"];
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
  type: "line",
  data,
  options: {},
};

const TableGraph = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    // axios
    //   .get(
    //     `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval`
    //   )
    //   .then((chartData) => {
    //   });

    const config = {
        type: 'line',
        data: data,
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
                {/* Overview */}
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

export default TableGraph;
