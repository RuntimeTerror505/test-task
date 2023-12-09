"use client";
import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

export const LineChart = ({
  stocks,
  stocks2,
  nameStock,
}: {
  stocks: any;
  stocks2: any;
  nameStock: string;
}) => {
  const config = {
    labels: stocks.map((data: any) => data.date),
    datasets: [
      {
        id: 1,
        label: nameStock,
        data: stocks.map((data: any) => data.volume),
        borderColor: "#ffbb4a",
        borderWidth: 2,
      },
      {
        id: 2,
        label: "SPY",
        data: stocks2.map((data: any) => data.volume),
        borderColor: "#F0ECE5",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="rounded-3xl bg-cyan-400 text-black p-5 w-500 h-500">
      <Line
        data={config}
        options={{
          scales: {
            x: {
              ticks: {
                color: "#B6BBC4",
              },
            },
            y: {
              ticks: {
                color: "#B6BBC4",
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (dataset) => {
                  // @ts-ignore
                  if (dataset.dataset?.id === 1) {
                    return [
                      `Volume: ${stocks[dataset.dataIndex].volume} `,
                      `Open: ${stocks[dataset.dataIndex].open}`,
                      `Close: ${stocks[dataset.dataIndex].close}`,
                      `High: ${stocks[dataset.dataIndex].high}`,
                      `Low: ${stocks[dataset.dataIndex].low}`,
                    ];
                  } else {
                    return [
                      `Volume: ${stocks2[dataset.dataIndex].volume} `,
                      `Open: ${stocks2[dataset.dataIndex].open}`,
                      `Close: ${stocks2[dataset.dataIndex].close}`,
                      `High: ${stocks2[dataset.dataIndex].high}`,
                      `Low: ${stocks2[dataset.dataIndex].low}`,
                    ];
                  }
                },
              },
            },
            legend: {
              labels: {
                color: "black",
              },
            },
            title: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
