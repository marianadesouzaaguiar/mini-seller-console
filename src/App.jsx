import React from "react";
import { AppProvider } from "./AppContext";
import LeadsList from "./components/LeadsList";

export default function App() {
  return (
    <AppProvider>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Mini Seller Console</h1>
        <LeadsList />
      </div>
    </AppProvider>
  );
}
