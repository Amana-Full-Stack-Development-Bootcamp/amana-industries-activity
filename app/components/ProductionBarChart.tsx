"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ProductionLevel, Root } from "../data/jsonData";

type ProductionBarChartProps = {
  data: Root;
};

const ProductionBarChart: React.FC<ProductionBarChartProps> = ({ data }) => {
  const factories = data.factory_data.filter(
    (f) => f.name && f.production_level_2024
  );

  if (factories.length === 0) return <p>No factory data available.</p>;

  // Step 1: Get all months present in any factory
  const allMonths = Array.from(
    new Set(
      factories.flatMap((f) =>
        f.production_level_2024!.map((p: ProductionLevel) => p.month)
      )
    )
  );

  // Step 2: Build chart data for each month
  const chartData = allMonths.map((month) => {
    const monthEntry: { month: string; [key: string]: number } = { month };

    factories.forEach((factory) => {
      if (!factory.name || !factory.production_level_2024) return;
      const production =
        factory.production_level_2024.find((p) => p.month === month)?.value ??
        0;
      monthEntry[factory.name] = production;
    });

    return monthEntry;
  });

  // Step 3: Filter out months where all factories have zero production
  const filteredData = chartData.filter((monthEntry) =>
    factories.some((factory) => monthEntry[factory.name!] > 0)
  );

  if (filteredData.length === 0) return <p>No production data to display.</p>;

  // Step 4: Colors
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
    "#d88884",
    "#84d8c8",
    "#d884d8",
  ];

  return (
    <div className="w-full h-[500px] my-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {factories.map((factory, idx) => (
            <Bar
              key={factory.id}
              dataKey={factory.name!}
              fill={colors[idx % colors.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductionBarChart;
