"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { jsonData } from "./data/jsonData";

// Dynamically import MapComponent (client-side only)

export default function Home() {
  const MapComponent = dynamic(() => import("./components/Map"), {
    ssr: false,
  });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header companyInfo={jsonData.company_info} />
      <main className="flex-grow">
        <MapComponent factories={jsonData.factory_data} />
      </main>
      <Footer />
    </div>
  );
}
