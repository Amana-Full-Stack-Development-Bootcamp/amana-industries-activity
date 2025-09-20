"use client";

import "leaflet/dist/leaflet.css";
import React from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MapComponent } from "./components/Map";
import { jsonData } from "./data/jsonData";

export default function Home() {
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
