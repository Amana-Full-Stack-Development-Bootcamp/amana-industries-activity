"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import ProductionBarChart from "./components/ProductionBarChart";
import { jsonData } from "./data/jsonData";

// Dynamically import MapComponent (client-side only)
export default function Home() {
  const MapComponent = dynamic(() => import("./components/Map"), {
    ssr: false,
  });

  return (
    // Add vertical spacing between direct children using space-y
    <div className="min-h-screen bg-white flex flex-col font-sans space-y-6">
      <Header companyInfo={jsonData.company_info} />
      <main className="flex-grow">
        <MapComponent factories={jsonData.factory_data} />
      </main>
      <ProductionBarChart data={jsonData} />
      <Footer />
    </div>
  );
}
